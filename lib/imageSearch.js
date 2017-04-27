/**
 * Created by petersquicciarini on 4/26/17.
 */

const request = require('request');
const db = require('./db');

module.exports = ({ apiKey, engineId }) => ({
  search(searchTerm, offset, cb) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineId}&searchType=image&q=${searchTerm}${offset ? `&start=${(offset - 1) * 10}` : ''}`;
    request(url, (err, res, body) => {
      if (err) {
        return cb(err);
      }
      if (res && res.statusCode >= 400) {
        return cb(res.statusCode);
      }
      return cb(null, JSON.parse(body));
    });
    db.saveQuery(searchTerm, (err) => {
      if (err) {
        console.log('Could not save query to DB.');
      }
    });
  },
});
