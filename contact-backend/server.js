const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5038;

//  Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Allow frontend requests

//  MongoDB Connection
const mongoURI = process.env.MONGODB_URI || "your-mongodb-uri-here";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected!'))
.catch(err => console.error(' MongoDB connection error:', err));

//  Define Schema & Model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String
});

const ContactMessage = mongoose.model('ContactMessage', contactSchema);

//  POST Route - Add a New Message
app.post('/api/contact/AddMessage', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "Please fill in all required fields" });
        }

        const newMessage = new ContactMessage({ name, email, phone, subject, message });
        const savedMessage = await newMessage.save();

        console.log(" Message saved to MongoDB:", savedMessage); //  Debugging log
        res.status(201).json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error(" Error saving message:", error);
        res.status(500).json({ error: "Server error. Try again later." });
    }
});

//  GET Route - Fetch Messages
app.get('/api/contact/GetMessages', async (req, res) => {
    try {
        const messages = await ContactMessage.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error(" Error fetching messages:", error);
        res.status(500).json({ error: "Server error. Try again later." });
    }
});

//  Start Server
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
