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
- **image Uploading:** Multer

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
   npm run start:dev
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
├── config/ #  for database configuration and connection
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

## 📌 API Endpoints

# Note 

- {{URL}}  is your Local host that runs your application or the server url you upload the project on 

## 🔐 Authentication

- **POST** `{{URL}}/api/v1/auth/signup` - Sign up a new user
- **POST** `{{URL}}/api/v1/auth/login` - Log in a user
- **POST** `{{URL}}/api/v1/auth/forgotPassword` - Send forgot password email
- **POST** `{{URL}}/api/v1/auth/verifyPassResetCode` - Verify password reset code
- **PUT** `{{URL}}/api/v1/auth/resetPassword` - Reset password

### 🛍️ Products

- **GET** `/api/v1/products` - Get all products
- **GET** `/api/v1/products/:id` - Get a single product
- **POST** `/api/v1/products` - Create a new product
- **PUT** `/api/v1/products/:id` - Update a product
- **DELETE** `/api/v1/products/:id` - Delete a product

## 📂 Sub Categories

- **POST** `{{URL}}/api/v1/subcategories` - Create a new subcategory
- **GET** `{{URL}}/api/v1/subcategories` - Get all subcategories
- **GET** `{{URL}}/api/v1/subcategories/:id` - Get a specific subcategory by ID
- **UPDATE** `{{URL}}/api/v1/subcategories/:id` - Update a specific subcategory by ID
- **DELETE** `{{URL}}/api/v1/subcategories/:id` - Delete a specific subcategory by ID

## 📂 Categories/SubCategory

- **GET** `{{URL}}/api/v1/categories/:id/subcategories` - Get subcategories for a specific category
- **POST** `{{URL}}/api/v1/categories/:id/subcategories` - Add a new subcategory to a specific category

## 📦 Brands

- **GET** `{{URL}}/api/v1/brands` - Get all brands
- **POST** `{{URL}}/api/v1/brands` - Create a new brand
- **GET** `{{URL}}/api/v1/brands/:id` - Get a specific brand by ID
- **UPDATE** `{{URL}}/api/v1/brands/:id` - Update a specific brand by ID
- **DELETE** `{{URL}}/api/v1/brands/:id` - Delete a specific brand by ID

## ⭐ Reviews

- **GET** `{{URL}}/api/v1/reviews` - Get all reviews
- **POST** `{{URL}}/api/v1/reviews` - Create a new review
- **GET** `{{URL}}/api/v1/reviews/:id` - Get a specific review by ID
- **UPDATE** `{{URL}}/api/v1/reviews/:id"` - Update a specific review by ID
- **DELETE** `{{URL}}/api/v1/reviews/:id` - Delete a specific review by ID

## 👥 Users (Admin)

- **GET** `{{URL}}/api/v1/users` - Get all users
- **POST** `{{URL}}/api/v1/users` - Create a new user
- **GET** `{{URL}}/api/v1/users/:id` - Get a specific user by ID
- **PUT** `{{URL}}/api/v1/users/:id` - Update a specific user by ID
- **PUT** `{{URL}}/api/v1/users/changePassword/:id` - Change password for a specific user by ID
- **DELETE** `{{URL}}/api/v1/users/:Id` - Delete a specific user by ID

## 📂 Categories

- **POST** `{{URL}}/api/v1/categories` - Create a new category
- **GET** `{{URL}}/api/v1/categories` - Get all categories
- **GET** `{{URL}}/api/v1/categories/:id` - Get a specific category by ID
- **DELETE** `{{URL}}/api/v1/categories/:Id` - Delete a specific category by ID
- **PUT** `{{URL}}/api/v1/categories/:id` - Update a specific category by ID

## 👤 Users

- **GET** `{{URL}}/api/v1/users/getMe` - Get current logged-in user
- **PUT** `{{URL}}/api/v1/users/changeMyPassword` - Change password of the current logged-in user
- **PUT** `{{URL}}/api/v1/users/updateMe` - Update profile of the current logged-in user
- **DELETE** `{{URL}}/api/v1/users/deactivateMe` - Deactivate the current logged-in user
- **PUT** `{{URL}}/api/v1/users/activateMe` - Activate the current logged-in user

## ⭐ Products/Reviews

- **GET** `{{URL}}/api/v1/products/:id/reviews` - Get all reviews for a specific product
- **GET** `{{URL}}/api/v1/products/:id/reviews/6682d8241f8818c0c5f6d35a` - Get a specific review for a specific
- **POST** `{{URL}}/api/v1/products/:id/reviews` - Add a review to a specific product

## 💖 WishList

- **POST** `{{URL}}/api/v1/wishList` - Add item to wish list
- **GET** `{{URL}}/api/v1/wishList` - Get all items in the wish list
- **DELETE** `{{URL}}/api/v1/wishList/:Id` - Remove item from wish list

## 🏠 User Address

- **POST** `{{URL}}/api/v1/addresses` - Add a new address
- **GET** `{{URL}}/api/v1/addresses` - Get all addresses
- **DELETE** `{{URL}}/api/v1/addresses/:Id` - Delete a specific address by ID

## 🎟️ Coupons

- **POST** `{{URL}}/api/v1/coupons` - Create a new coupon
- **GET** `{{URL}}/api/v1/coupons` - Get all coupons
- **GET** `{{URL}}/api/v1/coupons/:id` - Get a specific coupon by ID
- **PUT** `{{URL}}/api/v1/coupons/:Id` - Update a specific coupon by ID
- **DELETE** `{{URL}}/api/v1/coupons/:Id` - Delete a specific coupon by ID

## 🛒 Cart

- **POST** `{{URL}}/api/v1/cart` - Add item to cart
- **GET** `{{URL}}/api/v1/cart` - Get all items in the cart
- **DELETE** `{{URL}}/api/v1/cart/:Id` - Remove item from cart
- **PUT** `{{URL}}/api/v1/cart/:Id` - Update cart item quantity
- **PUT** `{{URL}}/api/v1/cart/applyCoupon` - Apply a coupon to the cart
- **DELETE** `{{URL}}/api/v1/cart` - Clear the cart

## 🛍️ Order

- **POST** `{{URL}}/api/v1/order/6697eaa5d450deb5ef0899d3` - Create a new order
- **GET** `{{URL}}/api/v1/order/6697ec34d450deb5ef089a0e` - Get a specific order by ID
- **PUT** `{{URL}}/api/v1/order/6697ec34d450deb5ef089a0e/deliver` - Mark a specific order as delivered
- **PUT** `{{URL}}/api/v1/order/6697ec34d450deb5ef089a0e/pay` - Mark a specific order as paid
- **POST** `{{URL}}/api/v1/order/checkout-session/669de58478f8a981757b315b` - Create a checkout session for an order
- **GET** `{{URL}}/api/v1/order` - Get all orders

## 🤝 Contributing

1. **Fork the repository.**

2. **Create a new branch:**

   ```bash
   git checkout -b feature-name

   ```

3. **Make your changes**

4. **Commit your changes:**

   ```bash
   git commit -m 'Add some feature'

   ```

5. **Push to the branch:**

   ```bash
   git push origin feature-name

   ```

6. **Open a pull request.**
