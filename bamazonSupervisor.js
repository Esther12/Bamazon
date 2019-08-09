const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "123456",
    database : "bamazon"
})

connection.connect(function(err,res){
    if(err)
    console.log(err);
    menu();
})

function menu(){
    inquirer
    .prompt([
        {
            name : "choice",
            type : "list",
            message : "Select your action : ",
            choices : ["View Product Sales by Department","Create New Department"]
        }
    ]).then(function(data){
        var path = data.choice;
        switch(path){
            case "View Product Sales by Department" :
                return viewDepart();
            case "Create New Department" :
                return createNew();
            default :
                return disconnect();
        }
    })

}
function viewDepart(){
    connection.query("select departments.*, (sum(products.product_sales) - departments.over_head_costs ) as total_profit from departments left outer join products on departments.department_name = products.department_name group by departments.department_id;",
    function(err, res){
        console.log(res);
        menu();
    });
}

function createNew(){
    //console.log("createNew");
    inquirer
    .prompt([
        {
            name : "department",
            type : "input",
            message : "Insert the new department name : "
        },
        {
            name : "money",
            type : "input",
            message : "Insert the over head costs : "
        }
    ]).then(function(data){
        connection.query("insert into bamazon.departments (department_name,over_head_costs) values (?,?)",
            [
                data.department,
                data.money
            ],
            function(err, res){
                console.log(res);
                menu()
        });
    })
    
}

function disconnect(){
    //console.log("error");
    connection.end();

}