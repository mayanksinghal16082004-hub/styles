/** Filter / display colors per product id (catalog copy). */
export const PRODUCT_COLORS: Record<string, string[]> = {
  "1": ["Orange", "Black"],
  "2": ["Black", "Grey"],
  "3": ["Beige", "Brown"],
  "4": ["Black"],
  "5": ["White", "Red"],
  "6": ["Black", "Grey"],
  "7": ["Red", "Blue", "White"],
  "8": ["Pink", "White"],
  "9": ["Black", "White"],
  "10": ["Olive", "Green"],
  "11": ["Multi"],
  "12": ["Black"],
  "13": ["Beige", "White"],
  "14": ["Blue", "White", "Brown"],
  "15": ["Multi", "Brown"],
  "16": ["White"],
  "17": ["Red"],
  "18": ["Multi"],
  "19": ["White"],
  "20": ["Beige", "Multi"],
  "21": ["Brown", "Beige"],
  "22": ["Grey"],
  "23": ["Green"],
  "24": ["Pink"],
  "25": ["Blue"],
  "26": ["Multi"],
  "27": ["Black", "Grey"],
  "28": ["Black"],
  "29": ["Grey", "Black"],
  "30": ["Black", "Grey"],
};

/** Canonical color chips for filters (subset of PRODUCT_COLORS values). */
export const FILTER_COLOR_OPTIONS = [
  "Black",
  "White",
  "Grey",
  "Red",
  "Pink",
  "Blue",
  "Green",
  "Orange",
  "Brown",
  "Beige",
  "Olive",
  "Multi",
] as const;

export type PriceBucketId = "any" | "under10k" | "10to20" | "20to50" | "50plus";

export const PRICE_BUCKETS: {
  id: PriceBucketId;
  label: string;
}[] = [
  { id: "any", label: "Any price" },
  { id: "under10k", label: "Under ₹10k" },
  { id: "10to20", label: "₹10k – ₹20k" },
  { id: "20to50", label: "₹20k – ₹50k" },
  { id: "50plus", label: "₹50k+" },
];

export function matchesPriceBucket(price: number, bucket: PriceBucketId): boolean {
  if (bucket === "any") return true;
  if (bucket === "under10k") return price < 10_000;
  if (bucket === "10to20") return price >= 10_000 && price < 20_000;
  if (bucket === "20to50") return price >= 20_000 && price < 50_000;
  return price >= 50_000;
}
