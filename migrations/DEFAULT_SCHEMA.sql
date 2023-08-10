create or replace table RECIPES
(
    id           int primary key UNIQUE auto_increment,
    name         varchar(50)   not null,
    description  varchar(2000) NOT NULL,
    instructions varchar(2000) default NULL
);


create or replace table INGREDIENTS
(
    id   int primary key UNIQUE auto_increment,
    name varchar(50) not null

);

create or replace table QUANTITIES
(
    id_recipe     int          not null references RECIPES (id),
    id_ingredient int          not null references INGREDIENTS (id),
    quantity      varchar(200) not null
);

create or replace table STEPS
(
    id          int primary key UNIQUE auto_increment,
    name        varchar(50) not null,
    description varchar(50) not null
);
create or replace table RECIPE_STEPS
(
    id_recipe int not null references RECIPES (id),
    id_step   int not null references STEPS (id)
);
