create database projeto
use projeto

create table sala(
	sala_id int primary key identity,
	nome varchar(50) unique not null,
	status_sala int not null
)

select * from sala where status_sala = 1

select count(*) as 'find' from sala where sala_id = 1

select count(*) as 'find' from sala where nome = '' 

insert into sala values('sala teste 1',1),('sala teste 2',1),('sala teste 3',1)

update sala set nome = 'teste bd' where sala_id = 1

update sala set status_sala = 0 where sala_id = 1

create table questao(
	quest_id int primary key identity,
	texto varchar(500) not null,
	id_sala int, 
	status_quest int
	foreign key (id_sala) references sala(sala_id)
)

select * from questao where status_quest = 1;

select q.quest_id, q.texto, q.id_sala, s.nome from questao as q, sala as s where q.id_sala = s.sala_id and q.id_sala = 1 and q.status_quest = 1;

select * from questao where id_sala = 1 and status_quest = 1

insert into questao values('Teste texto questao A3',2,1);

update questao set texto = 'aaaaaa' where quest_id = 1;

update questao set status_quest = 0 where quest_id = 1;

select count(*) as 'find' from questao where quest_id = 1

create table aluno(
	aluno_id int primary key identity,
	rg varchar(9) unique not null
)

select * from aluno order by aluno_id

insert into aluno values('123456789'),('222222222'),('333333333')

select count(*) as 'find' from aluno where rg = '333333333'

create table resposta(
	id_aluno int,
	id_questao int,
	habilidade int,
	desafio int,
	foreign key(id_aluno) references aluno(aluno_id),
	foreign key(id_questao) references questao(quest_id),
)

insert into resposta values(1,1,2,3),(1,2,1,2),(1,3,3,3)

select * from resposta where id_questao = 2