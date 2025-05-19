const express = require('express');
const cors = require('cors');
const app = express();
const party = require('./party.js')
const path = require('path')

app.use(cors());
app.use(express.json());

let partyList = []

app.get('/api', (req, res) => {
  res.send('kkkkkkkk');
});

app.post('/chat', (req, res) => {
  const user1 = req.body.user2
  res.send(user1);
});

app.get('/chat', (req, res) => {
  console.log("mensajes")
  partyList.forEach(p => {
    console.log("entrando al jor")
    if (!p.msgList) return; 
    p.msgList[0].forEach((msg, i) => {
      if (msg) console.log(`${p.user1}: ${msg}`)
      if (p.msgList[1][i]) console.log(`${p.user2}: ${p.msgList[1][i]}`)
    })
  })

  res.send("iwiwiw");
})

app.get('/party', (req, res) => {
  let id = req.query.id;
  console.log("el id es " + id)
  partyList.push(new party("user1"))
  res.sendFile(path.join(__dirname, 'partychat.html'))
})

app.post('/join', (req, res) => {
  const user = req.body.user
  for(i = 0; i < partyList.length; i++){
    if (partyList[i].code === "ABC123"){
      partyList[i].addUser(user)
      partyList[i].createChat()
    }
  }
})

app.post('/send2', (req, res) => {
  const msg = req.body.msg
  const user = "user2"
  for(let i = 0; i < partyList.length; i++){
    if (partyList[i].code === "ABC123"){
      partyList[i].sendMessage(user, msg)
    }
  }
  res.sendStatus(200)
})


app.post('/send1', (req, res) => {
  const msg = req.body.msg
  const user = "user1"
  for(i = 0; i < partyList.length; i++){
    if (partyList[i].code === "ABC123"){
      partyList[i].sendMessage(user, msg)
    }
  }


})

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`>>puerto ${PORT}`);
});