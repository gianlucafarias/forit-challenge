import bodyParser from 'body-parser';
import express from 'express'
import tasksRoutes from '../routes/tasksRoutes'

const app = express()

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

app.use('/api', tasksRoutes)


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})



