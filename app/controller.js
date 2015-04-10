// controller for the calcualtor that will help with the model and the view
define([ "jquery", "model" ],

	function($, model){
	var model = document.getElementById("Model");

	function Controller(main, model){
		console.log("made it into controller.js");

			var i, m, $calculator, $ioField, $calculation, $collapsedCalculation, $input,
				$keyboardInput, $numbers, $operations, $memoryIndicator, addNumBtn, addOppBtn,
				getInput, toggleMemInd;
			i = 0;
			m = 0;
			//calculator as a whole
			$calculator = $("#calculator");
			//input-output field in calculator
			$ioField = $("<div/>", { "class": "io-field" }).appendTo($calculator);
			//calclulation that is to be processed
			$calculation = $("<div/>", { "class": "calculation" }).appendTo($ioField);
			//processed calculation in terms of precedence
			$collapsedCalculation = $("<div/>", { "class": "collapsed-calculation" }).appendTo($ioField);
			//user input for calculation
			$input = $("<div/>", { "class": "input", text: 0 }).appendTo($ioField);
			//gets keyboard input
			$keyboardInput = $("<input/>").appendTo($calculator).focus().css(
				{ opacity: 0, position: "absolute", top: 0 });
			//gets number representation for buttons
			$numbers = $("<div/>", { "class": "numbers" }).appendTo($calculator);
			//gets operation buttons
			$operations = $("<div/>", { "class": "operations" }).appendTo($calculator);
			//gets memmory indicator for recall of previous calculations
			$memoryIndicator = $("<div/>", { text: "M", "class": "memory-indicator" }).appendTo($ioField).hide();

			//gets on click listeners
			$.fn.addBtn = function(html, className, onclick){
				$("<div/>", {
				html: html,
				"class": "button" + className,
				click: onclick
				}).appendTo(this);
				return this;
			};

			//adds number buttons to calculator
			addNumBtn = function(number) {
				$numbers.addBtn(number, "number" + (number === "." ? "dot" : "number-" + number), function(){
					if ($input.text().match(/\./) && number === "."){
						return;
					}
					if ($input.text() === "0" && number !== "." || $input.data("clearOnInput")){
						$input.text("");
					}
					$input.data({ clearOnInput: false });
					$input.text($input.text() + $(this).text());	
				});
			};

			//adds operation buttons to calculator
			addOppBtn = function(opp, click){
				$operations.addBtn(opp.buttonHTML, "operation" + opp.name, function(e){
					click.call(this,e);
					$calculation.text(InputStk.getCalculationString());
					$collapsedCalculation.text(InputStk.getCalculationString(true));
					$input.text(InputStk.getPartl());
					$input.data({ clearOnInput: true });
				});
			};

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
			$calculator.click(function(){
				$keyboardInput.focus();
			});

			//evaluates keyboard inputs
			$(window).keydown(function(e){
				setTimeout(function(){
					var val = $keyboardInput.val();
					$keyboardInput.val("");
					switch (e.keyCode){
						case 13: $(".button.evaluate").click; break;
						case 110: case 188: case 190: $(".button.dot").click(); break;
						case 8: $(".button.del").click(); break;
						case 46: $("button.clear-entry").click(); break;
						case 27: $(".button.clear").click(); break;
						default:
							$calculator.find("button").each(function(){
								if (val === $(this).text()){
									$(this).click();
								}
							});
					}
				}, 0);
			});
			//creates buttons
			$numbers.addBtn("&larr;", "del", function (){
				$input.text($input.text().replace(/.$/, ""));
				$input.text().length || $input.text("0");
			});
			$numbers.addBtn("CE", "clear-entry", function(){
				input.text("0");
			});
			$numbers.addBtn("C", "clear", function(){
				$("#calculator .evaluate").click();
				$input.text("0");
			});
			$.each("7894561230.".split(""), function(){
				addNumBtn(this.toString());
			});

			$operations.addBtn("MR", "memRecall", function(){
				input.text("m");
			});

			$operations.addBtn("MS", "memSave", function(){
				m = getInput();
				toggleMemInd();
			});

			$operations.addBtn("M-", "memSub", function(){
				m -= getInput();
				toggleMemInd();
			});

			$operations.addBtn("M+", "memAdd", function(){
				m += getInput();
				toggleMemInd();
			});

			addOppBtn({ buttonHTML: "(", name: "openContext" }, function(){
				InputStk.openContxt();
			});

			addOppBtn({ buttonHTML: ")", name: "closedContext" }, function(){
				InputStk.closeContxt(getInput());
			});

			//checks to see if buttons are created in HTML objects
			(function(){
				for (i in model.operationCalc){
					(function(i){
						if (!operationCalc[ i ].buttonHTML){
							return;
						}
						addOppBtn(operationCalc[ i ], function(){
							InputStk.push(getInput(), new Operation(operationCalc[ i ]));
						});
					}(i));
				}
			}());
			addOppBtn({ buttonHTML: "=", name: "evaluate" }, function(){
				model.InputStk.evaluate(getInput());
			}());	
	}
	return Controller;
});

