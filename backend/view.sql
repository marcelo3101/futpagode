CREATE VIEW jogo_com_criador AS
SELECT 
  Jogo.id as 'id jogo', 
  Jogo.data_hora_inicio, 
  Jogo.data_hora_termino, 
  nome as 'nome_criador', 
  CPF as 'CPF_criador' 
FROM Jogo
JOIN Reserva 
ON Jogo.Reserva_id = Reserva.id
JOIN Jogador
ON Reserva.reservador_CPF = Jogador.CPF;

DELIMITER //

CREATE PROCEDURE InscreverOuDesinscreverJogadorEmJogo (
  IN Jogador_CPF CHAR(11), 
  IN Jogo_id INTEGER
  )
BEGIN
  IF EXISTS(SELECT * FROM participacao_em_jogo WHERE participacao_em_jogo.Jogador_CPF = Jogador_CPF and participacao_em_jogo.Jogo_id = Jogo_id) THEN
    DELETE FROM participacao_em_jogo WHERE participacao_em_jogo.Jogador_CPF = Jogador_CPF and participacao_em_jogo.Jogo_id = Jogo_id;
  ELSE
    INSERT INTO participacao_em_jogo VALUES (Jogador_CPF, Jogo_id);
  END IF;
END //

DELIMITER ;