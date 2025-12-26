'use client';

import { useState } from 'react';
import { CryptoPayment, generateCryptoPayment, getCryptoIcon } from '@/lib/crypto';

interface CryptoPaymentModalProps {
  amount: number;
  onClose: () => void;
  onComplete: () => void;
}

export default function CryptoPaymentModal({
  amount,
  onClose,
  onComplete,
}: CryptoPaymentModalProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoPayment['currency']>('BTC');
  const [payment, setPayment] = useState<CryptoPayment>(
    generateCryptoPayment(amount, 'BTC')
  );
  const [copied, setCopied] = useState(false);

  const handleCryptoChange = (currency: CryptoPayment['currency']) => {
    setSelectedCrypto(currency);
    setPayment(generateCryptoPayment(amount, currency));
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(payment.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cryptoOptions: CryptoPayment['currency'][] = ['BTC', 'ETH', 'USDT', 'USDC'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pay with Crypto</h2>

        {/* Crypto Selection */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {cryptoOptions.map((crypto) => (
            <button
              key={crypto}
              onClick={() => handleCryptoChange(crypto)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedCrypto === crypto
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{getCryptoIcon(crypto)}</div>
              <div className="text-xs font-medium text-gray-700">{crypto}</div>
            </button>
          ))}
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Amount (USD)</span>
            <span className="text-xl font-bold text-gray-900">${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount ({selectedCrypto})</span>
            <span className="text-xl font-bold text-blue-600">
              {getCryptoIcon(selectedCrypto)} {payment.amount}
            </span>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Send to this address:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={payment.address}
              readOnly
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono text-gray-900"
            />
            <button
              onClick={copyAddress}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copied ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div className="bg-gray-100 rounded-lg p-8 mb-6 flex items-center justify-center">
          <div className="text-center">
            <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center mb-2">
              <svg className="w-32 h-32 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Scan QR code to pay</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Send exactly {payment.amount} {selectedCrypto} to the address above.
            Payment will be confirmed automatically.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onComplete}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
          >
            I've Sent Payment
          </button>
        </div>
      </div>
    </div>
  );
}

