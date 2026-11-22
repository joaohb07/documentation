(function () {
  const API_URL = 'https://jhbserver.tail4bcb71.ts.net/api/status';
  let pollTimer = null;

  function badge(ok, label) {
    return `<span class="jhb-badge ${ok ? 'jhb-badge--up' : 'jhb-badge--down'}">${label}</span>`;
  }

  function card(label, value, desc, smallValue = false) {
    return `
      <div class="jhb-card">
        <div>
          <div class="jhb-card-label">${label}</div>
          <div class="jhb-card-value ${smallValue ? 'jhb-card-value--sm' : ''}">${value}</div>
        </div>
        <div class="jhb-card-desc">${desc}</div>
      </div>
    `;
  }

  async function fetchTelemetry() {
    const statusEl = document.getElementById('jhb-telemetry-status');
    const hostGrid = document.getElementById('jhb-host-grid');
    const probesBody = document.getElementById('jhb-probes-body');
    const containersBody = document.getElementById('jhb-containers-body');

    if (!statusEl || !hostGrid || !probesBody || !containersBody) return;

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(API_URL, { signal: controller.signal });
      clearTimeout(timer);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const hrs = Math.floor(data.host.uptimeSec / 3600);
      const mins = Math.floor((data.host.uptimeSec % 3600) / 60);

      statusEl.innerHTML = `${badge(true, 'LIVE')} &nbsp;Updated ${new Date(data.timestamp).toLocaleTimeString()} (5s poll)`;

      const gpuCardHtml = data.gpu?.available
        ? card(
            `GPU Telemetry (${data.gpu.name})`,
            `${data.gpu.utilizationPercent}% • ${data.gpu.tempC} °C`,
            `VRAM: ${data.gpu.memoryUsedMb} / ${data.gpu.memoryTotalMb} MB • CUDA compute`
          )
        : card(
            'GPU Telemetry',
            'N/A',
            'NVIDIA GeForce GTX 1060 3GB • Dedicated CUDA compute'
          );

      hostGrid.innerHTML = [
        card(
          'CPU Load (1m / 5m / 15m)',
          data.host.loadAvg.join(' / '),
          `Runnable processes across ${data.host.cpuCores} physical cores`
        ),
        card(
          'Memory Usage',
          `${data.host.memory.percent}% (${data.host.memory.usedGb}/${data.host.memory.totalGb} GB)`,
          'Physical DDR4 RAM allocated to OS and containers'
        ),
        card(
          'Host Uptime',
          `${hrs}h ${mins}m`,
          'Continuous availability since last kernel boot'
        ),
        card(
          'CPU Temp',
          data.host.tempC ? `${data.host.tempC} °C` : 'N/A',
          'Package thermal sensor from Linux sysfs'
        ),
        card(
          'Server Hardware',
          'i5-7400 • 16 GB RAM',
          '4 Cores @ 3.50 GHz • GTX 1060 3GB • 1 TB Storage',
          true
        ),
        gpuCardHtml
      ].join('');

      probesBody.innerHTML = data.probes.map((p) => `
        <tr>
          <td><strong>${p.name}</strong></td>
          <td>${p.publicPath ? `<a href="https://jhbserver.tail4bcb71.ts.net${p.publicPath}" target="_blank" rel="noreferrer">${p.publicPath} ↗</a>` : '<span class="jhb-muted">Internal</span>'}</td>
          <td>${badge(p.up, p.up ? 'ONLINE' : 'DOWN')}</td>
          <td>${p.statusCode || '-'}</td>
          <td>${p.latencyMs !== null ? `${p.latencyMs} ms` : '-'}</td>
        </tr>
      `).join('');

      containersBody.innerHTML = data.containers.map((c) => `
        <tr>
          <td><strong>${c.name}</strong></td>
          <td class="jhb-mono">${c.image}</td>
          <td>${badge(c.state === 'running', c.state.toUpperCase())}</td>
          <td>${c.status}</td>
        </tr>
      `).join('');
    } catch {
      statusEl.innerHTML = `${badge(false, 'OFFLINE')} &nbsp;Server unreachable or maintenance in progress`;
      if (!hostGrid.innerHTML) {
        hostGrid.innerHTML = card('Telemetry Status', 'Unavailable', 'Could not reach jhbserver API');
        probesBody.innerHTML = '<tr><td colspan="5" class="jhb-muted">Endpoint probes unavailable while host is offline.</td></tr>';
        containersBody.innerHTML = '<tr><td colspan="4" class="jhb-muted">Container metrics unavailable while host is offline.</td></tr>';
      }
    }
  }

  function initTelemetry() {
    if (pollTimer) clearInterval(pollTimer);
    if (!document.getElementById('jhb-telemetry-root')) return;
    fetchTelemetry();
    pollTimer = setInterval(fetchTelemetry, 5000);
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(initTelemetry);
  } else {
    document.addEventListener('DOMContentLoaded', initTelemetry);
  }
})();