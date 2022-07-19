class Calculator {

    constructor(){
        this.operation = '';
    }

    addition(accumulatorNumber, currentNumber){
        return accumulatorNumber + currentNumber;
    }

    subtraction(accumulatorNumber, currentNumber){
        return accumulatorNumber - currentNumber;
    }

    multiplication(accumulatorNumber, currentNumber){
        return accumulatorNumber * currentNumber;
    }

    division(accumulatorNumber, currentNumber){
        return accumulatorNumber / currentNumber;
    }

    setCalculus(acc, operation, cur){
        this.setOperation(operation);
        return this.operation(acc, cur);
    }

    setOperation(operation){
        // using a simbol as a parameter, catch that simbol and set the currentNumber operation
        switch (operation) {
            case '+':
                this.operation = this.addition
                break;
            case '-':
                this.operation = this.subtraction
                break;
            case '*':
                this.operation = this.multiplication
                break;
            case '/':
                this.operation = this.division
                break;
            default:
                console.log('default');
                break;
        }
    }
}

export {Calculator}