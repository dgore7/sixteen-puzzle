const express =  require('express');
const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/index.js', (req, res) => {
  res.sendFile(__dirname + "/index.js");
});

app.get('/index.css', (req, res) => {
  res.sendFile(__dirname + "/index.css");
});

app.listen(PORT, () => console.log("app is listening on port " + PORT));
