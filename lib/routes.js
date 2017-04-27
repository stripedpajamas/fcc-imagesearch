/**
 * Created by petersquicciarini on 4/27/17.
 */

const express = require('express');
const path = require('path');
const imageSearch = require('./imageSearch')({
  apiKey: process.env.apiKey,
  engineId: process.env.engineId,
});
const db = require('./db');

const router = express.Router();


router.use(express.static(path.resolve(__dirname, '../public')));

router.get('/api/imagesearch/:searchTerm', (req, res) => {
  imageSearch.search(req.params.searchTerm, req.query.offset || null, (err, data) => {
    if (err) {
      return res.json({ ok: false, error: err });
    }
    const searchResults = [];
    data.items.forEach((item) => {
      const itemData = {
        link: item.link,
        snippet: item.snippet,
        context: item.image.contextLink,
        thumbnail: item.image.thumbnailLink,
      };
      searchResults.push(itemData);
    });
    return res.json({ ok: true, searchResults });
  });
});

router.get('/api/latest/imagesearch', (req, res) => {
  db.getLatest((err, searches) => {
    if (err) {
      return res.json({ ok: false, error: err });
    }
    return res.json(searches);
  });
});

router.use('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
