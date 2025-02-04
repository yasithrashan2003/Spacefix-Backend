// server.js or index.js (your main application file)
const express = require('express');
const lecturersRouter = require('./routes/lecturers');

const app = express();

app.use(express.json());
app.use('/api/lecturers', lecturersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});