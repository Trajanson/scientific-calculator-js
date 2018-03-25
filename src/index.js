// FACTORIAL GAMMA FUNCTION (FOR FRACTIONS)

// ADD ENGAGE_SCIENTIFIC_NOTATION IF NUMBER IS TOO BIG
// continuing to press equal should continue operations

// remove leading comma from negative numbers


const SCREEN_BREAKPOINT = 645;
const SMALL_SCREEN_SIZE = 9;
const LARGE_SCREEN_SIZE = 16;

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


/// SCREEN AREA
// ALWAYS ADD TO RESET
var storedInput             = "0",
    previouslyStoredInput   = "0",
    requestedOperation      = "",
    allClear                = "AC";

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

function prepareForOperations(operation){
    if( requestPlaced === false ){     // first time operator button gets pressed
        requestPlaced = true;
        decimalExists = false;
        previouslyStoredInput = storedInput;
        storedInput = "0";
        requestedOperation = operation
        printOutput(true);
    } else if ( requestPlaced === true ){
        requestedOperation = operation;
    }
}


function engageReset() {
    storedInput                 = "0";
    previouslyStoredInput       = "0";
    requestPlaced = false;      // operation (+,-,/,*) hasbeen requested
    decimalExists = false;
    requestedOperation = "";
    allClear                    = "AC";
    parenthesisMode = false;
    parenthesisRecord = [];
    $("#reset-button").text("AC");
}

function setAllClear() {
    $("#reset-button").text("C");
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a /b;
}

function turnNegative(a) {
    return -1 * a;
}

function factorial(a) {
    if(a <= 1){ return 1;}
    return a * factorial(a-1);
}

function customLog(a,b) {
    return Math.log(a) / Math.log(b);   
}



function resetOperations() {
    requestPlaced = false;
}

function engageOperationEngine(){
    switch(requestedOperation) {
        case "+":
            storedInput = ( add( Number(previouslyStoredInput), Number(storedInput) ) ).toString();
            break;
        case "-":
            storedInput = ( subtract( Number(previouslyStoredInput), Number(storedInput) ) ).toString();
            break;
        case "*":
            storedInput = ( multiply( Number(previouslyStoredInput), Number(storedInput) ) ).toString();
            break;
        case "/":
            storedInput = ( divide( Number(previouslyStoredInput), Number(storedInput) ) ).toString();
            break;
        case "EE":
            storedInput = ( Number(previouslyStoredInput) * Math.pow(10, Number(storedInput) ) ).toString();
            break;
        case "customroot":
            storedInput = (Math.pow(Number(previouslyStoredInput), 1/(Number(storedInput)) )).toString();
            break;              
        case "customexp":
            storedInput = (Math.pow(Number(previouslyStoredInput), (Number(storedInput)) )).toString();
            break;
        case "reverse-customexp":
            storedInput = (Math.pow(Number(storedInput), (Number(previouslyStoredInput)) )).toString();
            break;
        case "custom-logarithm":
            storedInput = (customLog(Number(previouslyStoredInput),Number(storedInput) )).toString();
            break;           
        default:
            storedInput = storedInput;
    }
    resetOperations();
}


function engageCalculatorEngine(input) {

    if(requestPlaced === true){
        if (currentNumberLength(storedInput) >= maxScreenLength() ){                      // if no more digits can fit on screen
            storedInput = storedInput;
        } else if ( currentNumberLength(storedInput) < maxScreenLength() ) {              // if more digits can fit on screen
            if( Number.isInteger(Number(storedInput)) && !decimalExists ){
                storedInput = ( (Number(storedInput) * 10) + input ).toString();
            } else if ( Number.isInteger(Number(storedInput)) && decimalExists ) {
                storedInput = storedInput + "." + input.toString();
            } else if ( decimalExists ) {
                storedInput += input.toString();
            }
        }   
        printOutput();
       
       
       
        
    } else if(requestPlaced === false){

        if (currentNumberLength(storedInput) >= maxScreenLength() ){                      // if no more digits can fit on screen
            storedInput = storedInput;
        } else if ( currentNumberLength(storedInput) < maxScreenLength() ) {              // if more digits can fit on screen
            if( Number.isInteger(Number(storedInput)) && !decimalExists ){
                storedInput = ( (Number(storedInput) * 10) + input ).toString();
            } else if ( Number.isInteger(Number(storedInput)) && decimalExists ) {
                storedInput = storedInput + "." + input.toString();
            } else if ( decimalExists ) {
                storedInput += input.toString();
            }
        }

        printOutput();
    }
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
    if(operationPrint){
        output = previouslyStoredInput;
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
        storedInput = (-1 * storedInput).toString();
    },
);

registerOperationButton(
    "percent-button",
    () => {
        storedInput = (storedInput / 100).toString();
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
        memoryRecallValue += Number(storedInput);
    },
);

registerOperationButton(
    "memory-subtract",
    () => {
        memoryRecallValue -= Number(storedInput);
    },
);

registerOperationButton(
    "memory-recall",
    () => {
        storedInput = (memoryRecallValue).toString();
    },
);

registerOperationButton(
    "second-power-button",
    () => {
        storedInput = (Math.pow(Number(storedInput), 2)).toString();
    },
);

registerOperationButton(
    "third-power-button",
    () => {
        storedInput = (Math.pow(Number(storedInput), 3)).toString();
    },
);

registerOperationButton(
    "ten-to-the-x-button",
    () => {
        storedInput = secondSettingMode ?
            (Math.pow(2, Number(storedInput))).toString() :
            (Math.pow(10, Number(storedInput))).toString();
    },
);

registerOperationButton(
    "inverse-button",
    () => {
        storedInput = (1 / (Number(storedInput))).toString();
        setAllClear();
    },
);

registerOperationButton(
    "square-root-button",
    () => {
        storedInput = (Math.pow(Number(storedInput), (1 / 2))).toString();
    },
);

registerOperationButton(
    "third-root-button",
    () => {
        storedInput = (Math.pow(Number(storedInput), (1 / 3))).toString();
    },
);

registerOperationButton(
    "log-base-10-button",
    () => {
        storedInput = secondSettingMode ?
            (Math.log(Number(storedInput)) / Math.log(2)).toString() :
            (Math.log10(Number(storedInput))).toString();
    },
);

registerOperationButton(
    "factorial-button",
    () => {
        storedInput = (factorial(Number(storedInput))).toString();
    },
);

registerOperationButton(
    "sin-button",
    () => {
        if (secondSettingMode) {
            storedInput = radianMode ?
                (Math.asin(storedInput)).toString() :
                (Math.asin(storedInput) * 180 / Math.PI).toString();
        } else {
            storedInput = radianMode ?
                (Math.sin(storedInput)).toString() :
                (Math.sin(storedInput * Math.PI / 180)).toString();
        }
    },
);

registerOperationButton(
    "cos-button",
    () => {
        if (secondSettingMode) {
            storedInput = radianMode ?
                (Math.acos(storedInput)).toString() :
                (Math.acos(storedInput) * 180 / Math.PI).toString();
        } else {
            storedInput = radianMode ?
                (Math.cos(storedInput)).toString() :
                (Math.cos(storedInput * Math.PI / 180)).toString();
        }
    },
);

registerOperationButton(
    "tan-button",
    () => {
        if (secondSettingMode) {
            storedInput = radianMode ?
                (Math.atan(storedInput)).toString() :
                (Math.atan(storedInput) * 180 / Math.PI).toString();
        } else {
            storedInput = radianMode ?
                (Math.tan(storedInput)).toString() :
                (Math.tan(storedInput * Math.PI / 180)).toString();            
        }
    },
);

registerOperationButton(
    "e-constant-button",
    () => {
        storedInput = (Math.E).toString();
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
        storedInput = secondSettingMode ?
            (Math.asinh(storedInput)).toString() :
            (Math.sinh(storedInput)).toString();
    },
);

registerOperationButton(
    "cosh-button",
    () => {
        storedInput = secondSettingMode ?
            (Math.acosh(storedInput)).toString() :
            (Math.cosh(storedInput)).toString();
    },
);

registerOperationButton(
    "tanh-button",
    () => {
        storedInput = secondSettingMode ?
            (Math.atanh(storedInput)).toString() :
            (Math.tanh(storedInput)).toString();
    },
);

registerOperationButton(
    "pi-button",
    () => {
        storedInput = (Math.PI).toString();
        setAllClear();
    },
);

registerOperationButton(
    "random-button",
    () => {
        storedInput = (Math.random()).toString();
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
            if (currentNumberLength(storedInput) < maxScreenLength() ){
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
            storedInput = (storedInput / 100).toString();
            printOutput(); 
        }
    });    










    $("#set-parenthesis").click(function(){
        if ( requestPlaced === true ){
            parenthesisRecord.push([previouslyStoredInput, requestedOperation]);
            previouslyStoredInput = "0";
            requestPlaced = false;
            decimalExists = false;
            requestedOperation = "";
            storedInput = "0";
            printOutput();            
        }
    });

    $("#close-parenthesis").click(function(){
        console.log(parenthesisRecord);
        if (parenthesisRecord.length > 0) {
            engageOperationEngine();
            var lastKnownDemand = parenthesisRecord.pop();
            previouslyStoredInput = lastKnownDemand[0];
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
            storedInput = ( Math.exp(Number(storedInput)) ).toString();
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
            storedInput = ( Math.log( Number(storedInput) ) ).toString();
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
