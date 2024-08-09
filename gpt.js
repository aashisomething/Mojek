const OpenAI = require("openai");
const dotenv = require('dotenv');

dotenv.config();

const GPT_API_KEY = process.env.GPT_API_KEY;

const openai = new OpenAI({
  apiKey: GPT_API_KEY,
});

async function main() {
  try {
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-4o",
    });

    console.log(completion.choices[0]);
  } catch (error) {
    
    console.error("Error creating completion:", error);
  }
}


main();
