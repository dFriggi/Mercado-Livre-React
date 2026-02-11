const Product = require('../models/Product')
const Joi = require('joi')

const validateProducts = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        quantity: Joi.number().required(),
        description: Joi.string().required(),
        imageUrl: Joi.string().required()
    })
    return schema.validate(data)
}

exports.getAllProducts = async(req, res) => {
    try {
        const products = (await Product.find()).sort({category: 1})
        res.json(products)
    } catch(err) {
        res.status(500).json({ message: "Erro ao buscar produtos." })
    }
}

exports.createProduct = async(req, res) => {
    const { error } = validateProducts(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    try {
        const productExists = await Product.findOne({ name: req.body.name })
        if(productExists) return res.status(404).json({ message: 'Produto já cadastrado' })
        
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            category: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        })
        await product.save()

        return res.status(201)
    } catch(err) {
        res.status(500).json({ message: err })
    }
}

exports.updateProduct = async(req, res) => {
    const { error } = validateProducts(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: "true" })
        if(!product) return res.status(400).json({ message: "Produto não encontrado." })

        res.status(200)
    } catch(err) {
        res.status(500).json({ message: err })
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const product = await User.findByIdAndDelete(req.params.id)
        if(!product) return res.status(404).json({ message: "Usuário não encontrado" })

        res.status(200)
    } catch(err) {
        res.status(500).json({ message: "Erro ao deletar." })
    }
}