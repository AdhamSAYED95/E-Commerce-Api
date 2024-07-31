# 🛒 eCommerce Project Backend API

## 📖 Overview

This eCommerce project is a backend API built to support an online store. It includes features for user authentication, product management, shopping cart functionality, order processing, and payment integration with Stripe.

## ✨ Features

- 🔐 User authentication and authorization
- 🛍️ Product management (CRUD operations)
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
   git clone https://github.com/your-username/ecommerce-project.git
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
