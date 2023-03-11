const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// OpenAI
const config = new Configuration({
    apiKey: process.env.OPENAI_PRIVATE_KEY,
});
const openai = new OpenAIApi(config);
const gpt = async (text) => {
    const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.6,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });
    return res.data.choices[0].text;
};

app.get("/api", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});

app.post("/reply", async (req, res) => {
    const { text, slang, tone, positive } = req.body;

    // Settings
    var settings = "";
    if(slang) settings += "slangs lowercase,";
    if(tone) settings += "casual,";
    else settings += "formal,";
    if(positive) settings += "positive,"
    else settings += "negative,"

    const prompt = `generate reply with these settings: ${settings} reply under 16 words to "${text}"`;
    const reply = await gpt(prompt);

    res.json({
        message: "Request fullfiled.",
        reply,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
