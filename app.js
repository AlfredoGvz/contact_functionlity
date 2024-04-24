const express = require("express");
const emailjs = require("@emailjs/browser");
const cors = require("cors");
const app = express();
require("dotenv").config({
  path: `.env`,
});
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
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
    emailjs
      .send(service_id, template_id, templateParams, public_key)
      .then(() => {
        response.status(201).send({ msg: "Message sent!" });
      });
    // response.set("Access-Control-Allow-Origin", "*");
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is online, listening on port ${PORT}...`);
});
