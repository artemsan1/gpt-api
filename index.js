const express = require("express");
const axios = require("axios");
const cors = require("cors");

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
          Authorization: "Bearer ${apiKey}",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Ошибка при обращении к GPT");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Сервер запущен на порту ${PORT}));
