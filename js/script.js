const previousOperationText = document.getElementById('previous-operation')
const currentOperationText = document.getElementById('current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ''
    }

    // adiciona digito na tela da calculadora
    addDigit(digit) {
        // checar se a operação atual ja tem um ponto
        if (
            digit === '.' &&
            this.currentOperationText.innerText.includes('.')
        ) {
            return
        }

        this.currentOperation = digit
        this.updateScreem()
    }

    // processando todas as operacoes da calculadora
    processOperation(operation) {
        // checar se o valor atual é vazio
        if (this.currentOperationText.innerText === '' && operation !== 'C') {
            if (this.previousOperationText.innerText !== '') {
                this.changeOperation(operation)
            }
            return
        }

        // Get valor atual e anterior
        let operationValue
        const previous = +this.previousOperationText.innerText.split(' ')[0]
        const current = +this.currentOperationText.innerText

        switch (operation) {
            case '+':
                operationValue = previous + current
                this.updateScreem(operationValue, operation, current, previous)
                break
            case '-':
                operationValue = previous - current
                this.updateScreem(operationValue, operation, current, previous)
                break
            case '/':
                operationValue = previous / current
                this.updateScreem(operationValue, operation, current, previous)
                break
            case '*':
                operationValue = previous * current
                this.updateScreem(operationValue, operation, current, previous)
                break
            case '=':
                this.processEqualOperation()
                break
            case 'DEL':
                this.processDelOperator()
                break
            case 'CE':
                this.processClearCurrentOperation()
                break
            case 'C':
                this.processClearAllOperation()
                break
            default:
                break
        }
    }

    // muda os valores da tela da calculadora
    updateScreem(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue == null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            // Checar se o valor é zero
            if (previous === 0) {
                operationValue = current
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }
    }

    // mudar a operação
    changeOperation(operation) {
        const mathOperations = ['*', '/', '+', '-']

        if (!mathOperations.includes(operation)) {
            return
        }
        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation
    }

    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1)
    }

    processClearCurrentOperation() {
        this.currentOperationText.innerText = ''
    }

    processClearAllOperation() {
        this.currentOperationText.innerText = ''
        this.previousOperationText.innerText = ''
    }

    processEqualOperation() {
        const operation = previousOperationText.innerHTML.split(' ')[1]
        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        const value = e.target.innerText

        if (+value >= 0 || value === '.') {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})
