const mongoose = require("mongoose");
const subscriberModel = require("./models/subscribers");
const data = require("./data");

// Connect to the database
const DATABASE_URL = "mongodb+srv://jerinr050:jerin@project.8d5tx.mongodb.net/?retryWrites=true&w=majority&appName=project";
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error("Connection error:", err));
db.once("open", () => console.log("Database connected..."));

const refreshAll = async () => {
  try {
    // Delete existing data
    await subscriberModel.deleteMany({});
    console.log("Existing data deleted");

    // Insert new data
    await subscriberModel.insertMany(data);
    console.log("Data added!");
  } catch (err) {
    console.error("Error during database operations:", err);
  } finally {
    // Disconnect from the database
    try {
      await mongoose.disconnect();
      console.log("Database disconnected");
    } catch (err) {
      console.error("Error during disconnection:", err);
    }
  }
};

// Execute the refresh operation
refreshAll();
