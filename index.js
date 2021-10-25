let count = []
let saveAction

let display = "";
let lastNumber = 0;
const MAX_VISOR_CHAR = 10

function AddNumber(num) {
    document.getElementById("total").removeAttribute("hidden")
    if (document.getElementById("total").innerHTML.length < MAX_VISOR_CHAR) {
        document.getElementById("total").innerHTML += num
    }
    
}

function CalcAction(action) {

    var currentNumber = document.getElementById("total").innerHTML

    if (currentNumber.length === 0) { return }

    count.push(Number(document.getElementById("total").innerHTML))
    display += document.getElementById("total").innerHTML
    document.getElementById("accumulator").removeAttribute("hidden")
    document.getElementById("accumulator").innerHTML += ` ${document.getElementById("total").innerHTML} <span style='color:#F39C36'>${action} </span>`
    document.getElementById("total").innerHTML = ""

    count.push(action)
    display += "<span style='color:#F39C36'>" + action + "</span>"
}

function AddComma() {
    var currentNumber = document.getElementById("total").innerHTML

    if (!currentNumber.includes(".")) {
        document.getElementById("total").innerHTML += "."
    }

}

function Result() {
    currentAccum = document.getElementById("accumulator").innerHTML
    currentNumber = document.getElementById("total").innerHTML

    if (currentAccum[currentAccum.length - 1] === "=" && currentNumber.length > 0) {
        document.getElementById("total").innerHTML = ProcessAction(Number(currentNumber), Number(currentNumber), saveAction).toString().substring(0, MAX_VISOR_CHAR)
    }

    if (count.length === 0) { return }

    count.push(Number(document.getElementById("total").innerHTML))
    display += (Number(document.getElementById("total").innerHTML))
    document.getElementById("accumulator").innerHTML += `${document.getElementById("total").innerHTML} =`
    ProccessResult()
}

function history() {
    document.getElementById("history").innerHTML += `<p style="text-align:right;">${display}</p>`
    display = " ";
}


function ProccessResult() {
    let action = null
    let current = null

    let total = 0;

    if (isNaN(count[count.length - 1])) {
        count.pop()
    }

    count.forEach(n => {
        if (!isNaN(n)) {
            if (current == null) {
                current = n
            } else {
                total += ProcessAction(current, n, action)
                current = null
            }
        } else {
            action = n
            saveAction = n
        }
    })

    if (current != null) {
        total = ProcessAction(total, current, action)
    }

    display+= "<span style='color:#F39C36'>=</span>" + total;
    lastNumber = total;
    document.getElementById("total").innerHTML = total.toString().substring(0, MAX_VISOR_CHAR)
    count = []
    history();
}

function ProcessAction(num1, num2, action) {
    switch (action) {
        case '+': return num1 + num2
        case '-': return num1 - num2
        case 'x': return num1 * num2
        case '/': return num1 / num2
    }
}


function CleanCurrentEntry() {
    document.getElementById("total").innerHTML = ""
}

function CleanAll() {
    document.getElementById("total").innerHTML = ""
    document.getElementById("accumulator").innerHTML = ""
    count = []
}
