# Simple calculator

> A simple calculator script, which receive 2 numbers and a sign as variables for the calculate operation execution.

## Code

> A simple script in which receives 2 numbers and a signal to execute a calculate operation.

```javascript title="Simple Calculator javascript"
var n1;
var n2;
var n3;
var signal;
function execute(){
    n1 = prompt("Type one number:");//reads and stores a number in n1;
    n2 = prompt("Type another number:");//reads and stores a number in n2;
    signal = prompt("Choose a signal: +,-,*,/");//reads the signal;
    if (!isNaN(n1) && !isNaN(n2)){
        switch (signal){
            case "+":
                n3 = parseInt(n1)+parseInt(n2);
                alert("Result:" + n3);
                break;
            case "-":
                n3 = parseInt(n1)-parseInt(n2);
                alert("Result:" + n3);
                break;
            case "*":
                n3 = parseInt(n1)*parseInt(n2);
                alert("Result:" + n3);
                break;
            case "/":
                n3 = parseInt(n1)/parseInt(n2);
                alert("Result:" + n3);
                break;
            default:
                alert("invalid signal:" + signal);
                break;
        }
    }else{
        alert("Invalid n1 or n2!\n n1="+n1+"\n n2="+n2);
    }
}
```

<script>
var n1;
var n2;
var n3;
var signal;
function execute(){
    n1 = prompt("Type one number:");//reads and stores a number in n1;
    n2 = prompt("Type another number:");//reads and stores a number in n2;
    signal = prompt("Choose a signal: +,-,*,/");//reads the signal;
    if (!isNaN(n1) && !isNaN(n2)){
        switch (signal){
            case "+":
                n3 = parseInt(n1)+parseInt(n2);
                alert("Result:" + n3);
                break;
            case "-":
                n3 = parseInt(n1)-parseInt(n2);
                alert("Result:" + n3);
                break;
            case "*":
                n3 = parseInt(n1)*parseInt(n2);
                alert("Result:" + n3);
                break;
            case "/":
                n3 = parseInt(n1)/parseInt(n2);
                alert("Result:" + n3);
                break;
            default:
                alert("invalid signal:" + signal);
                break;
        }
    }else{
        alert("Invalid n1 or n2!\n n1="+n1+"\n n2="+n2);
    }
}
</script>

## Live Execution

>Hit the button and try it yourself.

<button class="md-button md-button--primary" onclick="execute();">Try Yourself</button>