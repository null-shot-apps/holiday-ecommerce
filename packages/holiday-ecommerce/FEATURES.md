# Holiday E-commerce Platform Features

## 🎄 Overview
A modern e-commerce platform built for holiday sales with integrated cryptocurrency payment support and automated user authentication.

## ✨ Key Features

### 1. User Authentication System
- **Email/Password Login**: Secure credential-based authentication with bcrypt password hashing
- **Social Media Login**: 
  - Google OAuth integration
  - Facebook OAuth integration
- **Automated Sign-up**: Streamlined registration process with automatic login after signup
- **Session Management**: JWT-based session handling with NextAuth.js
- **Protected Routes**: Shop page requires authentication

### 2. Cryptocurrency Payment Integration
- **Multi-Currency Support**:
  - Bitcoin (BTC)
  - Ethereum (ETH)
  - Tether (USDT)
  - USD Coin (USDC)
- **Real-time Conversion**: Automatic USD to crypto conversion
- **Payment Modal**: User-friendly crypto payment interface
- **Wallet Address Display**: Copy-to-clipboard functionality
- **QR Code Ready**: Placeholder for QR code integration

### 3. Holiday Shopping Experience
- **Product Catalog**: 6 curated holiday products
- **Dynamic Discounts**: Up to 30% off with visible savings
- **Shopping Cart**: 
  - Add/remove items
  - Quantity tracking
  - Real-time total calculation
  - Tax calculation (8%)
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 4. Landing Page
- **Countdown Timer**: Live countdown to New Year
- **Animated Snow Effect**: CSS-based snowfall animation
- **Feature Highlights**: Security, crypto payments, fast shipping
- **Call-to-Action**: Direct links to shop and signup

## 🛠️ Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js v4
- **Styling**: Tailwind CSS 4
- **Password Hashing**: bcryptjs
- **Deployment**: OpenNext Cloudflare
- **TypeScript**: Full type safety

## 🔐 Security Features

- Bcrypt password hashing (10 rounds)
- JWT session tokens
- Secure HTTP-only cookies
- CSRF protection via NextAuth
- Environment variable configuration

## 📦 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── nextauth/route.ts    # NextAuth handler
│   │       └── register/route.ts    # User registration
│   ├── auth/
│   │   ├── signin/page.tsx          # Sign in page
│   │   └── signup/page.tsx          # Sign up page
│   ├── shop/page.tsx                # Main shop page
│   ├── layout.tsx                   # Root layout with AuthProvider
│   ├── page.tsx                     # Landing page
│   └── globals.css                  # Global styles
├── components/
│   ├── AuthProvider.tsx             # NextAuth session provider
│   ├── SignInForm.tsx               # Sign in form component
│   ├── SignUpForm.tsx               # Sign up form component
│   ├── ProductCard.tsx              # Product display card
│   ├── ShoppingCart.tsx             # Shopping cart modal
│   └── CryptoPaymentModal.tsx       # Crypto payment interface
└── lib/
    ├── auth.ts                      # Authentication configuration
    └── crypto.ts                    # Crypto payment utilities
```

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

3. Run development server:
   ```bash
   pnpm dev
   ```

4. Access the application:
   - Landing: http://localhost:8000
   - Sign In: http://localhost:8000/auth/signin
   - Sign Up: http://localhost:8000/auth/signup
   - Shop: http://localhost:8000/shop (requires authentication)

## 🔧 Configuration

### NextAuth Setup
- Set `NEXTAUTH_SECRET` to a secure random string
- Configure OAuth providers (Google, Facebook) with real credentials
- Update `NEXTAUTH_URL` for production deployment

### Crypto Wallets
- Replace demo wallet addresses in `src/lib/crypto.ts`
- Update exchange rates for accurate conversions
- Integrate real payment verification system

## 📝 Notes

- Current implementation uses in-memory user storage (replace with database in production)
- Social login requires valid OAuth credentials from Google/Facebook
- Crypto payment is demonstration-only (integrate real payment gateway for production)
- Product images use Unsplash placeholders

## 🎯 Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Real crypto payment gateway integration
- Order history and tracking
- Email notifications
- Admin dashboard
- Inventory management
- Payment confirmation webhooks
- Multi-language support

