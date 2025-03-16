import express from 'express';
import OpenAI from "openai";
import open from'open';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Endpoint available: POST /openai');
});

app.post('/openai', async (req, res) => {

  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(400).send({ error: 'API key is required' });

  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        // https://platform.openai.com/docs/api-reference/chat/create#chat-create-messages
        {
          role: 'developer',
          content: 'You are an AI that generates HTML, CSS, and JS.'
        },
        {
          role: 'user',
          content: prompt
        },
        {
          role: 'assistant',
          content: 'Response a single html file: <!DOCTYPE html><html>...</html>'
        }
      ],
      store: true,
    });

    const response = completion.choices[0].message;

    res.send(response);

    const content = response.content;
    openUIGeneratedInBrowser(content);

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while processing your request' });
  }
});

app.listen(app.get('port'), () => {
  console.log(`
    Server running at http://localhost:${app.get('port')}.
    Endpoint available: POST /openai
  `);
});

const openUIGeneratedInBrowser = async (responseContent) => {
  const regex = new RegExp(/<!DOCTYPE[^]*>/g);
  const htmlFilePath = path.join(__dirname, 'generated.html');

  const match = regex.exec(responseContent);
  if (!match) throw new Error('No HTML content found in the response');

  const htmlContent = match[0];
  console.log({ htmlContent });
  fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');

  await open(htmlFilePath)
}