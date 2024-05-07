// Create web server
// Initialize express
const express = require('express');
const router = express.Router();

// Import commentsController
const commentsController = require('../controllers/commentsController');

// Create a new comment
router.post('/comments', commentsController.create);

// Get all comments
router.get('/comments', commentsController.index);

// Get one comment
router.get('/comments/:id', commentsController.show);

// Update a comment
router.put('/comments/:id', commentsController.update);

// Delete a comment
router.delete('/comments/:id', commentsController.delete);

// Export router
module.exports = router;