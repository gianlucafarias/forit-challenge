import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})



