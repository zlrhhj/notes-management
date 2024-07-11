const express = require('express');
const Tag = require('../../db/tag');
const router = express.Router();

router.post('/tags', async (req, res) => {
  try {
    const tag = new Tag({
      ...req.body,
      user: req.user._id,
    });
    await tag.save();
    res.status(201).send(tag);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.find({ user: req.user._id });
    if(!tags) {
      return res.status(404).send();
    }
    res.send(tags);
  } catch (error) {
    res.status(400).send();
  }
});

router.delete('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if(!tag) {
      return res.status(404).send();
    }
    res.send(tag);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;