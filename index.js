let gameStarted = false;

let playerPattern = [];
let gamePattern = [];
let colors = ["green", "red", "yellow", "blue"];

let level = 1;
let patternGenerationSpeedInSeconds = 0.65;

//EVENTS

let isOnMobile = !window.matchMedia("(max-width): 500px");

$(".btn").click(function (e) { 
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

});



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
    $("#level-title").addClass("hidden");

    $("#start").click(function () { 
        gameInit();
        $("#start").addClass("hidden");
    });
}
function changeDifficulty() {
    level++;
    updateText();

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
            animate(randomColour);
            playSound(randomColour);
    
            console.log(randomIndex);
            
        }, patternGenerationSpeedInSeconds * 1000);  
}




//GAME ADD ONS
function animate(ref){
    $("#" + ref).fadeIn().fadeIn(80).fadeOut(100).fadeIn(80).fadeOut(70).fadeIn(100);
}
function playSound(sound){
    let audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}
function updateText(){
    $("#level-title").text("Level: " + level);
}
function customMessages(){
    if(level === 6) 
        alert("Sad ce biti vec malo teze")
    if(level === 10)
        alert("Dobro nisi los/a u ovom");
    else if(level === 15)
        alert("Ode moj rekord");
    else if(level === 20)
        alert("Ne moguce.");
    else if(level > 99){
        alert("vjerovatno si koristio konzolu da dodjes dovdje")
    }
}

//CORE
function gameInit() {
    if(!gameStarted){
        updateText();
        setTimeout( next, 1000);

        gameStarted = true;
    }
}
function end(){
    playSound("wrong");
    setTimeout(() => { location.reload() }, 1000);
}