import express from 'express'
import tasksRoutes from '../routes/tasksRoutes'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando correctamente')
})

// Rutas de las tareas
app.use('/api', tasksRoutes)

const PORT = process.env.PORT || 3008

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})



