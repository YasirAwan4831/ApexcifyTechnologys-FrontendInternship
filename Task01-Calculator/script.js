let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

const resultDisplay = document.getElementById('result');
const calculationDisplay = document.getElementById('calculation');
const buttons = document.querySelectorAll('.btn');

function updateDisplay() {
    resultDisplay.textContent = currentInput;
    calculationDisplay.textContent = previousInput && operation ? `${previousInput} ${operation} ${currentInput}` : '';
}

function clearCalculator() { currentInput='0'; previousInput=''; operation=null; resetScreen=false; updateDisplay(); }
function deleteLast() { currentInput = currentInput.length <= 1 || (currentInput.length===2&&currentInput.startsWith('-')) ? '0' : currentInput.slice(0,-1); updateDisplay(); }
function calculatePercentage(){ currentInput = (parseFloat(currentInput)/100).toString(); updateDisplay(); }
function appendNumber(number) { currentInput=(currentInput==='0'||resetScreen)?number:currentInput+number; resetScreen=false; updateDisplay(); }
function appendDecimal() { if(resetScreen){currentInput='0.'; resetScreen=false;} else if(!currentInput.includes('.')) currentInput+='.'; updateDisplay(); }
function chooseOperation(op){ if(op==='-'&&(currentInput==='0'||resetScreen)){currentInput='-'; resetScreen=false; updateDisplay(); return;} if(previousInput && operation && !resetScreen) calculate(); operation=op; previousInput=currentInput; resetScreen=true; updateDisplay(); }
function calculate(){ if(!previousInput||!operation) return; let prev=parseFloat(previousInput), curr=parseFloat(currentInput); if(isNaN(prev)||isNaN(curr)) return; let result; switch(operation){ case '+': result=prev+curr; break; case '-': result=prev-curr; break; case '×': result=prev*curr; break; case '÷': if(curr===0){alert("Cannot divide by zero!"); clearCalculator(); return;} result=prev/curr; break; default: return;} result=parseFloat(result.toFixed(10)); currentInput=result.toString(); previousInput=''; operation=null; resetScreen=true; updateDisplay(); }

buttons.forEach(button=>button.addEventListener('click',()=>{ animateButton(button); if(button.hasAttribute('data-number')) appendNumber(button.getAttribute('data-number')); else if(button.hasAttribute('data-decimal')) appendDecimal(); else if(button.hasAttribute('data-operation')) chooseOperation(button.getAttribute('data-operation')); else if(button.hasAttribute('data-action')){ switch(button.getAttribute('data-action')){ case 'clear': clearCalculator(); break; case 'delete': deleteLast(); break; case 'calculate': calculate(); break; case 'percentage': calculatePercentage(); break; } } }));

function animateButton(button){ button.style.transform='translateY(0)'; button.style.boxShadow='0 2px 4px rgba(255,255,255,0.1)'; setTimeout(()=>{button.style.transform=''; button.style.boxShadow='';},150); }

document.addEventListener('keydown',(event)=>{ const key=event.key; if(/[0-9]/.test(key)) appendNumber(key); if(key==='.') appendDecimal(); if(key==='%') calculatePercentage(); if(key==='+') chooseOperation('+'); if(key==='-') chooseOperation('-'); if(key==='*') chooseOperation('×'); if(key==='/') chooseOperation('÷'); if(key==='Enter'||key==='=') calculate(); if(key==='Escape') clearCalculator(); if(key==='Backspace') deleteLast(); highlightButtonByKey(key); });

function highlightButtonByKey(key){ let selector=''; const map={'.':'.btn[data-decimal="."]','%':'.btn[data-action="percentage"]','+':'.btn[data-operation="+"]','-':'.btn[data-operation="-"]','*':'.btn[data-operation="×"]','/':'.btn[data-operation="÷"]','Enter':'.btn[data-action="calculate"]','=':'.btn[data-action="calculate"]','Escape':'.btn[data-action="clear"]','Backspace':'.btn[data-action="delete"]'}; if(/[0-9]/.test(key)) selector=`.btn[data-number="${key}"]`; else selector=map[key]; if(selector){ const button=document.querySelector(selector); if(button) animateButton(button); } }

clearCalculator();
