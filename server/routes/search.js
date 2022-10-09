let express = require('express');
let router = express.Router();

let searchController = require('../controllers/search');

/* POST Route for processing the Add page - CREATE Operation */
router.post('', searchController.processSearch);

module.exports = router;