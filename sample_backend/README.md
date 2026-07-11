# IMPERIAL Skin Care — Backend Payment Service

This service handles the payment gateway integration (MoMo, VNPAY, AlePay) for the IMPERIAL Skin Care platform. It acts as a secure middleware to generate payment URLs and manage sandbox transaction flows.

- **Stack:** Node.js · Express.js · Crypto · Moment.js

---

## Getting started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed.

### 2. Installation

```bash
cd sample_backend
npm install
```
3. Environment SetupCreate a .env file from the example:Bashcp .env.example .env
Fill in your Sandbox API keys for MoMo, VNPAY, and AlePay in the newly created .env file.4. Running the serverBashnode server.js
# Server runs on http://localhost:3000
API DocumentationEndpointMethodDescription/api/payments/create_payment_urlPOSTGenerates a checkout URL for the selected payment methodPayload ExampleJSON{
  "total": 1500000,
  "note": "Imperial Skincare Order #12345",
  "method": "vnpay" 
}

Supported methods: momo, vnpay, alepay (not working yet)