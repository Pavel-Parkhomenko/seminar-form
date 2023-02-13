import { Router } from 'express'
const router = Router()
const nodemailer = require('nodemailer')

router.post('/sendmail',
    async (req, res) => {
        try {
            const { fio, email, seminar } = req.body;
            console.log("sendmail")

            let testEmailAccount = await nodemailer.createTestAccount()

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'john.smith.my.acc@gmail.com',
                    pass: 'kcpuxonlpitfovgj',
                },
            })

            transporter.sendMail({
                from: 'john.smith.my.acc@gmail.com',
                to: email,
                subject: 'Запись на семинар',
                text: 'Вы успешно записались на семинар.',
                html:
                    `<h2>Уважаемый <b>${fio}</b>, семинар <i>${seminar}</i> начнется 01.05.2023 в 19:00</h2>`,
            }, function (err, data) {
                if (err) {
                    res.status(400).json({ message: "failed" })
                } else {
                    res.status(201).json({ message: "success" })
                }
            });

        } catch (err) { console.log(err) }
    })

module.exports = router
