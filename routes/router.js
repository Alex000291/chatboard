const express = require('express')
const router = express.Router()
const { homepage, renderboard, getboard, postboard, renderthread, getreply, postreply, deletereply, deletethread } = require('../controller/controller')


router.get('/',homepage)
router.get('/:boards', renderboard)
router.get('/api/:boards', getboard)
router.post('/api/:boards', postboard)
router.delete('/api/:boards', deletethread)

router.get('/:boards/:id', renderthread)
router.get('/api/:boards/:id', getreply)
router.post('/api/:boards/:id', postreply)
router.delete('/api/:boards/:id', deletereply)

module.exports = router