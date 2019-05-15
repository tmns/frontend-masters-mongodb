const express = require('express')
const morgan = require('morgan')
const connect = require('../connect')
const {json, urlencoded} = require('body-parser')
const app = express()
const Todo = require('./todo')

app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

app.get('/todo/:id', async (req, res) => {
  const todoId = req.params.id
  try {
    var todo =  await Todo.findById(todoId)
      .lean()
      .exec();
      return res.status(200).send(todo);
  } catch (e) {
    res.status(500).send();
  }
})

app.get('/todos', async (req, res) => {
  try {
    return res.status(200).json(await Todo.find({}).lean().exec());
  } catch (e) {
    res.status(500).send();
  }
})

app.post('/todo', async (req, res) => {
  const todoToCreate = req.body.todo;
  try {
    var todo = await Todo.create(todoToCreate)
    return res.status(201).json(todo.toJSON());
  } catch (e) {
    res.status(500).send();
  }
})

connect('mongodb://localhost:27017/test')
  .then(() => app.listen(4000, () => {
    console.log('server on http://localhost:4000')
  }))
  .catch(e => console.error(e))
