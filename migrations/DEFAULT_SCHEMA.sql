create table  RECIPES
(
    id           INT primary key UNIQUE auto_increment,
    name         varchar(50)   not null,
    description  varchar(2000) NOT NULL,
    instructions varchar(2000) default NULL
);


create  table INGREDIENTS
(
    id   int primary key UNIQUE auto_increment,
    name varchar(50) not null

);

create  table QUANTITIES
(
    id_recipe     int          not null references RECIPES (id),
    id_ingredient int          not null references INGREDIENTS (id),
    quantity      varchar(200) not null
);