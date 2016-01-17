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







$( document ).ready(function(){

    // Begin Manage Screensize //////////////////////////////////
    manageScreenSize();
    
    $(window).resize( function(){
        console.log($(window).width());
        manageScreenSize();
    });
    // End Manage Screensize //////////////////////////////////


    
    $("#number-0").click(function(){
        engageCalculatorEngine(0);
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "0" ){
            engageCalculatorEngine(0);
            setAllClear();            
        }
    });    
    
    $("#number-1").click(function(){
        engageCalculatorEngine(1);
        setAllClear();
    });

    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "1" ){
            engageCalculatorEngine(1);
            setAllClear();            
        }
    });
    
    $("#number-2").click(function(){
        engageCalculatorEngine(2);
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "2" ){
            engageCalculatorEngine(2);
            setAllClear();            
        }
    });    
    
    $("#number-3").click(function(){
        engageCalculatorEngine(3);
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "3" ){
            engageCalculatorEngine(3);
            setAllClear();            
        }
    });    
    
    $("#number-4").click(function(){
        engageCalculatorEngine(4);
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "4" ){
            engageCalculatorEngine(4);
            setAllClear();            
        }
    });    
    
    $("#number-5").click(function(){
        engageCalculatorEngine(5);
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "5" ){
            engageCalculatorEngine(5);
            setAllClear();            
        }
    });    
    
    $("#number-6").click(function(){
        engageCalculatorEngine(6);
        setAllClear();
    });

    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "6" ){
            engageCalculatorEngine(6);
            setAllClear();            
        }
    });

    $("#number-7").click(function(){
        engageCalculatorEngine(7);
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "7" ){
            engageCalculatorEngine(7);
            setAllClear();            
        }
    });    
    
    $("#number-8").click(function(){
        engageCalculatorEngine(8);
        setAllClear();
    });    
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "8" ){
            engageCalculatorEngine(8);
            setAllClear();            
        }
    });    

    $("#number-9").click(function(){
        engageCalculatorEngine(9);
        setAllClear();
    });

    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "9" ){
            engageCalculatorEngine(9);
            setAllClear();            
        }
    });
    
    $("#reset-button").click(function(){
        engageReset();
        printOutput();
    });
    
    $(document).keydown(function(event){
        if(event.keyCode === 46 ){
            engageReset();
            printOutput();          
        }
    });    
    
    $("#decimal-point").click(function(){
        if (currentNumberLength(storedInput) < maxScreenLength() ){
            decimalExists = true;
        }
        setAllClear();
        printOutput();
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

    $("#calculate-button").click(function(){
        engageOperationEngine();
        requestPlaced = false;
        printOutput();
    });
    
    $(document).keydown(function(event){
        if(event.keyCode === 13 ){
            engageOperationEngine();
            requestPlaced = false;
            printOutput();       
        }
    });            
    
    
    $("#add-button").click(function(){
        if(requestPlaced === true ){
            engageOperationEngine();
            printOutput();
        }
        prepareForOperations("+");
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "+" ){
            if(requestPlaced === true ){
                engageOperationEngine();
                printOutput();
            }            
            prepareForOperations("+");
            setAllClear();            
        }
    });    

    $("#subtract-button").click(function(){
        if(requestPlaced === true ){
            engageOperationEngine();
            printOutput();
        }        
        prepareForOperations("-");
        setAllClear();
    });

    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "-" ){
            if(requestPlaced === true ){
                engageOperationEngine();
                printOutput();
            }                
            prepareForOperations("-");
            setAllClear();     
        }
    });
    
    $("#multiplication-button").click(function(){
        if(requestPlaced === true ){
            engageOperationEngine();
            printOutput();
        }        
        prepareForOperations("*");
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "*" ){
            if(requestPlaced === true ){
                engageOperationEngine();
                printOutput();
            }               
            prepareForOperations("*");
            setAllClear();     
        }
    });    

    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "x" ){
            if(requestPlaced === true ){
                engageOperationEngine();
                printOutput();
            }               
            prepareForOperations("*");
            setAllClear();     
        }
    });

    $("#division-button").click(function(){
        if(requestPlaced === true ){
            engageOperationEngine();
            printOutput();
        }                
        prepareForOperations("/");
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "/" ){
            if(requestPlaced === true ){
                engageOperationEngine();
                printOutput();
            }                    
            prepareForOperations("/");
            setAllClear();     
        }
    });    
    
    $("#make-negative-button").click(function(){
        storedInput = (-1 * storedInput).toString();
        printOutput();
    });
    
    $("#percent-button").click(function(){
        storedInput = (storedInput / 100).toString();
        printOutput();
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






    $("#memory-clear").click(function(){
        memoryRecallValue = 0;
        printOutput();
    });

    $("#memory-add").click(function(){
        memoryRecallValue += Number(storedInput);
        printOutput();
    });

    $("#memory-subtract").click(function(){
        memoryRecallValue -= Number(storedInput);
        printOutput();
    });

    $("#memory-recall").click(function(){
        storedInput = ( memoryRecallValue ).toString();
        printOutput();
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































    $("#second-power-button").click(function(){
        storedInput = ( Math.pow(Number(storedInput),2 ) ).toString();
        printOutput();
    });

    $("#third-power-button").click(function(){
        storedInput = ( Math.pow(Number(storedInput),3 ) ).toString();
        printOutput();
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

    $("#ten-to-the-x-button").click(function(){
        if(secondSettingMode) {
            storedInput = ( Math.pow(2,Number(storedInput)) ).toString();
            printOutput();            
        } else {
            storedInput = ( Math.pow(10,Number(storedInput)) ).toString();
            printOutput();            
        }

    });

    $("#inverse-button").click(function(){
        storedInput = ( 1/(Number(storedInput)) ).toString();
        printOutput();
        setAllClear();
    });


    $("#square-root-button").click(function(){
        storedInput = ( Math.pow(Number(storedInput), (1/2) ) ).toString();
        printOutput();
    });


    $("#third-root-button").click(function(){
        storedInput = ( Math.pow(Number(storedInput), (1/3) ) ).toString();
        printOutput();
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

    $("#log-base-10-button").click(function(){
        if(secondSettingMode) {
            storedInput = ( Math.log( Number(storedInput) )/ Math.log(2) ).toString();
            printOutput();            
        } else {
            storedInput = ( Math.log10( Number(storedInput) ) ).toString();
            printOutput();            
        }

    });

    $("#factorial-button").click(function(){
        storedInput = ( factorial(Number(storedInput)) ).toString();
        printOutput();
    });


    $("#sin-button").click(function(){
        if(secondSettingMode) {
            if(radianMode){
                storedInput = (Math.asin(storedInput)).toString();            
            } else {
                storedInput = (Math.asin(storedInput) *180/ Math.PI ).toString();            
            }
            printOutput();            
        } else {
            if(radianMode){
                storedInput = (Math.sin(storedInput)).toString();            
            } else {
                storedInput = (Math.sin(storedInput * Math.PI/180) ).toString();            
            }
            printOutput();            
        }

    });

    $("#cos-button").click(function(){
        if(secondSettingMode) {
            if(radianMode){
                storedInput = ( Math.acos(storedInput) ).toString();            
            } else {
                storedInput = (Math.acos(storedInput) * 180 / Math.PI ).toString();            
            }
            printOutput();            
        } else {
            if(radianMode){
                storedInput = ( Math.cos(storedInput) ).toString();            
            } else {
                storedInput = (Math.cos(storedInput * Math.PI/180)).toString();            
            }
            printOutput();            
        }

    });

    $("#tan-button").click(function(){
        if(secondSettingMode) {
            if(radianMode){
                storedInput = (Math.atan(storedInput)).toString();            
            } else {
                storedInput = (Math.atan(storedInput) * 180/ Math.PI ).toString();
            }
            printOutput();            
        } else {
            if(radianMode){
                storedInput = (Math.tan(storedInput)).toString();            
            } else {
                storedInput = (Math.tan(storedInput * Math.PI/180)).toString();
            }
            printOutput();            
        }
    });

    $("#e-constant-button").click(function(){
        storedInput = (Math.E).toString();
        printOutput();
    });

    $("#ee-button").click(function(){
        if(requestPlaced === true ){
            engageOperationEngine();
            printOutput();
        }               
        prepareForOperations("EE");
    });
    
    $("#rad-button").click(function(){
        if(radianMode){
            radianMode = false;
            $("#rad-display").text("");
            $("#rad-button").text("Rad");
        } else {
            radianMode = true;
            $("#rad-display").text("Rad");
            $("#rad-button").text("Deg");
        }
    });

    $("#sinh-button").click(function(){
        if (secondSettingMode) {
            storedInput = (Math.asinh(storedInput)).toString();
            printOutput();            
        } else {
            storedInput = (Math.sinh(storedInput)).toString();
            printOutput();            
        }

    });

    $("#cosh-button").click(function(){
        if(secondSettingMode) {
            storedInput = (Math.acosh(storedInput)).toString();
            printOutput();            
        } else {
            storedInput = (Math.cosh(storedInput)).toString();
            printOutput();            
        }
    });

    $("#tanh-button").click(function(){
        if(secondSettingMode) {
            storedInput = (Math.atanh(storedInput)).toString();
            printOutput();            
        } else {
            storedInput = (Math.tanh(storedInput)).toString();
            printOutput();            
        }
    });

    $("#pi-button").click(function(){
        storedInput = (Math.PI).toString();
        setAllClear();
        printOutput();
    });


    $("#random-button").click(function(){
        storedInput = (Math.random()).toString();
        setAllClear();
        printOutput();
    });


    
});