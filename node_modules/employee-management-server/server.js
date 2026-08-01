require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();