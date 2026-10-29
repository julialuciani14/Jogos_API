CREATE DATABASE Game;

use Game;

CREATE TABLE jogos (
id_jogos INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (200) NOT NULL,
desenvolvedora varchar (100) NOT NULL,
sinopse_jogos TEXT NOT NULL,
id_genero int,
FOREIGN KEY (id_genero) REFERENCES genero(id_genero)

);

INSERT INTO jogos (nome, desenvolvedora, sinopse_jogos, id_genero) VALUES
("Plants vs. Zombies", "PopCap Games", "O jogador utiliza diferentes plantas para defender sua casa contra ondas de zumbis.", 1);

CREATE TABLE genero (
id_genero INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (200) NOT NULL,
descricao TEXT NOT NULL
);


insert into genero (nome,descricao) values 
("Estratégia","O jogo consiste em proteger a casa do jogador contra ondas de zumbis usando diferentes tipos de plantas, cada uma com habilidades específicas.");