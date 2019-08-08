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

create table departments(
	department_id int(20) not null auto_increment,
    department_name varchar(50),
    over_head_costs int(10) default 5,
    primary key(department_id)
);