import type { VercelRequest, VercelResponse } from "@vercel/node";
import { grammarApi } from "../services/grammarApi";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method == "POST") {
    const { input, grammar = "", language, level } = req.body;
    console.log(input);
    try {
      const response = await grammarApi(input, grammar, language, level);
      res.send(response);
    } catch (err) {
      console.error("API error: ", err);
      res.status(500).json({ message: err });
    }
  }
}
