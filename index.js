import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const message = req.body.message || "Привет!";
  const apiKey = "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";

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send("Ошибка при обращении к GPT");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
