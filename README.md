# Alemeno Course Web Application

## Introduction
This project is a web application for showcasing a list of courses and their details, along with a student dashboard. The application is built using React and Redux, and it utilizes Firebase for backend services. The application is fully responsive and deployed on Vercel.

## Features
- **Course Listing Page:** Displays a list of courses with search functionality.
- **Course Details Page:** Shows detailed information about a selected course.
- **Student Dashboard:** Allows students to view their enrolled courses and mark them as completed.
- **State Management:** The application state is managed using Redux.

## Technologies Used
- **React:** Frontend library for building user interfaces.
- **Redux:** State management library.
- **Firebase:** Backend services including Firestore for database.
- **Vite:** Build tool for fast development.
- **Tailwind CSS:** Utility-first CSS framework for styling.

## Installation and Setup
To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/abhimanyu0018/alemeno`
2. Navigate to the project directory: `cd alemeno`
3. Install dependencies: `npm install`
4. Set up environment variables by creating a `.env` file in the root directory with the following variables:
  ```
VITE_API_KEY
VITE_AUTH_DOMAIN 
VITE_PROJECT_ID 
VITE_STORAGE_BUCKET
VITE_MESSAGEING_SENDER_ID 
VITE_APP_ID
VITE_MEASUREMENT_ID
   ```
> [!IMPORTANT]  
> Make sure to set up your own Firebase server and firestore. 
> the add the firebaseConfig to .env

5. Start the development server: `npm run dev`


## Deployment

The application is deployed on Vercel.
-  **Link:** [Alemeno](https://alemeno-omega.vercel.app/)

