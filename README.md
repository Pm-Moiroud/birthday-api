# Boilerplate with Prisma, MySQL, Express, and JWT Authentication

This boilerplate provides a starting point for building a web application using Prisma, MySQL, Express. It includes basic setup and configuration and also a basic authentification setup with jwt

## Setup Instructions

### 1. Install Dependencies

To install the required dependencies for this boilerplate, run the following command in your project directory:

        yarn install

This will install the necessary packages listed in the `package.json` file.

### 2. Create a `.env` File

Create a new file named `.env` in the root of your project directory. Add the following lines to the `.env` file:

        JWT_ACCESS_SECRET=SECRET123
        JWT_REFRESH_SECRET=ANOTHER_SECRET123`

Make sure to replace `SECRET123` and `ANOTHER_SECRET123` with your own secret values. These secrets are used for JWT token generation and should be kept secure.

### 3. Configure Your Database in `schema.prisma`

Open the `schema.prisma` file located in the root of your project directory. Configure your MySQL database connection by modifying the `datasource` block. Update the `url` field with the appropriate connection string for your MySQL server.

### 4. Run Prisma Migration and Seed

To create the necessary database tables and seed data, run the following commands:

Copy code

        npx prisma db push
        npx prisma db seed

This will apply any pending migrations and seed the database with initial data defined in the seed files.

### 5. Start the Server

To start the development server, use the following command:

        npm run dev

This will start the server and allow you to test your endpoints locally. The server will automatically reload whenever you make changes to your code, enabling a smoother development experience.

## Package.json Dependencies

The following dependencies are included in the `package.json` file:

- **bcrypt**: https://www.npmjs.com/package/bcrypt
- **dayjs**: https://www.npmjs.com/package/dayjs
- **jsonwebtoken**: https://www.npmjs.com/package/jsonwebtoken
- **uuid**: https://www.npmjs.com/package/uuid

## Getting Started

Now that you have set up the boilerplate, you can start editing the code to build your desired functionality. You can add new routes, controllers, and services as needed.

Happy coding!
