// ADD ENGAGE_SCIENTIFIC_NOTATION IF NUMBER IS TOO BIG

const SCREEN_BREAKPOINT = 500;


function maxScreenLength(){ // DIGITS
    return 9;
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

var screenSizeSetting = "big-screen"

/// END SCREEN AREA

function prepareForOperations(operation){
    if( requestPlaced === false ){     // first time operator button gets pressed
        requestPlaced = true;
        decimalExists = false;
        previouslyStoredInput = storedInput;
        storedInput = "0";
        requestedOperation = operation
        printOutput();
    } else if ( requestPlaced === true ){
        requestedOperation = operation;
    }
}


function engageReset() {
    storedInput                 = "0";
    previouslyStoredInput       = "0";
    requestPlaced = false;
    decimalExists = false;
    requestedOperation = "";
    allClear                    = "AC";
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

function resetOperations() {
    requestPlaced = false;
    requestedOperation = "";
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
        arr                 = input.toString().split(""),
        output              = [];
        
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
    return output.join("");
}


function printOutput(){
    if( Number.isInteger(Number(storedInput)) && decimalExists ){
        output = storedInput.toString() + ".";
    }
    else {
        output = storedInput;    
    }
    output = addCommas( removeExcessDigits(output) );
    $("#input-output").text(output);
}


function setSmallScreen(){
    $(".big-screen").toggle();   
}

function setBigScreen(){
    $(".big-screen").toggle();
}

function manageScreenSize(){
    console.log($(window).width());
    
    if( $(window).width() <= SCREEN_BREAKPOINT && screenSizeSetting == "big-screen" ){
        screenSizeSetting = "small-screen";
        $(".big-screen").toggle();
    } else if ( $(window).width() > SCREEN_BREAKPOINT && screenSizeSetting == "small-screen" ) {
        screenSizeSetting = "big-screen";
        $(".big-screen").toggle();
    console.log("this is hit");
    }
}


$( document ).ready(function(){

    // Begin Manage Screensize //////////////////////////////////
    manageScreenSize();
    
    $(window).resize( function(){
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
        console.log(event.keyCode);
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
        console.log(event.keyCode);
        if(event.keyCode === 110 ){
            if (currentNumberLength(storedInput) < maxScreenLength() ){
                decimalExists = true;
            }
            setAllClear();
            printOutput();       
        }
    });        

    $("#calculate-button").click(function(){
        engageOperationEngine()
        printOutput();
    });
    
    $(document).keydown(function(event){
        console.log(event.keyCode);
        if(event.keyCode === 13 ){
            engageOperationEngine()
            printOutput();       
        }
    });            
    
    $("#add-button").click(function(){
        prepareForOperations("+");
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "+" ){
            prepareForOperations("+");
            setAllClear();            
        }
    });    

    $("#subtract-button").click(function(){
        prepareForOperations("-");
        setAllClear();
    });

    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "-" ){
        prepareForOperations("-");
        setAllClear();     
        }
    });
    
    $("#multiplication-button").click(function(){
        prepareForOperations("*");
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "*" ){
        prepareForOperations("*");
        setAllClear();     
        }
    });    

    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "x" ){
        prepareForOperations("*");
        setAllClear();     
        }
    });

    $("#division-button").click(function(){
        prepareForOperations("/");
        setAllClear();
    });
    
    $(document).keypress(function(event){
        if(String.fromCharCode(event.keyCode) === "/" ){
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
    
});