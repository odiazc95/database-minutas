const express = require('express');
const Minute = require('../models/minuta');
const router = express.Router();

router.get('/dashboard', async (req, res, next) => {
    res.render('dashboard'); 
});

module.exports = router;
