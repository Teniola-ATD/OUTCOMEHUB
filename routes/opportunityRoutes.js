const express = require('express');
const router = express.Router();
const { createOpportunity, getAllOpportunities, applyToOpportunity, reviewApplication } = require('../controllers/opportunityController');

router.post('/', createOpportunity);
router.get('/', getAllOpportunities);
router.post('/apply', applyToOpportunity);
router.patch('/review/:applicationId', reviewApplication);

module.exports = router;