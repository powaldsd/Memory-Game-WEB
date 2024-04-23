let gameStarted = false;

let playerPattern = [];
let gamePattern = [];
let colors = ["green", "red", "yellow", "blue"];

let level = 1;
let patternGenerationSpeedInSeconds = 0.65;

let canClick = false;

//EVENTS



$(".btn").click(function (e) { 
    if(gameStarted && canClick){
        let userPressedButton = $(this).attr("id");
    
        playerPattern.push(userPressedButton);
    
        let canProcceed;
        for (let i = 0; i < playerPattern.length; i++) {
            canProcceed = playerPattern[i] === gamePattern[i];
        }
        if(!canProcceed) end();
        
        if(canProcceed && playerPattern.length === level){
            if(check())
                changeDifficulty();
            else end();
        }else if(!canProcceed) end();
    
       
    
        animate(userPressedButton);
        playSound(userPressedButton);
    }
});


/*
if(!isOnMobile){
    console.log("pc");
    $("#start").addClass("hidden");

    document.addEventListener("keydown", (e) => {
        if(e.key == "a"){
            gameInit();
        }
    })
}else{
    console.log("phone");
    
}*/
$("#level-title").addClass("hidden");
$("#start").click(function () { 
    gameInit();
    $("#start").addClass("hidden");
    $("#level-title").removeClass("hidden");
});
function changeDifficulty() {
    canClick = false;
    level++;

    updateText(true);

    playerPattern = [];

    setTimeout(() => {next()}, 1000)

    customMessages();
}

//MATH
function rand(range) {
    return Math.floor(Math.random() * range);
}
//AI
function check(){
    if(playerPattern.length > gamePattern) return false;
    if(playerPattern.length === gamePattern.length){
        for (let i = 0; i < playerPattern.length; i++) {
            return playerPattern[i] === gamePattern[i];
        }
        return false;
    }
    return false;
}
function next(){
    setTimeout(() => {
            let randomIndex = rand(4);
            let randomColour = colors[randomIndex];
            gamePattern.push(randomColour);
            //style
            animateGame(randomColour);
            playSound(randomColour);           
        }, patternGenerationSpeedInSeconds * 1000);  
}
//GAME ADD ONS
function customMessages(){
    if(level === 5) 
        $("body").addClass("l5");
    if(level === 10)
        $("body").addClass("l10");
    else if(level === 15)
        $("body").addClass("l15");
    else if(level > 99){
        alert("vjerovatno si koristio konzolu da dodjes dovdje")
    }
}
//CORE
function animateGame(ref){
    $("#" + ref).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    setTimeout(() => {canClick = true;}, 250);
}
function animate(ref){
    $("#" + ref).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
}
function playSound(sound){
    let audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}
function updateText(changeColor){
    if(changeColor){
        $("#level-title").addClass("correct");
        setTimeout(() => {$("#level-title").removeClass("correct");}, 500);
        setTimeout(() => {$("#level-title").addClass("neutral"); }, 600);;
        $("#level-title").text("Level: " + level);
        setTimeout(() => {$("#level-title").removeClass("neutral"); }, 800);
    }else{
        $("#level-title").text("Level: " + level);
    }
}
function gameInit() {
    if(!gameStarted){
        updateText(false);
        setTimeout( next, 1000);

        gameStarted = true;
    }
}
function end(){
    playSound("wrong");
    $("#level-title").addClass("incorrect");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("#level-title").removeClass("incorrect");
        $("body").removeClass("game-over");
    }, 100);
    setTimeout(() => {
        $("#level-title").addClass("neutral");
        $("body").addClass("game-over");
    }, 200);
    setTimeout(() => {
        $("#level-title").removeClass("neutral");
        $("body").removeClass("game-over");
        $("body").addClass("game-over");
    }, 300);
    setTimeout(() => {
        $("#level-title").addClass("incorrect");
        $("body").addClass("game-over");
    }, 450);
    setTimeout(() => {
        $("#level-title").removeClass("incorrect");
        $("body").removeClass("game-over");
    }, 660);
    
    setTimeout(() => { location.reload() }, 1000);
}