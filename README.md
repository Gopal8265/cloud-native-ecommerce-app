# Cloud Native E-Commerce Application

## Overview

A cloud-native E-Commerce backend application built using Node.js, Express.js, PostgreSQL, Docker, Jenkins, and Kubernetes.

The application demonstrates authentication, product management, shopping cart, order management, containerization, CI/CD, and Kubernetes deployment.

---

# Architecture

Client
   │
REST API
   │
Express.js Backend
   │
PostgreSQL Database
   │
Docker Containers
   │
Jenkins CI/CD
   │
Kubernetes Cluster

---

# Tech Stack

Backend
- Node.js
- Express.js

Database
- PostgreSQL

Authentication
- JWT
- bcrypt

Containerization
- Docker
- Docker Compose

CI/CD
- Jenkins

Container Orchestration
- Kubernetes (Minikube)

Version Control
- Git
- GitHub

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt

---

## Product Management

- Create Product
- Get All Products
- Get Product by ID
- Update Product
- Delete Product

---

## Shopping Cart

- Add Product to Cart
- View Cart
- Update Cart Quantity
- Remove Product from Cart

---

## Orders

- Place Order
- View Orders
- View Order by ID

---

# Project Structure

```
cloud-native-ecommerce-app/

backend/
src/
auth/
product/
cart/
orders/
middleware/
config/

docker/

jenkins/

k8s/

README.md
```

---

# Docker

Build Image

```bash
docker build -t ecommerce-backend .
```

Run

```bash
docker run -p 5050:5050 ecommerce-backend
```

---

# Kubernetes

Deploy

```bash
kubectl apply -f k8s/
```

Check Pods

```bash
kubectl get pods
```

Check Services

```bash
kubectl get svc
```

---

# CI/CD Pipeline

Jenkins performs:

- Pull source code
- Build Docker Image
- Push Image
- Deploy to Kubernetes

---

# API Endpoints

Authentication

```
POST /api/auth/register
POST /api/auth/login
```

Products

```
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

Cart

```
GET /api/cart
POST /api/cart
PUT /api/cart/:id
DELETE /api/cart/:id
```

Orders

```
POST /api/orders
GET /api/orders
GET /api/orders/:id
```

---

# Future Improvements

- Payment Gateway Integration
- Product Search
- Product Images Upload
- Inventory Management
- React Frontend
- Monitoring using Prometheus & Grafana
- Helm Charts
- GitHub Actions

---

# Author

Gopal Sahu

B.Tech Mechanical Engineering

Aspiring DevOps & Data Engineer