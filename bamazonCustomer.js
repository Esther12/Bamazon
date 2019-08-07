var mysql = require("mysql");
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
    })
    
}