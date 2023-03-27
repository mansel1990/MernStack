import mysql from "mysql";
import dontenv from "dotenv";

dontenv.config();

const dbConn = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12608685",
  password: "IJcsTqfL4J",
  database: "sql12608685",
});

try {
  dbConn.connect((err) => {
    if (err) {
      console.log(`Error - , ${err.message}`.red.bold);
    } else {
      console.log(`Database Connected!`.underline.cyan);
    }
  });
} catch (error) {
  console.log(`Error - , ${error.message}`.red.bold);
}

export default dbConn;
