import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";


const PORT = process.env.BACKEND_PORT || 3000;
const __dirname = path.resolve();

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


if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    
    app.get("*", (req,res) =>
    {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "indext.html"));
    })
}


app.listen(
    PORT,
    () => console.log(`Server running on http://localhost:${PORT}`)
);