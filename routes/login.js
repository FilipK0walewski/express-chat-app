const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const pool = require('../modules/psql');

router.get('/', (req, res) => {
    console.log(req.session)
    if (req.session.authenticated) {
        res.redirect('/')
    }
    res.render('login', { title: 'Login page', error: null, username: null });
});

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.render('login', { title: 'Login page', error: 'error', username: null });
    }

    const result = await pool.query('select password from users where username = $1', [username])
    if (result.rows.length === 0) {
        res.render('login', { title: 'Login page', error: `user ${username} does not exists`, username: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
        res.render('login', { title: 'Login page', error: 'invalid password', username: null });
    }

    req.session.authenticated = true
    req.session.username = username
    res.redirect('/')
})

module.exports = router;