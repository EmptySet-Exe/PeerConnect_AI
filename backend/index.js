import express from "express";
import cors from "cors";
import dotenv from "dotenv";


const PORT = process.env.BACKEND_PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

/// RESTful API (CRUD) ///

// CREATE
app.post("/api/message", (req,res) => 
{
    const {text} = req.body;

    // "AI" response stub code
    const response = `I'm analyzing "${text}"... try focusing on the main concept!`;

    res.json({reply: response});
});

// READ
app.get("/", (req,res) => 
{
    res.send("Server is running!");
});


app.listen(
    PORT,
    () => console.log(`Server running on http://localhost:${PORT}`)
);