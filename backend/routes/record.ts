require('dotenv').config({ path: '../config.env' })

import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router()

// This will help us connect to the database
import dbo from '../db/conn'

// verify user exists
recordRoutes.route('/verify').post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('users')
  const cred = { email: req.body.email }

  try {
    const user = await collection.findOne(cred)
    
    if(user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password)

      if(!isMatch) {
        res.json({ msg: 'error' })
        return
      }

      const token = jwt.sign(user, process.env.JWT_SECRET)

      res.json(token)
    } else {
      res.json({ msg: 'error' })
    }
  } catch(err) {
    res.json({ msg: 'error' })
  }
})

// register a new user
recordRoutes.route('/register').post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('users')
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  try {
    const user = await collection.findOne({ $or: [{ username: newUser.username }, { email: newUser.email }]})

    if(user) {
      res.json({ err: 'error'})
      return
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(newUser.password, salt)
    
    newUser.password = passwordHash
    const result = await collection.insertOne(newUser)
    
    if(result.insertedId !== null) {
      res.json(result)
    } else {
      res.json({ err: 'error' })
    }
  } catch(err) {
    res.json({ err: 'error' })
  }
})

// get user info
recordRoutes.route('/user').post(async (req, res) => {
  const token = req.body.token.replace(/"/g, '')

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET)

    res.json(verify)
  } catch(err) {
    console.log(err)
    res.json({ msg: 'error' })
  }
})

export default recordRoutes