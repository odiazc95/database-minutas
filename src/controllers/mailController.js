const express = require('express');
const User = require('../models/usuario');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const router = express.Router();

router.post('/send_email', async (req, res, next) => {
    
    const clientId = '526696534772-2ffaqqet32dss25g6bl7mku4cdauciuj.apps.googleusercontent.com';
    const clientSecret = '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';
    const redirectUri = 'https://developers.google.com/oauthplayground';
    const refreshToken = '1//04UDNDe8u5KgLCgYIARAAGAQSNwF-L9IrePw75MR4SJN-w4vXSv7j5ALHOfA1w_b0EtfWHERylLnNsrH3qguu5YoOEJk_2HKl57w';
    
    const { subject, date, time, guests } = req.body;
    console.log(req.body)

    const OAuth2Client = new google.auth.OAuth2(
        clientId, clientSecret, redirectUri
    );

    OAuth2Client.setCredentials({ refresh_token: refreshToken });

    async function sendMail(subject, date, time, guests) {
        try {
            if (!guests || !Array.isArray(guests) || guests.length === 0) {
                throw new Error('Invalid guests data');
              }
            const accessToken = await OAuth2Client.getAccessToken()
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: 'martinez.daniel.isw@unipolidgo.edu.mx',
                    clientId: clientId,
                    clientSecret: clientSecret,
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                },
            });
            for (const guest of guests) {
                const user = await User.findOne({ email: guest});
                const name = user.nombre;
                const last_name_p = user.apellido_paterno;
                const last_name_m = user.apellido_materno;

                const mailOptions = {
                    from: 'martinez.daniel.isw@unipolidgo.edu.mx',
                    to: guest,
                    subject: subject,
                    html: `
                        <html>
                            <body>
                                <div style="width: 520px; height: 620px; font-family: 'Open Sans', Roboto;">
                                    <div style="margin-bottom: 20px; text-align: center">
                                        <img style="width: 260px; height: 100px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Logo_de_la_Universidad_Ju%C3%A1rez_del_Estado_de_Durango.svg/1200px-Logo_de_la_Universidad_Ju%C3%A1rez_del_Estado_de_Durango.svg.png" alt="Logo - Universidad Juarez del Estado de Durango">
                                    </div>
                                    <div style="padding: 20px; font-size: 20px; display: inline;">
                                        <p style="font-size: 18.5px; display: inline;">Estimad@ invitad@: </p><span style="font-size: 16px; font-weight: bold;">${name} ${last_name_p} ${last_name_m}</span>
                                    </div>
                                    <div style="padding: 20px; font-size: 17.5; text-align: justify;">
                                        Se le envia la siguiente invitacion para realizar la firma de la minuta <span style="font-size: 16px; font-weight: bold;">${subject}</span> que se realizo el dia <span style="font-size: 16px; font-weight: bold;">${date}</span> a las <span style="font-size: 16px; font-weight: bold;">${time}</span>.<br><br>
            
                                        Si estas de acuerdo con los datos anteriormente mencionados, dale clic al siguiente boton para firmar digitalmente el documento pdf.
                                    </div>
                                    <div style="background: #B11830; color: #ffff; width: auto; height: 70px;">
                                        <h2 style="font-size: 25px; text-align: center; padding: 15px;">#SomosUJED</h2>
                                    </div>
                                    <div style="text-align: center">
                                        <button style="background: #B11830; width: 200px; height: 50px; margin: 40px auto 0; font-size: 16px; font-weight: bold; border: none; cursor: pointer;">
                                            <a href="http://localhost:3001/dashboard" style="text-decoration: none; color: #ffff;">Firmar pdf digital</a>
                                        </button>
                                    </div>
                                </div>
                            </body>
                        </html>
                    `,
                };
                const result = await transporter.sendMail(mailOptions);
                console.log('Correo enviado correctamente a:', guest);
            }
            console.log('Email enviado correctamente');
            res.status(200).send('Email enviado correctamente');
          } catch (err) {
            console.error(err);
            res.status(500).send('Error al enviar el correo electrónico');
          }
        }
      
        sendMail(subject, date, time, guests);

});

module.exports = router;