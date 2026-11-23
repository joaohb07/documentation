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

> **Real-time infrastructure observability embedded in static documentation.** Fetches live telemetry from `https://jhbserver.tail4bcb71.ts.net/api/status` directly in the browser, displaying CPU/RAM 5-minute trends, root storage usage, NVIDIA GPU metrics, CI/CD deployment status, endpoint latency, and per-container resource consumption.

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
          <th>Last Deploy</th>
          <th>HTTP</th>
          <th>Latency</th>
        </tr>
      </thead>
      <tbody id="jhb-probes-body">
        <tr><td colspan="6" class="jhb-muted">Waiting for response...</td></tr>
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
          <th>CPU</th>
          <th>Memory</th>
          <th>Uptime / Status</th>
        </tr>
      </thead>
      <tbody id="jhb-containers-body">
        <tr><td colspan="6" class="jhb-muted">Waiting for response...</td></tr>
      </tbody>
    </table>
  </div>
</div>

---

## Telemetry Pipeline & API (`GET /api/status`)

The `status-monitor` service aggregates host, storage, GPU, container, CI/CD, and network metrics without elevated container privileges (`read_only: true`, non-root `node` user):

| Metric Source | Collection Mechanism | Data Exposed |
| :--- | :--- | :--- |
| **Host Kernel (`os`, `fs` & `/sys`)** | Native Node.js `os`, `fs.statfsSync('/')` & `/sys/class/thermal` | Load averages (`1m/5m/15m`), DDR4 RAM usage, root filesystem capacity, uptime, CPU temperature |
| **In-Memory Ring Buffer** | 60-sample circular array (5s interval = 5-min window) | Time-series history for client-side `<svg>` sparkline rendering |
| **NVIDIA GPU (`nvidia-smi`)** | Host `systemd` daemon exporting CSV to `/run/gpu-telemetry.json` (`:ro`) | GPU model, core utilization (`%`), VRAM used/total (`MB`), GPU temperature (`°C`) |
| **Docker Engine API** | `/containers/json` + `/containers/{id}/stats?stream=false` over `/var/run/docker.sock:ro` | Running containers, image tags, health states, per-container CPU `%` and active RAM (`MB`) |
| **GitHub Actions API** | Cached `GET /repos/{owner}/{repo}/actions/workflows/deploy.yml/runs` (60s TTL) | Latest workflow conclusion (`Passing` / `Failed`) and short commit SHA |
| **Internal Bridge Probes** | Parallel `fetch` + `AbortController` (3s timeout) on `global-proxy` | HTTP status codes and internal container-to-container latency (`ms`) |

### How Telemetry Collection & Security Work

Instead of running heavyweight agents (like Prometheus or Grafana) or granting root privileges to containers, the `status-monitor` service collects real-time metrics using a zero-overhead, least-privilege design:

* **Client-Side Polling & CORS:** Because this documentation site is statically hosted on GitHub Pages (`https://joaohb07.github.io`), the Express backend enables read-only CORS headers (`Access-Control-Allow-Origin: *`, `GET` only) on `/api/status`, allowing the browser to poll fresh metrics every 5 seconds directly over the Tailscale Funnel HTTPS endpoint.
* **Read-Only Host & Container Access:** The container runs with a read-only root filesystem (`read_only: true`) under a non-root `node` user. It queries Docker engine state and cgroup stats via raw HTTP requests over `/var/run/docker.sock:ro` and reads GPU metrics from an atomic file (`/run/gpu-telemetry.json:ro`) exported every 5 seconds by a host `systemd` unit running `nvidia-smi`.
* **Rate-Limit-Safe CI/CD Status & Ring Buffer:** Historical sparklines are served from an in-memory 60-point circular buffer without external databases, while GitHub Actions workflow runs are cached in memory for 60 seconds to prevent upstream API rate limiting.
* **Internal Network Probing:** Latency measurements (`latencyMs`) reflect true container-to-container response times inside the isolated `global-proxy` Docker bridge network, bypassing public DNS and TLS overhead.

### Response Schema Overview

```json
{
  "timestamp": "2026-11-22T18:29:57.847Z",
  "host": {
    "hostname": "3bcdf26821ca",
    "uptimeSec": 55813,
    "loadAvg": [0.35, 0.25, 0.18],
    "cpuCores": 4,
    "memory": { "totalGb": "15.07", "usedGb": "1.12", "percent": 7 },
    "storage": { "available": true, "mount": "/", "totalGb": "97.87", "usedGb": "23.23", "freeGb": "74.64", "percent": 23.7 },
    "tempC": "39.5"
  },
  "gpu": {
    "available": true,
    "name": "NVIDIA GeForce GTX 1060 3GB",
    "utilizationPercent": 0,
    "memoryUsedMb": 0,
    "memoryTotalMb": 3072,
    "tempC": 51
  },
  "history": [
    { "timestamp": "2026-11-22T18:29:57.707Z", "cpuLoad1m": 0.35, "memoryPercent": 7 }
  ],
  "deploys": {
    "status-monitor": {
      "repo": "joaohb07/status-monitor",
      "sha": "0891d32",
      "conclusion": "success",
      "htmlUrl": "[https://github.com/joaohb07/status-monitor/actions/runs/45054955931](https://github.com/joaohb07/status-monitor/actions/runs/45054955931)",
      "updatedAt": "2026-11-22T18:25:34Z"
    }
  },
  "containers": [
    {
      "id": "3bcdf26821ca",
      "name": "status-monitor",
      "image": "status-monitor-status-monitor",
      "state": "running",
      "status": "Up 4 minutes",
      "cpuPercent": 0.24,
      "memoryMb": 50.8
    }
  ],
  "probes": [
    {
      "name": "Task App",
      "url": "http://task-app:3000/",
      "publicPath": "/task-app/",
      "repoKey": "task-app",
      "up": true,
      "statusCode": 200,
      "latencyMs": 3
    }
  ]
}
```