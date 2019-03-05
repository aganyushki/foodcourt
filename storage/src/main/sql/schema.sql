CREATE USER IF NOT EXISTS 'appuser1'@'%' IDENTIFIED BY 'secretpwd1';
GRANT ALL ON food_court.* TO 'appuser1'@'%';

CREATE USER IF NOT EXISTS 'appuser2'@'%' IDENTIFIED BY 'secretpwd2';
GRANT ALL ON food_court.* TO 'appuser2'@'%';
