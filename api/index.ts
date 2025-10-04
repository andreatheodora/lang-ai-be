import type { VercelRequest, VercelResponse } from "@vercel/node";

/*
export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name } = req.query;
  return res.json({
    message: `Hello ${name}!`,
  });
}*/

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method == "POST") {
    const { input, words, grammars, language, level } = req.body;
    console.log(input);
    return res.status(200).json({ message: "POST received" });
  }
}
