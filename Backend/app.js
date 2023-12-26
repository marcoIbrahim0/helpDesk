const express = require("express");
const cookieParser=require('cookie-parser')
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./Routes/products");
const userRouter = require("./Routes/users");
const authRouter = require("./Routes/auth");
const ticketsRouter = require("./Routes/tickets");
const KnowledgeRouter= require("./Routes/Knowledge");
const CustomizationRouter= require("./Routes/Customization");
const ReportRouter= require("./Routes/report");
const WorkflowRouter= require("./Routes/Workflow");
const livechatRouter = require("./Routes/livechat");
const otpRouter = require("./Routes/otp");
const EmailRouter = require("./Routes/email");

require('dotenv').config();

const authenticationMiddleware = require("./Middleware/authenticationMiddleware");

const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use("/api/v1", authRouter);
app.use(authenticationMiddleware);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tickets", ticketsRouter);
app.use("/api/v1/Knowledge", KnowledgeRouter);
app.use("/api/v1/Customization", CustomizationRouter);
app.use("/api/v1/report", ReportRouter); 
app.use("/api/v1/workflow", WorkflowRouter); 
app.use("/api/v1/livechat", livechatRouter); 
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/email", EmailRouter);



const db_name = process.env.DB_NAME;
// * Cloud Connection
// const db_url = `mongodb+srv://TestUser:TestPassword@cluster0.lfqod.mongodb.net/${db_name}?retryWrites=true&w=majority`;
// * Local connection
const db_url = `${process.env.DB_URL}/${db_name}`; // if it gives error try to change the localhost to 127.0.0.1

// ! Mongoose Driver Connection

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => {
    console.log(e);
  });

app.use(function (req, res, next) {
  return res.status(404).send("404");
});
app.listen(process.env.PORT, () => console.log("server started"));
