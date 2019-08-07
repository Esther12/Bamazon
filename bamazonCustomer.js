var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host : "localhost",
    root : 3306,
    user : "root",
    password : "123456",
    database : "bamazon"
})

connection.connect(function(err,data){
    if(err)
    console.log(err);
    displayAll();
    
})

function displayAll(){
    connection.query("SELECT * FROM products", function(err, data) {
        var rawData = "";
    for(let i = 0; i< data.length; i++){
        rawData += `id: ${data[i].item_id} || Name: ${data[i].product_name} || Department : ${data[i]. department_name} || Price : ${data[i].price} || Quentity : ${data[i].stock_quentity} \n`;
        
    }
    console.log(rawData);
    buyProducts();
    })
    
}

function menue(){
    inquirer
    .prompt([
        {
            name : "item_id",
            type : "input",
            message : "Insert the Item Id that you want to purches : "
        },
        {
            name : "amount",
            type : "input",
            message : "Insert the amount that you want to purches : "
        }
    ]).then(function(product){
        connection.query("SELECT * FROM products where ?", 
        {
            item_id : product.item_id
        },
        function(err, data) {
            var sum = parseInt(data.stock_quantity) - parseInt(product.amount);
            if(data.stock_quantity > product.amount){
                connection.query("updated products set ? where ?",
                [
                    {
                        stock_quantity : sum
                    },
                    {
                        item_id : product.item_id
                    }
                ],function(res){
                    // var value = 0;
                    // value = sum * res.
                    console.log(res);
                }
            )
            }else{
                console.log("Insufficient quantity!");
            }
            
        });
    })
}