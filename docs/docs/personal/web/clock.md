# Clock

> Dual analog and digital real-time clock built with vanilla JavaScript and CSS transforms, synchronized with the browser's `Date` and `Intl` timezone APIs.

## Live Execution

<div class="clock-wrapper">
    <div class="clock" role="img" aria-label="Analog clock showing current local time">
        <div class="clock-face">
            <div class="clock-markers">
                <span class="clock-marker clock-marker--major" style="--i: 0"></span>
                <span class="clock-marker" style="--i: 1"></span>
                <span class="clock-marker" style="--i: 2"></span>
                <span class="clock-marker clock-marker--major" style="--i: 3"></span>
                <span class="clock-marker" style="--i: 4"></span>
                <span class="clock-marker" style="--i: 5"></span>
                <span class="clock-marker clock-marker--major" style="--i: 6"></span>
                <span class="clock-marker" style="--i: 7"></span>
                <span class="clock-marker" style="--i: 8"></span>
                <span class="clock-marker clock-marker--major" style="--i: 9"></span>
                <span class="clock-marker" style="--i: 10"></span>
                <span class="clock-marker" style="--i: 11"></span>
            </div>
            <div class="hand hour-hand"></div>
            <div class="hand min-hand"></div>
            <div class="hand second-hand"></div>
            <div class="clock-center-dot"></div>
        </div>
    </div>

    <div class="digital-clock" aria-live="off">
        <div class="digital-time">
            <span id="digital-clock-hour">00</span>
            <span class="digital-sep">:</span>
            <span id="digital-clock-min">00</span>
            <span class="digital-sep">:</span>
            <span class="digital-sec" id="digital-clock-sec">00</span>
        </div>
        <div class="digital-meta" id="digital-clock-date">Loading timezone...</div>
    </div>
</div>

<script src="../../javascript/clock.js"></script>