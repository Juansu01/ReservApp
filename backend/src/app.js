import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import { sequelize } from './models/index.js'

const app = express()
const corsOptions = {
  origin: 'http://localhost:8080'
}
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions));
app.use(express.json())

routes.forEach(route => {
  app.use('/api', route)
})

app.get('/api', (req, res) => {
  res.json({ message: "Bienvenido a la API de ReservApp!" })
})

app.listen(PORT, async () => {
  await sequelize.authenticate()
  console.log("Server successfully started!")
})
