CREATE TABLE `friends` (
`friend_one` INT(11) ,
`friend_two` INT(11) ,
`status` ENUM('0','1','2') DEFAULT '0',
PRIMARY KEY (`friend_one`,`friend_two`),
FOREIGN KEY (friend_one) REFERENCES users(id),
FOREIGN KEY (friend_two) REFERENCES users(id));