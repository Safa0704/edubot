const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://safaasankaniaug22it:8Tp08T5l1vNNmscA@botcontact.2u8daqm.mongodb.net/", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
  })
  
  
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.log("❌ MongoDB error:", err));

// Schema & Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Route to store contact form data
app.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).json({ message: "✅ Message saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to save message" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});