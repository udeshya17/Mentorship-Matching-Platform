module.exports = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
  };
  