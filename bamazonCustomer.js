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

function buyProducts(){
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
            if(err)
            console.log(err);
            var sum = parseInt(data[0].stock_quentity) - parseInt(product.amount);
            console.log(sum);
            if(data[0].stock_quentity > product.amount){
                connection.query("update products set ? where ?",
                    [
                        {
                            stock_quentity : sum
                        },
                        {
                            item_id : product.item_id
                        }
                    ],function(err,res){
                        if(err)
                        console.log(err);
                    }
                )
                connection.query("SELECT * FROM products where ?",
                        {
                            item_id : product.item_id
                        }
                    ,function(err,res){
                        if(err)
                        console.log(err);
                        var value = 0;
                        value = sum * res[0].price;
                        console.log(`
                        Here is your recipt : 
                        $${value} in total!
                        thank you!!
                        `);
                    }
                )
            }else{
                console.log("Insufficient quantity!");
            }
            
        });
    })
}