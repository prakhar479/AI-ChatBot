import { ConnectToDB } from './db/connection.js';
import app from './app.js';

// Port
const PORT = process.env.PORT || 5000;


// Connect to DB then start server

ConnectToDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    // Print the URL to the console
    console.log(`Server running at http://localhost:${PORT}`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
