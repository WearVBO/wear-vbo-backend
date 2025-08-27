# 📘 E-Commerce Backend Documentation

## **Overview**

This project is a **backend API for an wearVBO e-commerce platform**, built to handle **user authentication, newsletter subscriptions, and future extensions for product management, orders, payments, and trackingID/Delivery **. It is designed with scalability, security, and modularity in mind.

---

## **Features Implemented**

* **User Registration & Login** (with JWT authentication)
* **Newsletter Subscription** (via email storage & status management)
* **User Authentication Middleware**
* **Secure Password Hashing** with bcrypt
* **Error Handling & Validation** with meaningful responses

---

## **Tech Stack**

* **Runtime:** Node.js (Express.js framework)
* **Database:** MongoDB (Mongoose ORM)
* **Authentication:** JSON Web Tokens (JWT)
* **Mailing:** Nodemailer (for email confirmation/notifications)

---

## **API Endpoints**

### **Authentication**

#### 1. **Register User**

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "first_name": "Bright",
  "last_name": "Osasere",
  "phoneNumber: "+234667788990",
  "email": "bright@example.com",
  "password": "SecurePass123"
}
```

**Responses:**

* ✅ `201 Created`

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "64eabcd123...",
    "email": "bright@example.com"
  }
}
```

* ❌ `400 Bad Request` (invalid input)

---

#### 2. **Login User**

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "bright@example.com",
  "password": "SecurePass123"
}
```

**Responses:**

* ✅ `200 OK`

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

* ❌ `401 Unauthorized` (wrong credentials)

---

### **Newsletter**

#### 3. **Subscribe to Newsletter**

**POST** `/api/auth/newsletter`

**Request Body:**

```json
{
  "email": "bright@example.com"
}
```

**Responses:**

* ✅ `200 OK`

```json
{
  "success": true,
  "message": "Subscription successful"
}
```

* ❌ `400 Bad Request` (already subscribed)

---

#### 4. **Unsubscribe from Newsletter**

**POST** `/api/newsletter/unsubscribe`

**Request Body:**

```json
{
  "email": "bright@example.com"
}
```

**Responses:**

* ✅ `200 OK`

```json
{
  "success": true,
  "message": "Unsubscribed successfully"
}
```

* ❌ `404 Not Found` (email not in database)

---

## **Database Models**

### **User Schema**

```js
{
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

### **Newsletter Schema**

```js
{
  email: { type: String, unique: true, required: true },
  subscribed: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}
```

---

## **Authentication Flow**

1. User registers with **name, email, password**.
2. Password is hashed before saving.
3. On login, credentials are validated and a **JWT token** is issued.
4. Protected routes use middleware to verify the token.

---

## **Error Handling**

The backend uses a **centralized error handler** to ensure all responses follow the same format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## **Future Features (Planned)**

* Product Catalog (CRUD APIs)
* Shopping Cart & Wishlist
* Order & Payment Processing
* Admin Dashboard (User & Product Management)
* Newsletter Automation (scheduled emails, promotions)

---

## **Getting Started**

### **1. Clone Repository**

```bash
git clone https://github.com/WearVBO/wear-vbo-backend
cd wear-vbo-backend
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Configure Environment Variables** (`.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://your_cluster_url
JWT_SECRET=your_secret_key
EMAIL_USER=your_gmail@example.com
EMAIL_PASS=your_gmail_app_password
```

### **4. Start Server**

```bash
npm run dev
```

Server will run at:
👉 `http://localhost:5000`

---

## **Contributing**

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

---

🔥 That’s a **complete developer-friendly documentation**.

Do you want me to also create a **separate “API Reference Table” (endpoints, methods, params in tabular form)** so it looks even more professional for external users?

