// Main file that loads things up.
// Called from require.js

require.config({
   // baseUrl is automatically set to the directory where this main.js file is.
   // Or we can set it in this config:
   baseUrl: "app",
   // This way one can call on jquery and libs directly
   paths: {
      "lib": "../lib",
      "jquery": "../lib/jquery-2.1.3",
      "model": "model",
      "controller": "controller",
      "view": "view"
      // or the following to load remotely:
      // "jquery": "https://code.jquery.com/jquery-2.1.3.min"
   },
   waitSeconds: 15
});

// All other modules should be called through here
require(["jquery", "model", "controller", "view"],
function($, Model, Controller,view) {
   var model, controller, view;
   $(function() {
      console.log("Page loaded!");
      model = new Model();
      controller = new Controller(view, model);
      view = new View(model, controller);
   });
});
