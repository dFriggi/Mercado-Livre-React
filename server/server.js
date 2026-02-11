const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const productRoutes = require('./routes/productRoutes')


const app = express()

app.use(express.json())
app.use(cors())

app.use('/product', productRoutes)

mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('SUCESSO'))
        .catch((e) => console.log('erro ao conectar:', e));

app.get('/', (req, res) => {
    res.send('Back funcionando')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Servidor rodando na porta', PORT);
})