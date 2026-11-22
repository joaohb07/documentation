# Live Server Telemetry

<p align="left">
  <a href="https://jhbserver.tail4bcb71.ts.net/" target="_blank">
    <img alt="Live Portal" src="https://badgen.net/badge/icon/Live%20Portal?icon=terminal&label=Self-Hosted&color=blue" />
  </a>
  <a href="https://jhbserver.tail4bcb71.ts.net/api/status" target="_blank">
    <img alt="JSON Endpoint" src="https://badgen.net/badge/API/GET%20%2Fapi%2Fstatus?color=green" />
  </a>
  <img alt="GPU" src="https://badgen.net/badge/GPU/GTX%201060%203GB%20CUDA?color=76B900" />
  <img alt="Polling" src="https://badgen.net/badge/Refresh/5s%20Live%20Fetch?color=teal" />
</p>

> **Real-time infrastructure observability embedded in static documentation.** Fetches live telemetry from `https://jhbserver.tail4bcb71.ts.net/api/status` directly in the browser, displaying CPU/RAM utilization, hardware specs, NVIDIA GPU metrics, endpoint latency, and Docker container states.

---

## Live Home-Lab Dashboard (`jhbserver`)

<div id="jhb-telemetry-root" class="jhb-telemetry-box">
  <div class="jhb-telemetry-header">
    <strong class="jhb-telemetry-host">jhbserver.tail4bcb71.ts.net</strong>
    <span id="jhb-telemetry-status" class="jhb-telemetry-status">Connecting to telemetry API...</span>
  </div>

  <div id="jhb-host-grid" class="jhb-host-grid"></div>

  <h4 class="jhb-section-title">Hosted Applications & Endpoint Latency</h4>
  <div class="jhb-table-wrap">
    <table class="jhb-table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Route</th>
          <th>Status</th>
          <th>HTTP</th>
          <th>Latency</th>
        </tr>
      </thead>
      <tbody id="jhb-probes-body">
        <tr><td colspan="5" class="jhb-muted">Waiting for response...</td></tr>
      </tbody>
    </table>
  </div>

  <h4 class="jhb-section-title">Docker Containers</h4>
  <div class="jhb-table-wrap">
    <table class="jhb-table">
      <thead>
        <tr>
          <th>Container</th>
          <th>Image</th>
          <th>State</th>
          <th>Uptime / Status</th>
        </tr>
      </thead>
      <tbody id="jhb-containers-body">
        <tr><td colspan="4" class="jhb-muted">Waiting for response...</td></tr>
      </tbody>
    </table>
  </div>
</div>

---

## Telemetry Pipeline & API (`GET /api/status`)

The `status-monitor` service aggregates host, GPU, container, and network metrics without elevated container privileges (`read_only: true`, non-root `node` user):

| Metric Source | Collection Mechanism | Data Exposed |
| :--- | :--- | :--- |
| **Host Kernel (`os` & `/sys`)** | Native Node.js `os` module + `/sys/class/thermal` | Load averages (`1m/5m/15m`), DDR4 RAM usage, uptime, CPU package temperature |
| **NVIDIA GPU (`nvidia-smi`)** | Host `systemd` daemon exporting CSV to `/run/gpu-telemetry.json` (`:ro`) | GPU model, core utilization (`%`), VRAM used/total (`MB`), GPU temperature (`°C`) |
| **Docker Engine API** | Raw HTTP `GET /containers/json?all=1` over `/var/run/docker.sock:ro` | Running containers, image tags, health states, and uptime |
| **Internal Bridge Probes** | Parallel `fetch` + `AbortController` (3s timeout) on `global-proxy` | HTTP status codes and internal container-to-container latency (`ms`) |

### How Telemetry Collection & Security Work

Instead of running heavyweight agents (like Prometheus or Grafana) or granting root privileges to containers, the `status-monitor` service collects real-time metrics using a zero-overhead, least-privilege design[cite: 66]:

* **Client-Side Polling & CORS:** Because this documentation site is statically hosted on GitHub Pages (`https://joaohb07.github.io`), the Express backend enables read-only CORS headers (`Access-Control-Allow-Origin: *`, `GET` only) on `/api/status`, allowing the browser to poll fresh metrics every 5 seconds directly over the Tailscale Funnel HTTPS endpoint[cite: 64].
* **Read-Only Host & Container Access:** The container runs with a read-only root filesystem (`read_only: true`) under a non-root `node` user. It queries Docker engine state via a raw HTTP request over `/var/run/docker.sock:ro` and reads GPU metrics from an atomic file (`/run/gpu-telemetry.json:ro`) exported every 5 seconds by a host `systemd` unit running `nvidia-smi`[cite: 66].
* **Internal Network Probing:** Latency measurements (`latencyMs`) reflect true container-to-container response times inside the isolated `global-proxy` Docker bridge network, bypassing public DNS and TLS overhead[cite: 64, 66].

### Response Schema Overview
```json
{
  "timestamp": "2026-11-22T03:18:52.121Z",
  "host": {
    "hostname": "47042086e42a",
    "uptimeSec": 1150,
    "loadAvg": [0.19, 0.2, 0.17],
    "cpuCores": 4,
    "memory": { "totalGb": "15.07", "usedGb": "1.09", "percent": 7 },
    "tempC": "41.0"
  },
  "gpu": {
    "available": true,
    "name": "NVIDIA GeForce GTX 1060 3GB",
    "utilizationPercent": 0,
    "memoryUsedMb": 0,
    "memoryTotalMb": 3072,
    "tempC": 51
  },
  "containers": [
    { "id": "47042086e42a", "name": "status-monitor", "image": "status-monitor-status-monitor", "state": "running", "status": "Up 3 minutes" }
  ],
  "probes": [
    { "name": "Nginx Proxy Manager", "url": "http://nginx-proxy-manager:81", "publicPath": null, "up": true, "statusCode": 200, "latencyMs": 1 }
  ]
}
```