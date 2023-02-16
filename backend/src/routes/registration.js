import express from 'express'
import { Router } from 'express'
import { usuarios, ordenes } from '../models'
import { validate } from 'email-validator'
import { genSalt, hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'

const registerRoute = Router()

registerRoute.post('/register', async (req, res) => {

    const { email, password } = req.body
    const user = await usuarios.findOne({ where: { email: email } })

    if (user) {
        res.status(401).json({ message: "User already exists" })
        return
    }

    if (validate(email)) {
        genSalt(10, (err, salt) => {
            hash(password, salt, async (err, hash) => {
                if (err) {
                    res.status(500).json({ message: 'Internal server error' })
                }
                const {
                    nombres,
                    apellidos,
                    tipo_de_documento,
                    identificacion,
                    fecha_de_reserva,
                    tipo_de_reserva,
                    cantidad_de_personas
                } = req.body
                const userId = uuid()
                const newUser = await usuarios.create({ email, password: hash, id: userId })
                const newOrder = await ordenes.create({
                    id: uuid(),
                    nombres: nombres,
                    email,
                    apellidos,
                    tipo_de_documento,
                    identificacion,
                    fecha_de_reserva,
                    tipo_de_reserva,
                    cantidad_de_personas,
                    usuario_id: newUser.id
                })
                return res.status(200).json({ message: 'Success!' })
            })
        })
    } else {
        res.status(401).json({ message: 'Not a valid email' })
    }
})

registerRoute.post('/register/booking/:email', async (req, res) => {
    const userEmail = req.params.email
    const user = usuarios.findOne({ where: { email: userEmail } })
    if (user) {
        const {
            nombres,
            apellidos,
            tipo_de_documento,
            identificacion,
            fecha_de_reserva,
            tipo_de_reserva,
            descripcion_observaciones
        } = req.body
        const id = uuid()
        const newOrder = await ordenes.create({
            id,
            nombres,
            apellidos,
            tipo_de_documento,
            identificacion,
            email: userEmail,
            fecha_de_reserva,
            tipo_de_reserva,
            descripcion_observaciones,
            usuario_id: user.id,
            confirmada: false
        })
        return res.status(200).json(newOrder)
    } else {
        return res.status(404).json({ message: 'User not found' })
    }
})

export default registerRoute