export type HistoryItem = {
  role: string;
  parts: { text: string | undefined }[];
};

export const history: HistoryItem[] = [];
