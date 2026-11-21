(() => {
    function padZero(value) {
        return String(value).padStart(2, "0");
    }

    function initClock() {
        const clockEl = document.querySelector(".clock-wrapper");
        if (!clockEl || clockEl.dataset.initialized === "true") return;
        clockEl.dataset.initialized = "true";

        const secondHand = clockEl.querySelector(".second-hand");
        const minsHand = clockEl.querySelector(".min-hand");
        const hourHand = clockEl.querySelector(".hour-hand");

        const hourDisplay = clockEl.querySelector("#digital-clock-hour");
        const minDisplay = clockEl.querySelector("#digital-clock-min");
        const secDisplay = clockEl.querySelector("#digital-clock-sec");
        const dateDisplay = clockEl.querySelector("#digital-clock-date");

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";

        function updateClock() {
            if (!clockEl.isConnected) {
                clearInterval(timerId);
                return;
            }

            const now = new Date();
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours();

            // Prevent backward 360deg snap when seconds wrap from 59 -> 0
            if (seconds === 0) {
                secondHand.classList.add("no-transition");
            } else {
                secondHand.classList.remove("no-transition");
            }

            const secondsDegrees = (seconds / 60) * 360;
            const minsDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
            const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

            secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
            minsHand.style.transform = `rotate(${minsDegrees}deg)`;
            hourHand.style.transform = `rotate(${hourDegrees}deg)`;

            hourDisplay.textContent = padZero(hours);
            minDisplay.textContent = padZero(minutes);
            secDisplay.textContent = padZero(seconds);

            const formattedDate = now.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
            });
            dateDisplay.textContent = `${formattedDate} • ${timeZone}`;
        }

        const timerId = setInterval(updateClock, 1000);
        updateClock();
    }

    if (typeof document$ !== "undefined") {
        document$.subscribe(initClock);
    } else {
        document.addEventListener("DOMContentLoaded", initClock);
    }
    initClock();
})();(() => {
    function padZero(value) {
        return String(value).padStart(2, "0");
    }

    function initClock() {
        const clockEl = document.querySelector(".clock-wrapper");
        if (!clockEl || clockEl.dataset.initialized === "true") return;
        clockEl.dataset.initialized = "true";

        const secondHand = clockEl.querySelector(".second-hand");
        const minsHand = clockEl.querySelector(".min-hand");
        const hourHand = clockEl.querySelector(".hour-hand");

        const hourDisplay = clockEl.querySelector("#digital-clock-hour");
        const minDisplay = clockEl.querySelector("#digital-clock-min");
        const secDisplay = clockEl.querySelector("#digital-clock-sec");
        const dateDisplay = clockEl.querySelector("#digital-clock-date");

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";

        function updateClock() {
            if (!clockEl.isConnected) {
                clearInterval(timerId);
                return;
            }

            const now = new Date();
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours();

            // Prevent backward 360deg snap when seconds wrap from 59 -> 0
            if (seconds === 0) {
                secondHand.classList.add("no-transition");
            } else {
                secondHand.classList.remove("no-transition");
            }

            const secondsDegrees = (seconds / 60) * 360;
            const minsDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
            const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

            secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
            minsHand.style.transform = `rotate(${minsDegrees}deg)`;
            hourHand.style.transform = `rotate(${hourDegrees}deg)`;

            hourDisplay.textContent = padZero(hours);
            minDisplay.textContent = padZero(minutes);
            secDisplay.textContent = padZero(seconds);

            const formattedDate = now.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
            });
            dateDisplay.textContent = `${formattedDate} • ${timeZone}`;
        }

        const timerId = setInterval(updateClock, 1000);
        updateClock();
    }

    if (typeof document$ !== "undefined") {
        document$.subscribe(initClock);
    } else {
        document.addEventListener("DOMContentLoaded", initClock);
    }
    initClock();
})();