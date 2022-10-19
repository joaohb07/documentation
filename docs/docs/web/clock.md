# Clock

> A clock using javascript.

## Live Execution

<style>
    .clock {
        width: 18rem;
        height: 18rem;
        background-color: #ECF0F1;
        border:15px solid #0C090D;
        border-radius:50%;
        margin:50px auto;
        position: relative;
        padding:2rem;
        box-shadow:
            0 0 0 4px rgba(0,0,0,0.1),
            inset 0 0 0 3px rgb(187,222,240,0.75),
            inset 0 0 10px black,
            0 0 10px rgba(0,0,0,0.2);
    }

    .clock-face {
        position: relative;
        width: 100%;
        height: 100%;
        transform: translateY(-3px);
    }

    .hand {
        width:50%;
        height:6px;
        background-color:#0C090D;
        position: absolute;
        top:50%;
        transform-origin: 100%;
        transform: rotate(90deg);
        transition: all 0.05s;
        transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
    }
    .digital-clock {
        position: relative;
    }
    .center {
        margin-left:auto;
        margin-right:auto;
        background-color: rgb(187,222,240,0.75);
        border:3px solid #0C090D;
        border-radius:20%;
    }
    .number{
        color: #0C090D;
        font-style: oblique;
        font-weight: bold;
    }
</style>

<div class="clock">
    <div class="clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand min-hand"></div>
        <div class="hand second-hand"></div>
    </div>
    <div class="digital-clock">
        <table class="center" id="table">
            <tr>
                <td class="number digital-clock-hour" id="digital-clock-hour"></td>
                <td class="number digital-clock-min" id="digital-clock-min"></td>
                <td class="number digital-clock-sec" id="digital-clock-sec"></td>
            </tr>
        </table>
    </div>
</div>

<script>
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
</script>

## Code

> Declare three const variables - the three clock arms

```javascript title="Clock javascript"

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
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;


    document.getElementById("digital-clock-sec").innerHTML = addZero(seconds);
    document.getElementById("digital-clock-min").innerHTML = addZero(mins);
    document.getElementById("digital-clock-hour").innerHTML = addZero(hour);
}

setInterval(setDate, 1000);

setDate();
```
