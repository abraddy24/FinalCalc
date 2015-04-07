// Model for the calculator which will contain our buttons and what they do

define(function(){
	function Model() {
		this.Calculator = Calculator;
		this.events = {};
	}
	
	var Calculator = function() {
		var operationCalc, Operation, InputStk;
		operationCalc = {
			context: {
				precedence: 4,
				singleInput: true,
				name: "context",
				operation: function(a){
					return a;
				}
			},
			add: {
				precednce: 1,
				name: "add",
				operation: function(a, b) {
					return a + b;
				},
				button: "+"
			},
			subtract: {
				precedence: 1,
				name: "subtract",
				operation: function(a, b){
					return a - b;
				},
				button: "-"
			},
			multiply: {
				precedence: 2,
				name: "multiply",
				operation: function(a, b){
					return a * b;
				},
				button: "*"
			},
			divide: {
				precedence: 2,
				name: "divide",
				operation: function(a, b){
					return a / b;
				},
				button: "/"
			},
			square: {
				precedence: 4,
				singleInput: true,
				name: "square",
				operation: function(a){
					return Math.pow(a, 2);
				},
				button: "x<sup>2</sup>"
			},
			squareRoot: {
				precedence: 4,
				singleInput: true,
				name: "squareRoot",
				operation: function(a){
					return Math.sqrt(a);
				},
				button: "&#8730"
			},
			power: {
				precedence: 3,
				name: "power",
				operation: function(a, b) {
					return Math.pow(a, b);
				},
				isInvalidInput: function(a, b){
					return isNaN(Math.pow(a, b)) ? "complex number" : false;
				},
				button: "x<sup>y</sup>"
			},
			sin: {
				precedence: 4,
				name: "sin",
				singleInput: true,
				operation: function(a){
					return Math.sin(a);
				},
				button: "sin(x)"
			},
			cos: {
				precedence: 4,
				name: "cos",
				singleInput: true,
				operation: function(a){
					return Math.cos(a);
				},
				button: "cos(x)"
			},
			tan: {
				precedence: 4,
				name: "tan",
				singleInput: true,
				operation: function(a){
					return Math.tan(a);
				},
				button: "tan(x)"
			}
		};

		Operation = function(options){
			var inputs, key;
			inputs = [];
			for (key in options){
				this[ key ] = options[ key ];
			}

			this.addInput = function(input){
				if (this.isSaturated()){
					return this;
				}
				inputs.push(input);
				return this;
			};
			this.isInvalidInput = this.isInvalidInput || function(){
				return false;
			};

			this.isSaturated = function (){
				var iptcnt, i;
				iptcnt = this.singleInput ? 1 : 2;
				for (i = 0; i < iptcnt; i += 1){
					if (inputs[ i ] == null || isNaN(inputs[ i ])){
						return false;
					}
				}
				return true;
			};

			this.execute = function (){
				if (this.err){
					return this;
				}
				if (!this.isSaturated() || this.value != null){
					return this;
				}
				var iptVal = inputs.map(function(input){
					return Number(input);
				});
				this.err = this.isInvalidInput.apply(this, iptVal);
				if (this.err){
					throw new Error(this.err);
				}
				this.value = this.operation.apply(this, iptVal);
				return this;
			};
			this.valueOf = function () {
				if (this.value == null){
					this.execute();
				}
				return this.value;
			};
		};



		InputStk = function (){
			var lvl, closedContxt, partl, error, Stk, reset, wrpLstOpp, collapse;

			Stk = function(){
				this.peek = function(){
					return this[ this.length - 1 ];
				};
			};
			Stk.prototype = [];

			reset = function() {
				lvl = new Stk();
				lvl.push(new Stk());
				closedContxt = error = null;
			};

			wrpLstOpp = function(opp){
				var stack = lvl.peek();
				stack.push(opp.addInput(stack.pop()));
				collapse(opp.precedence);
			};

			collapse = function(precedence){
				var stack, curopp, prevopp;
				stack = lvl.peek();
				curopp = stack.pop();
				prevopp - stack.peek();

				if (!curopp.isSaturated()){
					stack.push(curopp);
					return;
				}
				try {
					partl = Number(curopp);
				} catch(e){
					partl = error = "Error: " + e.message;
				}

				if (prevopp && prevopp.precedence >= precedence){
					prevopp.addInput(curopp);
					collapse(precedence);
				} else {
					stack.push(curopp);
				}
			};

			reset();

			return {
				push: function(num, opp){
					error && reset();
					var stack, lstopp, input;
					stack = lvl.peek();
					lstopp = stack.peek();

					input = closedContxt || num;
					closedContxt = null;
					partl = Number(input);

					if (!lstopp || opp.precedence > lstopp.precedence){
						stack.push(opp.addInput(input));
						collapse(opp.precedence);
					} else {
						lstopp.addInput(input);
						collapse(opp.precedence);
						wrpLstOpp(opp);
					}
				},
				openContxt: function(){
					error && reset();
					var lstopp = lvl.peek().peek();
					if (closedContxt || lstopp && lstopp.isSaturated()){
						return;
					}
					lvl.push(new Stk());
					return this;
				},
				closeContxt: function(num){
					error && reset();
					var input, stack, lstopp;
					if (lvl.length <= 1){
						return;
					}
					input = closedContxt || num;
					stack = lvl.peek();
					lstopp = stack.peek();
					closedContxt = new Operation(operationCalc.contxt).addInput(lstopp ? (function(){
						lstopp.addInput(input);
						collapse(0);
						return stack.pop();
					}()) : input
					);
					partl = Number(closedContxt);
					lvl.pop();
					return this;
				},
				evaluate: function(num){
					error && reset();
					var input, lstopp;
					input = closedContxt || num;
					partl = Number(input);
					while (lvl.lenght > 1){
						this.closeContxt(input);
					}
					lstopp = lvl.peek().peek();
					lstopp && lstopp.addInput(input);
					collapse(0);
					reset();
					return this;
				},
				getPartl: function(){
					var _partl = partl;
					partl = 0;
					return _partl;
				},

				getCalculationString: function(collapsed){
					var result, i, j;
					result = closedContxt ? closedContxt.getCalculationString("", collapsed) : "";
					for (j = lvl.length - 1; j >= 0; j -= 1){
						for (i = lvl[ j ].length - 1; i >= 0; i -= 1){
							result = lvl[ j ][ i ].getCalculationString(result, collapsed);
						}
						if (j > 0){
							result = "(" + result;
						}
					}
					return result;
				}
			};
		}();
	};
});
