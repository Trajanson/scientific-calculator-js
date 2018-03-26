// FACTORIAL GAMMA FUNCTION (FOR FRACTIONS)

// ADD ENGAGE_SCIENTIFIC_NOTATION IF NUMBER IS TOO BIG
// continuing to press equal should continue operations

// remove leading comma from negative numbers

import {
    add,
    subtract,
    multiply,
    divide,
    turnNegative,
    factorial,
    customLog,
} from "./operations";

import {
    SCREEN_BREAKPOINT,
    SMALL_SCREEN_SIZE,
    LARGE_SCREEN_SIZE,
} from "./config";

import {
    store
} from "./store";

/// SCREEN AREA
// ALWAYS ADD TO RESET
var storedInputString = "0",
    requestedOperation = "";

var decimalExists = false;

var requestPlaced = false;

var output = "";

var screenSizeSetting = "big-screen";

var radianMode = false;
var secondSettingMode = false;
var memoryRecallValue = 0;

var parenthesisMode = false;
var parenthesisRecord = []; // [[origin value, requestedOperation]]

/// END SCREEN AREA


function maxScreenLength(){ // DIGITS
    if(screenSizeSetting === "small-screen") {
        return SMALL_SCREEN_SIZE;
    } else if(screenSizeSetting === "big-screen"){
        return LARGE_SCREEN_SIZE;
    }
    console.log("THERE HAS BEEN AN ERROR!");
}

function currentNumberLength(num){
    return num.toString().split("").length;
}

function removeExcessDigits(inputString){
    var max = maxScreenLength(),
        arr = inputString.toString().split(""),
        output = "";
        
    if( arr.length <= max ){
        return inputString;
    } else if (arr.length > max) {
        for( var i = 0; i <= max; i++ ) {
            output += arr[i];
        }    
    }
    return output;
}


function prepareForOperations(operation){
    const storedInput = store.getStoredInput();

    if( requestPlaced === false ){     // first time operator button gets pressed
        requestPlaced = true;
        decimalExists = false;

        store.setPreviouslyStoredInput(storedInput);
        store.setStoredInput("0");

        requestedOperation = operation
        printOutput(true);
    } else if ( requestPlaced === true ){
        requestedOperation = operation;
    }
}


function engageReset() {
    store.reset();
    requestPlaced = false;      // operation (+,-,/,*) hasbeen requested
    decimalExists = false;
    requestedOperation = "";
    parenthesisMode = false;
    parenthesisRecord = [];
    $("#reset-button").text("AC");
}

function setAllClear() {
    $("#reset-button").text("C");
}

function resetOperations() {
    requestPlaced = false;
}

function engageOperationEngine(){
    const previouslyStoredInputNumber = parseInt(store.getPreviouslyStoredInput(), 10);
    const storedInputNumber = parseInt(store.getStoredInput(), 10);
    let computedNumber;

    switch(requestedOperation) {
        case "+":
            computedNumber = add(
                previouslyStoredInputNumber,
                storedInputNumber,
            );
            break;
        case "-":
            computedNumber = subtract(
                previouslyStoredInputNumber,
                storedInputNumber,
            );
            break;
        case "*":
            computedNumber = multiply(
                previouslyStoredInputNumber,
                storedInputNumber,
            );
            break;
        case "/":
            computedNumber = divide(
                previouslyStoredInputNumber,
                storedInputNumber,
            );
            break;
        case "EE":
            computedNumber = previouslyStoredInputNumber * Math.pow(10, storedInputNumber);
            break;
        case "customroot":
            computedNumber = Math.pow(previouslyStoredInputNumber, 1 / storedInputNumber);
            break;              
        case "customexp":
            computedNumber = Math.pow(previouslyStoredInputNumber, storedInputNumber);
            break;
        case "reverse-customexp":
            computedNumber = Math.pow(storedInputNumber, previouslyStoredInputNumber);
            break;
        case "custom-logarithm":
            computedNumber = customLog(previouslyStoredInputNumber, storedInputNumber);
            break;           
        default:
            computedNumber = storedInputNumber;
    }

    store.setStoredInput(computedNumber.toString());
    resetOperations();
}


function engageCalculatorEngine(input) {
    const storedInput = store.getStoredInput();
    const lengthOfStoredInput = currentNumberLength(storedInput);

    const storedInputAsNumber = parseInt(storedInput, 10);
    const isStoredInputAnInteger = Number.isInteger(storedInputAsNumber);

    if (requestPlaced) {
        /** if more digits can fit on screen */
        if ( lengthOfStoredInput < maxScreenLength() ) {
            if( isStoredInputAnInteger && !decimalExists ){
                store.setStoredInput(
                    ((storedInputAsNumber * 10) + input).toString()
                );
            } else if ( isStoredInputAnInteger && decimalExists ) {
                store.setStoredInput(
                    storedInput + "." + input.toString()
                );
            } else if ( decimalExists ) {
                store.setStoredInput(
                    storedInput + input.toString()
                );
            }
        }   
    } else {
            /** if more digits can fit on screen */
        if ( lengthOfStoredInput < maxScreenLength() ) {
            if( isStoredInputAnInteger && !decimalExists ){
                store.setStoredInput(
                    ((storedInputAsNumber * 10) + input).toString()
                );
            } else if ( isStoredInputAnInteger && decimalExists ) {
                store.setStoredInput(
                    storedInput + "." + input.toString()
                );
            } else if ( decimalExists ) {
                store.setStoredInput(
                    storedInput + input.toString()
                );
            }
        }
    }
    printOutput();
}


function addCommas(input) {
    var decimalExists       = false,
        foundDecimal        = false,
        rightOfDecimalCount = 0,
        numberIsNegative    = false,
        arr                 = input.toString().split(""),
        output              = [];

    if(arr[0] === "-") {
        arr.shift();
        numberIsNegative = true;
    }
        
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] == "." ){
            decimalExists = true;
        }
    }    
    
    for(var j = arr.length - 1; j >= 0; j--){
        if(decimalExists){
            if( foundDecimal ){
                if( (rightOfDecimalCount % 3 === 0) && rightOfDecimalCount !== 0){
                        output.unshift(",");
                }
                rightOfDecimalCount++;
                output.unshift(arr[j]);
            } else {
                if(arr[j] == ".") {
                    foundDecimal = true;
                }
                output.unshift(arr[j]);
            }
            
        } else {
            if( (rightOfDecimalCount % 3 === 0) && rightOfDecimalCount !== 0){
                    output.unshift(",");
            }
            rightOfDecimalCount++;
            output.unshift(arr[j]);
        }
    }
    if (numberIsNegative) {
        output.unshift("-");
    }
    return output.join("");
}


function printOutput(operationPrint){
    const storedInput = store.getStoredInput();

    if(operationPrint){
        output = store.getPreviouslyStoredInput();
    } else {
        if( Number.isInteger(Number(storedInput)) && decimalExists ){
            output = storedInput.toString() + ".";
        }
        else {
            output = storedInput;    
        }        
    }
    output = addCommas( removeExcessDigits(output) );
    $("#input-output").text(output);
}


function manageScreenSize(){
    if( $(window).width() <= SCREEN_BREAKPOINT && screenSizeSetting == "big-screen" ){
        screenSizeSetting = "small-screen";
        $(".big-screen").toggle();
        returnToFirstSetting();
        radianMode = false;
        $("#rad-display").text("");
        $("#rad-button").text("Rad");        
        
    } else if ( $(window).width() > SCREEN_BREAKPOINT && screenSizeSetting == "small-screen" ) {
        screenSizeSetting = "big-screen";
        $(".big-screen").toggle();
    }
}


function returnToFirstSetting(){
    $('#e-to-the-x-button').html("e<sup>x</sup>");      //  e^x     -   y^x
    $('#ten-to-the-x-button').html("10<sup>x</sup>");   //  10^x    -   2^x
    $('#log-base-e-button').html("ln");                 //  ln      -   log-base-y
    $('#log-base-10-button').html("log<sub>10</sub>");  //  log10   -   log-base-2
    $('#sin-button').html("sin");                       //  sin     -   sin^-1
    $('#cos-button').html("cos");                       //  cos     -   cos^-1
    $('#tan-button').html("tan");                       //  tan     -   tan^-1
    $('#sinh-button').html("sinh");                     //  sinh    -   sinh^-1
    $('#cosh-button').html("cosh");                     //  cosh    -   cosh^-1
    $('#tanh-button').html("tanh");                     //  tanh    -   tanh^-1
} 

function returnToSecondSetting(){
    $('#e-to-the-x-button').html("y<sup>x</sup>");       //  e^x     -   y^x
    $('#ten-to-the-x-button').html("2<sup>x</sup>");     //  10^x    -   2^x
    $('#log-base-e-button').html("log<sub>y</sub>");     //  ln      -   log-base-y
    $('#log-base-10-button').html("log<sub>2</sub>");    //  log10   -   log-base-2
    $('#sin-button').html("sin<sup>-1</sup>");           //  sin     -   sin^-1
    $('#cos-button').html("cos<sup>-1</sup>");           //  cos     -   cos^-1
    $('#tan-button').html("tan<sup>-1</sup>");           //  tan     -   tan^-1
    $('#sinh-button').html("sinh<sup>-1</sup>");         //  sinh     -   sinh^-1
    $('#cosh-button').html("cosh<sup>-1</sup>");         //  cosh     -   cosh^-1
    $('#tanh-button').html("tanh<sup>-1</sup>");         //  tanh     -   tanh^-1    

}







const registerDigitButton = (
    digit,
) => {
    $(`#number-${digit}`).click(() => {
        engageCalculatorEngine(digit);
        setAllClear();
    });

    $(document).keypress((event) => {
        if (String.fromCharCode(event.keyCode) === `${digit}`) {
            engageCalculatorEngine(digit);
            setAllClear();
        }
    });
};

const registerOperationButton = (
    buttonName,
    handleClick,
) => {
    $(`#${buttonName}`).click(function () {
        handleClick();
        printOutput();
    });
};

const registerDigitButtons = () => {
    Array(10)
        .fill(0)
        .map((value, index) => value + index)
        .forEach(registerDigitButton);
};
registerDigitButtons();

const registerPrimaryOperationButton = (
    buttonName,
    primaryOperationCharacter,
    additionalOperationCharacters,
) => {
    $(`#${buttonName}`).click(() => {
        if (requestPlaced) {
            engageOperationEngine();
            printOutput();
        }
        prepareForOperations(primaryOperationCharacter);
        setAllClear();
    });

    [primaryOperationCharacter].concat(additionalOperationCharacters).forEach((operationCharacter) => {
        $(document).keypress((event) => {
            if (String.fromCharCode(event.keyCode) === operationCharacter) {
                if (requestPlaced) {
                    engageOperationEngine();
                    printOutput();
                }
                prepareForOperations(primaryOperationCharacter);
                setAllClear();
            }
        });
    });
};
registerPrimaryOperationButton(
    "add-button",
    "+",
    [],
);
registerPrimaryOperationButton(
    "subtract-button",
    "-",
    [],
);
registerPrimaryOperationButton(
    "multiplication-button",
    "*",
    ["x"],
);
registerPrimaryOperationButton(
    "division-button",
    "/",
    [""],
);


registerOperationButton(
    "reset-button",
    () => {
        engageReset();
    },
);

registerOperationButton(
    "decimal-point",
    () => {
        const storedInput = store.getStoredInput();
        if (currentNumberLength(storedInput) < maxScreenLength()) {
            decimalExists = true;
        }
        setAllClear();
    },
);

registerOperationButton(
    "calculate-button",
    () => {
        engageOperationEngine();
        requestPlaced = false;
    },
);

registerOperationButton(
    "make-negative-button",
    () => {
        const storedInput = store.getStoredInput();
        store.setStoredInput(
            (-1 * storedInput).toString()
        );
    },
);

registerOperationButton(
    "percent-button",
    () => {
        const storedInput = store.getStoredInput();
        store.setStoredInput(
            (storedInputString / 100).toString()
        );
    },
);

registerOperationButton(
    "memory-clear",
    () => {
        memoryRecallValue = 0;
    },
);

registerOperationButton(
    "memory-add",
    () => {
        const storedInput = store.getStoredInput();
        memoryRecallValue += Number(storedInput);
    },
);

registerOperationButton(
    "memory-subtract",
    () => {
        const storedInput = store.getStoredInput();
        memoryRecallValue -= Number(storedInput);
    },
);

registerOperationButton(
    "memory-recall",
    () => {
        storedInputString = (memoryRecallValue).toString();
    },
);

registerOperationButton(
    "second-power-button",
    () => {
        const storedInput = store.getStoredInput();
        storedInputString = (Math.pow(Number(storedInput), 2)).toString();
    },
);

registerOperationButton(
    "third-power-button",
    () => {
        const storedInput = store.getStoredInput();
        storedInputString = (Math.pow(Number(storedInput), 3)).toString();
    },
);

registerOperationButton(
    "ten-to-the-x-button",
    () => {
        const storedInput = store.getStoredInput();

        store.setStoredInput(
            secondSettingMode ?
                (Math.pow(2, Number(storedInput))).toString() :
                (Math.pow(10, Number(storedInput))).toString()
        );
    },
);

registerOperationButton(
    "inverse-button",
    () => {
        const storedInput = store.getStoredInput();

        store.setStoredInput(
            (1 / (Number(storedInput))).toString()
        );
        setAllClear();
    },
);

registerOperationButton(
    "square-root-button",
    () => {
        const storedInput = store.getStoredInput();

        store.setStoredInput(
            (Math.pow(Number(storedInput), (1 / 2))).toString(),
        );
    },
);

registerOperationButton(
    "third-root-button",
    () => {
        const storedInput = store.getStoredInput();
        
        store.setStoredInput(
            (Math.pow(Number(storedInput), (1 / 3))).toString()
        );
    },
);

registerOperationButton(
    "log-base-10-button",
    () => {
        const storedInput = store.getStoredInput();

        store.setStoredInput(
            secondSettingMode ?
                (Math.log(Number(storedInput)) / Math.log(2)).toString() :
                (Math.log10(Number(storedInput))).toString()
        );
    },
);

registerOperationButton(
    "factorial-button",
    () => {
        const storedInput = store.getStoredInput();

        store.setStoredInput(
            (factorial(Number(storedInputString))).toString(),
        );
    },
);

registerOperationButton(
    "sin-button",
    () => {
        const storedInput = store.getStoredInput();

        if (secondSettingMode) {
            store.setStoredInput(
                radianMode ?
                    (Math.asin(storedInputString)).toString() :
                    (Math.asin(storedInputString) * 180 / Math.PI).toString()
            );
        } else {
            store.setStoredInput(
                radianMode ?
                    (Math.sin(storedInputString)).toString() :
                    (Math.sin(storedInputString * Math.PI / 180)).toString()
            );            
        }
    },
);

registerOperationButton(
    "cos-button",
    () => {
        if (secondSettingMode) {
            store.setStoredInput(
                radianMode ?
                    (Math.acos(storedInputString)).toString() :
                    (Math.acos(storedInputString) * 180 / Math.PI).toString()
            );
        } else {
            store.setStoredInput(
                radianMode ?
                    (Math.cos(storedInputString)).toString() :
                    (Math.cos(storedInputString * Math.PI / 180)).toString()
            );            
        }
    },
);

registerOperationButton(
    "tan-button",
    () => {
        if (secondSettingMode) {
            store.setStoredInput(
                radianMode ?
                    (Math.atan(storedInputString)).toString() :
                    (Math.atan(storedInputString) * 180 / Math.PI).toString()
            );
        } else {
            store.setStoredInput(
                radianMode ?
                    (Math.tan(storedInputString)).toString() :
                    (Math.tan(storedInputString * Math.PI / 180)).toString()
            );
        }
    },
);

registerOperationButton(
    "e-constant-button",
    () => {
        store.setStoredInput(
            (Math.E).toString()
        );
    },
);

registerOperationButton(
    "rad-button",
    () => {
        if (radianMode) {
            radianMode = false;
            $("#rad-display").text("");
            $("#rad-button").text("Rad");
        } else {
            radianMode = true;
            $("#rad-display").text("Rad");
            $("#rad-button").text("Deg");
        }
        radianMode = !radianMode;
    },
);

registerOperationButton(
    "sinh-button",
    () => {
        store.setStoredInput(
            secondSettingMode ?
                (Math.asinh(storedInputString)).toString() :
                (Math.sinh(storedInputString)).toString()
        );
    },
);

registerOperationButton(
    "cosh-button",
    () => {
        store.setStoredInput(
            secondSettingMode ?
                (Math.acosh(storedInputString)).toString() :
                (Math.cosh(storedInputString)).toString()
        );
    },
);

registerOperationButton(
    "tanh-button",
    () => {
        store.setStoredInput(
            secondSettingMode ?
                (Math.atanh(storedInputString)).toString() :
                (Math.tanh(storedInputString)).toString()
        );
    },
);

registerOperationButton(
    "pi-button",
    () => {
        store.setStoredInput(
            (Math.PI).toString()
        );
        setAllClear();
    },
);

registerOperationButton(
    "random-button",
    () => {
        store.setStoredInput(
            (Math.random()).toString()
        );
        setAllClear();
    },
);



$( document ).ready(function(){

    // Begin Manage Screensize //////////////////////////////////
    manageScreenSize();
    
    $(window).resize( function(){
        console.log($(window).width());
        manageScreenSize();
    });
    // End Manage Screensize //////////////////////////////////

      
    $(document).keydown(function(event){
        if(event.keyCode === 46 ){
            engageReset();
            printOutput();          
        }
    });    
    
    
    $(document).keydown(function(event){
        if(event.keyCode === 110 ){
            if (currentNumberLength(storedInputString) < maxScreenLength() ){
                decimalExists = true;
            }
            setAllClear();
            printOutput();       
        }
    });        
    
    $(document).keydown(function(event){
        if(event.keyCode === 13 ){
            engageOperationEngine();
            requestPlaced = false;
            printOutput();       
        }
    });            
    
        
        
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "%" ){
            store.setStoredInput(
                (storedInputString / 100).toString()
            );
            printOutput(); 
        }
    });    










    $("#set-parenthesis").click(function(){
        if ( requestPlaced === true ){
            parenthesisRecord.push([store.getPreviouslyStoredInput(), requestedOperation]);
            store.setPreviouslyStoredInput("0");
            requestPlaced = false;
            decimalExists = false;
            requestedOperation = "";
            storedInputString = "0";
            printOutput();            
        }
    });

    $("#close-parenthesis").click(function(){
        console.log(parenthesisRecord);
        if (parenthesisRecord.length > 0) {
            engageOperationEngine();
            var lastKnownDemand = parenthesisRecord.pop();
            store.setPreviouslyStoredInput(lastKnownDemand[0]);
            requestedOperation = lastKnownDemand[1];
            engageOperationEngine();
    
            printOutput();
        }
    });




















    $("#second-setting-button").click(function(){
        if(secondSettingMode){
            secondSettingMode = false;
            returnToFirstSetting();
        } else {
            secondSettingMode = true;
            returnToSecondSetting();
        }
    });

































    $("#x-to-the-y-button").click(function(){
        if(requestPlaced === true ){
            engageOperationEngine();
            printOutput();
        }               
        prepareForOperations("customexp");
    });

    $("#e-to-the-x-button").click(function(){
        if(secondSettingMode) { // y ^ x
            if(requestPlaced === true ){
                engageOperationEngine();
                printOutput();
            }               
            prepareForOperations("reverse-customexp");
        } else {
            store.setStoredInput(
                ( Math.exp(Number(storedInputString)) ).toString()
            );
            printOutput();
        }
    });










    $("#custom-root-button").click(function(){
        if(requestPlaced === true ){
            engageOperationEngine();
            printOutput();
        }               
        prepareForOperations("customroot");
    });


    $("#log-base-e-button").click(function(){
        if(secondSettingMode) { // log x base y
            if(requestPlaced === true ){
                engageOperationEngine();
                printOutput();
            }               
            prepareForOperations("custom-logarithm");
        } else {
            store.setStoredInput(
                ( Math.log( Number(storedInputString) ) ).toString()
            );
            printOutput();            
        }

    });

    $("#ee-button").click(function(){
        if(requestPlaced === true ){
            engageOperationEngine();
            printOutput();
        }               
        prepareForOperations("EE");
    });
        
});
