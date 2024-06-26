const express = require("express");
const emailjs = require("@emailjs/browser");
const cors = require("cors");
const app = express();
require("dotenv").config({
  path: `.env`,
});
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://contact-functionlity.onrender.com",
      "https://alfredo-galvez.netlify.app",
    ],
  })
);
const PORT = process.env.PORT;
app.get("/api/new_get", async (request, response) => {
  response.status(200).send({ msg: "Hello" });
});

app.post("/api/send_email", async (request, response) => {
  console.log(request.body);
  const { senderEmail, senderName, emailSubject, message } = request.body;

  const service_id = process.env.REACT_APP_SERVICE_ID;
  const template_id = process.env.REACT_APP_TEMPLATE_ID;
  const user_id = process.env.REACT_APP_USER_ID;
  const public_key = process.env.REACT_APP_PUBLIC_KEY;
  const templateParams = {
    to_name: "Alfredo",
    from_name: senderName,
    from_email: senderEmail,
    message: message,
    subject: emailSubject,
  };
  try {
    response.set("Access-Control-Allow-Origin", "*");
    emailjs
      .send(service_id, template_id, templateParams, public_key)
      .then(() => {
        response.status(201).send({ msg: "Message sent!" });
      });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is online, listening on port ${PORT}...`);
});
