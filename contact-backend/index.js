// Import all required packages
const Express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

// Create an instance of express app
const app = Express();
app.use(cors());
app.use(Express.json()); // To parse JSON request bodies

// MongoDB Connection String
const CONNECTION_STRING = "mongodb+srv://contactUser:Password123@cluster0.jiibp.mongodb.net/";

// Database Name
const DATABASENAME = "ecoguard";
let database;

// Connect to MongoDB
MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
    .then(client => {
        database = client.db(DATABASENAME);
        console.log(" Connected to MongoDB Cluster");

        // Start the server AFTER successful DB connection
        app.listen(5038, () => {
            console.log(" Server is running on port 5038");
        });
    })
    .catch(error => {
        console.error(" Failed to connect to MongoDB:", error);
        process.exit(1);
    });

// ============================ CONTACT PAGE ROUTES ============================

//  Get all messages
app.get("/api/contact/GetMessages", async (req, res) => {
    try {
        if (!database) return res.status(500).json({ error: "Database not initialized" });

        const messages = await database.collection("contact_messages").find({}).toArray();
        res.json(messages);
    } catch (error) {
        console.error(" Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

//  Add a new message
app.post("/api/contact/AddMessage", multer().none(), async (req, res) => {
    try {
        if (!database) return res.status(500).json({ error: "Database not initialized" });

        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "Please fill in all required fields" });
        }

        // Debugging log
        console.log(" Incoming message:", req.body);

        await database.collection("contact_messages").insertOne({
            name,
            email,
            subject,
            message,
            date: new Date()
        });

        res.status(201).json({ message: "Message added successfully!" });
    } catch (error) {
        console.error(" Error adding message:", error);
        res.status(500).json({ error: "Failed to add message" });
    }
});

// Delete a message by ID
app.delete("/api/contact/DeleteMessage", async (req, res) => {
    try {
        if (!database) return res.status(500).json({ error: "Database not initialized" });

        const messageId = req.query.id;
        if (!ObjectId.isValid(messageId)) {
            return res.status(400).json({ error: "Invalid message ID" });
        }

        const result = await database.collection("contact_messages").deleteOne({
            _id: new ObjectId(messageId)
        });

        if (result.deletedCount > 0) {
            res.json({ message: "Message deleted successfully!" });
        } else {
            res.status(404).json({ error: "Message not found!" });
        }
    } catch (error) {
        console.error(" Error deleting message:", error);
        res.status(500).json({ error: "Failed to delete message" });
    }
});

// ===========================================================================

module.exports = app;
