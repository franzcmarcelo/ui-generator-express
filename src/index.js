import express from 'express';
import OpenAI from "openai";

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/openai', async (req, res) => {
  const { prompt } = req.body;
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(400).send({ error: 'API key is required' });
  }

  const openai = new OpenAI({
    apiKey,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an interface generation assistant." },
        {
          role: "user",
          content: prompt
        },
      ],
      store: true,
    });

    console.log(completion.choices[0].message);
    res.send(completion.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while processing your request' });
  }
});

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});