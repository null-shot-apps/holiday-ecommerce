'use client';

import { Product, calculateDiscount } from '@/lib/crypto';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const finalPrice = calculateDiscount(product.price, product.discount);
  const savings = product.price - finalPrice;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        {/* Pricing */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${finalPrice.toFixed(2)}
          </span>
          {product.discount && (
            <>
              <span className="text-lg text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 font-medium">
                Save ${savings.toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

