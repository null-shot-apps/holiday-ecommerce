'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { holidayProducts, Product, calculateDiscount } from '@/lib/crypto';
import ProductCard from '@/components/ProductCard';
import ShoppingCart from '@/components/ShoppingCart';
import CryptoPaymentModal from '@/components/CryptoPaymentModal';

interface CartItem extends Product {
  quantity: number;
}

export default function ShopPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setCart([]);
    alert('Payment confirmed! Your order is being processed. 🎉');
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = calculateDiscount(item.price, item.discount);
    return sum + price * item.quantity;
  }, 0);

  const totalWithTax = cartTotal * 1.08;

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Please Sign In
          </h1>
          <p className="text-gray-600 mb-8">
            You need to be signed in to access the shop
          </p>
          <a
            href="/auth/signin"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🎄 Holiday Shop
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, {session.user?.name || session.user?.email}!
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Sign Out Button */}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            🎁 Holiday Sale - Up to 30% Off!
          </h2>
          <p className="text-xl mb-6">
            Limited time offers on all your favorite holiday items
          </p>
          <div className="flex items-center justify-center gap-4 text-lg">
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              Fast Shipping
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Crypto Payments
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {holidayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* Shopping Cart Modal */}
      {showCart && (
        <ShoppingCart
          items={cart}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
        />
      )}

      {/* Crypto Payment Modal */}
      {showPayment && (
        <CryptoPaymentModal
          amount={totalWithTax}
          onClose={() => setShowPayment(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}

