const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tuemail@gmail.com',
    pass: 'tucontraseñaAppGmail'
  }
});

app.post('/send-reservas-email', (req, res) => {
  const { to, subject, body } = req.body;

  const mailOptions = {
    from: 'tuemail@gmail.com',
    to,
    subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado con éxito');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
