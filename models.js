const mongoose = require('mongoose');

const choresSchema = mongoose.Schema({
  lastCheckIn: String,
  daily: Array,
  weekly: Array,
  longer: Array,
  done: Array,
});

choresSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    lastCheckIn: this.lastCheckIn,
    daily: this.daily,
    weekly: this.weekly,
    longer: this.longer,
    done: this.done,
  };
}

const Chores = mongoose.model('Chores', choresSchema);

module.exports = {Chores};