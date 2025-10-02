# Database Configuration Guide

This Django project supports both SQLite (for local development) and PostgreSQL (for production) databases using environment variables.

## Environment Files

- `.env` - Default environment (SQLite for local development)
- `.env.local` - Local development with SQLite
- `.env.production` - Production with PostgreSQL

## Usage

### Local Development (SQLite - Default)
```bash
# Activate virtual environment
source env/bin/activate

# Run with default SQLite configuration
python manage.py runserver
```

### Production (PostgreSQL)
```bash
# Copy production environment
cp .env.production .env

# Or set environment variable directly
export DATABASE_URL="postgresql://username:password@host:port/database"

# Run server
python manage.py runserver
```

### Switch Between Environments
```bash
# For SQLite (local development)
cp .env.local .env
python manage.py runserver

# For PostgreSQL (production)
cp .env.production .env
python manage.py runserver
```

### Environment Variables

- `DJANGO_DEBUG`: Set to 'True' for development, 'False' for production
- `DJANGO_SECRET_KEY`: Django secret key (use a secure key for production)
- `DATABASE_URL`: PostgreSQL connection string (if not set, SQLite will be used)

## Database Migrations

When switching databases, you may need to run migrations:

```bash
python manage.py migrate
```

## Security Notes

- Never commit `.env` files to version control
- Use strong secret keys in production
- Ensure SSL is properly configured for PostgreSQL connections