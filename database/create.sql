CREATE DATABASE emrsystem;

USE emrsystem;

CREATE TABLE IF NOT EXISTS care_provider (
careprovider_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
careprovider_firstname VARCHAR (100) NOT NULL DEFAULT '',
careprovider_lastname VARCHAR(100) NOT NULL DEFAULT '',
careprovider_username VARCHAR(10) NOT NULL DEFAULT '',
careprovider_password TEXT NOT NULL,
is_super_admin_user BOOLEAN NOT NULL DEFAULT 0
); 

CREATE TABLE IF NOT EXISTS patient_profile (
patient_healthcard VARCHAR(15) NOT NULL PRIMARY KEY, 
patient_firstname VARCHAR (100) NOT NULL DEFAULT '', 
patient_lastname VARCHAR (100) NOT NULL DEFAULT '',
patient_address VARCHAR (100) NOT NULL DEFAULT '', 
patient_contact VARCHAR (15) NOT NULL DEFAULT '', 
patient_DOB DATE NOT NULL DEFAULT '1111-11-11'
);

CREATE TABLE IF NOT EXISTS patient_notes (
patient_healthcard VARCHAR(15) NOT NULL, 
patient_note TEXT, 
date_created DATE DEFAULT '1111-11-11',
FOREIGN KEY(patient_healthcard) REFERENCES patient_profile(patient_healthcard)
);

CREATE TABLE IF NOT EXISTS patient_billing (
patient_healthcard VARCHAR(15) NOT NULL, 
ins_provider VARCHAR(100) DEFAULT '', 
ins_policy VARCHAR(100) DEFAULT '',
creditcard_num INT(16) DEFAULT 123456789, 
creditcard_code INT(3) DEFAULT 999, 
creditcard_exp DATE DEFAULT '1111-11-11',
FOREIGN KEY(patient_healthcard) REFERENCES patient_profile(patient_healthcard)
);

CREATE TABLE IF NOT EXISTS patient_immunization (
patient_healthcard VARCHAR(15) PRIMARY KEY, 
vacccine_name VARCHAR (100) DEFAULT '', 
date_completed DATE DEFAULT '1111-11-11',
date_next_visit DATE DEFAULT '1111-11-11',
FOREIGN KEY(patient_healthcard) REFERENCES patient_profile(patient_healthcard)
);

CREATE TABLE IF NOT EXISTS prescriptions_medication (
patient_healthcard VARCHAR(15) PRIMARY KEY, 
prescription_name VARCHAR (100) DEFAULT '', 
dose_qty INT DEFAULT 0,
days_supply INT DEFAULT 0,
route_of_admin VARCHAR(100),
date_filled DATE DEFAULT '1111-11-11',
FOREIGN KEY(patient_healthcard) REFERENCES patient_profile(patient_healthcard)
);

CREATE TABLE IF NOT EXISTS lab_results (
patient_healthcard VARCHAR(15) PRIMARY KEY, 
test_name VARCHAR(100) DEFAULT '', 
date_completed DATE DEFAULT '1111-11-11',
result TEXT,
abnormal BOOLEAN NOT NULL DEFAULT 0,
FOREIGN KEY(patient_healthcard) REFERENCES patient_profile(patient_healthcard)
);

CREATE TABLE IF NOT EXISTS radiology (
patient_healthcard VARCHAR(15) PRIMARY KEY, 
exam_type VARCHAR(100) DEFAULT '', 
date_completed DATE DEFAULT '1111-11-11',
result TEXT,
FOREIGN KEY(patient_healthcard) REFERENCES patient_profile(patient_healthcard)
);

CREATE TABLE IF NOT EXISTS allergies (
patient_healthcard VARCHAR(15) PRIMARY KEY, 
medications VARCHAR(100) DEFAULT '', 
notes TEXT,
severity_level INT(1) DEFAULT 0,
FOREIGN KEY(patient_healthcard) REFERENCES patient_profile(patient_healthcard)
);

