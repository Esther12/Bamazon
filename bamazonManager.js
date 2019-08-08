var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "123456",
    database : "bamazon"
})

connection.connect(function(err,data){
    if(err)
    console.log(err);
    menu(data);
})

function menu(){
    inquirer
    .prompt([
        {
            name : "menu",
            type : "list",
            message : "List a set of menu options:",
            choices : ["View Products for Sale", "View Low Inventory","Add to Inventory","Add New Product","Exit"]

        }
    ]).then(function(data){
        var res = data.menu;
        console.log(res);
        switch(res){
            case "View Products for Sale":
                return viewAll();
            case "View Low Inventory" :
                return lowInventory();
            case "Add to Inventory" :
                return addInventory();
            case "Add New Product" :
                return addNew();
            default:
                return disconnect();
        }
    })
}
function viewAll(){
   // console.log("viewAll");
   connection.query("select * from products",
   function(err,data){
        if(err)
        console.log(err);
        var rawData = "";
        for(let i = 0; i< data.length; i++){
            rawData += `id: ${data[i].item_id} || Name: ${data[i].product_name} || Department : ${data[i]. department_name} || Price : ${data[i].price} || Quentity : ${data[i].stock_quentity} \n`;
            
        }
        console.log(rawData);
        menu();
   })

}
function lowInventory(){
    connection.query("select * from products where stock_quentity < 5",
    function(err,data){
         if(err)
         console.log(err);
         var rawData = "";
         for(let i = 0; i< data.length; i++){
             rawData += `id: ${data[i].item_id} || Name: ${data[i].product_name} || Department : ${data[i]. department_name} || Price : ${data[i].price} || Quentity : ${data[i].stock_quentity} \n`;
             
         }
         console.log(rawData);
         menu();
    })

}
function addInventory(){
    inquirer
    .prompt([
        {
            name : "confirm",
            type : "confirm",
            message : "Add more ?"
        },
        {
            name : "item",
            type : "input",
            message : "Add to : "
        },
        {
            name : "amount",
            type : "input",
            message : "Amount : "
        }
    ]).then(function(data){
        console.log(data);
        if(data.confirm){
            connection.query("update products set stock_quentity = stock_quentity + ? where ?",
            [
                parseInt(data.amount),
                {
                    item_id : data.item
                },
            ],
            function(err,res){
                if(err)
                    console.log(err);
               console.log("Success!");
               viewAll();
            })
        }else{
            menu();
        }
    })

}
function addNew(){
    //console.log("addNew");
     inquirer
     .prompt([
         {
             name : "confirm",
             type : "confirm",
             message : "Do you want to add New Product ? "
         },
         {
             name : "p_name",
             type : "input",
             message : "Product Name : ",
         },
         {
             name : "p_depar",
             type : "input",
             message : "Department Name : "
         },
         {
             name : "price",
             type : "input",
             message : "Price of the Product : "
         },
         {
             name : "amount",
             type : "input",
             message : "Product Quantity : "
         }
     ]).then(function(data){
         if(data.confirm){
             connection.query("INSERT INTO bamazon.products ( product_name, department_name, price, stock_quentity) VALUES (?, ?, ?, ?);"
             ,[
               data.p_name,
               data.p_depar,
               data.price,
               data.amount
             ], function(err,res){
                if(err)
                console.log(err);
                console.log("Success!");
                viewAll();
             } )
         }else{
             menu();
         }
     })

}

function disconnect(){
    //console.log("error");
    connection.end();

}