const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());


const text_for_typing = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the    
      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
      electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
      Aldus PageMaker including versions of Lorem Ipsum.`.replace(/\s+/g, ' ')

app.get('/text', (req, res) => {
  res.json({ text: text_for_typing });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
