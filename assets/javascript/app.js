$("#begin").on("click", function(){
    $("#begin").remove();
    game.loadQuestion();
  });
  
  $(document).on("click",".answer-button",function(e){
    game.clicked(e);
  })
  
  $(document).on("click", "#reset",function(){
    game.reset();
  })
  
  var questions = [
    {
      question: "Who played the joker in the Dark Knight?",
      answers: ["Heath Ledger", "Adam Sandler","Harrison Ford", "Hugh Jackman"],
      correctAnswer: "Heath Ledger",
    },
    {
      question: "What year was the Dark Knight released?",
      answers: ["2012", "2008", "2010", "2011"],
      correctAnswer: "2008",
    },
    {
      question: "What was the runtime in minutes",
      answers: ["152", "144","122", "90"],
      correctAnswer: "152",
    },
    {
      question: "What is the name of the city?",
      answers: ["New York", "Gotham","Detriot", "Crime City"],
      correctAnswer: "Gotham",
    },
    {
      question:"Who played Bruce Wayne?",
      answers: ["Christian Bale", "Heath Ledger", "Michael Caine", "Gary Oldman"],
      correctAnswer:"Christian Bale",
    }];
  
  
    var game = {
      questions:questions,
      currentQuestions:0,
      timer:20,

      countdown: function(){
        game.timer--;
        $("#timer").html(game.timer);
        if (game.timer<=0) {
          game.timeUp();
        }
      },
  
      loadQuestion: function(){
        timer = setInterval(game.countdown,1000);
        $("#trivgame").html("<h2>Time Remaining <span id= 'timer'>20</span> Seconds</h2>")
        $("#trivgame").append("<h2>"+questions[game.currentQuestions].question+"</h2>");
        for(var i=0; i<questions[game.currentQuestions].answers.length;i++){
          $("#trivgame").append('<button class="answer-button" id="button-'+i+ '" data-name="'+questions[game.currentQuestions].answers[i]+'">'+questions[game.currentQuestions].answers[i]+'</button>');
        }
      },
  
      nextQuestion: function(){
        game.timer= 20;
        $("#timer").html(game.timer);
        game.currentQuestions++;
        game.loadQuestion();
      },
  
      timeUp:function(){
        clearInterval(timer);
        game.unanswered++;
        $("#trivgame").html("<h2>Out of Time</h2>");
        $("#trivgame").append("<h3>The Correct Answer was: "+questions[game.currentQuestions].correctAnswer+"</h3>");
        if(game.currentQuestions==questions.length-1){
          setTimeout(game.results,3*1000);
        } else {
          setTimeout(game.nextQuestion,3*1000);
        }
      },
  
      results: function(){
        clearInterval(timer);
        $("#trivgame").html("<h1> "+ "Game over!" + "</h1>");
      
      },
  
      clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestions].correctAnswer){
          game.correctresponse();
        } else {
          game.answeredwrong();
        }
  
      },
  
     
      answeredwrong: function(){
        clearInterval(timer);
        game.wrong++;
        $("#trivgame").html("<h2>This is what happens when an unstoppable force meets an immovable object. You're wrong!</h2>");
        $("#trivgame").append("<h3>The Correct Answer was: "+questions[game.currentQuestions].correctAnswer+"</h3>");
        if(game.currentQuestions==questions.length-1){
          setTimeout(game.results,3*1000);
        } else {
          setTimeout(game.nextQuestion,3*1000);
        }
      },

      correctresponse: function(){
        clearInterval(timer);
        game.correct++;
        $("#trivgame").html("<h2>You're right....Because you're the hero Gotham deserves, but not the one it needs right now.</h2>");
        if(game.currentQuestions==questions.length-1){
          setTimeout(game.results,3*1000);
        } else {
          setTimeout(game.nextQuestion,3*1000);
        }
      },
  
      }
  
    