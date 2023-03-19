# Calculator

> A calculator built using javascript and css.

## Live Execution

<link rel="stylesheet" href="calculator.css">

<center>
    <div class="calculator">
        <div class="display">
            <div class="output"></div>
            <div class="result">0</div>
        </div>
        <div class="input">
            <button class="calc-btn">AC</button>
            <button class="calc-btn">(</button>
            <button class="calc-btn">)</button>
            <button class="calc-btn">+</button>
            <button class="calc-btn">7</button>
            <button class="calc-btn">8</button>
            <button class="calc-btn">9</button>
            <button class="calc-btn">-</button>
            <button class="calc-btn">4</button>
            <button class="calc-btn">5</button>
            <button class="calc-btn">6</button>
            <button class="calc-btn">*</button>
            <button class="calc-btn">1</button>
            <button class="calc-btn">2</button>
            <button class="calc-btn">3</button>
            <button class="calc-btn">/</button>
            <button class="calc-btn">DEL</button>
            <button class="calc-btn">0</button>
            <button class="calc-btn">.</button>
            <button class="calc-btn">=</button>
        </div>
    </div>
</center>
<script src="calculator.js"></script>

## Code

> How I built the calculator with javascript

```javascript title="Calculator javascript"
const keys = document.querySelectorAll("button");

//eventlistener
keys.forEach(key=>{
    key.addEventListener("click",calculate);
});

function calculate(){
    let buttonText = this.innerText;
    if(buttonText==="AC"){
        output.innerText = "";
        result.innerText = "0";
        result.style.animation = "";
        output.style.animation = "";
        return;
    }else if(buttonText === "DEL"){
        output.textContent = output.textContent.substr(0,output.textContent.length-1);
        return;
    }else if(buttonText === "="){
        result.innerText = eval(output.innerText);
        result.style.animation = "big 0.5s ease-in-out";
        output.style.animation = "small 0.5s ease-in-out";
        result.style.animationFillMode = "forwards";
        output.style.animationFillMode = "forwards";
        output.innerText = "";
    }else{
        output.textContent += buttonText;
        return;
    } 
}
```
