const router = require('express').Router()
const { getUser, getContacts, addContact, updateUser, deleteUser, deleteContact, getAllusers } = require('../controllers/userCtrl')

router.get('/getUser', getUser)
router.get('/getAllUsers', getAllusers)
router.get('/contact/:id', getContacts)
router.put('/:id/contact', addContact)
router.put('/:id/deleteContact', deleteContact)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
module.exports = router