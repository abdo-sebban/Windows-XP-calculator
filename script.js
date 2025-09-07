const win = document.querySelector('.window');
const bar = document.querySelector('.title-bar');
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let drag = false, x = 0, y = 0;
let currentInput = "";
let memory = 0;
bar.onmousedown = e => {
  drag = true;
  x = e.clientX - win.offsetLeft;
  y = e.clientY - win.offsetTop;
};
document.onmousemove = e => {
  if (drag) {
    win.style.left = (e.clientX - x) + 'px';
    win.style.top  = (e.clientY - y) + 'px';
  }
};
document.onmouseup = () => drag = false;
function updateDisplay(val) {
  display.textContent = val || "0";
}
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    if (!value) return;
    switch(value) {
      case "C":
      case "CE":
        currentInput = "";
        updateDisplay("");
        break;
      case "Backspace":
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
        break;
      case "=":
        try {
          currentInput = eval(currentInput).toString();
          updateDisplay(currentInput);
        } catch {
          updateDisplay("Error");
          currentInput = "";
        }
        break;
      case "sqrt":
        currentInput = Math.sqrt(eval(currentInput || "0")).toString();
        updateDisplay(currentInput);
        break;
      case "1/x":
        currentInput = (1 / eval(currentInput || "1")).toString();
        updateDisplay(currentInput);
        break;
      case "+/-":
        if (currentInput.startsWith("-")) {
          currentInput = currentInput.slice(1);
        } else {
          currentInput = "-" + currentInput;
        }
        updateDisplay(currentInput);
        break;
      case "M+":
        memory += Number(eval(currentInput || "0"));
        break;
      case "MS":
        memory = Number(eval(currentInput || "0"));
        break;
      case "MR":
        currentInput = memory.toString();
        updateDisplay(currentInput);
        break;
      case "MC":
        memory = 0;
        break;
      default:
        currentInput += value;
        updateDisplay(currentInput);
    }
  });
});