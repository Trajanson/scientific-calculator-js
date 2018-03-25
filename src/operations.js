export const add = (
    firstNumber,
    secondNumber,
) => {
    return firstNumber + secondNumber;
}

export const subtract = (
    firstNumber,
    secondNumber,
) => {
    return firstNumber - secondNumber;
}

export const multiply = (
    firstNumber,
    secondNumber,
) => {
    return firstNumber * secondNumber;
}

export const divide = (
    firstNumber,
    secondNumber,
) => {
    return firstNumber / secondNumber;
}

export const turnNegative = (
    number
) => {
    return -1 * number;
}

export const factorial = (
    number,
) => {
    if (number <= 1) { return 1; }
    return number * factorial(number - 1);
}

export const customLog = (
    firstNumber,
    secondNumber,
) => {
    return Math.log(firstNumber) / Math.log(secondNumber);
}