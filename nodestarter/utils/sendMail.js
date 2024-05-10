const nodemailer = require("nodemailer");
const fs = require("fs");

// Read the CSS file
const cssFile = fs.readFileSync("./style.css", "utf8");
const htmlGiven = () => {
  return `<html>
  <head>
    <style>
    /* styles.css */
body {
  font-family: Arial, sans-serif;

  background-color: #007bff;
}

h1 {
  color: #007bff;
  background-color:red
}

p {
  color: #333;
}

    </style>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is a sample email with inline CSS styles.</p>
  </body>
</html>`;
};

console.log(htmlGiven());

// List Of PErson to be send
const mail = [""];
// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with the email service you want to use (e.g., 'Gmail', 'Outlook', etc.)
  auth: {
    user: "ranaraees1223@gmail.com", // Replace with your email address
    pass: "nttlrkrspatnbnvs", // Replace with your email password or an app-specific password (if you use 2-factor authentication)
  },
});

// Define the email options
const mailOptions = {
  from: "Raees Khan", // Replace with your email address
  to: mail.join(", "), // Replace with the recipient's email address
  subject: "sdjfkhskdfjhsakdfjashd", // Replace with the email subject
  html: `${htmlGiven()}`,
  attachments: [
    {
      filename: "index.html", // Replace with the name you want for the attached file
      path: "./index.html", // Replace with the actual file path on your server
    },
  ],
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});
