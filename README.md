

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