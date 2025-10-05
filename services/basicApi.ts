import { ai } from "../aiClient";

type InputPart = {
  role: string;
  parts: Record<string, any>[]; // list of JSON-like objects
};

let input: InputPart[];

//DEFAULT - Convo based on topic - User chooses a topic
export async function basicApi(
  input: InputPart[],
  words: string[],
  grammars: string[],
  language: string,
  level: string
): Promise<string | undefined> {
  /*
  if (history.length >= 10) {
    history.shift();
  }

  
  history.push({
    role: "user",
    parts: [{ text: input }],
  });*/

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: input,
      config: {
        systemInstruction: `You are a ${language} tutor. You will only reply in this language.
          The user's language comprehension level is ${level}.
          Adjust your word choices and teachning material to this comprehension level.
          Add a translation next to words that are beyond the user's level. 
          Examples: 
          -Ich hätte nie gedacht, dass das so kompliziert (complicated) ist.
          -Ich bewundere seine Ausdauer (perseverance), weil er niemals aufgibt.
          -有一个小小的雨滴 (yǔdī=rain drop).
          -最后，小雨滴流进了一条小河 (xiǎohé=river)
          -有时候有太阳 (tàiyáng=sun)
          -Er hat die Situation ruhig und überlegt (calmly, thoughtfully) gelöst.
          You must always correct the user if they make a mistake or if the sentence feels awkward
          The user is currently learning these words: ${words}
          The user is currently learning these grammar points: ${grammars}
          `,
      },
    });
    const reply = response.text;
    /*
    history.push({
      role: "model",
      parts: [{ text: reply }],
    });*/
    return reply;
  } catch (err) {
    console.error(err);
  }
}
