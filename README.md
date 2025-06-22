# Rental App

## Description

The Rental App is a web application that allows users to browse, rent, and manage rental properties. Users can create accounts, list their properties, and search for available rentals. The application is built using Node.js, Express, MongoDB, and React.

## Features

- User authentication (sign up, login, logout)
- Property listing and management
- Search and filter properties
- Booking and rental management
- User profiles

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/rental-app.git
   cd rental-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the application:
   ```bash
   npm start
   ```

## Usage

- Create an account or log in to access the rental features.
- Browse available properties, create listings, and manage your rentals.

## Routes

| Method | Route          | Description                        |
| ------ | -------------- | ---------------------------------- |
| GET    | `/rooms`       | Get all rooms                      |
| GET    | `/rooms/:id`   | Get a room by ID                   |
| POST   | `/rooms`       | Create a new room                  |
| POST   | `/auth/signup` | User registration                  |
| POST   | `/auth/login`  | User login                         |
| GET    | `/auth/verify` | Verify user authentication         |
| POST   | `/booking`     | Create a new booking (auth needed) |

## API Endpoints

### Authentication

- **POST** `/auth/signup`

  - Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "User Created Successfully",
      "userId": "string"
    }
    ```

- **POST** `/auth/login`

  - Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "token": "jwt_token",
      "user": { "email": "string" }
    }
    ```

- **GET** `/auth/verify`
  - Headers: `Authorization: Bearer <token>`
  - Response:
    ```json
    {
      "user": { "email": "string" }
    }
    ```

### Rooms

- **GET** `/rooms`

  - Response:
    ```json
    [
      {
        "_id": "string",
        "title": "string",
        "price": number,
        "img": "string",
        "img2": "string",
        "img3": "string",
        "description": "string",
        "location": "string"
      },
      ...
    ]
    ```

- **GET** `/rooms/:id`

  - Response:
    ```json
    {
      "_id": "string",
      "title": "string",
      "price": number,
      "img": "string",
      "img2": "string",
      "img3": "string",
      "description": "string",
      "location": "string"
    }
    ```

- **POST** `/rooms`
  - Request Body:
    ```json
    {
      "title": "string",
      "price": number,
      "img": "string",
      "img2": "string",
      "img3": "string",
      "description": "string",
      "location": "string"
    }
    ```
  - Response:
    ```json
    {
      "_id": "string",
      "title": "string",
      "price": number,
      "img": "string",
      "img2": "string",
      "img3": "string",
      "description": "string",
      "location": "string"
    }
    ```

### Booking

- **POST** `/booking`
  - Headers: `Authorization: Bearer <token>`
  - Request Body:
    ```json
    {
      "roomId": "string",
      "checkIn": "YYYY-MM-DD",
      "checkOut": "YYYY-MM-DD"
    }
    ```
  - Response:
    ```json
    {
      "message": "Booking successful",
      "booking": {
        "_id": "string",
        "room": "string",
        "user": "string",
        "checkIn": "YYYY-MM-DDT00:00:00.000Z",
        "checkOut": "YYYY-MM-DDT00:00:00.000Z",
        "createdAt": "YYYY-MM-DDT00:00:00.000Z"
      }
    }
    ```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the
