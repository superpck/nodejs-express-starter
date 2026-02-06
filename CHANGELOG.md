# Changelog

All notable changes to this project will be documented in this file.

## [5.2.1] - 2026-02-06
- Update express
- Update package

## [5.1.1] - 2025-09-19

### Fixed
- Added Express `trust proxy` configuration to fix express-rate-limit validation error
- Resolved X-Forwarded-For header misconfiguration warning
- Fixed duplicate JSON keys in package.json
- Removed deprecated `@types/bcryptjs` and `@types/uuid` packages
- Fixed TypeScript compilation errors related to missing type definitions

### Added
- TRUST_PROXY environment variable configuration
- Proxy configuration documentation in README
- Enhanced environment variables table

### Changed
- Updated dependencies to use built-in TypeScript definitions
- Cleaned up package.json devDependencies
- Optimized serverRoute.ts by combining `/service` and `/service/:mode` routes
- Modern bcryptjs and uuid packages now provide their own TypeScript types

## [5.1.0] - 2025-08-11

### Added
- Database integration with Knex.js query builder
- Support for MySQL and PostgreSQL databases
- BaseModel class with common CRUD operations
- UserModel with authentication-specific methods
- Database connection testing and error handling
- Environment configuration for database settings
- Model-based architecture for scalable development

### Changed
- Updated authentication routes to use database models
- Replaced mock user data with real database operations
- Enhanced error handling in authentication endpoints
- Improved project structure with models and database middleware

### Fixed
- Resolved body parsing issues in authentication routes
- Fixed route conflicts in main application file

### Security
- Database password hashing with bcrypt integration
- Secure user data handling (password exclusion in responses)
- Enhanced authentication flow with database validation

## [5.1.0] - 2025-08-11

### Added
- Initial project setup with Express.js and TypeScript
- JWT authentication system with bcrypt password hashing
- Security middleware (CORS, Helmet, Rate Limiting)
- Modular route structure
- Environment configuration with dotenv
- Development tools (tsx, ts-node-dev)
- Comprehensive README documentation
- Base Express.js server setup
- TypeScript configuration
- Basic middleware setup (CORS, Helmet, Rate Limiting)
- Route structure with index and authentication routes
- JWT authentication middleware
- Health check and test endpoints
- Hot reload development environment
- Documentation and project structure

### Changed
- Migrated from basic Express setup to modular TypeScript structure
- Improved authentication flow with real JWT implementation and database integration
- Enhanced security with multiple middleware layers
- Updated authentication routes to use database models instead of mock data

### Developer Experience
- Added multiple development scripts (tsx, ts-node-dev)
- Implemented hot reload for faster development
- Created comprehensive project documentation
- Set up proper TypeScript configuration with type definitions
- Integrated database models for better code organization

---

**Note:** This project was developed with assistance from GitHub Copilot AI.
