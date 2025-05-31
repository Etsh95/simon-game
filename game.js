
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

  

var audioRed = new Audio('https://github.com/Etsh95/simon-game/blob/66aa6bef8d92826e684f1780eda0680623984f5d/sounds/red.mp3?raw=true');
var audioYellow = new Audio('https://github.com/Etsh95/simon-game/blob/66aa6bef8d92826e684f1780eda0680623984f5d/sounds/yellow.mp3?raw=true');
var audioBlue = new Audio('https://github.com/Etsh95/simon-game/blob/66aa6bef8d92826e684f1780eda0680623984f5d/sounds/blue.mp3?raw=true');
var audioGreen = new Audio('https://github.com/Etsh95/simon-game/blob/66aa6bef8d92826e684f1780eda0680623984f5d/sounds/green.mp3?raw=true');
var audioWrong = new Audio('https://github.com/Etsh95/simon-game/blob/66aa6bef8d92826e684f1780eda0680623984f5d/sounds/wrong.mp3?raw=true');





    $(".btn").click(function() {

        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour); 
        checkAnswer(userClickedPattern.length-1); 
    });
        
    







 function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    $("h1").text(`Level ${level}`); 
    level++;
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    var colorSelector = $("#"+ randomChosenColour);
    playSound(randomChosenColour);
    colorSelector.fadeOut(100).fadeIn(100);
    clicking();
}


function playSound(name) {

    switch (name) {
        case "red":
            audioRed.play();
            break;
    
        case "yellow":
            audioYellow.play();
            break; 
    
        case "blue":
            audioBlue.play();
            break;
    
        case "green":
            audioGreen.play();
            break;
        case "wrong":
            audioWrong.play();
        default: 
     }
}

function animatePress(currentColor) {
$("#"+ currentColor).addClass("pressed");
setTimeout(() => { $("#"+ currentColor).removeClass("pressed");},100);
}

function checkAnswer(currentLevel){
    
if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
        setTimeout(() => {nextSequence();},1000);
    }
} else {
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {$("body").removeClass("game-over");},200);
        startOver();
    }
}

function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    started = false;
    level = 0;
}
