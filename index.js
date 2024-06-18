
//import https from"https";
import express from 'express';
import fs from 'fs';
const app = express();

//const key = fs.readFileSync("ca.key");
//const cert = fs.readFileSync("ca.crt");

//const server = https.createServer({ key, cert }, app);

import { addTitle } from './mods/addtitle.js';
import { editTitle } from './mods/editpost.js';
import { addData } from './mods/home.js';
import { getOnePost } from './mods/getonepost.js';
import { getByTeg } from './mods/getByTeg.js';
import { getByYearThis } from './mods/getByYear.js';
import { getTegs } from './mods/getTegs.js';
import { getYear } from './mods/getYear.js';
import { getByGenreThis } from './mods/getByGenreThis.js';
import { getGenre } from './mods/getGenre.js';
import { authUser } from './mods/auth.js'
import multer from 'multer';
import cors from 'cors';
import { dirname } from 'node:path';
import path from 'node:path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('pabl'));

app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // your path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage })

let user = undefined

app.post('/custom-email', async (req, res) => {
    const transporter = nodemailer.createTransport(
        {
            pool: true,
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: 'marenichd1990@gmail.com',
                refreshToken: '1//04yDcKy7ortHACgYIARAAGAQSNwF-L9IrnvkUQFqQtalgB2HuRH9iycwuwDNaBOTUrmPmiRuwHGKPgbKLpsPJTbJPvFEbrK1o6jE',
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
            console.log('A new access token was generated')
            console.log('User: %s', token.user)
            console.log('Access Token: %s', token.accessToken)
            console.log('Expires: %s', new Date(token.expires))
        })
    })

    const mailer = message => {
        transporter.sendMail(message, (err, info) => {
            if (err) return console.log(err)
            console.log('Email sent: ', info)
        })
    }

    const message = {
        to: req.body.email,
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
                                                ${req.body.email}
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
                                                Attention code valid only 3 minutes
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
    user = req.body
    res.redirect('/custom-email')
})



app.post('/author/add', upload.single('file'), (req, res) => {
    addTitle(req.body)
    res.send('Файл успешно загружен!');
});
app.get('/author/posts/blog', (req, res) => {
    res.json(addData());
});

app.get('/author/posts/blog/download/img', (req, res) => {
    const getRecipePhoto = (req) => {
        try {
            const filePath = path.join(__dirname + "/uploadsstatik", String(req.query.id) + ".png");
            res.sendFile(filePath);
        } catch (e) {
            console.log(e)
        }
    }
    getRecipePhoto(req)
});

const PORT = process.env.PORT || 8080;
const HOST = 'localhost';

app.get('/', (req, res) => {
    res.json(addData())
});

app.post('/auth', (req, res) => {
    const tocen = jwt.sign({
        gmail: req.body
    }, 'secret123');

    res.json({
        status:authUser(req.body.gmail),
        auth:true,
        tocen
    })
});

app.get('/tegs', (req, res) => {
    res.json(getTegs());
});

app.get('/years', (req, res) => {
    res.json(getYear())
});

app.get('/genres', (req, res) => {
    res.json(getGenre())
});

app.post('/add', (req, res) => {
    addTitle(req.body)
    res.json(addData())
});

app.get('/post', function (req, res) {
    let id = req.query.id;
    res.json(getOnePost(id))
});

app.get('/teg', function (req, res) {
    let teg = req.query.teg;
    console.log(teg)
    res.json(getByTeg(teg))
});

app.get('/year', function (req, res) {
    let teg = req.query.teg;
    res.json(getByYearThis(teg))
});

app.get('/genre', function (req, res) {
    let teg = req.query.teg;
    res.json(getByGenreThis(teg))
});

app.post('/edit', (req, res) => {
    editTitle(req.body)
});

app.listen(PORT, () => {
    console.log(`Server run: http://${HOST}:${PORT}`)
});
