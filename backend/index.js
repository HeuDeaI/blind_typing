const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blind_typing').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const text_for_typing_schema = new mongoose.Schema({
  text_for_typing: String,
}, { versionKey: false });

const TextModel = mongoose.model('TextModel', text_for_typing_schema, 'text_for_typing');

async function get_text() {
  try {
    const docs = await TextModel.aggregate([{ $sample: { size: 1 } }]);
    if (docs.length > 0) {
      return docs[0].text_for_typing;
    } else {
      console.log('No text found');
      return null;
    }
  } catch (err) {
    console.error('Error fetching text:', err);
    return null;
  }
}

async function upload_text() {
    const input_word = ``.replace(/\s+/g, ' ')
    console.log(input_word.length)
    await new TextModel({ text_for_typing: input_word }).save();
}

app.get('/text_for_typing', async (req, res) => {
  const text_for_typing = await get_text();
  res.json({ text_for_typing: text_for_typing });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});