import express from 'express'
import { Router } from 'express'
import { compare } from 'bcrypt'
import { usuarios } from '../models'

const authRoute = Router()

authRoute.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await usuarios.scope('withPassword').findOne({
        where: { email: email },
        include: ['rol']
    })
    if (user) {
        compare(password, user.password, (err, result) => {
            const rol = user?.rol?.nombre || ''
            if (result) {
                return res.status(200).json({ message: 'Success!', user_rol: rol, email: user.email })
            } else {
                return res.status(401).json({ messsage: 'Wrong credentials' })
            }
        })
    } else {
        return res.status(404).json(
            { message: 'User not found, check your credentials' }
        )
    }
})

export default authRoute