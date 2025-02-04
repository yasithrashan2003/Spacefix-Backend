# Spacefix App Backend

A Node.js and Express.js backend application with Firebase integration.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a .env file in the root directory and add your Firebase credentials:
   ```
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=your_project_id
   # Add other Firebase credentials
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Lecturers
- GET /api/lecturers - Get all lecturers
- POST /api/lecturers - Create a new lecturer
- PUT /api/lecturers/:id - Update a lecturer
- DELETE /api/lecturers/:id - Delete a lecturer

## Security Notes
- Never commit the .env file
- Keep your Firebase credentials secure
- Regenerate credentials if they are ever exposed
