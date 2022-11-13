# massive-infinity-assessment

Backend services for an admin dashboard to manage companies and their employees

DB Setup

Replace DB host, name and credentials with your own

DB_NAME=massive_infinity_assessment
DB_USER=root
DB_PASSWORD=admin
DB_HOST=localhost

If you do not have a DB setup follow this tutorial to set one up locally
[Local MySQL DB Setup](https://ladvien.com/data-analytics-mysql-localhost-setup/)

Project Setup

Clone the repo
git clone <https://github.com/Krishant96/massive-infinity-assessment.git>

Run npm install
npm install

Build the project
npm run build

Database migration
npm run setup:migration

Start server
npm run start

Endpoints

Login
POST /login

Users
POST /user
GET /user
GET /user/:userId
PUT /user/:userId
DELETE /user/:userId

Companies
POST /company
GET /company
GET /company/:companyId
PUT /company/:companyId
DELETE /company/:companyId
POST /company/:companyId/upload-logo

Employees
POST /employee
GET /employee
GET /employee/:employeeId
PUT /employee/:employeeId
DELETE /employee/:employeeId
