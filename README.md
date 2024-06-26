# SudsCart Backend

Welcome to the SudsCart Backend! This is the server-side code responsible for managing the products and user authentication for the SudsCart application.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This backend server is built using Node.js and Express.js. It provides RESTful API endpoints for creating, retrieving, updating, and deleting products, as well as handling user authentication.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 14 or higher)
- MongoDB (Make sure MongoDB is running on your machine or accessible remotely)
- npm (Node Package Manager)

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd SudsCart-backend
   install node packages -- npm install
   npm run dev -- for start the site...
## API Endpoints
 - GET /api/v1/products: Get products based on filters like category, price, and rating.
 - GET /api/v1/products/:id: Get a single product by its ID.
 - GET /api/v1/flashproduct: Get products on flash sale.
 - GET /api/v1/topRatedProducts: Get top-rated products.
