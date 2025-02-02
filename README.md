# Multi-Language FAQ Management System

This project provides a backend API and admin panel for managing frequently asked questions (FAQs) in multiple languages. It leverages a RESTful API design, a WYSIWYG editor for content creation, caching for performance, and automated translation capabilities.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [API Usage Examples](#api-usage-examples)
- [Testing](#testing)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Further Improvements](#further-improvements)
- [License](#license)

## Project Overview

This system allows administrators to create, edit, and delete FAQs in multiple languages.  It uses a WYSIWYG editor for rich text formatting and integrates automated translation to streamline content creation.  Redis caching is used to enhance performance.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Caching:** Redis
*   **Translation API:** `translation-google`
*   **WYSIWYG Editor:** Jodit
*   **Other:**  `@vitalets/google-translate-api`, `body-parser`, `cors`, `dotenv`, `ioredis`, `joi`, `mongoose`

## Features

*   **Multi-language FAQ Model:** Stores and manages FAQs in multiple languages.
*   **WYSIWYG Editor Integration (Jodit):** Enables rich text formatting for FAQs.
*   **REST API with Language Selection:** Retrieves FAQs in specific languages using a language parameter.
*   **Caching for Translation Performance (Redis):** Improves retrieval times for translated FAQs.
*   **Automated Translations (`translation-google`):** Streamlines the process of adding new languages. *(Note: Human review of translations is highly recommended for production.)*
*   **Admin Panel:** Provides an interface for managing FAQs.

## API Endpoints

*   `GET /api/GET/faqs`: Retrieves FAQs (supports language parameter `lang`).
*   `POST /api/POST/faqs`: Creates a new FAQ.
*   `PUT /api/PUT/faqs/:id`: Updates an existing FAQ.
*   `DELETE /api/DELETE/faqs/:id`: Deletes an FAQ.

## Getting Started

### Installation

1.  Clone the repository: `git clone https://github.com/Utkarsh110vscon/Faq_system.git`
2.  Navigate to the project directory: `cd Faq_system`
3.  Install dependencies: `npm install`

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
MONGODB_URI=[Your MongoDB Cloud URI]
REDIS_URL=[Your Redis Cloud URL]
PORT=[Your Localhost Port]

## Usage

### Running the Application

npm run dev  # For development (uses nodemon)
npm run start # For production

## API Usage Examples

- English FAQs:
`https://[your-deployed-api-url]/api/GET/faqs`

- Hindi FAQs:
`https://[your-deployed-api-url]/api/GET/faqs?lang=hi`

- Bengali FAQs:
`https://[your-deployed-api-url]/api/GET/faqs?lang=bn`

- Create FAQ:
`http://[your-deployed-api-url]/api/POST/faqs`

- Update FAQ:
`http://[your-deployed-api-url]api/PUT/faqs/34553`

- Delete FAQ:
`https://[your-deployed-api-url]/api/DELETE/faqs/123`

## Testing
Details about testing are in the project submission document.

## Deployment
The application is deployed on Vercel: https://https://admin-panel-for-faq-system.vercel.app

## Further Improvements
- More robust error handling.
- Security enhancements.
- Rate limiting.
