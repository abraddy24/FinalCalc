//Model for the calculator which will contain our buttons and what they do
   
var Calculator = (function() {

	var operationCalc = {
		context: {
			precedence: 4, 
			singleInput: true,
			name: "context",
			operation: function(a){
				return a;
			}
			
		}
		add: {
			precednce: 1,
			name: "add",
			operation: function(a,b) {
				return a + b;
			},
			button: "+";
		},
		subtract: {
			precedence: 1,
			name: "subtract",
			operation: function(a,b){
				return a - b;
			},
			button: "-";
		},
		multiply: {
			precedence: 2,
			name: "multiply",
			operation: function(a,b){
				return a * b;
			},
			button: "*";
		},
		divide: {
			precedence: 2,
			name: "divide",
			operation: function(a,b){
				return a / b;
			},
			button: "/";
		},
		square: {
			precedence: 4,
			singleInput: true,
			name: "square",
			operation: function(a){
				return Math.pow(a,2);
			},
			button: "x<sup>2</sup>";
		},
		squareRoot: {
			precedence: 4,
			singleInput: true,
			name: "squareRoot",
			operation: function(a){
				return Math.sqrt(a);
			},
			button: "&#8730";
		},
		power: {
			precedence: 3,
			name: "power",
			operation: function(a,b) {
				return Math.pow(a,b);
			},
			isInvalidInput: function(a,b){
				return isNan(Math.pow(a,b)) ? "complex number" : false;
			},
			button: "x<sup>y</sup>";
		},
		sin: {
			precedence: 4,
			name: "sin",
			singleInput: true,
			operation: function(a){
				return Math.sin(a);
			},
			button: "sin(x)";
		},
		cos: {
			precedence: 4,
			name: "cos",
			singleInput: true,
			operation: function(a){
				return Math.cos(a);
			},
			button: "cos(x)";
		},
		tan: {
			precedence: 4,
			name: "tan",
			singleInput: true,
			operation: function(a){
				return Math.tan(a);
			},
			button: "tan(x)";
		}
	}

	var Operation = functino(options){
		var inputs = [];
		for( var key in options){
			this[key] = options[key];
		};

		this.addInput = function(input){
			if(this.isSaturated()){
				return this;
			}
			inputs.push(input);
			return this;
		};
		this.isInvalidInput = this.isInvalidInput || function(){
			return false;
		};

		this.isSaturated = function (){
			var iptcnt = this.singleInput ? 1 : 2;
			for(var i = 0; i < iptcnt; i += 1){
				if(inputs[i] == null || isNan(inputs[i])){
					return false;
				}
			}
			return true;
		};

		this.execute = function (){
			if(this.err){
				return this;
			}
			if(!this.isSaturated() || this.value != null){
				return this;
			}
			var iptVal = inputs.map(function(input){
				return number(input);
			});
			this.err = this.isInvalidInput.apply(this, iptVal);
			if(this.err){
				throw new Error(this.err);
			}
			this.value = this.operation.apply(this, iptVal);
			return this;
		};
		this.valueOf = function () {
			if(this.value == null){
				this.execute();
			}
			return this.value;
		}
	}



	var InputStk = (function (){
		var lvl, contxt, partl, err, Stk;

		Stk = function(){
			this.peek = function(){
				return this[this.length - 1];
			}
		}
		stack.prototype = [];

		var reset = function() {
			lvl = new Stk;
			lvl.push(new Stk);
			contxt = err = null;
		};

		var wrpLstOpp = function(opp){
			var stack = lvl.peek();
			stack.push(opp.addInput(stack.pop()));
			collapse(opp.precedence);
		};

		var collapse = function(precedence){
			var stack, curopp, prevopp;
			stack = lvl.peek();
			curopp = stack.pop();
			prevopp - stack.peek();

			if(!curopp.isSaturated()){
				stack.push(curopp);
				return;
			}
			try{
				partl = Number(curopp);
			}
			catch(e){
				partl = err = "Error: " + e.message;
			}

			if(prevopp && prevopp.precedence >= precedence){
				prevopp.addInput(curopp);
				collapse(precedence);
			}
			else{
				stack.push(curopp);
			}
		};

		reset();

		return{
			push: function(num, opp){
				err && reset();
				var stack = lvl.peek();
				var lstopp = stack.peek();

				var input = closeContxt || number;
				closeContxt = null;
				partl = Number(input);

				if(!lstopp || operation.precedence > lstopp.precedence){
					stack.push(operation.addInput(input));
					collapse(operation.precedence);
				} 
				else{
					lstopp.addInput(input);
					collapse(operation.precedence);
					wrpLstOpp(operation);
				}
			},
			openContxt: function(){

			},
			closeContxt: function(num){

			},
			evaluate: function(num){

			},
			getPartl: function(){
				var _partl = partl;
				partl = 0;
				return _partl;
			},
		};
	}());
})
