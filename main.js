const express = require('express');
const cors = require('cors');
const app = express();
const Party = require('./party.js');
const path = require('path');

app.use(cors());
app.use(express.json());

const parties = [];

app.get('/status', (req, res) => {
  res.json({
    status: 'active',
    parties: parties.length,
    version: '1.0.0'
  });
});

app.post('/party', (req, res) => {
  try {
    const code = Party.generateCode();
    const newParty = new Party(req.body.host, code);
    parties.push(newParty);
    res.json({ 
      code,
      users: newParty.getUsers()
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating party' });
  }
});

app.post('/party/join', (req, res) => {
  const { code, user } = req.body;
  const party = parties.find(p => p.code === code);

  if (!party) {
    return res.status(404).json({ error: 'Party not found' });
  }

  if (party.isFull()) {
    return res.status(400).json({ error: 'Party is full' });
  }

  if (party.addUser(user)) {
    res.json({
      code: party.code,
      users: party.getUsers()
    });
  } else {
    res.status(400).json({ error: 'Failed to join party' });
  }
});

app.post('/party/message', (req, res) => {
  const { code, user, message } = req.body;
  const party = parties.find(p => p.code === code);

  if (!party) {
    return res.status(404).json({ error: 'Party not found' });
  }

  if (!party.isValidUser(user)) {
    return res.status(403).json({ error: 'Unauthorized user' });
  }

  if (party.sendMessage(user, message)) {
    res.json({ status: 'Message sent' });
  } else {
    res.status(400).json({ error: 'Failed to send message' });
  }
});

app.get('/party/messages', (req, res) => {
  const { code } = req.query;
  const party = parties.find(p => p.code === code);

  if (!party) {
    return res.status(404).json({ error: 'Party not found' });
  }

  res.json({
    code: party.code,
    messages: party.messages
  });
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'partychat.html'));
});

app.get('/debug/parties', (req, res) => {
  res.json(parties.map(p => ({
    code: p.code,
    users: p.getUsers(),
    messages: p.messages.length
  })));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});