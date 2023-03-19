//selector
const output = document.querySelector(".output");
const result = document.querySelector(".result");
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