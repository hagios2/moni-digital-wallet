import express from 'express'
import auth_router from './auth.js'
import transaction_router from './wallet.js'


const app = express()

app.use('/auth', auth_router)

app.use('/transaction', transaction_router)

app.use('/student', transaction_router)

export default app