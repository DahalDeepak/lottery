const e = require("express");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const winnerTicket = 88;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/winticket", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.error(error);
  }
};
connect();
// gettin data from ticket so that we can show them on frontend
app.get("/ticket", async (req, res) => {
 
  try {
    const data = await Users.find();
    res.json({
      ticketList: data,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/users',async (req, res)=> {
  const usersList = await Users.findOne({name: req.query.name})
  const searchWinColor = await Winner.findOne({ticketNo: req.query.ticketNo})
  if(searchWinColor?.color === req.query.color && usersList){
    res.json({
        msg: "hurray! wiiner winner chicken dinner"
    })
  }else{
      if(!usersList){
          res.json({
            errMsg: 'not registered'
          })
      }else{
          res.json({
              errMsg: 'you have lost'
          })
      }
  }

})
app.get("/tickets/:ticketno", (req, res) => {
  console.log(req.params.ticketno);
});
// prarams is like query here we are already define that ticket no  is coming or we
// post is used to post anything in database
app.post("/tickets", (req, res) => {
  console.log("hi");
  console.log(req);
});
const usersSchema = new Schema(
  {
    name: { type: String, required: true },

    ticketNo: Number,
  },
  { collection: "users" }
);
const Users = mongoose.model("Users", usersSchema);

// app.post("/admin", async (req, res) => {
//   try{const data = await Users.create(req.body);
//   res.json({ data: data });}
// });
app.post("/register", async (req, res) => {
  try {
    // const data = await Users.create(req.body);
    const usersList = await Users.findOne({ name: req.body.name });
    if (usersList) {
      res.json({
        msg: "user already register",
      });
    } else {
      const data = await Users.create(req.body);
      if (data) {
        res.json({
          msg: "user registered",
        });
      } else {
        res.json({
          msg: "registration failed",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
// creating collection in a database for winner
const winnerSchema = new Schema(
  {
    color: { type: String },
    ticketNo: Number,
  },
  { collection: "winner" }
);
const Winner = mongoose.model("Winner", winnerSchema);

// for saving winner information in database
app.post("/winner", async (req, res) => {
  try {
    const data = await Winner.create(req.body);
    console.log(req.body);
    if (data) {
      res.json({
        msg: `ticket number ${req.body.ticketNo} and color ${req.body.color}`,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// found data send from postman body in req.body
// fetch on
