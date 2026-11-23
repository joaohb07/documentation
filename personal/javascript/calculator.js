(() => {
    const OPERATORS = {
        "+": { precedence: 1, fn: (a, b) => a + b },
        "-": { precedence: 1, fn: (a, b) => a - b },
        "*": { precedence: 2, fn: (a, b) => a * b },
        "/": {
            precedence: 2,
            fn: (a, b) => {
                if (b === 0) throw new Error("Division by zero");
                return a / b;
            },
        },
    };

    /**
     * Evaluates a mathematical expression safely without using eval(),
     * applying the Shunting-Yard algorithm for operator precedence and parentheses.
     */
    function evaluateExpression(expr) {
        const sanitized = expr.replace(/\s+/g, "");
        if (!sanitized) return "0";
        if (!/^[0-9+\-*/().]+$/.test(sanitized)) {
            throw new Error("Invalid characters");
        }

        // Tokenize numbers (including unary +/-) and operators
        const tokens = [];
        let i = 0;
        while (i < sanitized.length) {
            const ch = sanitized[i];
            const prev = tokens[tokens.length - 1];
            const isUnary =
                (ch === "-" || ch === "+") &&
                (tokens.length === 0 || prev === "(" || prev in OPERATORS);

            if (/[0-9.]/.test(ch) || isUnary) {
                let numStr = ch;
                i++;
                while (i < sanitized.length && /[0-9.]/.test(sanitized[i])) {
                    numStr += sanitized[i++];
                }
                if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(numStr)) {
                    throw new Error("Malformed number");
                }
                tokens.push(parseFloat(numStr));
            } else if (ch in OPERATORS || ch === "(" || ch === ")") {
                tokens.push(ch);
                i++;
            } else {
                throw new Error("Unexpected token");
            }
        }

        // Convert infix tokens to Reverse Polish Notation (RPN)
        const outputQueue = [];
        const opStack = [];

        for (const token of tokens) {
            if (typeof token === "number") {
                outputQueue.push(token);
            } else if (token in OPERATORS) {
                while (
                    opStack.length &&
                    opStack[opStack.length - 1] in OPERATORS &&
                    OPERATORS[opStack[opStack.length - 1]].precedence >=
                        OPERATORS[token].precedence
                ) {
                    outputQueue.push(opStack.pop());
                }
                opStack.push(token);
            } else if (token === "(") {
                opStack.push(token);
            } else if (token === ")") {
                while (opStack.length && opStack[opStack.length - 1] !== "(") {
                    outputQueue.push(opStack.pop());
                }
                if (opStack.pop() !== "(") {
                    throw new Error("Mismatched parentheses");
                }
            }
        }

        while (opStack.length) {
            const op = opStack.pop();
            if (op === "(" || op === ")") {
                throw new Error("Mismatched parentheses");
            }
            outputQueue.push(op);
        }

        // Evaluate RPN stack
        const evalStack = [];
        for (const token of outputQueue) {
            if (typeof token === "number") {
                evalStack.push(token);
            } else {
                if (evalStack.length < 2) throw new Error("Invalid syntax");
                const b = evalStack.pop();
                const a = evalStack.pop();
                evalStack.push(OPERATORS[token].fn(a, b));
            }
        }

        if (evalStack.length !== 1 || !Number.isFinite(evalStack[0])) {
            throw new Error("Invalid expression");
        }

        // Round floating-point precision artifacts (e.g., 0.1 + 0.2)
        return String(Number(evalStack[0].toPrecision(12)));
    }

    function initCalculator() {
        const calc = document.querySelector(".calculator");
        if (!calc || calc.dataset.initialized === "true") return;
        calc.dataset.initialized = "true";

        const output = calc.querySelector(".output");
        const result = calc.querySelector(".result");
        const keys = calc.querySelectorAll(".calc-btn");

        let expression = "";
        let lastEvaluated = false;

        function triggerPop() {
            result.classList.remove("pop");
            void result.offsetWidth; // force reflow
            result.classList.add("pop");
        }

        function handleInput(value) {
            result.classList.remove("is-error");

            if (value === "AC") {
                expression = "";
                lastEvaluated = false;
                output.textContent = "";
                result.textContent = "0";
                return;
            }

            if (value === "DEL") {
                if (lastEvaluated) {
                    expression = "";
                    lastEvaluated = false;
                    output.textContent = "";
                    result.textContent = "0";
                    return;
                }
                expression = expression.slice(0, -1);
                output.textContent = expression;
                return;
            }

            if (value === "=") {
                if (!expression) return;
                try {
                    const computed = evaluateExpression(expression);
                    output.textContent = `${expression} =`;
                    result.textContent = computed;
                    expression = computed;
                    lastEvaluated = true;
                    triggerPop();
                } catch (err) {
                    output.textContent = expression;
                    result.textContent = err.message === "Division by zero" ? "Cannot divide by 0" : "Syntax Error";
                    result.classList.add("is-error");
                    expression = "";
                    lastEvaluated = false;
                }
                return;
            }

            // Continue calculation from previous result if an operator is pressed
            if (lastEvaluated) {
                if (value in OPERATORS) {
                    expression = result.textContent + value;
                } else {
                    expression = value;
                }
                lastEvaluated = false;
            } else {
                expression += value;
            }

            output.textContent = expression;
        }

        keys.forEach((key) => {
            key.addEventListener("click", () => handleInput(key.dataset.value || key.innerText.trim()));
        });

        calc.addEventListener("keydown", (e) => {
            const keyMap = {
                Enter: "=",
                "=": "=",
                Backspace: "DEL",
                Escape: "AC",
                Delete: "AC",
            };

            if (e.key in keyMap) {
                e.preventDefault();
                handleInput(keyMap[e.key]);
            } else if (/^[0-9+\-*/().]$/.test(e.key)) {
                e.preventDefault();
                handleInput(e.key);
            }
        });
    }

    if (typeof document$ !== "undefined") {
        document$.subscribe(initCalculator);
    } else {
        document.addEventListener("DOMContentLoaded", initCalculator);
    }
    initCalculator();
})();