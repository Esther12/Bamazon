create database bamazon;
use bamazon;
create table products(
	item_id int(20) not null auto_increment,
    product_name varchar(80),
    department_name varchar(50),
    price float(20),
    stock_quentity int(80),
	primary key(item_id)
);