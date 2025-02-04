// routes/lecturers.js
const express = require('express');
const router = express.Router();
const { admin, db } = require('../config/firebase-config');

// GET all lecturers
router.get('/', async (req, res) => {
  try {
    const lecturersRef = db.collection('lecturers');
    const snapshot = await lecturersRef.get();
    
    const lecturers = [];
    snapshot.forEach(doc => {
      lecturers.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.status(200).json({
      success: true,
      data: lecturers
    });
  } catch (error) {
    console.error('Error getting lecturers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve lecturers',
      message: error.message
    });
  }
});

// POST new lecturer
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        error: 'Email and name are required'
      });
    }

    // Check if email already exists
    const emailCheck = await db.collection('lecturers')
      .where('email', '==', email)
      .get();

    if (!emailCheck.empty) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    const lecturerData = {
      email,
      name,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('lecturers').add(lecturerData);
    
    res.status(201).json({
      success: true,
      data: {
        id: docRef.id,
        ...lecturerData
      }
    });
  } catch (error) {
    console.error('Error creating lecturer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lecturer',
      message: error.message
    });
  }
});

// PUT update lecturer
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const lecturerId = req.params.id;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }

    const lecturerRef = db.collection('lecturers').doc(lecturerId);
    const lecturer = await lecturerRef.get();

    if (!lecturer.exists) {
      return res.status(404).json({
        success: false,
        error: 'Lecturer not found'
      });
    }

    await lecturerRef.update({
      name,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).json({
      success: true,
      message: 'Lecturer updated successfully'
    });
  } catch (error) {
    console.error('Error updating lecturer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update lecturer',
      message: error.message
    });
  }
});

// DELETE lecturer
router.delete('/:id', async (req, res) => {
  try {
    const lecturerRef = db.collection('lecturers').doc(req.params.id);
    const lecturer = await lecturerRef.get();

    if (!lecturer.exists) {
      return res.status(404).json({
        success: false,
        error: 'Lecturer not found'
      });
    }

    await lecturerRef.delete();
    
    res.status(200).json({
      success: true,
      message: 'Lecturer deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting lecturer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete lecturer',
      message: error.message
    });
  }
});

module.exports = router;