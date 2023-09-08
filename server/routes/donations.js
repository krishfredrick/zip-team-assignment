const express = require('express');
const router = express.Router()

const  {
  postUserDonation,
  getThankyou,
  getUserDonation
}  = require('../controllers/dontaions')

router.post('/', postUserDonation);
router.get('/', getUserDonation);
router.get('/thankyou', getThankyou);

module.exports = router;