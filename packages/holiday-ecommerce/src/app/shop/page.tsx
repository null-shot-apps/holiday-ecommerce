'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: '🎄 Christmas Tree', price: 149.99, image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400', discount: 20 },
  { id: 2, name: '🎁 Gift Set', price: 79.99, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400', discount: 15 },
  { id: 3, name: '⛄ Snow Globe', price: 29.99, image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=400', discount: 10 },
  { id: 4, name: '🕯️ Holiday Candles', price: 39.99, image: 'https://images.unsplash.com/photo-1602874801006-e24aa9f5d64f?w=400' },
  { id: 5, name: '🎅 Santa Decoration', price: 59.99, image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400', discount: 25 },
  { id: 6, name: '🔔 Jingle Bells', price: 19.99, image: 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=400' },
];

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<'btc' | 'eth' | 'usdc'>('btc');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev =>
        prev.map(item => (item.id === productId ? { ...item, quantity } : item))
      );
    }
  };

  const total = cart.reduce((sum, item) => {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const cryptoPrices = {
    btc: total / 43000,
    eth: total / 2300,
    usdc: total,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-red-700">🎄 Holiday Shop</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition relative"
          >
            🛒 Cart ({cart.length})
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {products.map(product => {
            const discountedPrice = product.discount
              ? product.price * (1 - product.discount / 100)
              : product.price;

            return (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    {product.discount ? (
                      <>
                        <span className="text-2xl font-bold text-red-700">
                          ${discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-red-700">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800 transition font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {showCart && cart.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {cart.map(item => {
                  const discountedPrice = item.discount
                    ? item.price * (1 - item.discount / 100)
                    : item.price;

                  return (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-red-700 font-bold">${discountedPrice.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ${(discountedPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-red-700">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowCart(false);
                  setShowCryptoModal(true);
                }}
                className="w-full bg-red-700 text-white py-4 rounded-lg hover:bg-red-800 transition font-bold text-lg"
              >
                💰 Pay with Crypto
              </button>
            </div>
          </div>
        )}

        {showCryptoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Pay with Crypto</h2>
                <button
                  onClick={() => setShowCryptoModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-2">Total Amount:</p>
                <p className="text-3xl font-bold text-red-700">${total.toFixed(2)}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-3">Select Cryptocurrency:</p>
                <div className="grid grid-cols-3 gap-3">
                  {(['btc', 'eth', 'usdc'] as const).map(crypto => (
                    <button
                      key={crypto}
                      onClick={() => setSelectedCrypto(crypto)}
                      className={`p-4 border-2 rounded-lg transition ${
                        selectedCrypto === crypto
                          ? 'border-red-700 bg-red-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-2xl font-bold">
                        {crypto.toUpperCase()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-2">Amount to pay:</p>
                <p className="text-2xl font-bold text-red-700">
                  {cryptoPrices[selectedCrypto].toFixed(6)} {selectedCrypto.toUpperCase()}
                </p>
              </div>

              <button
                onClick={() => {
                  alert('Payment successful! Order confirmed.');
                  setShowCryptoModal(false);
                  setCart([]);
                }}
                className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800 transition font-semibold"
              >
                Confirm Payment
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                This is a demo. No real transactions will be processed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

