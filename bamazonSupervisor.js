const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "123456",
    database : "bamazon"
});

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

}

function createNew(){
    
}

function disconnect(){
    //console.log("error");
    connection.end();

}