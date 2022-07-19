import { Calculator } from "./Calculator.js";

const calc = new Calculator();

const MAX_VISOR_CHAR = 10

const lblCurrentNumber = document.querySelector('#total');
const lblAccumulator = document.querySelector('#accumulator');
const containerHistory = document.querySelector('#history');

const btnNumbers = document.querySelectorAll('.number')
const btnOperations = document.querySelectorAll('.operation')
const btnResult = document.querySelector('.result')

const btnAC = document.querySelector('.ac')
const btnC = document.querySelector('.c')
const btnDel = document.querySelector('.del')

const divEquals = document.querySelector('.igual')

const values = {
    accumulator: 0,
    operation: '',
    currentValue: 0,
    oldAcc: 0,
    input: [],

    clear(){
        this.accumulator= 0;
        this.operation= '';
        this.currentValue= 0;
        this.oldAcc= 0;
        this.input = [];
    },
}

const getCurrentNumber = () => values.input.join(''); 

const getNumberOperation = (number, operation) => {
    return `${number} <span style='color:#F39C36'>${operation}</span>`;
}

const getInnerText = function(element){
    return element.innerText;
}

const isAccumulatorEmpty = function(){
    return lblAccumulator.innerText === ''
}

const isCurrentValueEmpty = function(){
    return lblCurrentNumber.innerText === '';
}

const accumulatorHasOperationSign = function(){
    return lblAccumulator.innerHTML.includes('span')
}

const isParameterEmpty = function(parameter){
    return parameter === '';
}

const compareParameterOperation = function(parameter, operation = undefined){
    return parameter === operation;
}

const addToHistory = function(oldAccumulator, operation, accumulator, currentValue) {
    containerHistory.innerHTML += `<p>${oldAccumulator} <span style='color:#F39C36'>${operation}</span> ${accumulator} <span style='color:#F39C36'>=</span> ${currentValue}</p>`;
}

const addOperationToAccumulator = function(operation) {
    lblAccumulator.insertAdjacentHTML('beforeend', ` <span style='color:#F39C36'>${operation}</span>`)
}

const setInnerText = function(element, value = '') {
    element.innerText = value;
}


const setInputNumber = function(number = ''){
    if(!isParameterEmpty(number)) values.input.push(number);

    if(isAccumulatorEmpty() || !accumulatorHasOperationSign()){
        setInnerText(lblAccumulator, getCurrentNumber())
        return
    }

    setInnerText(lblCurrentNumber, getCurrentNumber())
}

const validationsToRunCalculator = function(operator){
        // if the current number and accumulator field is empty, then end.
        if(isCurrentValueEmpty() && isAccumulatorEmpty()) return false;

        // if the accumulate has an operation sign and the current number field is empty, then end.
        if(accumulatorHasOperationSign() && isCurrentValueEmpty()) return false;
    
        // if the current number field is empty and the operator pressed is '=', then end
        if(isCurrentValueEmpty() && compareParameterOperation(operator, '=')) return false;

        // just ok to run the calculator
        return true;
}

const getCurrentPutOnAccumulator = function(operator){

    // ---------------- VALIDATIONS TO RUN THE CALCULATOR --------------------- //

    if(!validationsToRunCalculator(operator)) return

    // ---------------- -------------------------------- --------------------- //

    // if the operator pressed isn't '=', then clear the current array of inputs
    if(!compareParameterOperation(operator, '=')) values.input = [];

    // if after inputed the accumulator field the current value is empty, then add and set the operation
    if(isCurrentValueEmpty()) {
        values.operation = operator;
        addOperationToAccumulator(operator);
        return
    }

    // if the accumulator field hasn't an operation sign and current field isn't empty, then add number and operation to the accumulator field, like this: '23 +'
    if(!accumulatorHasOperationSign() && !isCurrentValueEmpty()) {
        values.accumulator = getInnerText(lblCurrentNumber);
        setInnerText(lblAccumulator, getNumberOperation(values.currentValue, values.operation));
        setInnerText(lblCurrentNumber);
        return
    }

    // ------------------------ ADD TO HISTORY -----------------------

    values.oldAcc =  Number.parseFloat(getInnerText(lblAccumulator));
    values.accumulator = Number.parseFloat(getInnerText(lblCurrentNumber));

    values.currentValue = calc.setCalculus(values.oldAcc, values.operation, values.accumulator).toString();

    values.currentValue = values.currentValue.length > MAX_VISOR_CHAR ? values.currentValue.substring(0, MAX_VISOR_CHAR) : values.currentValue;
    addToHistory(values.oldAcc, values.operation, values.accumulator, values.currentValue)
    setInnerText(lblCurrentNumber)
    setInnerText(lblAccumulator, values.currentValue);

    // if result btn has pressed, then change the accumulator to the result of operation
    if(compareParameterOperation(operator, '=')){
        values.operation = '';
        values.input = [];
        return
    }

    if(compareParameterOperation()){
        addOperationToAccumulator(operator)
        values.operation = operator;
        return
    }
}

const allClear = function(){
    values.clear();
    setInnerText(lblCurrentNumber);
    setInnerText(lblAccumulator);
    setInnerText(containerHistory);
}

const clear = function (){
    values.clear()
    setInnerText(lblCurrentNumber);
    setInnerText(lblAccumulator);
}

const deleteF = function(){
    values.input.splice(-1);
    setInputNumber();
}

btnNumbers.forEach(element => {
    element.addEventListener('click', ()=>{
        setInputNumber(element.innerText);
    })
});

btnOperations.forEach(element => {
    element.addEventListener('click', function(){
        getCurrentPutOnAccumulator(this.innerText)
    })
})

divEquals.addEventListener('click', function(){
    getCurrentPutOnAccumulator(btnResult.innerText)
})

btnAC.addEventListener('click', allClear)

btnC.addEventListener('click', clear)

btnDel.addEventListener('click', deleteF)