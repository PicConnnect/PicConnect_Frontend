# Pic Connect - Frontend 
<img width="1440" alt="image" src="https://github.com/PicConnnect/PicConnect_Frontend/assets/106124483/3555f08d-6421-44f1-85c6-18c3e42b9e67">
<img width="1440" alt="image" src="https://github.com/PicConnnect/PicConnect_Frontend/assets/106124483/d3979a52-cf07-4c60-a891-17de756a15de">
<img width="1440" alt="image" src="https://github.com/PicConnnect/PicConnect_Frontend/assets/106124483/828095d5-854d-4ee3-8a04-8c76836eccc9">
<img width="1440" alt="image" src="https://github.com/PicConnnect/PicConnect_Frontend/assets/106124483/50107547-1550-4781-be90-5b4e55257fbd">

#### <a href="https://github.com/PicConnnect/PicConnect_backend">Click to see backend repo</a>
Welcome to the Pic Connect frontend repository! This web app allows users to log in, post photos, leave comments, like and follow each other. One of the main features of Pic Connect is the integration of the TomTom map to display the location where each photo was taken. This ReadMe will provide an overview of the project, setup instructions, key features, and some helpful tips for development.
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#introduction">Introduction</a>
      <ul>
        <li><a href="#setup">Setup</a></li>
      </ul>
    </li>
    <li>
      <a href="#key-features">Key Features</a>
      <ul>
        <li><a href="#technologies-used">Technologies Used</a></li>
      </ul>
    </li>
  </ol>
</details>

## Introduction

Pic Connect is a full-stack web application developed with React JS, Redux, and Tailwind CSS. It aims to provide users with a platform to share photos, connect with other users, and explore various locations through the integrated TomTom map feature.

## Setup

To run Pic Connect locally on your machine, follow these steps:

1. Clone the repository:

   `git clone https://github.com/PicConnnect/PicConnect_Frontend.git`

2. Change into the project directory:

    `cd pic-connect-frontend`

3. Install the required dependencies:

    `npm install`

4. Start the development server:

   `npm start`

5. Open your browser and navigate to `http://localhost:3000` to access the Pic Connect application.

## Key Features

- User Registration and Login: Users can create accounts and log in securely to access the app's features.

- Posting Photos: Users can upload and post photos along with relevant details such as location, caption, etc.

- Comments and Likes: Users can leave comments on photos and also like their favorite photos.

- Follower System: Users can follow and be followed by other users, creating a social network within the app.

- TomTom Map Integration: Photos are displayed on a map using the TomTom API, allowing users to visualize the photo locations.

- Search: Users can search by the image title. 

## Technologies Used

- React JS: The frontend is built using React to create a dynamic and responsive user interface.

- Redux: Redux is used for state management, providing a centralized and predictable way to manage the application's data.

- Tailwind CSS: Tailwind CSS is utilized for styling and ensuring a clean and consistent user interface.

- TomTom Map API: The TomTom API is integrated to display photo locations on an interactive map.

- Socket IO: Socket IO is utilized to display real time comments and likes.

- Firebase Storage: Firebase storage is used to store uploaded images and links to images for the database.

- Firebase Authentication: Firebase Authentication is utilized to implement Google, Facebook, email-password authentication in the website. 

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/PicConnnect/PicConnect_Frontend/graphs/contributors
[![Contributors][contributors-shield]][contributors-url]
