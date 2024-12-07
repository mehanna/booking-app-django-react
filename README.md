# booking-app-django-react

booking app using Django and React

# To convert django to vercel.

falow this link to [Deploy a Django app with PostgreSQL database on Vercel](https://dev.to/doridoro/deploy-a-django-app-with-postgresql-database-on-vercel-1965)

to converty PostgreSQL add a Postgre DB to [render](render.com) and this line to the settinges.py and change #External Database URL with corect url

```
DATABASES['default'] = dj_database_url.parse("#External Database URL")
```
