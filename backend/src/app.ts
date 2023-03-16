require('dotenv').config({ path: './config.env' })
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dbo from '../db/conn'
import dbRoutes from '../routes/record'

const app = express()
const port = 8000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', dbRoutes)

app.get('/hello', (req, res) => {
    res.json({msg: 'Hello, World!'})
})

// perform a database connection when the server starts
dbo.connectToServer((err: any) => {
	if (err) {
	  console.error(err)
	  process.exit()
	}
  
	// start the Express server
	app.listen(port, () => {
	  console.log(`Server is running on: http://localhost:${port}`)
	})
})

// app.listen(port, () => console.log(`Server is running on: http://localhost:${port}`))