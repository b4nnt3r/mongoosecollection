const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  year: Number,
  director: {
    firstName: String,
    lastName: String
  },
  boxoffice: {
    type: Number,
    unique: true
  },
  genre: [{
    type: String,
    lowercase: true
  }],
  synopsis: String,
  format: [{
    type: String,
    lowercase: true,
    default: 'dvd'
  }]
})
