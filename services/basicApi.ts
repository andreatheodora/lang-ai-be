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
          ${words && `The user has is learning words: ${words}`}
          ${
            grammars && `The user is learning these grammar points: ${grammars}`
          }          
          Adjust your word choices and teachning material to this comprehension level.
          Add a translation next to words that might be beyond the user's level. 
          Examples: 
          -Ich hätte nie gedacht, dass das so kompliziert (complicated) ist.
          -Ich bewundere seine Ausdauer (perseverance), weil er niemals aufgibt.
          -有一个小小的雨滴 (yǔdī=rain drop).
          -最后，小雨滴流进了一条小河 (xiǎohé=river)
          -有时候有太阳 (tàiyáng=sun)
          -Er hat die Situation ruhig und überlegt (calmly, thoughtfully) gelöst.
          Instructions:
          -You must check the user's sentences for errors.
          -You must correct the user when they make a mistake.
          -Reply in less than 50 words at a time, unless instructed otherwise.
          -If speaking in Mandarin AND user level is A1-B1, add pinyin
          -If speaking in Korean AND user level is A1-A2, add romanization 
          `,
      },
    });
    const reply = response.text;
    return reply;
  } catch (err) {
    console.error(err);
  }
}
