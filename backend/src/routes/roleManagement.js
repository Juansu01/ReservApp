import express from 'express'
import { Router } from 'express'
import { compare } from 'bcrypt'
import { usuarios, roles } from '../models'

const roleManagementRoute = Router()
const ALLOWED_ROLES = ['admin', 'superuser']

roleManagementRoute.post('/users/:email/:password/roles', async (req, res) => {
    const userEmail = req.params.email
    const password = req.params.password
    const user = await usuarios.scope('withPassword').findOne(
        { where: { email: userEmail }, include: ['rol'] }
    )
    if (!user) return res.status(404).json({ message: 'User not found' })

    compare(password, user.password, async (err, result) => {
        if (result) {
            const rol = user?.rol?.nombre
            if (!ALLOWED_ROLES.includes(rol)) {
                res.status(403).json({ message: 'You are not allowed to use this route.' })
            }
            if (rol === 'superuser') {
                const emailFromBody = req.body.email
                const newRolFromBody = req.body.rol
                const userReceivingRole = await usuarios.findOne(
                    { where: { email: emailFromBody } }
                )
                const newRol = await roles.create(
                    {
                        nombre: newRolFromBody,
                        usuario_id: userReceivingRole.id
                    }
                )
                res.status(200).json(
                    { message: `Role: ${newRol.nombre} successfully granted to ${emailFromBody}` }
                )
            } else if (rol === 'admin') {
                res.status.json({ message: 'You are an admin' })
            }
        } else {
            res.status(401).json({ message: 'Unauthorized, wrong credentials' })
        }
    })
})

roleManagementRoute.get('/users/:email/rol', async (req, res) => {
    const userEmail = req.params.email
    const user = await usuarios.findOne({
        where: { email: userEmail },
        include: ['rol']
    })

    if (!user) res.status(404).json({ message: 'User was not found.' })

    const rol = user?.rol?.nombre
    if (user && rol) {
        const rol = user.rol.nombre
        res.status(200).json({ rol: rol })
    } else {
        res.status(200).json({ message: 'You\'re just a normal user', rol: null })
    }
})

export default roleManagementRoute