# College Management System

This workspace contains a starter full-stack college management system.

## Backend (Django)

1. Create a Python virtual environment:

   ```powershell
   cd backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

2. Install dependencies:

   ```powershell
   pip install -r requirements.txt
   ```

3. Run migrations:

   ```powershell
   python manage.py makemigrations
   python manage.py migrate
   ```

4. Create a superuser for Django admin:

   ```powershell
   python manage.py createsuperuser
   ```

5. Start the backend server:

   ```powershell
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/api/`.

## Frontend (Next.js)

1. Install Node dependencies:

   ```powershell
   cd ..\frontend
   npm install
   ```

2. Run the frontend:

   ```powershell
   npm run dev
   ```

The site will be available at `http://localhost:3000`.

## Notes

- The frontend fetches data from `http://localhost:8000/api`.
- If you deploy frontend and backend separately, set `NEXT_PUBLIC_API_BASE_URL`.
- Use Django admin at `http://localhost:8000/admin/` to add initial subjects before creating student records.
