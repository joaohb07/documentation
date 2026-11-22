# Architecture & Key Concepts

> **Core networking, reverse-proxy routing, Zero-Trust tunneling, and operational automation** powering the self-hosted `jhbserver` home-lab infrastructure.

---

## Core Networking & Ingress Concepts

### 1. Reverse Proxy & Proxy Hosts
A **Reverse Proxy** sits in front of one or more backend servers and intercepts incoming client requests before forwarding them to the appropriate internal service. Unlike a *forward proxy* (which hides the client's identity from external servers), a reverse proxy abstracts internal infrastructure topology from external clients:

* **Single Entry Point:** Clients connect solely to a single public endpoint (`https://jhbserver.tail4bcb71.ts.net`), unaware of internal container names, private IP addresses, or internal ports (`3000`, `81`, `27017`).
* **Proxy Hosts:** Logical virtual-host definitions inside **Nginx Proxy Manager (NPM)** that map incoming domain names (`jhbserver.tail4bcb71.ts.net`) to internal upstream targets (`status-monitor:3000`).
* **Subpath Routing & Prefix Stripping:** Using NPM **Custom Locations**, multiple independent web applications share one domain without port conflicts. Appending a trailing slash `/` to both the `Location` (`/task-app/`) and the `Forward Hostname` (`http://task-app/:3000`) instructs Nginx to strip the `/task-app` prefix before passing the request to the upstream Express server:

```text
Client Request:  GET https://jhbserver.tail4bcb71.ts.net/task-app/api/tasks
                                                       └───────┘ stripped by NPM
Upstream Target: GET http://task-app:3000/api/tasks
```

### 2. Tailscale Funnel (Zero-Trust Edge & TLS Termination)
Traditional self-hosting requires configuring **Port Forwarding** (`80`/`443`) on a residential router, managing Dynamic DNS (DDNS) for changing ISP IP addresses, and provisioning Let's Encrypt certificates via ACME challenges—which often fails behind carrier-grade NAT (**CGNAT**).

**Tailscale Funnel** solves this at the network edge:
* **Outbound Encrypted Tunnel:** The `tailscaled` daemon on the Ubuntu host establishes an outbound WireGuard-encrypted connection to Tailscale's edge relays—zero inbound firewall ports need to be opened on the home router.
* **Automatic TLS Termination:** Tailscale automatically provisions and renews valid TLS certificates for `jhbserver.tail4bcb71.ts.net`, terminating HTTPS (`443/tcp`) at the edge and forwarding plain HTTP traffic locally to `127.0.0.1:80` (Nginx Proxy Manager).
* **Private Administrative Plane:** While public web routes are served via Funnel, administrative SSH (`22/tcp`) and the NPM dashboard (`81/tcp`) remain strictly restricted to the private LAN (`192.168.0.0/24`) and authenticated Tailscale VPN peers.

### 3. Container Hardening & Read-Only Socket Telemetry
Exposing the Docker daemon socket (`/var/run/docker.sock`) with write permissions grants effective `root` control over the host machine. To observe container states safely without elevating privileges:
* **Read-Only Mount (`:ro`):** `status-monitor` mounts `/var/run/docker.sock:/var/run/docker.sock:ro`, restricting API calls strictly to `GET` inspection endpoints.
* **Least-Privilege Runtime:** The container runs as the unprivileged `node` user (`USER node`), inherits the host `docker` group GID (`group_add: ["977"]`) solely for socket read access, enforces `no-new-privileges:true`, and locks its root filesystem (`read_only: true`).

---

## Operational Automation: Full-Stack Recovery Script

When applying host kernel updates, recovering from power events, or refreshing reverse-proxy DNS bindings across containers, `~/server/scripts/restart-stack.sh` deterministically restarts the ingress layer first and then brings up every containerized project.

### Script Source (`~/server/scripts/restart-stack.sh`)

```bash
#!/usr/bin/env bash
set -e

echo "=== Reiniciando Nginx Proxy Manager ==="
cd ~/server/proxy && docker compose up -d --force-recreate

echo "=== Reiniciando Aplicações ==="
for app in ~/server/projects/*; do
  if [ -f "$app/docker-compose.yml" ]; then
    echo "-> Subindo $(basename "$app")..."
    (cd "$app" && docker compose up -d)
  fi
done

echo "=== Status Atual ==="
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### How It Works Step-by-Step

| Step | Command / Construct | Purpose & Engineering Behavior |
| :--- | :--- | :--- |
| **1. Fail-Fast Guard** | `set -e` | Immediately aborts execution if any command exits with a non-zero status, preventing cascading failures if the proxy layer fails to start. |
| **2. Ingress Recreation** | `cd ~/server/proxy && docker compose up -d --force-recreate` | Recreates the `nginx-proxy-manager` container first so the `global-proxy` bridge gateway and internal DNS resolver are guaranteed to be active. |
| **3. Project Discovery Loop** | `for app in ~/server/projects/*; do ... done` | Dynamically iterates through every project folder (`status-monitor`, `task-app`, `weather-app`) without hardcoding paths—new projects are automatically included as soon as they are cloned. |
| **4. Subshell Isolation** | `(cd "$app" && docker compose up -d)` | Executes each `docker compose up -d` inside a subshell `(...)` so directory changes remain isolated per iteration without affecting the parent script's working directory. |
| **5. Verification Table** | `docker ps --format "table ..."` | Outputs a clean summary table showing container names, uptime/health statuses, and bound host ports to confirm zero unintended port exposure. |