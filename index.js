const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

const port = process.env.Port || 3000 ;

app.use(express.static('public'));

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'views' ,'index.html'));
});


app.get('/api{/:date}', (req, res) => {
  let { date } = req.params;

  if (!date) {
    date = new Date();
  } else if (!isNaN(date)) {
    date = new Date(parseInt(date)); // If it's a Unix timestamp
  } else {
    date = new Date(date); // Otherwise, parse as a string
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});



app.listen(port,()=>{
  console.log(`Server is listening at http://localhost:${port}`)
})