# Blog App with OAuth Integration (NestJS)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Steps](#steps)
- [Running Locally](#running-locally)
- [Module Structure](#module-structure)
  - [Auth Module](#auth-module)
  - [User Module](#user-module)
  - [Post Module](#post-module)
- [Endpoints](#endpoints)
- [Deployment](#deployment)

## Introduction
This is a blog application backend built with **NestJS** that integrates **Passport.js** for **OAuth** authentication using **Google** and **Facebook**. Users can create, read, and edit their blog posts after signing up and logging in via OAuth.

The app uses **MongoDB** with **Mongoose** ORM to store data, and it consists of three main modules: **Auth**, **User**, and **Post**.

## Features
- **OAuth Authentication**: Integrates Google and Facebook login via Passport.js.
- **User Management**: Users can create an account, log in, and manage their profile.
- **Post Management**: Users can create, view, edit, and delete their blog posts.
- **MongoDB (Mongoose)**: Data is stored in a MongoDB database using Mongoose for ORM functionality.

## Technologies Used
- **NestJS**: Framework for building efficient, reliable, and scalable server-side applications.
- **Passport.js**: Middleware for handling OAuth authentication.
- **Mongoose**: MongoDB object modeling for Node.js.
- **MongoDB**: NoSQL database used to store user and post data.
- **TypeScript**: Strongly typed programming language that is a superset of JavaScript.
- **JWT (JSON Web Tokens)**: Token-based authentication to securely manage user sessions.
- **Google OAuth and Facebook OAuth**: For user authentication via Google and Facebook accounts.

## Installation

### Requirements:
Before you begin, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (either local or a cloud instance like MongoDB Atlas)
- **Docker** (for running the app in containers, optional)
- **Nest CLI** (for managing NestJS projects, optional)

### Steps:
1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/sahilv779/blog-nest.git
    cd blog-app-nestjs
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables. Create a `.env` file at the root of the project and add the following:
    ```env
    MONGODB_URI=valid-mongo-uri
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    FACEBOOK_APP_ID=your-facebook-app-id
    FACEBOOK_APP_SECRET=your-facebook-app-secret
    JWT_SECRET=your-jwt-secret
    JWT_EXPIRATION=3600s
    ```

4. Run MongoDB locally or configure your connection string for MongoDB Atlas in the `.env` file.

5. Run the application:
    ```bash
    npm run start:dev
    ```

   The application should now be running at `http://localhost:3000`.

## Running Locally
1. **Start MongoDB**: Ensure your MongoDB instance is running (either locally or via MongoDB Atlas).
2. **Run NestJS App**:
    ```bash
    npm run start:dev
    ```
3. You can now access the application at `http://localhost:3000`.

## Module Structure

### Auth Module
The `Auth` module handles OAuth integration with **Google** and **Facebook** using **Passport.js**.

- **Authentication Strategy**:
  - Google OAuth
  - Facebook OAuth

#### Key Files:
- **auth.service.ts**: Handles OAuth login logic.
- **auth.controller.ts**: Manages OAuth routes.
- **auth.strategy.ts**: Defines the strategies for Google and Facebook authentication.

### User Module
The `User` module manages user-related operations, such as viewing and updating profile information.

- **User Model**: Defines the user schema for MongoDB.
- **User Service**: Contains logic for managing users.
- **User Controller**: Exposes API endpoints to interact with user data.

### Post Module
The `Post` module allows users to create, edit, view, and delete their posts.

- **Post Model**: Defines the post schema for MongoDB.
- **Post Service**: Contains logic for handling posts.
- **Post Controller**: Exposes API endpoints for post management.

## Endpoints

### Auth Routes
- **POST /auth/google**: Google OAuth login.
- **POST /auth/facebook**: Facebook OAuth login.
- **POST /auth/logout**: Logs out the user (removes the JWT).

### User Routes
- **GET /users/me**: Get the currently authenticated user's profile.
- **PATCH /users/me**: Update the user's profile information.

### Post Routes
- **GET /posts**: Get all posts.
- **GET /posts/:id**: Get a specific post by ID.
- **POST /posts**: Create a new post.
- **PATCH /posts/:id**: Edit a specific post.
- **DELETE /posts/:id**: Delete a specific post.

## Deployment

To deploy the app to a cloud provider such as **AWS**, you can use services like **Elastic Beanstalk** or **ECS** (for Docker containers) along with **RDS** for MongoDB or **MongoDB Atlas** for a managed MongoDB solution.

1. **Dockerize the Application**: Create a `Dockerfile` for both the frontend and backend.
2. **Deploy Backend on ECS**: Use **AWS Elastic Container Service (ECS)** to deploy the backend container.
3. **Configure MongoDB on Atlas**: Use **MongoDB Atlas** to host your database.
4. **Configure API Gateway**: Use **AWS API Gateway** to route traffic to the backend API.

---


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

**Terraform, AWS, Docker setup instructions in pdf attached in mail**

## Dummy Data

```bash
# Dummy Data
$ ts-node src/scripts/generate-dummy-data.ts
```
**by default, it will generate 10 users and 20 posts, you can change no of users/posts in their respective functions(in for loops).**

## Run Cypress Tests
You can run the Cypress tests in two ways:

Option 1: Run in Headless Mode
Run the tests in the terminal without opening the Cypress UI:

```bash
$ npx cypress run
```
Option 2: Run in Interactive Mode
Open the Cypress Test Runner to run tests interactively:

```bash
$ npx cypress open
```
Step 6: Verify Test Results
If the tests pass, you'll see output like this in the terminal or Cypress UI:

```bash
✓ should create a post
✓ should fetch all posts
✓ should fetch a single post
✓ should delete a post
```
If any test fails, Cypress will provide detailed error messages to help you debug.

**Make sure to provide valid ids for delete and get single posts case**


## Run Jest Tests

```bash
$ npm run test
```
**Make sure to provide valid ids/mock data in respective spec.ts files in controller folders**

## Run Project Locally

```bash
$ npm run start
```
**Make sure you have a valid .env file in the root directory, with valid mongo uri**