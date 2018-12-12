var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "Bamazon"
});


function begin(){
connection.query("SELECT * FROM Products", function(err, result){
  if(err) throw err;
 console.log("Welcome to Bamazon! Home of 5 products.");
 
  for(var i = 0; i<result.length;i++){
    console.log("ID: " + result[i].item_id + " | " + "Product: " + result[i].product_name + " | " + "Department: " + result[i].department_name + " | " + "Price: " + result[i].price + " | " + "Quantity: " + result[i].stock_quantity);
  }

    inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Type the ID number of the product you would like to purchase",
        validate: function(value){
          if(isNaN(value) == false && parseInt(value) <= result.length && parseInt(value) > 0){
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?",
        validate: function(value){
          if(isNaN(value)){
            return false;
          } else{
            return true;
          }
        }
      }
  
      ]).then(function(input){
        var productName = (input.id)-1;
        var productQuantity = parseInt(input.quantity);
        var total = parseFloat(((result[productName].price) * productQuantity).toFixed(2));
        console.log(result[productName]);
        
        if(result[productName].stock_quantity >= productQuantity){
          connection.query("UPDATE Products SET ? WHERE ?", [
          {stock_quantity: (result[productName].stock_quantity - productQuantity)},
          {item_id: input.id}
          ], function(err, result){
              if(err) throw err;
              console.log("Purchase is complete. Your total is $" + total.toFixed(2));
              secondPrompt();
          });
        } else {
          console.log("INSUFFICIENT STOCK!");
          secondPrompt();
        }
    });
  });
};


connection.connect(function(err) {
  if (err) throw err;
begin ();
});

function secondPrompt() {
  inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Would you like to continue shopping or exit",
      choices: ["Keep shopping", "Exit"]
}])


.then(function(answer){
  if(answer.options === "Keep shopping") {
    begin();
  } else {
    connection.end();
  }
})
};