# NodeJS API

A Node.js Express TypeScript API for application with JWT authentication and security middleware.

## Features

- 🚀 Express.js with TypeScript
- 🔐 JWT Authentication with bcrypt password hashing
- 🛡️ Security middleware (CORS, Helmet, Rate Limiting)
- 📝 Environment configuration with dotenv
- 🏗️ Modular route structure
- ⚡ Hot reload development with tsx/ts-node-dev

## Installation

1. Clone the repository
```bash
git clone git remote add origin https://github.com/superpck/nodejs-express-starter.git api
cd api
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=3000
JWT_SECRET=your-very-secure-secret-key
```

## Available Scripts

```bash
# Development (with tsx - faster)
npm run dev:tsx

# Development (with ts-node-dev)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Run tests
npm test
```

## API Endpoints

### Public Routes
- `GET /` - Welcome message with API info
- `GET /test` - Test endpoint
- `GET /health` - Health check

### Authentication Routes
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout (requires authentication)
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile (requires authentication)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Login Example
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "secret"
  }'
```

### Using Protected Routes
Include the JWT token in the Authorization header:
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure

```
src/
├── index.ts              # Main application entry point
├── middleware/
│   └── auth.ts          # JWT authentication middleware
└── routes/
    ├── index.ts         # Main routes aggregator
    ├── indexRoute.ts    # Public routes (home, test, health)
    └── loginRoute.ts    # Authentication routes
```

## Security Features

- **CORS**: Cross-origin resource sharing protection
- **Helmet**: Security headers middleware
- **Rate Limiting**: Request rate limiting (100 requests per 15 minutes per IP)
- **JWT**: Secure token-based authentication
- **bcrypt**: Password hashing

## Development

The project supports hot reload during development:

```bash
# Using tsx (recommended - faster)
npm run dev:tsx

# Using ts-node-dev
npm run dev
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Credits

This project was developed with assistance from **GitHub Copilot** - an AI pair programming tool that helped accelerate development and improve code quality.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

---

Made with ❤️ and GitHub Copilot
