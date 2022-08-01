# Recipe Book Client

## Description

The main application client is made out of Vanilla JS. The intent was to use pure javascript in order to practice what i have learned in the Softuni JS course, so the libraries i used for this project are limited to routing and templating solutions, bundler for the application deployment, charting library for the beautiful chart of the admin panel and email sending library.

- lit-html

I choosed lit-html because it's lite, simple and fast templating engine. I also had previous experience with this library and it was confortable using it.

- Page

Client side router is a must when creating an Single Page Application. Again - i chosed lite and simple router. Nothing too fancy, nothing too complicated about it.

- Webpack

Heavy artillery, which i used on a very basic level. `npx webpack` was all it was for.

- Chart JS

Very customizable and functional charting library.

- Email JS

Why writing 150-200 lines of code for java library, when u can use this solution? All that is needed connection to the CDN and you are ready to send emails with additional 5-10 lines of code on the frontend. It works perfectly and it's very customizable. 

- Firebase

I used it for the client deployment.

## How to Install and Run the Project

All you need to do is to write `npm install` and `npm start` in the console.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode, starting lite-server
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
