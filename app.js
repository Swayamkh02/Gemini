const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY not found. Please set the API_KEY environment variable.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/send-message', async (req, res) => {
  const { message } = req.body;

  try {
    const generatedResponse = await generateResponse(message);
    res.json({ response: generatedResponse });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function generateResponse(userMessage) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
    // Make sure the conversation history ends with a user role
    const chat = model.startChat({
        history: [
            {
              role: "user",
              parts: userMessage,
            },
            {
              role: "model",
              parts: "Placeholder response to initiate the conversation.",
            },
          ],
        //   generationConfig: {
        //     maxOutputTokens: 100,
        //   },
    });
  
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  }
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
