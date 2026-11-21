# Calculator

> Interactive arithmetic calculator built with vanilla JavaScript and CSS Grid, featuring a safe Shunting-Yard expression parser (zero `eval()`), operator precedence, parentheses support, and keyboard navigation.

## Live Execution

<div class="calc-wrapper">
    <div class="calculator" tabindex="0" aria-label="Interactive Calculator">
        <div class="display">
            <div class="output"></div>
            <div class="result">0</div>
        </div>
        <div class="input">
            <button type="button" class="calc-btn calc-btn--danger" data-value="AC">AC</button>
            <button type="button" class="calc-btn calc-btn--op" data-value="(">(</button>
            <button type="button" class="calc-btn calc-btn--op" data-value=")">)</button>
            <button type="button" class="calc-btn calc-btn--op" data-value="+">+</button>

            <button type="button" class="calc-btn" data-value="7">7</button>
            <button type="button" class="calc-btn" data-value="8">8</button>
            <button type="button" class="calc-btn" data-value="9">9</button>
            <button type="button" class="calc-btn calc-btn--op" data-value="-">-</button>

            <button type="button" class="calc-btn" data-value="4">4</button>
            <button type="button" class="calc-btn" data-value="5">5</button>
            <button type="button" class="calc-btn" data-value="6">6</button>
            <button type="button" class="calc-btn calc-btn--op" data-value="*">×</button>

            <button type="button" class="calc-btn" data-value="1">1</button>
            <button type="button" class="calc-btn" data-value="2">2</button>
            <button type="button" class="calc-btn" data-value="3">3</button>
            <button type="button" class="calc-btn calc-btn--op" data-value="/">÷</button>

            <button type="button" class="calc-btn calc-btn--danger" data-value="DEL">DEL</button>
            <button type="button" class="calc-btn" data-value="0">0</button>
            <button type="button" class="calc-btn" data-value=".">.</button>
            <button type="button" class="calc-btn calc-btn--equal" data-value="=">=</button>
        </div>
    </div>
</div>

<script src="../../javascript/calculator.js"></script>

* **Continuous Calculations & Keyboard Support:** Click the calculator to type directly via keyboard (`0-9`, `+`, `-`, `*`, `/`, `(`, `)`, `Enter`, `Backspace`, `Esc`), or chain operations directly onto the previous result.