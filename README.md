# poll-api

This is API application for Poll component. It is based MVC framework.

## node

This application is based on node.js. So you need to install node.js first. the user version is LTS v16.18.0

## Database

This application is based on MongoDB. and will be using mongoose as ORM.

## Installation

1. Clone the repository
2. Install the dependencies
3. Run the application

### Clone the repository

```bash
git clone git@github.com:myusuf963/poll-api.git
```

Or use https if you don't have ssh key:

```bash
git clone https://github.com/myusuf963/poll-api.git
```

### Install the dependencies

```bash
npm install
```

### Run the application

```bash
npm run dev
```

## API Documentation

will be using Postman for API documentation and testing. You can download postman from here
https://www.postman.com/downloads/

## Development workflow, collaboration coding style

### Branching

We will be using git flow branching model. create a branch for each feature or fix.

- You can read more about it here
  https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

### Commit message

We will be using conventional commit message.

- You can read more about it here
  https://www.conventionalcommits.org/en/v1.0.0/

### Pull request & Code review

We will be using pull request for code review. assign a reviewer for each pull request. don't merge your PR without other dev approval.

- You can read more about it here
  https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests

### Code style

We will be using eslint for code style and prettier for formatting.please install eslint and prettier extension in your IDE.
You can read more about it here
https://eslint.org/docs/user-guide/getting-started
