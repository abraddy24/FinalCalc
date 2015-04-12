# Structure
# Model

Model contains the actual calculations for the calculator.  It also contains how each operation is evaluated and how input is recieved and interpreted.  operationCalc contains all the math buttons, thier order of operations precedence, and the function that actually makes the calculations.  Operation is how the data is sent into the operationCalc variable.  These functions arrange the data into their proper operationCalc methods.  The inputStk variable is the data stucture that takes the input and arranges it properly for Operation and operationCalc to use.

# Controller

Our controller gets the view's elements and interprets them for the model, while assisting the view in its creation.

# View

View creates the user interface and is linked to the controller, waiting for user input to change the model.

* CSS tells the view what styles to use for the various elements.
      
# Index.html

This file links everything together to run it as a web page.  It references main.js to get all of this information

# Main.js

This file holds all the files together.
