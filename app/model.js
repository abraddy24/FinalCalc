//Model for the calculator which will contain our buttons and what they do
   
define(["jquery"], function($){
	var number, newnumber, operator, totaldiv;
	//first input from clicks from user
	number = "";
	//second number user clicks on
	newnumber = "";
	//math operator user clicks on
	operator = "";
	//div that is the box showing numbers and equation
	totaldiv = $(#total);
	totaldiv.text("0"); //default value in box when loaded 

	//function that registers number clicks to display in box
	$(#numbers).click(function(){
		number += $(this).text();
		totaldiv.text(number);
	})





	


	//function doing calculations with simple math equations will expand later
    $("#equals").click(function(){
    	if (operator === "+"){
    		number = (parseFloat(number, 10) + parseInt(newnumber,10)).toString(10);
    	} else if (operator === "-"){
    		number = (parseFloat(newnumber, 10) - parseInt(number,10)).toString(10);
    	} else if (operator === "÷"){
    		number = (parseFloat(newnumber, 10) / parseInt(number,10)).toString(10);
    	} else if (operator === "×"){
    		number = (parseFloat(newnumber, 10) * parseInt(number,10)).toString(10);
    	}
   }
});
