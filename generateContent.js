// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Access your API key as an environment variable
// require('dotenv').config();
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// async function generateContent(prompt) {
//   try {
//     // For text-only input, use the gemini-pro model
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     return text;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Content generation failed');
//   }
// }

// module.exports = generateContent;

// // Example usage:
// // const prompt = "Write a story about a magic backpack.";
// // generateContent(prompt).then((content) => console.log(content));
