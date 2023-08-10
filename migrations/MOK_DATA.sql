
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
insert into RECIPES( name, instructions, description)values ("patate sabbiose",null,"patate al forno con pangrattato");
insert into QUANTITIES(id_recipe, id_ingredient) values (1,1);
insert into QUANTITIES(id_recipe, id_ingredient) values (1,2);
insert into STEPS(name, description)values ("step1","eseguire step1");
insert into RECIPE_STEPS(id_recipe, id_step)values (1,1);

select * from STEPS left join RECIPE_STEPS  on RECIPE_STEPS.id_step = STEPS.id where RECIPE_STEPS.id_recipe=1