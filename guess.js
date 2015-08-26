
var newNum = function(){
	return Math.round(Math.random()*100);
}

var checkGuessDist = function(guess, answer, lastGuess){

	// if distance between answer and guess is less than answer and
	// lastGuess, then the user is getting warmer and vice-versa
	var guessDist = Math.abs(answer-guess);
	var lastDist = Math.abs(answer-lastGuess);

	if (guessDist < 10){
		return "You are super close!"
	}
	else if (guessDist < lastDist){
		return "That was better than your last guess!"
	}
	else {
		return "Your guess is further away. THE LAVA IS APPROACHING QUICKLY!"
	}

}

$(document).ready(function(){
	var countGuesses = function(){
		$('#remaining').text(remainingGuesses);
		if (guesses.length > 0){
			$('.gList').text("Guesses are "+guesses);
		}
		else {
			$('.gList').text("");
		}
	}

	var newGame = function(){
		answer = newNum();
		remainingGuesses = 5;
		guesses = [];
		lastGuess = 50;
		countGuesses();
		$('#hintText').text("");
		$('.lava').fadeIn();
		$('.island').fadeOut();
	}

	newGame();
	
	// var answer = newNum();
	// var remainingGuesses = 5;
	// var guesses = [];
	// // init the "last guess" at 50 so user knows if they're in 
	// // correct half of the range of answers on first guess
	// var lastGuess = 50;

	countGuesses();

	$("#submitGuess").on('click', function(event){
		guess = $("#userGuess").val();
		if (+guess === answer){
			$('.notify').text("YOU HAVE GUESSED CORRECTLY AND ESCAPED THE LAVA!");
			$('.lava').fadeOut();
			$('.island').fadeIn();
			$('#ocean').css('display', 'block');
		}

		else if ($.inArray(guess, guesses) >= 0) {
			$('.notify').text("YOU'VE ALREADY GUESSED THAT!");
		}

		else {
			// add guess to list of guesses
			guesses.push(guess);
			// add hot or cold text
			$('.notify').text(checkGuessDist(guess, answer, lastGuess));
			lastGuess = guess;
			remainingGuesses--;
			if (remainingGuesses === 0){
				$('.notify').text("THE LAVA BURNS YOU TO A CRISP! GAME OVER!")
			}
			countGuesses();
		}
		event.preventDefault();

	})


	$('#hint').on('click', function(){
		remainingGuesses--;
		countGuesses();
		$('#hintText').text("Hint: the answer is "+answer);
	})

	// reset the remaining guesses counter, clear the guesses array
	// reset lastGuess
	// pick a new answer
	// display "new number picked" or something to that effect
	$('#giveup').on('click', function(){
		alert("THE ANSWER WAS "+answer+"!");
		newGame();
	})


});