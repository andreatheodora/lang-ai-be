import type { VercelRequest, VercelResponse } from "@vercel/node";
import { basicApi } from "../services/basicApi";
import { vocabApi } from "../services/vocabApi";
import { grammarApi } from "../services/grammarApi";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method == "POST") {
    const { type } = req.query;
    const {
      input,
      words = [],
      grammars = [],
      grammar = "",
      deck = [],
      language,
      level,
    } = req.body;
    console.log(input);
    try {
      if (type == "vocab") {
        const response = await vocabApi(input, deck, language, level);
        res.send(response);
      } else if (type == "grammar") {
        const response = await grammarApi(input, grammar, language, level);
        res.send(response);
      } else {
        const response = await basicApi(
          input,
          words,
          grammars,
          language,
          level
        );
        res.send(response);
      }
    } catch (err) {
      console.error("API error: ", err);
      res.status(500).json({ message: err });
    }
  }
}
