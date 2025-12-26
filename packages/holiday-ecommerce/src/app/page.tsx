'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Landing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Countdown to New Year
    const targetDate = new Date('2025-01-01T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-red-900 via-purple-900 to-blue-900">
      {/* Animated snow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-white">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
            🎄 Holiday Sale 🎁
          </h1>
          <p className="text-2xl md:text-4xl font-light mb-4">
            Up to 30% Off Everything!
          </p>
          <p className="text-xl md:text-2xl text-purple-200">
            Pay with Crypto & Get Extra 5% Off
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <p className="text-center text-xl mb-4 text-purple-200">
            Sale ends in:
          </p>
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 min-w-[80px]"
              >
                <div className="text-4xl md:text-5xl font-bold">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-purple-200 mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            href="/shop"
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-lg rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-2xl"
          >
            🛍️ Shop Now
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 bg-white/20 backdrop-blur-lg text-white font-bold text-lg rounded-full hover:bg-white/30 transition-all border-2 border-white/50"
          >
            Sign In
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {[
            {
              icon: '🔐',
              title: 'Secure Login',
              desc: 'Email & Social Media',
            },
            {
              icon: '₿',
              title: 'Crypto Payments',
              desc: 'BTC, ETH, USDC',
            },
            {
              icon: '🚚',
              title: 'Fast Shipping',
              desc: 'Free on orders $50+',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-white/20 transition-all"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-purple-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-purple-200">
        <p>© 2024 Holiday E-commerce. All rights reserved.</p>
      </footer>
    </div>
  );
}

