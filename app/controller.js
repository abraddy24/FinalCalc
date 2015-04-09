// controller for the calcualtor that will help with the model and the view
define([ "jquery", "model" ],
	
	function($, model){

	function Controller(main, model){
		console.log("made it into controller.js");

			var i, m, $calculator, $ioField, $calculation, $collapsedCalculation, $input,
				$keyboardInput, $numbers, $operations, $memoryIndicator, addNumBtn, addOppBtn,
				getInput, toggleMemInd;
			i = 0;
			m = 0;
			$calculator = $("#calculator");
			$ioField = $("<div/>", { "class": "io-field" }).appendTo($calculator);
			$calculation = $("<div/>", { "class": "calculation" }).appendTo($ioField);
			$collapsedCalculation = $("<div/>", { "class": "collapsed-calculation" }).appendTo($ioField);
			$input = $("<div/>", { "class": "input", text: 0 }).appendTo($ioField);
			$keyboardInput = $("<input/>").appendTo($calculator).focus().css(
				{ opacity: 0, position: "absolute", top: 0 });
			$numbers = $("<div/>", { "class": "numbers" }).appendTo($calculator);
			$operations = $("<div/>", { "class": "operations" }).appendTo($calculator);
			$memoryIndicator = $("<div/>", { text: "M", "class": "memory-indicator" }).appendTo($ioField).hide();

			$.fn.addBtn = function(html, className, onclick){
				$("<div/>", {
				html: html,
				"class": "button" + className,
				click: onclick
				}).appendTo(this);
				return this;
			};

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

			addOppBtn = function(opp, click){
				$opp.addBtn(opp.buttonHTML, "operation" + opp.name, function(e){
					click.call(this,e);
					$calculation.text(InputStk.getCalculationString());
					$collapsedCalculation.text(InputStk.getCalculationString(true));
					$input.text(InputStk.getPartl());
					$input.data({ clearOnInput: true });
				});
			};

			getInput = function() {
				var input = $input.text();
				return input.match(/error/i) ? 0 : parseFloat($input.text());
			};

			toggleMemInd = function () {
				$memoryIndication[ m ? "show" : "hide" ]();
			};

			$calculator.click(function(){
				$keyboardInput.focus();
			});

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


			(function(){
				for (i in operationCalc){
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
				InputStk.evaluate(getInput());
			})();	
	}
	return Controller;
});

