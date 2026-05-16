import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import Admin from "./models/Admin.js";
import Bird from "./models/Bird.js";
import Dog from "./models/Dog.js";
import Cat from "./models/cat.js";
import User from "./models/User.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// ================= REGISTER =================

app.post("/register", async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body;

        // CHECK EXISTING USER
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE USER
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});


// ================= LOGIN =================

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});


// START SERVER
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});



// ================= GET ALL CATS =================

app.get("/api/cats", async (req, res) => {

    try {

        const cats = await Cat.find();

        res.status(200).json(cats);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch cats",
        });
    }
});


// ================= ADD NEW CATS =================

app.post("/api/cats", async (req, res) => {

    try {

        const newCat = new Cat(req.body);

        await newCat.save();

        res.status(201).json(newCat);

    } catch (error) {

        res.status(500).json({
            message: "Failed to add cat",
        });
    }
});

// ================= UPDATE CATS =================

app.put("/api/cats/:id", async (req, res) => {
    try {
        const updatedCat = await Cat.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedCat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= DELETE CATS =================

app.delete("/api/cats/:id", async (req, res) => {
    try {
        await Cat.findByIdAndDelete(req.params.id);

        res.json({ message: "Cat deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= DOG ROUTES =================

app.get("/api/dogs", async (req, res) => {
    try {
        const dogs = await Dog.find();
        res.json(dogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/api/dogs", async (req, res) => {
    try {
        const dog = new Dog(req.body);
        await dog.save();

        res.status(201).json(dog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put("/api/dogs/:id", async (req, res) => {
    try {
        const updatedDog = await Dog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedDog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete("/api/dogs/:id", async (req, res) => {
    try {
        await Dog.findByIdAndDelete(req.params.id);

        res.json({ message: "Dog deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ================= BIRDS ROUTES =================

app.get("/api/birds", async (req, res) => {
    try {
        const birds = await Bird.find();
        res.json(birds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/api/birds", async (req, res) => {
    try {
        const bird = new Bird(req.body);
        await bird.save();

        res.status(201).json(bird);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put("/api/birds/:id", async (req, res) => {
    try {
        const updatedBird = await Bird.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedBird);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete("/api/birds/:id", async (req, res) => {
    try {
        await Bird.findByIdAndDelete(req.params.id);

        res.json({ message: "Bird deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ================= ADMIN LOGIN =================


app.post("/api/admin/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check empty fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        // Find admin
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials."
            });
        }

        // Check password
        if (admin.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials."
            });
        }

        // Success
        res.status(200).json({
            success: true,
            message: "Login successful",
            admin: {
                email: admin.email
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });

    }

});
