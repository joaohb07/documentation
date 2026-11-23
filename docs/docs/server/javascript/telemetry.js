(function () {
  const API_URL = 'https://jhbserver.tail4bcb71.ts.net/api/status';
  let pollTimer = null;

  function badge(ok, label) {
    return `<span class="jhb-badge ${ok ? 'jhb-badge--up' : 'jhb-badge--down'}">${label}</span>`;
  }

  function renderSparkline(values, { min = 0, max = 100, stroke = '#60a5fa', fillId = 'jhb-spark' } = {}) {
    if (!Array.isArray(values) || values.length < 2) {
      return `<div class="jhb-card-desc">Collecting 5-min history (${values?.length || 1}/60 samples)...</div>`;
    }

    const width = 220;
    const height = 28;
    const effectiveMax = Math.max(max, ...values, 0.1);
    const range = Math.max(0.01, effectiveMax - min);

    const coords = values.map((val, idx) => {
      const x = (idx / (values.length - 1)) * width;
      const clamped = Math.min(effectiveMax, Math.max(min, val));
      const y = height - ((clamped - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const linePoints = coords.join(' ');
    const areaPoints = `0,${height} ${linePoints} ${width},${height}`;

    return `
      <div class="jhb-spark-wrap" title="Last ${values.length * 5}s (${values.length} samples)">
        <svg class="jhb-spark-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          <defs>
            <linearGradient id="${fillId}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${stroke}" stop-opacity="0.28" />
              <stop offset="100%" stop-color="${stroke}" stop-opacity="0.0" />
            </linearGradient>
          </defs>
          <polygon points="${areaPoints}" fill="url(#${fillId})" />
          <polyline
            fill="none"
            stroke="${stroke}"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            points="${linePoints}"
          />
        </svg>
      </div>
    `;
  }

  function renderDeployBadge(deploy) {
    if (!deploy) return '<span class="jhb-muted">—</span>';

    const isSuccess = deploy.conclusion === 'success';
    const isFailure = deploy.conclusion === 'failure' || deploy.conclusion === 'cancelled';
    const badgeClass = isSuccess ? 'jhb-badge--up' : isFailure ? 'jhb-badge--down' : 'jhb-badge--warn';
    const label = isSuccess ? 'Passing' : isFailure ? 'Failed' : 'Running';

    return `
      <a href="${deploy.htmlUrl}" target="_blank" rel="noreferrer" class="jhb-deploy-link" title="GitHub Actions deploy.yml">
        <span class="jhb-badge ${badgeClass}">${label}</span>
        ${deploy.sha ? `<code class="jhb-commit">${deploy.sha}</code>` : ''}
      </a>
    `;
  }

  function card(label, value, desc, extraHtml = '', smallValue = false) {
    return `
      <div class="jhb-card">
        <div>
          <div class="jhb-card-label">${label}</div>
          <div class="jhb-card-value ${smallValue ? 'jhb-card-value--sm' : ''}">${value}</div>
          ${extraHtml}
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

      const history = Array.isArray(data.history) ? data.history : [];
      const cpuSeries = history.map((h) => h.cpuLoad1m);
      const memSeries = history.map((h) => h.memoryPercent);

      const storage = data.host.storage;
      const storageBarClass =
        storage?.percent >= 85 ? 'jhb-bar-fill--crit' : storage?.percent >= 70 ? 'jhb-bar-fill--warn' : '';
      const storageCardHtml = storage?.available
        ? card(
            'Root Storage (/)',
            `${storage.percent}% (${storage.usedGb} / ${storage.totalGb} GB)`,
            `${storage.freeGb} GB available • Docker & MongoDB volumes`,
            `<div class="jhb-bar"><div class="jhb-bar-fill ${storageBarClass}" style="width: ${Math.min(100, storage.percent)}%"></div></div>`
          )
        : '';

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
          `5-min load trend across ${data.host.cpuCores} physical cores`,
          renderSparkline(cpuSeries, { min: 0, max: data.host.cpuCores, stroke: '#60a5fa', fillId: 'jhb-cpu-spark' })
        ),
        card(
          'Memory Usage',
          `${data.host.memory.percent}% (${data.host.memory.usedGb}/${data.host.memory.totalGb} GB)`,
          '5-min physical DDR4 RAM trend (OS & containers)',
          renderSparkline(memSeries, { min: 0, max: 100, stroke: '#10b981', fillId: 'jhb-mem-spark' })
        ),
        storageCardHtml,
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
        gpuCardHtml
      ].join('');

      probesBody.innerHTML = data.probes.map((p) => `
        <tr>
          <td><strong>${p.name}</strong></td>
          <td>${p.publicPath ? `<a href="https://jhbserver.tail4bcb71.ts.net${p.publicPath}" target="_blank" rel="noreferrer">${p.publicPath} ↗</a>` : '<span class="jhb-muted">Internal</span>'}</td>
          <td>${badge(p.up, p.up ? 'ONLINE' : 'DOWN')}</td>
          <td>${renderDeployBadge(p.deploy)}</td>
          <td>${p.statusCode || '-'}</td>
          <td>${p.latencyMs !== null ? `${p.latencyMs} ms` : '-'}</td>
        </tr>
      `).join('');

      containersBody.innerHTML = data.containers.map((c) => `
        <tr>
          <td>
            <strong>${c.name}</strong>
            ${c.deploy ? `<div class="jhb-container-deploy">${renderDeployBadge(c.deploy)}</div>` : ''}
          </td>
          <td class="jhb-mono">${c.image}</td>
          <td>${badge(c.state === 'running', c.state.toUpperCase())}</td>
          <td class="jhb-mono">${c.cpuPercent !== null && c.cpuPercent !== undefined ? `${c.cpuPercent.toFixed(2)}%` : '-'}</td>
          <td class="jhb-mono">${c.memoryMb !== null && c.memoryMb !== undefined ? `${c.memoryMb} MB` : '-'}</td>
          <td>${c.status}</td>
        </tr>
      `).join('');
    } catch {
      statusEl.innerHTML = `${badge(false, 'OFFLINE')} &nbsp;Server unreachable or maintenance in progress`;
      if (!hostGrid.innerHTML) {
        hostGrid.innerHTML = card('Telemetry Status', 'Unavailable', 'Could not reach jhbserver API');
        probesBody.innerHTML = '<tr><td colspan="6" class="jhb-muted">Endpoint probes unavailable while host is offline.</td></tr>';
        containersBody.innerHTML = '<tr><td colspan="6" class="jhb-muted">Container metrics unavailable while host is offline.</td></tr>';
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