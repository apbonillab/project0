CREATE TABLE `events`.`user` (
  `iduser` INT NOT NULL,
  `email` VARCHAR(90) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `events`.`category` (
  `idcategory` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`idcategory`));


CREATE TABLE `events`.`event_type` (
  `idevent_type` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`idevent_type`));

CREATE TABLE `events`.`event` (
  `idevent` INT NOT NULL,
  `place` VARCHAR(100) NULL,
  `name` VARCHAR(45) NULL,
  `address` VARCHAR(100) NULL,
  `init_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  `user` INT NULL,
  `category` INT NULL,
  `event_type` INT NULL,
  PRIMARY KEY (`idevent`),
  INDEX `user_idx` (`user` ASC) VISIBLE,
  INDEX `event_type_idx` (`event_type` ASC) VISIBLE,
  INDEX `category_idx` (`category` ASC) VISIBLE,
  CONSTRAINT `user`
    FOREIGN KEY (`user`)
    REFERENCES `events`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `event_type`
    FOREIGN KEY (`event_type`)
    REFERENCES `events`.`event_type` (`idevent_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category`
    FOREIGN KEY (`category`)
    REFERENCES `events`.`category` (`idcategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `events`.`user` 
CHANGE COLUMN `iduser` `iduser` INT(11) NOT NULL AUTO_INCREMENT ;

ALTER TABLE `events`.`category` 
CHANGE COLUMN `idcategory` `idcategory` INT(11) NOT NULL AUTO_INCREMENT ;

ALTER TABLE `events`.`event_type` 
CHANGE COLUMN `idevent_type` `idevent_type` INT(11) NOT NULL AUTO_INCREMENT ;

ALTER TABLE `events`.`event` 
CHANGE COLUMN `idevent` `idevent` INT(11) NOT NULL AUTO_INCREMENT ;


INSERT INTO `events`.`category` (`idcategory`, `name`) VALUES ('1', 'Conferencias');
INSERT INTO `events`.`category` (`idcategory`, `name`) VALUES ('2', 'Seminario');
INSERT INTO `events`.`category` (`idcategory`, `name`) VALUES ('3', 'Congreso');
INSERT INTO `events`.`category` (`idcategory`, `name`) VALUES ('4', 'Curso');

INSERT INTO `events`.`event_type` (`idevent_type`, `name`) VALUES ('1', 'Presencial');
INSERT INTO `events`.`event_type` (`idevent_type`, `name`) VALUES ('2', 'Virtual');
