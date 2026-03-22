import { PRODUCT_COLORS } from "@/lib/product-meta";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  buyUrl: string;
  category: "sneakers" | "apparel";
  colors: string[];
  featured?: boolean;
};

type ProductSeed = Omit<Product, "colors">;

const RETAILERS = {
  crepdog: "https://crepdogcrew.com/",
  nikeIn: "https://www.nike.com/in/",
  vegnonveg: "https://www.vegnonveg.com/",
  superkicks: "https://www.superkicks.in/",
} as const;

/** Verified Unsplash assets — rotated for variety (not 1:1 product photography). */
const SK = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=900&q=85",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&q=85",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&q=85",
  "https://images.unsplash.com/photo-1551107696-4a6fdd65d33c?w=900&q=85",
  "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=900&q=85",
  "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=900&q=85",
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=900&q=85",
] as const;

const AP = [
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=85",
  "https://images.unsplash.com/photo-1578587018452-892b6abbd9d2?w=900&q=85",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85",
  "https://images.unsplash.com/photo-1622445275576-7212fea91e2f?w=900&q=85",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=85",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=85",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=85",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=85",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=85",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=85",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=900&q=85",
] as const;

const s = (i: number) => SK[i % SK.length];
const a = (i: number) => AP[i % AP.length];

/**
 * Crepdog Crew–style catalog: real-style product names, MRP bands, and Buy Now
 * links to crepdogcrew.com product pages (plus a few partner storefronts).
 */
const productData: ProductSeed[] = [
  {
    id: "1",
    name: "Nike Vomero Plus Orange Pulse",
    price: 17999,
    image: s(0),
    buyUrl: "https://crepdogcrew.com/products/nike-vomero-plus-orange-pulse",
    category: "sneakers",
    featured: true,
  },
  {
    id: "2",
    name: "Nike Zoom Fly 6 Black Smoke Grey",
    price: 9999,
    image: s(1),
    buyUrl: "https://crepdogcrew.com/products/nike-zoom-fly-6-black-smoke-grey",
    category: "sneakers",
    featured: true,
  },
  {
    id: "3",
    name: "On Running Cloudstratus Cork Fawn (W)",
    price: 11499,
    image: s(2),
    buyUrl:
      "https://crepdogcrew.com/products/on-running-cloudstratus-cork-fawn",
    category: "sneakers",
    featured: true,
  },
  {
    id: "4",
    name: "New Balance 9060 Triple Black",
    price: 12999,
    image: s(3),
    buyUrl: "https://crepdogcrew.com/products/new-balance-9060-triple-black",
    category: "sneakers",
    featured: true,
  },
  {
    id: "5",
    name: "adidas Hyper Boost Edge White Pure Ruby",
    price: 21999,
    image: s(4),
    buyUrl:
      "https://crepdogcrew.com/products/adidas-hyper-boost-edge-white-pure-ruby",
    category: "sneakers",
  },
  {
    id: "6",
    name: "New Balance 9060 Black Castlerock Grey",
    price: 11999,
    image: s(5),
    buyUrl:
      "https://crepdogcrew.com/products/new-balance-9060-black-castlerock-grey",
    category: "sneakers",
  },
  {
    id: "7",
    name: "Jordan 1 Retro High OG SP Fragment x Union LA",
    price: 34999,
    image: s(6),
    buyUrl:
      "https://crepdogcrew.com/products/jordan-1-retro-high-og-sp-fragment-x-union-la-varsity-red-sport-royal",
    category: "sneakers",
    featured: true,
  },
  {
    id: "8",
    name: "New Balance 204L Pastel Pink",
    price: 15499,
    image: s(7),
    buyUrl: "https://crepdogcrew.com/products/new-balance-204l-pastel-pink",
    category: "sneakers",
  },
  {
    id: "9",
    name: "On Running Cloudtilt Black Ivory",
    price: 17499,
    image: s(0),
    buyUrl: "https://crepdogcrew.com/products/on-running-cloudtilt-black-ivory",
    category: "sneakers",
  },
  {
    id: "10",
    name: "On Running Cloudtilt Olive Desert",
    price: 17999,
    image: s(1),
    buyUrl:
      "https://crepdogcrew.com/products/on-running-cloudtilt-olive-desert",
    category: "sneakers",
  },
  {
    id: "11",
    name: "Nike SB Dunk Low April Skateboards",
    price: 24999,
    image: s(2),
    buyUrl:
      "https://crepdogcrew.com/products/nike-sb-dunk-low-april-skateboards",
    category: "sneakers",
    featured: true,
  },
  {
    id: "12",
    name: "On Running Cloud 6 All Black",
    price: 15999,
    image: s(3),
    buyUrl: "https://crepdogcrew.com/products/on-running-cloud-6-all-black",
    category: "sneakers",
  },
  {
    id: "13",
    name: "On Running Cloudtilt Ivory Almond (W)",
    price: 14999,
    image: s(4),
    buyUrl:
      "https://crepdogcrew.com/products/on-running-cloudtilt-ivory-almond-w",
    category: "sneakers",
  },
  {
    id: "14",
    name: "Jordan 1 Retro Low OG Fragment x Travis Scott",
    price: 134999,
    image: s(5),
    buyUrl:
      "https://crepdogcrew.com/products/jordan-1-retro-low-og-sp-fragment-x-travis-scott-sail-military-blue",
    category: "sneakers",
  },
  {
    id: "15",
    name: "Jordan 1 Retro Low OG Zion Williamson Voodoo Alternate",
    price: 14999,
    image: s(6),
    buyUrl:
      "https://crepdogcrew.com/products/jordan-1-retro-low-ogzion-williamson-voodoo-alternate",
    category: "sneakers",
  },
  {
    id: "16",
    name: "Soulmates White T Shirt — Oddnoteven",
    price: 3199,
    image: a(0),
    buyUrl:
      "https://crepdogcrew.com/products/soulmates-white-t-shirt-by-oddnoteven",
    category: "apparel",
    featured: true,
  },
  {
    id: "17",
    name: "Crimson Handmade Shirt",
    price: 9999,
    image: a(1),
    buyUrl: "https://crepdogcrew.com/products/crimson-handmade-shirt",
    category: "apparel",
  },
  {
    id: "18",
    name: "BABOOM ENERGY T-Shirt — Gryape",
    price: 3005,
    image: a(2),
    buyUrl: "https://crepdogcrew.com/products/baboom-energy-t-shirt-by-gryape",
    category: "apparel",
  },
  {
    id: "19",
    name: "9 Spray White Sleeveless T Shirt — Oddnoteven",
    price: 3199,
    image: a(3),
    buyUrl:
      "https://crepdogcrew.com/products/9-spray-white-sleeveless-t-shirt-by-oddnoteven",
    category: "apparel",
  },
  {
    id: "20",
    name: "Sanganer Bagru Handmade Shirt",
    price: 5999,
    image: a(4),
    buyUrl: "https://crepdogcrew.com/products/sanganer-bagru-handmade-shirt",
    category: "apparel",
  },
  {
    id: "21",
    name: "Kala and Canyon Shirt — Code Brwn",
    price: 5799,
    image: a(5),
    buyUrl:
      "https://crepdogcrew.com/products/kala-and-canyon-shirt-by-code-brwn",
    category: "apparel",
  },
  {
    id: "22",
    name: "'Make A Wish' Grey Jersey Tshirt — Oddnoteven",
    price: 3199,
    image: a(6),
    buyUrl:
      "https://crepdogcrew.com/products/make-a-wish-grey-jersey-tshirt-by-oddnoteven",
    category: "apparel",
  },
  {
    id: "23",
    name: "Sage Green Blockprint T-shirt",
    price: 5499,
    image: a(7),
    buyUrl: "https://crepdogcrew.com/products/sage-green-blockprint-t-shirt",
    category: "apparel",
  },
  {
    id: "24",
    name: "Ultra Basics Tee Pink — Deadbear",
    price: 2490,
    image: a(8),
    buyUrl: "https://crepdogcrew.com/products/ultra-basics-tee-pink-by-deadbear",
    category: "apparel",
  },
  {
    id: "25",
    name: "Odd Blue Linen Shirt — Oddnoteven",
    price: 3999,
    image: a(9),
    buyUrl:
      "https://crepdogcrew.com/products/odd-blue-linen-shirt-by-oddnoteven",
    category: "apparel",
  },
  {
    id: "26",
    name: "Unfroggettable T-Shirt — Gryape",
    price: 3005,
    image: a(10),
    buyUrl: "https://crepdogcrew.com/products/unfroggettable-t-shirt-by-gryape",
    category: "apparel",
  },
  {
    id: "27",
    name: "Nike Tech Fleece Full-Zip Hoodie",
    price: 8999,
    image: a(0),
    buyUrl: RETAILERS.nikeIn,
    category: "apparel",
    featured: true,
  },
  {
    id: "28",
    name: "Street Archive Pullover Hoodie",
    price: 7499,
    image: a(1),
    buyUrl: RETAILERS.vegnonveg,
    category: "apparel",
  },
  {
    id: "29",
    name: "New Balance 2002R Protection Pack",
    price: 16999,
    image: s(7),
    buyUrl: "https://crepdogcrew.com/collections/sneakers",
    category: "sneakers",
  },
  {
    id: "30",
    name: "Essential Heavyweight Hoodie",
    price: 5999,
    image: a(2),
    buyUrl: "https://crepdogcrew.com/collections/sweatshirts-hoodies",
    category: "apparel",
  },
];

export const products: Product[] = productData.map((p) => ({
  ...p,
  colors: PRODUCT_COLORS[p.id] ?? ["Multi"],
}));
