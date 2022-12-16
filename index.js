const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

// Create the connection pool
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const main = async () => {
  try {
    // Create the Express app
    const app = express();

    app.get('/table/:name', async (req, res) => {
      // Get the name of the table from the URL
      const tableName = req.params.name;

      // Validate the table name
      if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
        res.status(400).send('Invalid table name');
        return;
      }

      // Query the database for the data in the specified table
      try {
        const [data] = await connectionPool.query(`SELECT * FROM ${tableName}`);
        if (data.length > 0) {
          // Set the content type of the response
          res.set('Content-Type', 'application/json');
          // Send the data as a response
          res.json(data);
        } else {
          res.status(404).send('Table not found');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Error querying the database');
      }
    });

    // Start the server
    app.listen(3001, () => {
      console.log('Server listening on port 3001');
    });
  } catch (error) {
    console.error(error);
  }
};

main();

// Close the connection pool when it's no longer needed
connectionPool.end();
