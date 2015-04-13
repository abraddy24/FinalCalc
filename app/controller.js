// controller for the calcualtor that will help with the model and the view
define([ "jquery", "model", "view" ],

	function($, model, view){
	//var InputSactk;
	//console.log(model.InputStk);
	
	//console.log(InputStack);

	function Controller(view, model){
		console.log("made it into controller.js");	
			//gets input from ioField
			getInput = function() {
				var input = $input.text();
				return input.match(/error/i) ? 0 : parseFloat($input.text());
			};

			//toggles the display to show memory is being accessed
			toggleMemInd = function () {
				$memoryIndication[ m ? "show" : "hide" ]();
			};

			//checks for keyboard inputs
			this.view.$calculator.click(function(){
				$keyboardInput.focus();
			});	
	}
	return Controller;
});

