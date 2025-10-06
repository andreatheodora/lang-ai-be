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
          Task:
          1. Check the user's sentences for grammatical errors. Ignore punctuation errors.
          2. Correct the user if their sentence is incorrect or awkward.
          3. Follow the response structure. If there is no correction, leave <incorrect_sentence> <corrected_sentence> and <explanation> empty.
          
          Response structure:
          <incorrect_sentence></incorrect_sentence>
          <corrected_sentence></corrected_sentence>
          <explanation></explanation>
          <response></response>

          Important:
          -Keep <response> less than 30 words.
          -If speaking in Mandarin AND user level is A1-B1, add pinyin
          -If speaking in Korean AND user level is A1-A2, add romanization 

          The user's language comprehension level is ${level}.
          ${words && `The user has is learning words: ${words}`}
          ${
            grammars && `The user is learning these grammar points: ${grammars}`
          }          
          `,
      },
    });
    const reply = response.text;
    return reply;
  } catch (err) {
    console.error(err);
  }
}
