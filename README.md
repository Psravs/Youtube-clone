# Youtube Clone Final Project (React + Vite)

This project is a Youtube clone created as the Final Project for my Full Stack Development course, using **React** with **Vite** as the building tool. 

## Features

1. Youtube-like UI 
2. Header with Youtube logo, hamburger, search bar, Sign-in, create channel option
3. Sidebar with menu options
4. Home page with pre-existing and user uploaded videos 
5. Your channel page where the user can upload, edit or delete their videos
6. Video player page where the user can play the video, like or dislike, make a comment, edit or delete it
7. Videos can be searched using search bar 
8. Videos can be filtered by clicking on filter options on home page
9. UI responsiveness 
10. DB Interactivity  

## Technologies used 

* Frontend: React, React Router, Axios
* Backend: Node.js, Express.js, MongoDB
* Authentication: JWT (JSON Web Tokens)
* Database: MongoDB 
* Version Control: Git

## Usage

1. Watch videos by clicking on thumbnails on home page
2. Sign in, log in and create your own channel to upload your videos and showcase your interests in life
3. Use search bar to find videos by title
4. Use filter options on home page to filter videos

## Project setup 

### Requirements

* React + Vite installed
* Node.js installed
* MongoDB running locally 

### How to run the project 

#### Terminal 1 -> Main folder -> Server folder
To start backend -
1. cd server 
2. npm install 
3. npm run dev 

#### Terminal 2 -> Main folder -> Server folder
To add dummy videos into DB -
1. cd server 
2. node scripts/dummyVideos.js  

#### Terminal 3 -> Main folder -> Client folder 
To start frontend - 
1. cd client
2. npm install 
3. npm run dev 
4. Go to http://localhost:5173/ on browser

(DO NOT CLOSE the terminals!)