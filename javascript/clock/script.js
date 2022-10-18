const secondHand = document.querySelector('.sec-pointer');
const minsHand = document.querySelector('.min-pointer');
const hourHand = document.querySelector('.hour-pointer');

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
    const secondsDeg = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDeg}deg)`;

    const mins = now.getMinutes();
    const minsDeg = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand.style.transform = `rotate(${minsDeg}deg)`;

    const hour = now.getHours();
    const hourDeg = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;


    document.getElementById("digital-clock-sec").innerHTML = addZero(seconds);
    document.getElementById("digital-clock-min").innerHTML = addZero(mins);
    document.getElementById("digital-clock-hour").innerHTML = addZero(hour);
}

setInterval(setDate, 1000);

setDate();