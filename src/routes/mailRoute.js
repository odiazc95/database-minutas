const express = require('express');
const router = express.Router();
const User = require('../models/usuario');

async function getEmails() {
  const users = await User.find();
  const emails = users.map(user => user.email);
  return emails;
}

router.get('/', async (req, res) => {
  const emails = await getEmails();
  res.render('mail.ejs', { emails });
});

router.get('/emails', async (req, res) => {
  const users = await User.find().select('email');
  const emails = users.map(user => user.email);
  res.json(emails);
});

router.get('/design', (req, res) => {
  res.render('design.ejs');
});
module.exports = router;

