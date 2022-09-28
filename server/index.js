const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const wareHouseRouter = require("./routers/wareHouseRouter");
const inventoryController =require('./routers/inventoryRoutes')

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/warehouse", wareHouseRouter);
app.use('/inventory',inventoryController)

const PORT = process.env.PORT ||  5000;

//connection DB
mongoose
  .connect(process.env.CONNECTION_DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is working on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });


  //mongodb+srv://Ahmet234:Ahmet234@cluster0.pp677ip.mongodb.net/?retryWrites=true&w=majority