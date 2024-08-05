import express from "express";
import cors from "cors";
import { OpenAI } from "openai";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const apiKey = process.env.VITE_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey });

app.post("/chatbot", async (req, res) => {
  const { question } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",

    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: question,
      },
    ],
    max_tokens: 500,
  });
  res.send(response.data.choices[0].message.content);
});
/**forsette med å sette opp response i morgen */
