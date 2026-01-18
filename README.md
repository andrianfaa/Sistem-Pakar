# Expert System for Diagnosing Pests and Diseases in Rice Plants Using Forward Chaining and Certainty Factor Methods

## About

This project is an implementation of an expert system based on research presented at the CORISINDO conference. The system leverages artificial intelligence techniques, specifically Forward Chaining for logical inference and Certainty Factor for handling uncertainty in diagnosis. By combining these methodologies, the application provides accurate and reliable diagnoses of rice plant pests and diseases, helping farmers and agricultural professionals make informed decisions to protect their crops.

The research paper that inspired this implementation can be found at: [https://corisindo.utb-univ.ac.id/index.php/penelitian/article/view/111](https://corisindo.utb-univ.ac.id/index.php/penelitian/article/view/111)

## Features

- User authentication and authorization
- Disease diagnosis based on symptoms
- Knowledge base management
- CRUD Disease data (Create, Read, Update, Delete disease data)
- CRUD Symptom data (Create, Read, Update, Delete symptom data)
- CRUD Rule data (Create, Read, Update, Delete rule data)

## Installation

### Prerequisites

Before you begin, make sure you have Node.js installed on your system.

#### Installing Node.js

1. Visit the official Node.js website at [https://nodejs.org](https://nodejs.org)
2. Download Node.js version 24.12.0 or newer
3. Run the installer and follow the installation wizard
4. Verify the installation by opening a terminal and running:

```bash
node --version
npm --version
```

### Steps

```bash
# Clone the repository
git clone https://github.com/andrianfaa/Sistem-Pakar.git && cd Sistem-Pakar

# Install dependencies
npm install
```

### Environment Configuration

After installing dependencies, create a `.env.local` file in the root directory of your project:

```bash
# Create .env.local file
touch .env.local
```

Add the following environment variables to your `.env.local` file:

```env
URL=http://localhost:3000
SECRET_KEY=your-secret-key-here
MONGODB_URI=your-mongodb-connection-string
```

**Important:** Replace the placeholder values with your actual configuration:

- `URL`: Your application URL (use `http://localhost:3000` for development)
- `SECRET_KEY`: A secure random string for encryption/authentication
- `MONGODB_URI`: Your MongoDB connection string

> **Note:** Never commit your `.env.local` file to version control. Make sure it's listed in your `.gitignore` file.

## Usage

### Development

To run the application in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production

To run the application in production mode:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

The application will run on the URL specified in your `.env.local` file.

## Important Notes

If you fork this project and need to create an initial user account, you must manually call the user creation API endpoint:

**Endpoint:** `POST /api/user`

**Request Body Example:**

```json
{
  "name": "Admin",
  "email": "admin@anfa.my.id",
  "username": "admin",
  "password": "Admin@123"
}
```

> **Note:** The example above is just a template. You can customize the user data according to your needs. Make sure to use a strong password for security purposes.

> **Security Warning:** Before building for production, make sure to delete the `/api/user` folder to prevent unauthorized user creation. This endpoint should only be used during initial setup and should be removed to avoid potential security risks.

## Technologies Used

- **[Next.js](https://nextjs.org/)** - React framework for production
- **[React](https://reactjs.org/)** - JavaScript library for building user interfaces
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database for data storage
- **[Jose](https://github.com/panva/jose)** - JavaScript module for JSON Web Tokens (JWT) authentication and authorization
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for styling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
