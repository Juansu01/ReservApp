import express from 'express'
import { Router } from 'express'
import { ordenes } from '../models'
import nodemailer from 'nodemailer'

const confirmationRoute = Router()

function getEmailOptions(email, date, name) {
    const mailOptions = {
        from: 'Juan Camilo en Reservapp',
        to: email,
        subject: 'Tu reserva ha sido confirmada!',
        text: `Hola ${name}! Tu reserva para el día ${date} acaba de ser confirmada.`,
        html: `<b>Hola ${name}! </b><br> Tu reserva para el día ${date} acaba de ser confirmada.`
    }
    return mailOptions
}

function sendEmail(email, date, name) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'juancadaviddev@gmail.com',
                pass: 'tbiporlcdnoqaukb'
            }
        })
        transporter.sendMail(getEmailOptions(email, date, name), (err, info) => {
            if (err) {
                console.error(err)
                return reject({ message: 'Error ocurred' })
            }
            return resolve({ message: 'Email sent successfully!' })
        })
    })
}

confirmationRoute.get('/booking/all', async (req, res) => {
    const allOrders = await ordenes.findAll()
    return res.status(200).json(allOrders)
})

confirmationRoute.put('/booking/:id', async (req, res) => {
    const orderId = req.params.id
    const order = ordenes.findByPk(id)

    if (order) {
        const { } = req.body
    }
})

confirmationRoute.get('/booking/:id', async (req, res) => {
    const id = req.params.id
    const order = await ordenes.findByPk(id, { include: ['usuario'] })
    if (order) {
        return res.status(200).json(order)
    } else {
        return res.status(404).json({ message: 'Order not found' })
    }
})

confirmationRoute.put('/booking/confirmation/:id', async (req, res) => {
    const orderId = req.params.id
    const order = await ordenes.findByPk(orderId)
    if (order) {
        if (order.confirmada) {
            return res.status(400).json({ message: "Order is already confirmed" })
        } else {
            order['confirmada'] = true
            order.save()
            sendEmail(order.email, order.fecha_de_reserva, order.nombres)
                .catch(error => res.status(500).json({ message: error.message }))
            return res.status(200).json({ message: 'Order has been confirmed and email was sent!' })
        }
    } else {
        return res.status(404).json({ message: 'Order was not found' })
    }
})

export default confirmationRoute