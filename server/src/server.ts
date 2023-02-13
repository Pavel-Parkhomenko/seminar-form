import express from 'express'
import cors from 'cors'
import { PORT } from './constants/constants'

const app = express()
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.use(express.json())
app.use('/mail', require('./routes/mail.route'))

function start() {
  try {
    app.listen(PORT, ()=>{
      console.log(`Server run in ${PORT}`)
  })
  } catch (err) { console.log(err) }
}

start()

module.exports = app
