
insert into INGREDIENTS(name)values ("carote");
insert into INGREDIENTS(name)values ("cipolle");
insert into INGREDIENTS(name)values ("latte");
insert into INGREDIENTS(name)values ("uova");
insert into INGREDIENTS(name)values ("farina");
insert into INGREDIENTS(name)values ("aglio");
insert into INGREDIENTS(name)values ("pomodori");
insert into INGREDIENTS(name)values ("zucchero");
insert into INGREDIENTS(name)values ("carote");
insert into INGREDIENTS(name)values ("carote");
insert into INGREDIENTS(name)values ("carote");
insert into INGREDIENTS(name)values ("patate");
insert into RECIPE_STEPS (id_recipe, id_step) values (3,2);
insert into RECIPE_STEPS (id_recipe, id_step) values (3,3);
insert into RECIPE_STEPS (id_recipe, id_step) values (3,4);
insert into RECIPES( name, instructions, description)values ("patate sabbiose",null,"patate al forno con pangrattato");
insert into STEPS( name, description) values ("tagliare le patate","tagliare le patate con una mandolina");
insert into STEPS( name, description) values ("condire","condire le patate con sale olio e pangrattato");
insert into STEPS( name, description) values ("cottura","cuocere in forno a 200 gradi fino a doratura");
insert into QUANTITIES(id_recipe, id_ingredient) values (1,1);
insert into QUANTITIES(id_recipe, id_ingredient) values (1,2);
insert into QUANTITIES(id_recipe, id_ingredient,quantity) values (3,12,"500 grammi");
insert into QUANTITIES(id_recipe, id_ingredient,quantity) values (3,1,"500 grammi");

insert into STEPS(name, description)values ("step1","eseguire step1");
insert into RECIPE_STEPS(id_recipe, id_step)values (1,1);

select * from STEPS left join RECIPE_STEPS  on RECIPE_STEPS.id_step = STEPS.id where RECIPE_STEPS.id_recipe=1