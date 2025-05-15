const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let chat = [["hola"], ["hello"]]

app.get('/api', (req, res) => {
  res.send('kkkkkkkk');
});

app.get('/chat', (req, res) => {
  console.log(chat[0].length)
  console.log(chat[1].length)

  res.send(chat.length);
})


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`>> API escuchando en puerto ${PORT}`);
});