import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/*
export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name } = req.query;
  return res.json({
    message: `Hello ${name}!`,
  });
}*/

type HistoryItem = {
  role: string;
  parts: { text: string | undefined }[];
};

const history: HistoryItem[] = [];

//DEFAULT - Convo based on topic - User chooses a topic
async function basicApi(
  input: string,
  words: string[],
  grammars: string[],
  language: string,
  level: string
) {
  history.push({
    role: "user",
    parts: [{ text: input }],
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: history,
      config: {
        systemInstruction: `You are a ${language} tutor. You will only reply in this language.
          The user's language comprehension level is ${level}.
          Adjust your word choice to this comprehension level.
          For words that might be new for the user, add a translation next to it. 
          Examples: 
          -Ich hätte nie gedacht, dass das so kompliziert (complicated) ist.
          -Ich bewundere seine Ausdauer (perseverance), weil er niemals aufgibt.
          -有一个小小的雨滴 (yǔdī=rain drop).
          -最后，小雨滴流进了一条小河 (xiǎohé=river)
          -有时候有太阳 (tàiyáng=sun)
          -Er hat die Situation ruhig und überlegt (calmly, thoughtfully) gelöst.
          You must correct the user if they make a mistake or if the sentence feels awkward
          The user is currently learning these words: ${words}
          The user is currently learning these grammar points: ${grammars}
          `,
      },
    });
    const reply = response.text;
    history.push({
      role: "model",
      parts: [{ text: reply }],
    });
    return reply;
  } catch (err) {
    console.error(err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method == "POST") {
    const { input, words, grammars, language, level } = req.body;
    console.log(input);
    try {
      const response = await basicApi(input, words, grammars, language, level);
      res.send(response);
    } catch (err) {
      console.error("API error: ", err);
      res.status(500).json({ message: err });
    }

    return res.status(200).json({ message: "POST received" });
  }
}
