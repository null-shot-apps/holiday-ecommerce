// Crypto payment utilities
export interface CryptoPayment {
  currency: 'BTC' | 'ETH' | 'USDT' | 'USDC';
  amount: number;
  address: string;
  qrCode?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  discount?: number;
}

// Mock crypto exchange rates (USD)
const cryptoRates = {
  BTC: 43000,
  ETH: 2300,
  USDT: 1,
  USDC: 1,
};

// Mock wallet addresses (replace with real addresses in production)
const walletAddresses = {
  BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ETH: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  USDT: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  USDC: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
};

export function convertToCrypto(usdAmount: number, currency: CryptoPayment['currency']): number {
  const rate = cryptoRates[currency];
  return parseFloat((usdAmount / rate).toFixed(8));
}

export function generateCryptoPayment(
  usdAmount: number,
  currency: CryptoPayment['currency']
): CryptoPayment {
  const cryptoAmount = convertToCrypto(usdAmount, currency);
  const address = walletAddresses[currency];

  return {
    currency,
    amount: cryptoAmount,
    address,
  };
}

export function getCryptoIcon(currency: CryptoPayment['currency']): string {
  const icons = {
    BTC: '₿',
    ETH: 'Ξ',
    USDT: '₮',
    USDC: '$',
  };
  return icons[currency];
}

// Mock product data for holiday sales
export const holidayProducts: Product[] = [
  {
    id: '1',
    name: 'Winter Wonderland Gift Set',
    price: 149.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&h=500&fit=crop',
    description: 'Premium holiday gift collection with festive treats',
  },
  {
    id: '2',
    name: 'Cozy Holiday Blanket',
    price: 79.99,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop',
    description: 'Ultra-soft fleece blanket perfect for winter nights',
  },
  {
    id: '3',
    name: 'Festive Candle Collection',
    price: 59.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1602874801006-e24b3e7b8c8f?w=500&h=500&fit=crop',
    description: 'Set of 6 scented candles with holiday fragrances',
  },
  {
    id: '4',
    name: 'Holiday Ornament Set',
    price: 39.99,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=500&h=500&fit=crop',
    description: 'Beautiful handcrafted ornaments for your tree',
  },
  {
    id: '5',
    name: 'Gourmet Hot Chocolate Kit',
    price: 34.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&h=500&fit=crop',
    description: 'Premium cocoa with marshmallows and toppings',
  },
  {
    id: '6',
    name: 'Holiday Cookie Baking Set',
    price: 44.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=500&fit=crop',
    description: 'Complete kit with cutters, recipes, and ingredients',
  },
];

export function calculateDiscount(price: number, discount?: number): number {
  if (!discount) return price;
  return price - (price * discount) / 100;
}

