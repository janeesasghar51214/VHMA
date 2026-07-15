# Virtual Mental Health Assistant (VMHA) - FYP

This is the repository for the Final Year Project (FYP): **Virtual Mental Health Assistant (VMHA)**.

## Project Structure
* `backend/` - FastAPI backend application and database connection configurations.
* `mobile/` - React Native mobile application code (future integration).
* `design/` - UI/UX designs, wireframes, and layouts.
* `docs/` - Project documentation, reports, and diagrams.
* `assets/` - Images, logo, and static assets.
* `api_testing/` - API test collection files (Postman/Thunder Client).

---

## Getting Started & Team Collaboration

To ensure all team members can work on the same codebase without conflicts, follow this setup guide.

### 1. Prerequisites
Ensure you have the following installed:
* [Python 3.13+](https://www.python.org/downloads/)
* [Git](https://git-scm.com/downloads)
* MongoDB Atlas Account (or local MongoDB Community Server)

### 2. Clone the Repository
Open your terminal/command prompt, navigate to your desired directory, and clone the project:
```bash
git clone https://github.com/janeesasghar51214/VHMA.git
cd VHMA
```

### 3. Backend Setup
Navigate into the backend folder:
```bash
cd backend
```

#### Create a Virtual Environment
This keeps the project dependencies isolated.
* **Windows (PowerShell):**
  ```powershell
  python -m venv venv
  .\venv\Scripts\Activate.ps1
  ```
* **Windows (CMD):**
  ```cmd
  python -m venv venv
  .\venv\Scripts\activate.bat
  ```
* **Mac/Linux:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

#### Install Dependencies
Once the virtual environment is active, install the required packages:
```bash
pip install -r requirements.txt
```

#### Configure Environment Variables
1. Copy the `.env.example` file to create your own local configuration:
   ```bash
   cp .env.example .env
   ```
   *(On Windows, you can simply rename a copy: `copy .env.example .env`)*
2. Open the newly created `.env` file and replace the `MONGODB_URI` connection string with your own MongoDB Atlas URI. **Do not commit your `.env` file to Git!** It is automatically ignored in `.gitignore`.

### 4. Running the Server
With your virtual environment active and `.env` configured, start the FastAPI development server:
```bash
uvicorn app.main:app --reload
```
You should see:
```text
[SUCCESS] MongoDB Connection Verified on Startup
[SUCCESS] Unique index on 'email' verified/created
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

### 5. Accessing API Documentation
Open your browser and visit:
* **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) (Interactive testing environment)
* **ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## Git Collaboration Guidelines for the Team

To work smoothly on the same project without overriding each other's changes, follow these rules:

1. **Pull before starting work:** Always pull the latest changes from the main branch before you write code:
   ```bash
   git pull origin main
   ```
2. **Work on branches (Recommended):** Instead of making changes directly to the `main` branch, create a branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes:** Write clear and concise commit messages:
   ```bash
   git add .
   git commit -m "Add Mood Tracking API endpoints"
   ```
4. **Push and create Pull Request:** Push your branch to GitHub and create a Pull Request (PR) for review:
   ```bash
   git push origin feature/your-feature-name
   ```
