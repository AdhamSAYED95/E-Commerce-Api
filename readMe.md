# 🛒 E-Commerce Project Backend API

## 📖 Overview

This E-Commerce project is a backend API built to support an online store. It includes features for user authentication, product management, category and subcategory management,shopping cart functionality, order processing, and payment integration with Stripe.

## ✨ Features

- 🔐 User authentication and authorization
- 🛍️ Product management (CRUD operations)
- 🛍️ Category management (CRUD operations)
- 🛍️ SubCategory management (CRUD operations)
- 🛍️ Order management (CRUD operations)
- 🛒 Shopping cart functionality
- 🧾 Order processing
- 💳 Payment integration with Stripe
- 🛡️ Middleware for handling requests and errors
- ⚙️ Configuration management

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Gateway:** Stripe

## ⚙️ Installation

1. **Clone the repository:**

   ```bash
   https://github.com/AdhamSAYED95/E-Commerce-Api.git
   cd ecommerce-project

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Set up environment variables:**

   ```env
   PORT=YourSettings
   NODE_ENV=YourSettings
   BASE_URL=YourSettings
   DB_URI=YourSettings
   JWT_SECRET_KEY=YourSettings
   JWT_EXPIRES_IN=YourSettings
   EMAIL_HOST=YourSettings
   EMAIL_PORT=YourSettings
   EMAIL_USER=YourSettings
   EMAIL_PASSWORD=YourSettings
   STRIPE_SECRET_MY=YourSettings
   STRIPE_WEBHOOK_SECRET=YourSettings

   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

## 🚀 Usage

1. **Sign up as a new user:**

   Send a POST request to `/api/v1/auth/signup` with the required user details.

2. **Browse products:**

   Send a GET request to `/api/v1/products` to retrieve the list of products.

3. **Add products to the cart:**

   Send a POST request to `/api/v1/cart` with the product details.

4. **Checkout:**

   Send a POST request to `/api/v1/orders/checkout` with the payment details to complete the purchase.

## 📂 Project Structure

```perl
ecommerce-project/
├── config/ # Configuration files
├── middlewares/ # Custom middleware
├── models/ # Mongoose models
├── routes/ # Express routes
├── services/ # Service layer
├── uploads/ # File uploads
├── utils/ # Utility functions
├── .eslintrc.json # ESLint configuration
├── .gitignore # Git ignore rules
├── package-lock.json # Lockfile for npm dependencies
├── package.json # NPM dependencies
├── server.js # Entry point for the backend
└── vercel.json # Vercel configuration
```
