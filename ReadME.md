# Node.js TypeScript Template

A production-ready Node.js template with TypeScript, Express, and authentication support.

## Features

- **TypeScript** - Strongly typed JavaScript
- **Express** - Fast and minimalist web framework
- **Authentication** - JWT-based auth interface setup
- **Prettier** - Code formatting with pre-commit hooks
- **Husky** - Git hooks management
- **Environment Configuration** - Easy env-based configuration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nodejs-typescript-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Files

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Configure your environment variables in `.env`:

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=7d
```

For production, create a `.env.production` file with production-specific values:

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=your_production_database_url
JWT_SECRET=your_production_jwt_secret_key
JWT_EXPIRATION=7d
```

## Development

### Running the Development Server

```bash
npm run dev
```

The server will start with hot-reload enabled on the default port (usually 3000).

### Building the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist` directory.

### Running Tests

```bash
npm test
```

### Code Formatting

The project uses Prettier for code formatting. Pre-commit hooks will automatically format staged files:

```bash
npm run format
```

## Production

### Build for Production

```bash
npm run build
```

### Run in Production

```bash
npm start
```

Or set the environment and run:

```bash
NODE_ENV=production npm start
```

### Using Process Manager (Recommended)

For production, use PM2 or similar process manager:

```bash
npm install -g pm2
pm2 start dist/index.js --name "nodejs-app"
pm2 save
pm2 startup
```

## Project Structure

```bash
src/
├── interfaces/       # TypeScript interfaces
│   └── auth.interface.ts
├── models/          # Data models
├── routes/          # API routes
├── controllers/     # Route handlers
├── middleware/      # Express middleware
└── index.ts         # Entry point

dist/                # Compiled JavaScript output
.husky/              # Git hooks
```

## Scripts

- `npm run dev` - Run development server with hot-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm test` - Run tests
- `npm run format` - Format code with Prettier

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | Database connection string | `mongodb://localhost/db` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `JWT_EXPIRATION` | Token expiration time | `7d` |

## Pre-commit Hooks

This project uses Husky for git hooks. Files are automatically formatted with Prettier before commits.

## Troubleshooting

### Port Already in Use

Change the PORT in `.env`:

```bash
PORT=3001
```

### Dependencies Not Installing

Clear npm cache and reinstall:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Compilation Errors

Ensure TypeScript is installed and rebuild:

```bash
npm install -D typescript
npm run build
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit (Prettier will auto-format)
4. Push to the repository

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
