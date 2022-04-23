-- MySQL Script generated by MySQL Workbench
-- sex 22 abr 2022 17:54:52
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema futpagode
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema futpagode
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `futpagode` ;
USE `futpagode` ;

-- -----------------------------------------------------
-- Table `futpagode`.`Ranking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Ranking` (
  `nivel` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`nivel`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`Jogador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Jogador` (
  `CPF` CHAR(11) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `data_de_nascimento` DATE NOT NULL,
  `Ranking` INT NOT NULL,
  `foto` BLOB NULL,
  PRIMARY KEY (`CPF`),
  INDEX `fk_Jogador_Ranking1_idx` (`Ranking` ASC) VISIBLE,
  CONSTRAINT `fk_Jogador_Ranking1`
    FOREIGN KEY (`Ranking`)
    REFERENCES `futpagode`.`Ranking` (`nivel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`DonoDeCampo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`DonoDeCampo` (
  `CPF` CHAR(11) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `foto` BLOB NULL,
  PRIMARY KEY (`CPF`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`Cidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Cidade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`Campo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Campo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `preco_hora` DECIMAL(6,2) NOT NULL,
  `horario_de_funcionamento` VARCHAR(45) NOT NULL,
  `CEP` CHAR(8) NOT NULL,
  `Complemento` VARCHAR(90) NOT NULL,
  `Bairro` VARCHAR(45) NOT NULL,
  `dono_CPF` CHAR(11) NOT NULL,
  `Cidade_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Campo_DonoDeCampo1_idx` (`dono_CPF` ASC) VISIBLE,
  INDEX `fk_Campo_Cidade1_idx` (`Cidade_id` ASC) VISIBLE,
  CONSTRAINT `fk_Campo_DonoDeCampo1`
    FOREIGN KEY (`dono_CPF`)
    REFERENCES `futpagode`.`DonoDeCampo` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Campo_Cidade1`
    FOREIGN KEY (`Cidade_id`)
    REFERENCES `futpagode`.`Cidade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`Reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Reserva` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `preco` DECIMAL(6,2) NOT NULL,
  `data_hora_inicio` DATETIME NOT NULL,
  `data_hora_termino` DATETIME NOT NULL,
  `Campo_id` INT NOT NULL,
  `reservador_CPF` CHAR(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Reserva_Campo1_idx` (`Campo_id` ASC) VISIBLE,
  INDEX `fk_Reserva_Jogador1_idx` (`reservador_CPF` ASC) VISIBLE,
  CONSTRAINT `fk_Reserva_Campo1`
    FOREIGN KEY (`Campo_id`)
    REFERENCES `futpagode`.`Campo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reserva_Jogador1`
    FOREIGN KEY (`reservador_CPF`)
    REFERENCES `futpagode`.`Jogador` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`Jogo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Jogo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_hora_inicio` DATETIME NOT NULL,
  `data_hora_termino` DATETIME NOT NULL,
  `Ranking_minimo` INT NOT NULL,
  `Ranking_maximo` INT NOT NULL,
  `Reserva_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Jogo_Ranking1_idx` (`Ranking_minimo` ASC) VISIBLE,
  INDEX `fk_Jogo_Ranking2_idx` (`Ranking_maximo` ASC) VISIBLE,
  INDEX `fk_Jogo_Reserva1_idx` (`Reserva_id` ASC) VISIBLE,
  CONSTRAINT `fk_Jogo_Ranking1`
    FOREIGN KEY (`Ranking_minimo`)
    REFERENCES `futpagode`.`Ranking` (`nivel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Jogo_Ranking2`
    FOREIGN KEY (`Ranking_maximo`)
    REFERENCES `futpagode`.`Ranking` (`nivel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Jogo_Reserva1`
    FOREIGN KEY (`Reserva_id`)
    REFERENCES `futpagode`.`Reserva` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`Time`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Time` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `criador` CHAR(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Time_Jogador1_idx` (`criador` ASC) VISIBLE,
  CONSTRAINT `fk_Time_Jogador1`
    FOREIGN KEY (`criador`)
    REFERENCES `futpagode`.`Jogador` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`formato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`formato` (
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`nome`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`Torneio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Torneio` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_de_inicio` DATE NOT NULL,
  `data_de_termino` DATE NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `Ranking_minimo` INT NOT NULL,
  `Ranking_maximo` INT NOT NULL,
  `Time_vencedor` INT NOT NULL,
  `formato` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Torneio_Ranking1_idx` (`Ranking_minimo` ASC) VISIBLE,
  INDEX `fk_Torneio_Ranking2_idx` (`Ranking_maximo` ASC) VISIBLE,
  INDEX `fk_Torneio_Time1_idx` (`Time_vencedor` ASC) VISIBLE,
  INDEX `fk_Torneio_formato1_idx` (`formato` ASC) VISIBLE,
  CONSTRAINT `fk_Torneio_Ranking1`
    FOREIGN KEY (`Ranking_minimo`)
    REFERENCES `futpagode`.`Ranking` (`nivel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Torneio_Ranking2`
    FOREIGN KEY (`Ranking_maximo`)
    REFERENCES `futpagode`.`Ranking` (`nivel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Torneio_Time1`
    FOREIGN KEY (`Time_vencedor`)
    REFERENCES `futpagode`.`Time` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Torneio_formato1`
    FOREIGN KEY (`formato`)
    REFERENCES `futpagode`.`formato` (`nome`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`fotos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`fotos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `imagem` BLOB NOT NULL,
  `Campo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_fotos_Campo_idx` (`Campo_id` ASC) VISIBLE,
  CONSTRAINT `fk_fotos_Campo`
    FOREIGN KEY (`Campo_id`)
    REFERENCES `futpagode`.`Campo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`Anuncio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Anuncio` (
  `Jogo_id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `imagem` BLOB NULL,
  PRIMARY KEY (`Jogo_id`),
  INDEX `fk_Anuncio_Jogo1_idx` (`Jogo_id` ASC) VISIBLE,
  CONSTRAINT `fk_Anuncio_Jogo1`
    FOREIGN KEY (`Jogo_id`)
    REFERENCES `futpagode`.`Jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`Participacao_Torneio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Participacao_Torneio` (
  `Torneio_id` INT NOT NULL,
  `Time_id` INT NOT NULL,
  PRIMARY KEY (`Torneio_id`, `Time_id`),
  INDEX `fk_Torneio_has_Time_Time1_idx` (`Time_id` ASC) VISIBLE,
  INDEX `fk_Torneio_has_Time_Torneio1_idx` (`Torneio_id` ASC) VISIBLE,
  CONSTRAINT `fk_Torneio_has_Time_Torneio1`
    FOREIGN KEY (`Torneio_id`)
    REFERENCES `futpagode`.`Torneio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Torneio_has_Time_Time1`
    FOREIGN KEY (`Time_id`)
    REFERENCES `futpagode`.`Time` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`membro_de_time`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`membro_de_time` (
  `Time_id` INT NOT NULL,
  `Jogador_CPF` CHAR(11) NOT NULL,
  PRIMARY KEY (`Time_id`, `Jogador_CPF`),
  INDEX `fk_Time_has_Jogador_Jogador1_idx` (`Jogador_CPF` ASC) VISIBLE,
  INDEX `fk_Time_has_Jogador_Time1_idx` (`Time_id` ASC) VISIBLE,
  CONSTRAINT `fk_Time_has_Jogador_Time1`
    FOREIGN KEY (`Time_id`)
    REFERENCES `futpagode`.`Time` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Time_has_Jogador_Jogador1`
    FOREIGN KEY (`Jogador_CPF`)
    REFERENCES `futpagode`.`Jogador` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`participacao_em_jogo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`participacao_em_jogo` (
  `Jogador_CPF` CHAR(11) NOT NULL,
  `Jogo_id` INT NOT NULL,
  PRIMARY KEY (`Jogador_CPF`, `Jogo_id`),
  INDEX `fk_Jogador_has_Jogo_Jogo1_idx` (`Jogo_id` ASC) VISIBLE,
  INDEX `fk_Jogador_has_Jogo_Jogador1_idx` (`Jogador_CPF` ASC) VISIBLE,
  CONSTRAINT `fk_Jogador_has_Jogo_Jogador1`
    FOREIGN KEY (`Jogador_CPF`)
    REFERENCES `futpagode`.`Jogador` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Jogador_has_Jogo_Jogo1`
    FOREIGN KEY (`Jogo_id`)
    REFERENCES `futpagode`.`Jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `futpagode`.`Joga em`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `futpagode`.`Joga em` (
  `Jogador_CPF` CHAR(11) NOT NULL,
  `Cidade_id` INT NOT NULL,
  PRIMARY KEY (`Jogador_CPF`, `Cidade_id`),
  INDEX `fk_Jogador_has_Cidade_Cidade1_idx` (`Cidade_id` ASC) VISIBLE,
  INDEX `fk_Jogador_has_Cidade_Jogador1_idx` (`Jogador_CPF` ASC) VISIBLE,
  CONSTRAINT `fk_Jogador_has_Cidade_Jogador1`
    FOREIGN KEY (`Jogador_CPF`)
    REFERENCES `futpagode`.`Jogador` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Jogador_has_Cidade_Cidade1`
    FOREIGN KEY (`Cidade_id`)
    REFERENCES `futpagode`.`Cidade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
