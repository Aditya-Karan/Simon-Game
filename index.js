var buttonColor=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedPattern=[];
var start=false;
var level=0;

$(".btn").click(function handler(event){
    userChosenColor=event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    }
);

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var a=Math.floor(Math.random()*4);
    var randomColor=buttonColor[a];
    gamepattern.push(randomColor);

    $("div #"+randomColor).animate({opacity:0.4},100).animate({opacity: 1.0},100);
    var audio=new Audio("sounds/"+randomColor+".mp3");
    audio.play();

}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamepattern[currentLevel])
    {
        console.log("yes");
        if(userClickedPattern.length===gamepattern.length)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamepattern=[];
    start=false;
    $("h1").text("Game Over.Press any key to start the game");
}

if (start===false){
    $(document).keypress(function(){
    nextSequence();
    });
    start=true;
    }

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },80);
}