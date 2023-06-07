var express = require('express');
var router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session.authenticated) next()
  res.redirect('/login')
}

router.get('/', (req, res) => {
  console.log(req.session)
  const username = req.session.username
  res.render('index', { title: 'Home page', username });
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.session.destroy()
  res.render('logout',{ title: 'Logout page', username: null })
})

router.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile',{ title: 'Profile', username: req.session.username })
})

module.exports = router;
