
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
import {authUser}from './mods/auth.js'
import multer from 'multer';
import cors from 'cors';
import { dirname } from 'node:path';
import path from 'node:path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'

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
            const filePath = path.join(__dirname + "/uploadsstatik", String(req.query.id) +".png");
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
    const tocen  = jwt.sign({
        gmail:req.body
    },'secret123');
    
    res.json({
        status:authUser(req.body.gmail),
        auth:true,
        tocen,
        mail:req.body.gmail
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
