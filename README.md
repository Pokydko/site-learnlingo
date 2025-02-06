# Language Learning Platform

## Overview

A web app for finding and booking online language teachers. Users can browse, filter, and save favorite teachers. Authentication and data storage are managed via Firebase.

## Features

- **Home Page**: Company benefits and CTA to the Teachers page.
- **Teachers Page**: List of teachers with filters for language, student level, and hourly rate.
- **Favorites Page**: Private list of saved teachers (for authenticated users).
- **Authentication**: Firebase-based registration, login, and logout.
- **Dynamic Data Loading**: Fetching teachers from Firebase Realtime Database.
- **Favorites Management**: Persistent teacher favorites for logged-in users.
- **Trial Lesson Booking**: Modal form for booking trial lessons.

## Tech Stack

- **Frontend**: React, React Router, Firebase, React Hook Form, Yup
- **State Management**: Redux Toolkit
- **Database**: Firebase Realtime Database
- **Deployment**: Netlify / GitHub Pages

## Setup & Deployment

1. Clone the repo:

   ```
   git clone https://github.com/your-repo/language-learning-app.git
   cd language-learning-app
   ```

2. Install dependencies:

```
npm install
```

3. Configure Firebase:

- Create a Firebase project, enable Realtime Database & Authentication (Email/Password).
  - Add Firebase config to .env (look in .env.example):

```
VITE_apiKey=
VITE_authDomain=
VITE_databaseURL=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
```

4. Run locally:

```
npm run dev
```

## Future Enhancements

- Advanced sorting & search
- User reviews & rating
- UI/UX improvements

# Developed by Anton Pokydko, 2025
