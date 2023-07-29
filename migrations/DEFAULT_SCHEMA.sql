create or replace table USERS
(
    id       int primary key UNIQUE auto_increment,
    name     varchar(50) not null,
    surname  varchar(50) not null,
    email    varchar(50) not null,
    password varchar(50) not null
);

create or replace table RECIPES
(
    id        int primary key UNIQUE auto_increment,
    name      varchar(50) not null,
    instructions varchar(2000) default NULL,
    id_user   int         not null  references USERS(id)
);


create or replace table INGREDIENTS
(
    id   int primary key UNIQUE auto_increment,
    name varchar(50) not null

);

create or replace table QUANTITIES
(
    id_recipe     int not null  references RECIPES(id),
    id_ingredient int not null  references INGREDIENTS(id)
);

create or replace table STEPS
(
    id          int primary key UNIQUE auto_increment,
    name        varchar(50) not null,
    description varchar(50) not null
);
create or replace table RECIPE_STEPS
(
    id_recipe     int not null  references RECIPES(id),
    id_step int not null  references STEPS(id)
);
