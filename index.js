
//import https from"https";
import express from 'express';
import fs from 'fs';
const app = express();

import { authUser } from './mods/auth.js'
import cors from 'cors';
import { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('pabl'));

app.use(cors());


const PORT = process.env.PORT || 8080;
const HOST = 'localhost';

app.post('/auth', (req, res) => {
    const tocen = jwt.sign({
        gmail: req.body
    }, 'secret123');
    let auth = authUser(req.body.gmail)
    if (auth.status === 200) {
        addToken(req.body.gmail, addTokenToBasa(req.body.gmail, tocen))
        res.json({
            mail: req.body.gmail,
            status: auth.status,
            id: auth.id,
            auth: true,
            tocen
        });
    }
    else {
        res.json({
            status: auth,
            auth: true,
        });
    }
});

app.post('/tocenemail', async (req, res) => {
    console.log(req.body)
    res.json({ token: authTrue(req.body.mailValue, req.body.data.code) });
})

app.post('/registr', (req, res) => {
    console.log(req.body)
   /* const tocen = jwt.sign({
        gmail: req.body
    }, 'secret123');
    let auth = authUser(req.body.gmail)
    if (auth.status === 200) {
        addToken(req.body.gmail, addTokenToBasa(req.body.gmail, tocen))
        res.json({
            mail: req.body.gmail,
            status: auth.status,
            id: auth.id,
            auth: true,
            tocen
        });
    }
    else {
        res.json({
            status: auth,
            auth: true,
        });
    }*/
});

app.listen(PORT, () => {
    console.log(`Server run: http://${HOST}:${PORT}`)
});


function addToken(mail, code) {
    const transporter = nodemailer.createTransport(
        {
            pool: true,
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: 'marenichd1990@gmail.com',
                refreshToken: '1//04zl8FkNVH1icCgYIARAAGAQSNwF-L9IrZF8NKgnSpmmBNEmcPNGWY2lwHe4lD_1AgylLrO0XT3u3NatoVNvtu6NodJxTQCuvcpU',
                clientId: '686679209962-amigag1o3prerlltaq7qk9ektm4cmms0.apps.googleusercontent.com',
                clientSecret: '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',
            }
        },
        {
            from: `Mailer Test <marenichd1990@gmail.com>`
        }
    )

    transporter.verify((error, success) => {
        if (error) return console.log(error)
        console.log('Server is ready to take our messages: ', success)
        transporter.on('token', token => {
            //console.log('A new access token was generated')
            //console.log('User: %s', token.user)
            //console.log('Access Token: %s', token.accessToken)
            //console.log('Expires: %s', new Date(token.expires))
        })
    })

    const mailer = message => {
        transporter.sendMail(message, (err, info) => {
            if (err) return console.log(err)
            //console.log('Email sent: ', info)
        })
    }

    const message = {
        to: mail,
        subject: 'Your confirmation code',
        html: `
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>HTML Template</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600" rel="stylesheet" />
            <style>
                body {
                    width: 100% !important;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    margin: 0;
                    padding: 0;
                    line-height: 100%;
                }
        
                [style*="Raleway"] {
                    font-family: 'Raleway', arial, sans-serif !important;
                }
        
                table td {
                    border-collapse: collapse;
                }
        
                table {
                    border-collapse: collapse;
                }
            </style>
        </head>
        
        <body style="
        margin: 0 auto;
        border: none;">
            <table style="
            margin: 0 auto;
            border: none;" cellpadding="0" cellspacing="0" max-width="100%" bgcolor="#fbfbfb" align="center">
                <tr>
                    <td>
                        <table style="
                        margin: 0 auto;
                        border: none;" cellpadding="0" cellspacing="0" max-width="547" height="422" align="center">
                            <tr>
                                <td height="20" max-width="547"></td>
                            </tr>
                            <tr>
                                <td height="189" max-width="407">
                                    <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" height="189" max-width="407"
                                        align="center">
                                        <tr>
                                            <td style="
                                            font-family: Segoe UI;
                                            font-size: 22px;
                                            font-weight: 700;
                                            line-height: 29.26px;
                                            text-align: center;
                                            color: #6c6c6c;" align="center" height="48" max-width="12">
                                                Your confirmation code
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="
                                            font-family: Segoe UI;
                                            font-size: 82px;
                                            font-weight: 700;
                                            line-height: 29.26px;
                                            text-align: center;
                                            color: #6c6c6c;" align="center" height="48" max-width="12">
                                                ${code.code}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style=" 
                                            font-family: Segoe UI;
                                            font-size: 22px;
                                            font-weight: 700;
                                            line-height: 29.26px;
                                            text-align: center;
                                            color: #6db2fa;" align="center" height="48" max-width="12">
                                                Attention code valid only 2 minutes
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <td height="20" max-width="547"></td>
                        </table>
                    </td>
                </tr>
            </table>
        </body>`,
    }
    mailer(message)
}

function addTokenToBasa(gmail, tok) {
    try {
        const data = JSON.parse(fs.readFileSync('./basa/basejsonUser.json', 'utf8'))
        let copy = Object.assign([], data);
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].mail === gmail) {
                if (data.users[i].token[0] === '') {
                    copy.users[i].token.splice(0, 1, tok)
                    fs.writeFileSync('./basa/basejsonUser.json', JSON.stringify(data));
                    return { status: 200, id: data.users[i].id };
                }
                const generCode = Math.floor((Math.random() * (101 - 11) + 11) * 20000)
                copy.users[i].code.splice(0, 1, generCode)
                fs.writeFileSync('./basa/basejsonUser.json', JSON.stringify(data));
                timeOut(gmail)
                return { code: generCode }
            }
        }
        return { status: 500 };
    } catch (err) {
        console.log('Ошибка записи токена или записи кода', err);
        return err
    }
}

function timeOut(gmail) {
    setTimeout(() => {
        try {
            const data = JSON.parse(fs.readFileSync('./basa/basejsonUser.json', 'utf8'))
            let copy = Object.assign([], data);
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].mail === gmail) {
                    copy.users[i].code.splice(0, 1, '')
                    fs.writeFileSync('./basa/basejsonUser.json', JSON.stringify(data));
                    return 'Timeout'
                }
            }
            return { status: 500 };
        } catch (err) {
            console.log('Ошибка перезаписи кода', err);
            return err
        }
    }, "120000");
}

function authTrue(gmail, code) {
    try {
        const data = JSON.parse(fs.readFileSync('./basa/basejsonUser.json', 'utf8'))
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].mail === gmail) {
                if (Number(data.users[i].code[0]) === Number(code)) {
                    return { status: 200, token: data.users[i].token[0] };
                }
            }
        }
        return { status: 500 };
    } catch (err) {
        console.log('Ошибка записи токена или записи кода', err);
        return err
    }
}