import express from 'express';
import multer from'multer';
import mongoose from 'mongoose';
import ImageModel from './src/model/imageModel.js';
import connectDB from './src/db/db.js';

connectDB;

const app = express();


//Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) { 
      cb(null, file.originalname)      //Consider adding info, like < Date,now()+ "-" + > , or other info
    }
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), async(req, res) => { //'image' might need to be changed?
  try {
    console.log(req.file) //test
    const { path, filename } = req.file
    const imagerefs = await ImageModel({ path, filename })
    await imagerefs.save()
    console.log(path, filename)
    res.send({ "msg": "Image uploaded successfully" })
    
    console.log(path, filename) //test
  } catch (error) {
    console.log(error)
        res.send({ "error": "Unable to upload image" })
       
  } 
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});


/*
// User Routes
app.use("/api/user", userRouter);

// Profile Routes
app.use("/api", profileRouter);


// Sets up CORS to allow requests from the frontend domain and allows cookies to be included
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

const connectDB = async () => {
    try {
      const mongoURI =
        "mongodb://lolo:Password123@localhost:27017/"; //do i need username and password to connect? 
      await connect(mongoURI);
      console.log("MongoDB Connected...");
    } catch (err) {
      console.error(err.message);
      console.log("Connection failed");
      // Exit process with failure
      process.exit(1);
    }
  };
  connectDB();

  import { connect } from "mongoose";
*/