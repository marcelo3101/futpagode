-- CreateTable
CREATE TABLE `Anuncio` (
    `Jogo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(45) NOT NULL,
    `descricao` VARCHAR(255) NULL,
    `imagem` BLOB NULL,

    INDEX `fk_Anuncio_Jogo1_idx`(`Jogo_id`),
    PRIMARY KEY (`Jogo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `preco_hora` DECIMAL(6, 2) NOT NULL,
    `horario_de_funcionamento` VARCHAR(45) NOT NULL,
    `CEP` CHAR(8) NOT NULL,
    `Complemento` VARCHAR(90) NOT NULL,
    `Bairro` VARCHAR(45) NOT NULL,
    `dono_CPF` CHAR(11) NOT NULL,
    `Cidade_id` INTEGER NOT NULL,

    INDEX `fk_Campo_Cidade1_idx`(`Cidade_id`),
    INDEX `fk_Campo_DonoDeCampo1_idx`(`dono_CPF`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `estado` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DonoDeCampo` (
    `CPF` CHAR(11) NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `foto` BLOB NULL,

    PRIMARY KEY (`CPF`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Joga em` (
    `Jogador_CPF` CHAR(11) NOT NULL,
    `Cidade_id` INTEGER NOT NULL,

    INDEX `fk_Jogador_has_Cidade_Cidade1_idx`(`Cidade_id`),
    INDEX `fk_Jogador_has_Cidade_Jogador1_idx`(`Jogador_CPF`),
    PRIMARY KEY (`Jogador_CPF`, `Cidade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jogador` (
    `CPF` CHAR(11) NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `data_de_nascimento` DATE NOT NULL,
    `Ranking` INTEGER NOT NULL,
    `foto` LONGBLOB NULL,

    INDEX `fk_Jogador_Ranking1_idx`(`Ranking`),
    PRIMARY KEY (`CPF`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jogo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_hora_inicio` DATETIME(0) NOT NULL,
    `data_hora_termino` DATETIME(0) NOT NULL,
    `Ranking_minimo` INTEGER NOT NULL,
    `Ranking_maximo` INTEGER NOT NULL,
    `Reserva_id` INTEGER NOT NULL,

    INDEX `fk_Jogo_Ranking1_idx`(`Ranking_minimo`),
    INDEX `fk_Jogo_Ranking2_idx`(`Ranking_maximo`),
    INDEX `fk_Jogo_Reserva1_idx`(`Reserva_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participacao_Torneio` (
    `Torneio_id` INTEGER NOT NULL,
    `Time_id` INTEGER NOT NULL,

    INDEX `fk_Torneio_has_Time_Time1_idx`(`Time_id`),
    INDEX `fk_Torneio_has_Time_Torneio1_idx`(`Torneio_id`),
    PRIMARY KEY (`Torneio_id`, `Time_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ranking` (
    `nivel` INTEGER NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`nivel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `preco` DECIMAL(6, 2) NOT NULL,
    `data_hora_inicio` DATETIME(0) NOT NULL,
    `data_hora_termino` DATETIME(0) NOT NULL,
    `Campo_id` INTEGER NOT NULL,
    `reservador_CPF` CHAR(11) NOT NULL,

    INDEX `fk_Reserva_Campo1_idx`(`Campo_id`),
    INDEX `fk_Reserva_Jogador1_idx`(`reservador_CPF`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Time` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `criador` CHAR(11) NOT NULL,

    INDEX `fk_Time_Jogador1_idx`(`criador`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Torneio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_de_inicio` DATE NOT NULL,
    `data_de_termino` DATE NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `Ranking_minimo` INTEGER NOT NULL,
    `Ranking_maximo` INTEGER NOT NULL,
    `Time_vencedor` INTEGER NULL,
    `formato` VARCHAR(45) NOT NULL,

    INDEX `fk_Torneio_Ranking1_idx`(`Ranking_minimo`),
    INDEX `fk_Torneio_Ranking2_idx`(`Ranking_maximo`),
    INDEX `fk_Torneio_Time1_idx`(`Time_vencedor`),
    INDEX `fk_Torneio_formato1_idx`(`formato`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formato` (
    `nome` VARCHAR(45) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`nome`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagem` BLOB NOT NULL,
    `Campo_id` INTEGER NOT NULL,

    INDEX `fk_fotos_Campo_idx`(`Campo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `membro_de_time` (
    `Time_id` INTEGER NOT NULL,
    `Jogador_CPF` CHAR(11) NOT NULL,

    INDEX `fk_Time_has_Jogador_Jogador1_idx`(`Jogador_CPF`),
    INDEX `fk_Time_has_Jogador_Time1_idx`(`Time_id`),
    PRIMARY KEY (`Time_id`, `Jogador_CPF`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participacao_em_jogo` (
    `Jogador_CPF` CHAR(11) NOT NULL,
    `Jogo_id` INTEGER NOT NULL,

    INDEX `fk_Jogador_has_Jogo_Jogador1_idx`(`Jogador_CPF`),
    INDEX `fk_Jogador_has_Jogo_Jogo1_idx`(`Jogo_id`),
    PRIMARY KEY (`Jogador_CPF`, `Jogo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Anuncio` ADD CONSTRAINT `fk_Anuncio_Jogo1` FOREIGN KEY (`Jogo_id`) REFERENCES `Jogo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Campo` ADD CONSTRAINT `fk_Campo_Cidade1` FOREIGN KEY (`Cidade_id`) REFERENCES `Cidade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Campo` ADD CONSTRAINT `fk_Campo_DonoDeCampo1` FOREIGN KEY (`dono_CPF`) REFERENCES `DonoDeCampo`(`CPF`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Joga em` ADD CONSTRAINT `fk_Jogador_has_Cidade_Cidade1` FOREIGN KEY (`Cidade_id`) REFERENCES `Cidade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Joga em` ADD CONSTRAINT `fk_Jogador_has_Cidade_Jogador1` FOREIGN KEY (`Jogador_CPF`) REFERENCES `Jogador`(`CPF`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Jogador` ADD CONSTRAINT `fk_Jogador_Ranking1` FOREIGN KEY (`Ranking`) REFERENCES `Ranking`(`nivel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Jogo` ADD CONSTRAINT `fk_Jogo_Ranking2` FOREIGN KEY (`Ranking_maximo`) REFERENCES `Ranking`(`nivel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Jogo` ADD CONSTRAINT `fk_Jogo_Ranking1` FOREIGN KEY (`Ranking_minimo`) REFERENCES `Ranking`(`nivel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Jogo` ADD CONSTRAINT `fk_Jogo_Reserva1` FOREIGN KEY (`Reserva_id`) REFERENCES `Reserva`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Participacao_Torneio` ADD CONSTRAINT `fk_Torneio_has_Time_Time1` FOREIGN KEY (`Time_id`) REFERENCES `Time`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Participacao_Torneio` ADD CONSTRAINT `fk_Torneio_has_Time_Torneio1` FOREIGN KEY (`Torneio_id`) REFERENCES `Torneio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `fk_Reserva_Campo1` FOREIGN KEY (`Campo_id`) REFERENCES `Campo`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `fk_Reserva_Jogador1` FOREIGN KEY (`reservador_CPF`) REFERENCES `Jogador`(`CPF`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Time` ADD CONSTRAINT `fk_Time_Jogador1` FOREIGN KEY (`criador`) REFERENCES `Jogador`(`CPF`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Torneio` ADD CONSTRAINT `fk_Torneio_Ranking2` FOREIGN KEY (`Ranking_maximo`) REFERENCES `Ranking`(`nivel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Torneio` ADD CONSTRAINT `fk_Torneio_Ranking1` FOREIGN KEY (`Ranking_minimo`) REFERENCES `Ranking`(`nivel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Torneio` ADD CONSTRAINT `fk_Torneio_Time1` FOREIGN KEY (`Time_vencedor`) REFERENCES `Time`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Torneio` ADD CONSTRAINT `fk_Torneio_formato1` FOREIGN KEY (`formato`) REFERENCES `formato`(`nome`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `fotos` ADD CONSTRAINT `fk_fotos_Campo` FOREIGN KEY (`Campo_id`) REFERENCES `Campo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `membro_de_time` ADD CONSTRAINT `fk_Time_has_Jogador_Jogador1` FOREIGN KEY (`Jogador_CPF`) REFERENCES `Jogador`(`CPF`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `membro_de_time` ADD CONSTRAINT `fk_Time_has_Jogador_Time1` FOREIGN KEY (`Time_id`) REFERENCES `Time`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `participacao_em_jogo` ADD CONSTRAINT `fk_Jogador_has_Jogo_Jogador1` FOREIGN KEY (`Jogador_CPF`) REFERENCES `Jogador`(`CPF`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `participacao_em_jogo` ADD CONSTRAINT `fk_Jogador_has_Jogo_Jogo1` FOREIGN KEY (`Jogo_id`) REFERENCES `Jogo`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

