-- DropForeignKey
ALTER TABLE `Reserva` DROP FOREIGN KEY `fk_Reserva_Campo1`;

-- DropForeignKey
ALTER TABLE `Reserva` DROP FOREIGN KEY `fk_Reserva_Jogador1`;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `fk_Reserva_Campo1` FOREIGN KEY (`Campo_id`) REFERENCES `Campo`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `fk_Reserva_Jogador1` FOREIGN KEY (`reservador_CPF`) REFERENCES `Jogador`(`CPF`) ON DELETE CASCADE ON UPDATE NO ACTION;
