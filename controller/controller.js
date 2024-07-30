const mongoose = require('mongoose')
const model = require('../models/models')
const { render } = require('ejs')

async function homepage(req, res){
  res.render('homepage')
}

async function renderboard(req, res){
  const board = req.params.boards
  const id = req.params.id
  res.render('boardtemplate', { board, id })
}

async function getboard(req, res){
  const thread = await model.find({board: req.params.boards})
  res.json({ thread });
}

async function postboard(req, res){
  const { title, content } = req.body
  const board = req.params.boards
  const thread = await model.create({ board, title, content })
  res.json(thread)
}

async function renderthread(req, res){
  const board = req.params.boards
  const id = req.params.id
  const thread = await model.findOne({ _id: id })
  res.render('threadtemplate', { board, id, thread })
}

async function deletethread(req, res){
  const board = req.params.boards
  const thread = await model.deleteOne({ board })
}

async function getreply(req, res){
  const reply = await model.find({replyid: req.params.id})
  const board = req.params.boards
  const id = req.params.id
  res.json({ reply, id, board })
}

async function postreply(req, res){
  const { title, content  } = req.body;
  replyid = req.params.id;
  const board = req.params.boards;
  const reply = await model.create({ board, title, content, replyid });
  res.json(reply);
}

async function deletereply(req, res){
  const reply = await model.deleteOne({ _id: req.params.id })
  res.json(reply)
}
module.exports = {
  homepage,
  renderboard,
  getboard,
  postboard,
  renderthread,
  getreply,
  postreply,
  deletereply,
  deletethread
}