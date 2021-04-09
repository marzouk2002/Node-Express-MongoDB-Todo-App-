const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const todoModel = require('./models/todo')

mongoose.connect('mongodb://localhost/mongodb-todo-app')

app.use('/', express.static(path.resolve(__dirname, 'assets')))

app.use(bodyParser.json())

app.post('/api/create', async (req, res)=> {
	const record = req.body
	console.log(record)
	await todoModel.create(record).then(response=>console.log(response))
	res.json({status: 'ok'})
})

app.get('/api/get', async (req, res)=> {
	const records  = await todoModel.find({})
	res.json(records)
})

app.post('/api/modify', async (req, res)=>{
	const {old: oldTitle, new:newTitle} = req.body
	console.log(oldTitle, newTitle)
	await todoModel.updateOne({
		record:oldTitle
	},{
		$set:{record:newTitle}
	})
	res.end()
})

app.delete('/api/delete', async (req, res)=>{
	const { record } = req.body
	console.log(record)
	await todoModel.deleteOne({ record })
})

app.listen(13371, '127.0.0.1', () => {
	console.log('Server up')
})
