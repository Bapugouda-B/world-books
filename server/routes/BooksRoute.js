const router = require('express').Router();
const {getFavBooks, postFavBooks, updateFavBooks, deleteFavBooks} = require('../controllers/booksControler.js');


router.get('/favoritebooks', getFavBooks);

router.post('/favoritebooks', postFavBooks);

router.put('/favoritebooks/:id', updateFavBooks);

router.delete('/favoritebooks/:id', deleteFavBooks);

module.exports = router;
