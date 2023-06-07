import express, { Router } from "express";
import http from "http";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = http.createServer(app);
const port = 3000;

const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
}) 

const router = Router();
app.use(express.static(path.join(__dirname,"public")));
app.get("/", express.static(path.resolve(__dirname, '../static/')))

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

router.get("/send-mail/:message", async (req, res) => {
    try {
        const message = req.params.message;
        console.log(message);

        const mail = await mailer.sendMail({
            from: '"Заявка из сайта" sib-alpiks@sib-alpiks.ru',
            to: "andrey.kazako75@gmail.com",
            subject: "Новая заявка!",
            html: message,
        })
        console.log(mail);
    }
    catch (err) {
        console.log(err);
    }
})

app.use(router)

server.listen(port, () => {console.log('[' + Date.now().toString().slice(9) + '] Server -> OK. Port: ' + port)})