# [ScribeStation](https://assainment-2-delta.vercel.app) API Documentation

## Objective

The **Stationery Shop API** is a comprehensive backend solution for managing a stationery store. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, it enables efficient management of products and orders with robust validation and error handling.

---

## Features

### 1. **Stationery Product Management**

- **Create Products**: Add new stationery items with detailed attributes like name, brand, price, category, description, quantity, and stock status.
- **Retrieve All Products**: Fetch all available stationery products or filter them by search terms (name, brand, or category).
- **Retrieve a Specific Product**: View the details of any product by its unique ID.
- **Update Products**: Modify specific attributes of a product, such as price or quantity.
- **Delete Products**: Remove products from the inventory.

### 2. **Order Management**

- **Place Orders**: Customers can place orders by specifying the product and quantity. The system automatically adjusts the product inventory and handles stock status updates.
- **Inventory Management**: Automatically updates the product quantity and sets stock status (`inStock`) to `false` when the quantity reaches zero.

### 3. **Revenue Calculation**

- **Total Revenue**: Calculate total revenue from all orders using MongoDB's aggregation pipeline.

### 4. **Error Handling**

- **Validation Errors**: Ensures that all data adheres to defined schemas, with descriptive error messages for invalid inputs.
- **Not Found Errors**: Returns appropriate responses when products or orders are not found.
- **Inventory Errors**: Prevents orders from being placed if there is insufficient stock, with relevant error messages.

---

## Code Quality

- Clean, modular, and well-documented code.
- Meaningful variable and function names.
- Follows a consistent API structure and response format.

---

## API Design Highlights

- Built using **Express.js** for robust and scalable routing.
- **TypeScript** ensures type safety and better developer experience.
- **Mongoose** is used for MongoDB schema definitions and validations.
- RESTful endpoints designed for efficiency and clarity.

---
