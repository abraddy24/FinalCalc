/*
 * calculator test
 *
 * Test file for model.js
 * Test file for your collection class
 */
var expect, Calculator;

expect = require('./chai.js').expect;

Calculator = require('./model.js');

describe("Basic math functions", function(){
	var opp = Calculator.Operation;
	var oppDat = Calculator.operatoinCalc;
	it("addition adds properly", function(){
		expect((new opp(oppDat.add).addInput(1).addInput(2).valueOf()).to.equal(3));
	});
	it("subtraction subtracts properly", function(){
		expect((new opp(oppDat.subtract).addInput(3).addInput(2).valueOf()).to.equal(1));
	});
	it("multiplication multiplies properly", function(){
		expect((new opp(oppDat.multiply).addInput(2).addInput(4).valueof()).to.equal(8));
	});
	it("division divides properly", function(){
		expect((new opp(oppDat.divide).addInput(8).addInput(4).valueOf()).to.equal(2));
	});
});

describe("Power math functions", function(){
	var opp = Calculator.Operation;
	var oppDat = Calculator.operatoinCalc;
	it("Square works properly", function(){
		expect((new opp(oppDat.square).addInput(2).valueOf()).to.equal(4));
	});
	it("Power works properly", function(){
		expect((new opp(oppDat.power).addInput(3).addInput(2).valueOf()).to.equal(9));
	});
	it("square root works properly", function(){
		expect((new opp(oppDat.sqareRoot).addInput(16).valueof()).to.equal(4));
	});
});

describe("Sine, Cosine, Tanget math functions", function(){
	var opp = Calculator.Operation;
	var oppDat = Calculator.operatoinCalc;
	it("Calculate sine properly", function(){
		expect((new opp(oppDat.sin).addInput(90).valueOf()).to.equal(1));
	});
	it("Calculate cosine properly", function(){
		expect((new opp(oppDat.cos).addInput(180).valueOf()).to.equal(-1));
	});
	it("Calculate tanget properly", function(){
		expect((new opp(oppDat.tan).addInput(45).valueof()).to.equal(1));
	});
});

