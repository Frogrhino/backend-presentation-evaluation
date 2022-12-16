MySQL Express Table API

This project is an API server that allows you to retrieve data from a MySQL database using an HTTP request.

To use the API, you can send a GET request to the /table/:name endpoint, where :name is the name of the table you want to access. The API will return the data in the table as a JSON response.
Prerequisites

    Node.js and npm
    A MySQL database

Installation

Clone the repository and navigate to the project directory:

    git clone https://github.com/your-username/mysql-express-table-api.git
    cd mysql-express-table-api

Install the dependencies:

    npm install

Create a file called .env in the root of the project and set the following environment variables:

    DB_HOST=your-database-host
    DB_USER=your-database-user
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name

Start the server:

    node index.js

The server will start listening for requests on port 3001.
Usage

To retrieve data from a table, send a GET request to the /table/:name endpoint, where :name is the name of the table you want to access. For example:

    curl http://localhost:3001/table/users

If the table exists and has data, the API will return the data as a JSON response. If the table does not exist or is empty, the API will return a 404 error. If there is an error querying the database, the API will return a 500 error.