# POLLING-SYSTEM

A server with Api's to create a poll and provide options to that. Also each option will have link to vote.

## Installation

Make a clone from my git repo and Install all the project with npm

```bash
  npm install or npm i

```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Manish-Rao-Kolte/Polling-System
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
  or
  npm run dev
```

## API Reference

#### Get home

https://polling-system-r78d.onrender.com/api/v1

#### Create question

https://polling-system-r78d.onrender.com/api/v1//questions/create

#### Remove question

https://polling-system-r78d.onrender.com/api/v1/questions/{**question id\*\*}/delete

#### View question

https://polling-system-r78d.onrender.com/api/v1/questions/{**question id\*\*}

#### Create option

https://polling-system-r78d.onrender.com/api/v1//questions/{**question id\*\*}/options/create

#### Remove option

https://polling-system-r78d.onrender.com/api/v1//options/{**option id\*\*}/delete

#### Add vote

https://polling-system-r78d.onrender.com/api/v1//options/{**option id\*\*}/add_vote

## Tech Stack

**Server:** Node, Express

**Data Base:** MongoDB, Mongoose

**Dependencies:** [cors](https://www.npmjs.com/package/cors), [dotenv](https://www.npmjs.com/package/dotenv)

**Dev-Dependencies:** [nodemon](https://www.npmjs.com/package/nodemon)

## Authors

-   [@manish-rao-kolte](https://github.com/Manish-Rao-Kolte?tab=repositories)

## Acknowledgements

-   [Coding Ninjas](https://www.codingninjas.com/)
-   [Awesome README](https://github.com/matiassingers/awesome-readme)
