const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const pool = require('../modules/psql')

router.get('/', (req, res) => {
  if (req.session.authenticated) {
    res.redirect('/')
  }
  res.render('register', { title: 'Register page', error: null, username: null });
});

router.post('/', async (req, res) => {
    const { username, password0, password1 } = req.body;
    if (!username || !password0 || !password1) {
      res.render('register', { title: 'Register page', error: 'invalid data' });
    }
    if (password0 !== password1) {
      res.render('register', { title: 'Register page', error: 'passwords are not the same' });
    }

    const result = await pool.query('select 1 from users where username = $1', [username])
    if (result.rows === 1) {
      res.render('register', { title: 'Register page', error: `user ${username} alerady exists` });
    }

    const hashedPassword = await bcrypt.hash(password0, 10)
    await pool.query('insert into users (username, password) values ($1, $2)', [username, hashedPassword])
    res.redirect('/login')
})

module.exports = router;
