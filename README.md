#Chansey

Description: FS1030 project - An Electronic Medical Record system for healthcare providers with authentication

Used: HTML, CSS, Bootstrap, Node, Express, MySQL

=============================================

Instructions: 
1) npm install bcrypt body-parser connect-flash dotenv ejs express express-session method-override mysql req-flash --save
2) npm install eslint eslint-config-airbnb-base eslint-plugin-import nodemon --save
3) create a database on your localhost MySQL by copying and pasting code in database/create.sql
4) create a .env file and add the following information:

// Connection keys
HTTP_PORT= add your port #
USERNAME="addusername"
PASSWORD="addpassword"
SESSION_SECRET="addsecretsessionname"

//DB keys
DB_HOST='adddatabaselocalhost'
DB_USER='adddatabasebusername'
DB_PASSWORD='adddatabasepassword'
DB_NAME='adddatabasename'

5) npm start

==============================================

Project Requirements:
The project is to design an EMR system for the care providers through which a care provider, such as a family doctor, can:
1) Login - completed by Jen Beltran
2) Search for patient using patient’s Health Card Number - completed by Ryan Legaspi
3) View patient details - Ryan Legaspi
4) Update patient details - Ryan Legaspi
5) Write notes on patient details page – the notes should appear in reverse chronological order. For example, if Doctor Abc has posted a note on 19-Apr2019 and Doctor Xyz has posted a note on 20-apr-2019 for the same patient.
The Doctor Xyz’s note would appear on the top. - Ryan Legaspi
6) The patient details page should also show the revision history for the patient record. For example, if Doctor Abc has changed the patient address for a patient named Peter Patterson, it should show up in the revision history as “Peter’s
address changed on 19-Apr-2019 by Dr. Abc” and so forth with latest revision at the top. - Ryan Legaspi

Also, design a super admin interface where a super admin user would be able to:
1) Search/Create/Read/Update/Delete Patients - Ryan Legaspi
2) Search/Create/Read/Update/Delete Care Providers - Jen Beltran
3) Login authentication and password encryption - Jen Beltran
4) Database creation - Jen Beltran
