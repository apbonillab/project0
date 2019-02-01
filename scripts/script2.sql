CREATE TABLE category (idcategory int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,  name varchar(45) DEFAULT NULL); 
create table customers (customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, first_name TEXT, last_name TEXT);

CREATE TABLE event_type (
  idevent_type int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  name varchar(45) DEFAULT NULL
);

CREATE TABLE user (
  iduser int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email varchar(90) DEFAULT NULL UNIQUE KEY,
  password varchar(45) DEFAULT NULL
) ;


CREATE TABLE event (
  idevent int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  place varchar(100) DEFAULT NULL,
  name varchar(45) DEFAULT NULL,
  address varchar(100) DEFAULT NULL,
  init_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  user int(11) DEFAULT NULL,
  category int(11) DEFAULT NULL,
  event_type int(11) DEFAULT NULL,
  date_audit datetime NOT NULL,
  KEY user_idx (user),
  KEY category_idx (category),
  KEY event_type_idx (event_type),
  CONSTRAINT category FOREIGN KEY (category) REFERENCES category (idcategory),
  CONSTRAINT event_type FOREIGN KEY (event_type) REFERENCES event_type (idevent_type),
  CONSTRAINT user FOREIGN KEY (user) REFERENCES user (iduser)
);

INSERT INTO events.category (idcategory, name) VALUES ('1', 'Conferencias');
INSERT INTO events.category (idcategory, name) VALUES ('2', 'Seminario');
INSERT INTO events.category (idcategory, name) VALUES ('3', 'Congreso');
INSERT INTO events.category (idcategory, name) VALUES ('4', 'Curso');

INSERT INTO events.event_type (idevent_type, name) VALUES ('1', 'Presencial');
INSERT INTO events.event_type (idevent_type, name) VALUES ('2', 'Virtual');