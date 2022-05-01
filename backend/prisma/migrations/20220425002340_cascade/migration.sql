-- DropForeignKey
ALTER TABLE `participacao_em_jogo` DROP FOREIGN KEY `fk_Jogador_has_Jogo_Jogador1`;

-- DropForeignKey
ALTER TABLE `participacao_em_jogo` DROP FOREIGN KEY `fk_Jogador_has_Jogo_Jogo1`;

-- AddForeignKey
ALTER TABLE `participacao_em_jogo` ADD CONSTRAINT `fk_Jogador_has_Jogo_Jogador1` FOREIGN KEY (`Jogador_CPF`) REFERENCES `Jogador`(`CPF`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `participacao_em_jogo` ADD CONSTRAINT `fk_Jogador_has_Jogo_Jogo1` FOREIGN KEY (`Jogo_id`) REFERENCES `Jogo`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
