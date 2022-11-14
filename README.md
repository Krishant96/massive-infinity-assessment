# massive-infinity-assessment

Backend services for an admin dashboard to manage companies and their employees

## DB Setup

Replace DB host, name and credentials with your own

``` env
DB_NAME=massive_infinity_assessment
DB_USER=root
DB_PASSWORD=admin
DB_HOST=localhost
```

If you do not have a DB setup follow this tutorial to set one up locally
[Local MySQL DB Setup](https://ladvien.com/data-analytics-mysql-localhost-setup/)

## Project Setup

### Clone the repo

``` bash
git clone <https://github.com/Krishant96/massive-infinity-assessment.git>
```

### Install dependencies

``` bash
npm install
```

### Build the project

``` bash
npm run build
```

### Database migration

``` bash
npm run setup:migration
```

### Start server

``` bash
npm run start
```

## Endpoints

### Login

``` text
POST /login
```

> Authentication type: bearer

### Users

``` text
POST /user
GET /user
GET /user/:userId
PUT /user/:userId
DELETE /user/:userId
```

### Companies

``` text
POST /company
GET /company
GET /company/:companyId
PUT /company/:companyId
DELETE /company/:companyId
POST /company/:companyId/upload-logo
```

### Employees

``` text
POST /employee
GET /employee
GET /employee/:employeeId
PUT /employee/:employeeId
DELETE /employee/:employeeId
```

## File Uploads

Uploaded files can be accessed at <http://localhost:3000/public/uploads/{filename}>
