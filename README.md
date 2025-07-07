# NC News

**Deployed version:** [Live Demo](https://nc-news-miii.netlify.app/)

## Overview

NC News is a front-end React application for browsing and discussing articles. Users can view articles by topic, upvote/downvote, and post comments. The app consumes a separate back-end API hosted in the repository linked below.

## Features

- View a list of all articles
- Filter articles by topic
- Sort articles by date, votes, or comment count
- View detailed article pages with comments
- Upvote and downvote articles
- Post and delete comments (with client-side validation)
- Friendly error handling for 404s and API errors

## Technologies

- React (v19.x)
- Vite for build tooling
- Tailwind CSS for styling
- React Router for client-side routing
- date-fns for date formatting

## Back-end API

The back-end API is available at: https://github.com/Maiwand/nc-news-be

## Requirements

- Node.js v18.16.0 or higher
- npm v9.x or higher

## Setup and Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Maiwand/nc-news.git
   ```
2. Navigate to the project directory:
   ```bash
   cd nc-news
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
