/**
 * Created by petersquicciarini on 4/27/17.
 */

// need methods for adding an entry and retrieving the last couple
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const SearchSchema = mongoose.Schema({
  searchTerm: String,
  timestamp: Date,
});
const Search = mongoose.model('Search', SearchSchema);

module.exports = {
  saveQuery(searchTerm, cb) {
    Search.create({
      searchTerm,
      timestamp: Date.now(),
    })
      .then(() => {
        cb(null);
      })
      .catch((err) => {
        cb(err);
      });
  },
  getLatest(cb) {
    // 604800000 ms = 7 days
    const currentTime = Date.now();
    const lastWeek = new Date(currentTime - 604800000).toISOString();
    Search.find({
      timestamp: { $gte: lastWeek },
    }, {
      _id: 0, searchTerm: 1, timestamp: 1,
    }, cb);
  },
};
