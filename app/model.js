//Model for the calculator which will contain our buttons and what they do
   
var Calculator = (function() {
	var operation = {
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
})
