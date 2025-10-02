# 🏢 BookIt - Room Booking Application

A full-stack room booking application built with **Django REST Framework** backend and **Next.js** frontend, featuring user authentication, room management, and booking functionality

<img width="1867" height="1057" alt="Screenshot 2025-10-02 at 2 54 11 PM" src="https://github.com/user-attachments/assets/ce500306-bfb4-45fd-b7ea-95d06a73733c" />


## 🚀 Features

- **User Authentication**: Secure login/registration with Django Knox token authentication
- **Room Management**: Browse available rooms with detailed information
- **Booking System**: Book rooms for specific time slots
- **User Dashboard**: View personal bookings and manage room listings
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Image Handling**: Django-served media files for room images
- **Environment Configuration**: Flexible database setup (SQLite/PostgreSQL)

## 🛠 Tech Stack

### Backend (Django)

- **Django 4.2.11** - Web framework
- **Django REST Framework** - API development
- **Django Knox** - Token authentication
- **PostgreSQL/SQLite** - Database options
- **Python-dotenv** - Environment management
- **CORS Headers** - Cross-origin resource sharing

### Frontend (Next.js)

- **Next.js 15.0.3** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **React Icons** - Icon components
- **React Toastify** - Notifications

## 📁 Project Structure

```
booking-app-django-react/
├── bookingappbackend/          # Django REST API
│   ├── booking/                # Room booking app
│   ├── accounts/               # User authentication
│   ├── media/images/           # Room images
│   ├── manage.py              # Django management
│   └── .env                   # Environment variables
├── bookingFronteEndNextJS/bookit/  # Next.js frontend
│   ├── app/                   # App router pages
│   ├── components/            # Reusable components
│   ├── context/               # React context
│   └── assets/                # Static assets
└── .gitignore                 # Git ignore rules
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

### Backend Setup (Django)

1. **Navigate to backend directory**

   ```bash
   cd bookingappbackend
   ```
2. **Install Python dependencies**

   ```bash
   pip install -r requirements.txt
   ```
3. **Set up environment variables**

   ```bash
   cp .env.local .env  # For SQLite (development)
   # or
   cp .env.production .env  # For PostgreSQL (production)
   ```
4. **Run migrations**

   ```bash
   python manage.py migrate
   ```
5. **Start Django server**

   ```bash
   python manage.py runserver
   ```

### Frontend Setup (Next.js)

1. **Navigate to frontend directory**

   ```bash
   cd bookingFronteEndNextJS/bookit
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Start development server**

   ```bash
   npm run dev
   ```
4. **Access the application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 🗄 Database Configuration

The application supports flexible database configurations:

### Development (SQLite)

```bash
# No DATABASE_URL needed - uses SQLite by default
DJANGO_DEBUG=True
```

### Production (PostgreSQL)

```bash
DATABASE_URL=postgresql://username:password@host:port/database
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=your-production-secret-key
```

## 🔧 Environment Variables

### Backend (.env)

```bash
DJANGO_DEBUG=True
DJANGO_SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url  # Optional - uses SQLite if not set
```

### Frontend

Environment variables are handled through Next.js configuration files.

## 📸 Screenshots

### Available Rooms Page

The main interface showing available rooms with images, pricing, and booking options.

![Available Rooms](docs/bookit-screenshot.png)

## 🚀 Deployment

### Django Backend to Vercel

Follow this comprehensive guide: [Deploy a Django app with PostgreSQL database on Vercel](https://dev.to/doridoro/deploy-a-django-app-with-postgresql-database-on-vercel-1965)

### PostgreSQL Database on Render

1. Create a PostgreSQL database on [Render](https://render.com)
2. Update your environment variables:
   ```bash
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

### Next.js Frontend

Deploy to Vercel, Netlify, or your preferred hosting platform.

## 👨‍💻 Author

**Magedd Hanna** - [mehanna](https://github.com/mehanna)

## Acknowledgments

- Django REST Framework documentation
- Next.js documentation
- Tailwind CSS for styling
- React Icons for UI components
