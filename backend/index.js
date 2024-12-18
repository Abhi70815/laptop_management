const express = require("express");
const app = express();

const cors = require("cors");
// const connectDB = require("./config/db.Js");
const authRoute= require('./routes/authRoutes')
const laptopRoutes = require("./routes/laptopRoutes");
const employeeRoutes = require("./routes/employRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const issueRoutes = require("./routes/issueRoutes");
const adminRoutes = require("./routes/adminRoutes");
const requestRoute= require('./routes/requestRoutes')

require("dotenv").config();

const mongoose = require("mongoose");


const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    }catch(error){
       console.error("mongoDB connection failed ", error.message);
       process.exit(1);
    }
}

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Test Route
app.get("/", (req, res) => res.send("API running..."));

app.use("/api/users", authRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/laptops", laptopRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/requests", requestRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
