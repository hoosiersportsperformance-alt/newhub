import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const handler = async (event) => {
  try {
    const { readiness, sessions } = JSON.parse(event.body);
    const prompt = `Analyze athlete readiness and sessions: ${JSON.stringify({ readiness, sessions })}`;
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });
    return { statusCode: 200, body: JSON.stringify({ insights: res.choices[0].message.content }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ error: "AI insights failed" }) };
  }
};
