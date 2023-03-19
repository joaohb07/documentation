const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
            return i;
        } else {
            return i;
        }
    }

    function setDate() {
        const now = new Date();

        const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

        const mins = now.getMinutes();
        const minsDegrees = ((mins / 60) *360) + ((seconds/60)*6) + 90;
        minsHand.style.transform = `rotate(${minsDegrees}deg)`;

        const hour = now.getHours();
        const hourDegrees = ((hour / 12) *360) + ((mins/60)*30) + 90;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;

        document.getElementById("digital-clock-sec").innerHTML = addZero(seconds);
        document.getElementById("digital-clock-min").innerHTML = addZero(mins);
        document.getElementById("digital-clock-hour").innerHTML = addZero(hour);
    }

    setInterval(setDate, 1000);
    setDate();