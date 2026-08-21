# Lost and Found App

## Project Overview

Lost and Found App is a full-stack web application built using Express.js and MongoDB. Users can submit information about lost or found items through a form, and all records are stored in MongoDB. The application also displays stored data in a table with pagination.

## Features

* Add lost or found item details
* Store data in MongoDB
* View all records in a table
* Pagination support
* REST API using Express.js

## Technologies Used

* Node.js
* Express.js
* MongoDB
* HTML
* CSS
* JavaScript

## Project Structure

lost-and-found-app/

├── public/

│   ├── form.html

│   ├── data.html

│   ├── style.css

│   └── script.js

├── server.js

├── package.json

├── .env

└── README.md

## Installation

1. Clone the repository

```bash
git clone https://github.com/Paramitamondal/lost-and-found-app.git
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env` file and add:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017
DB_NAME=lostfound
```

4. Start the server

```bash
node server.js
```

5. Open in browser

```text
http://localhost:5000/form.html
```

## API Endpoints

### Add Item

```http
POST /api/items
```

### Get Items with Pagination

```http
GET /api/items?page=1&limit=5
```

## Author

Paramita Mondal
BCA Student
