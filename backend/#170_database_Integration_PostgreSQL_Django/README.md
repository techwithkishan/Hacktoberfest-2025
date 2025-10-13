# 🧠 Django Blog API with PostgreSQL (Hacktoberfest 2025)

This project is part of **Hacktoberfest 2025**.  
It’s a **Django REST API** for a complete **blog application** integrated with **PostgreSQL**, featuring models, views, serializers, and an admin panel.

---

## 📁 Project Structure

```
#170_database_Integration_PostgreSQL_Django/backend/
        ├── manage.py
        ├── requirements.txt
        ├── backend/
        │   ├── settings.py
        │   ├── urls.py
        │   └── wsgi.py
        └── blog/
            ├── models.py
            ├── views.py
            ├── serializers.py
            ├── urls.py
            ├── admin.py
            ├── apps.py
            └── migrations/
```

---

## ⚙️ Requirements

**requirements.txt**
```
Django==4.2.7
djangorestframework==3.14.0
psycopg2-binary==2.9.7
Pillow==10.0.1
python-decouple==3.8
django-cors-headers==4.3.1
django-filter==24.2
```

Install dependencies:

```bash
pip install -r requirements.txt
```





---

## 🛠 Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE blog;
```

---

## 🔧 Django Settings (backend/settings.py)

Make sure `INSTALLED_APPS` includes:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'corsheaders',
    'django_filters',

    # Local
    'blog',
]
```

And configure PostgreSQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'blog', # Database name in PostgreSQL
        'USER' : 'default_postgres',#your username
        'PASSWORD' : 'your_postgres_password',#your password
        'HOST' : 'localhost',
        'PORT' : '5432'
    }
}

```

---

## 🧱 Key Features

- 🗂 Blog Categories & Tags  
- 📝 Posts with SEO fields & Featured Images  
- 💬 Comments (auto-approved)  
- 👁 Post Views tracking  
- 🔒 Permissions and pagination  
- ⚙️ Admin panel integration  


---

## 🧩 Migrations

Run these commands:

```bash
python manage.py makemigrations blog
python manage.py migrate
```

---

## 👑 Admin Access

Create a superuser:

```bash
python manage.py createsuperuser
```

---

## 🚀 Run Server

```bash
python manage.py runserver
```

Then visit:
- **Admin:** http://127.0.0.1:8000/admin/
- **API Root:** http://127.0.0.1:8000/blog/api/

---

## 🧭 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET/POST | `/blog/api/posts/` | List or create posts |
| GET/PUT/PATCH/DELETE | `/blog/api/posts/{slug}/` | Post detail |
| GET | `/blog/api/posts/{slug}/comments/` | Get post comments |
| GET | `/blog/api/categories/` | List categories |
| GET | `/blog/api/tags/` | List tags |
| GET/POST | `/blog/api/comments/` | List or create comments |

---

## 🧰 Common Commands

```bash
# Apply migrations
python manage.py migrate

# Run development server
python manage.py runserver

# Collect static files
python manage.py collectstatic
```

---

## 🎯 Summary

This implementation provides a **production-ready Django blog backend** with:

- PostgreSQL integration  
- REST API endpoints (DRF)  
- CORS setup  
- Pagination, filtering & search  
- Django admin management  
