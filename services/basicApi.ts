import { ai } from "../aiClient";
import { HistoryItem } from "../history";

//DEFAULT - Convo based on topic - User chooses a topic
export async function basicApi(
  input: HistoryItem[],
  words: string[],
  grammars: string[],
  language: string,
  level: string
): Promise<string | undefined> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: input,
      config: {
        systemInstruction: `You are a ${language} tutor. You will only reply in this language.
          The user's language comprehension level is ${level}.
          The user has learned these words: ${words}
          The user has learned these grammar points: ${grammars}
          Adjust your word choices and teachning material to this comprehension level.
          Add a translation next to words that are beyond the user's level. 
          Examples: 
          -Ich hätte nie gedacht, dass das so kompliziert (complicated) ist.
          -Ich bewundere seine Ausdauer (perseverance), weil er niemals aufgibt.
          -有一个小小的雨滴 (yǔdī=rain drop).
          -最后，小雨滴流进了一条小河 (xiǎohé=river)
          -有时候有太阳 (tàiyáng=sun)
          -Er hat die Situation ruhig und überlegt (calmly, thoughtfully) gelöst.
          Important: You must always check the user's sentence for errors and correct them.
          `,
      },
    });
    const reply = response.text;
    return reply;
  } catch (err) {
    console.error(err);
  }
}
