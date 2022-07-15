# Recipe Book

## Project Description

Cookbook for recording the most delicious recipes and their ingredients, originally intended for me and my family. Made with pure Vanilla JS, everyone can register and engage by commenting different recipes, share their experience or create their own recipe.

You can view the application here - https://recepti-na-shushanite.web.app/

### Challenges i faced

For a very first time i used backend as a service solution. I also had to learn to work with Mongo DB in order to emplement search and filtration features. 

For a very first time i had to come up with my own HTML and CSS structure and in the beginning it was tragic ^^ But i improved it over time - refactoring the HTML structure and splitting the CSS to multiple files. 

Also i had to figure out how to deploy this thing and how to work on a very basic level with bundler like webpack.

### Libraries and solutions i used

The intent was to use pure javascript in order to practice what i have learned in the Softuni JS course, so the libraries i used for this project are limited to routing and templating solutions and bundler for the application deployment.

#### lit-html

I choosed lit-html because it's lite, simple and fast templating engine. I also had previous experience with this library and it was confortable using it.

#### page

Client side router is a must when creating an Single Page Application. Again - i chosed lite and simple router. Nothing too fancy, nothing too complicated about it.

#### webpack

Heavy artillery, witch i used on a very basic level. `npx webpack` was all i used it for.

#### back4app

This is the backend solution i choosed for this project. It's simple to use and more importantly it's free, so it's perfect for student projects and small applications. There is also a good and easy to follow documentation. 

### Features

##### 1. Single Page Application Architecture

##### 2. Fully responsive design from 320px width to 4k monitors support.

##### 3. Search feature

##### 4. Filtration feature

##### 5. Custom pagination, build from scratch.

##### 6. Custom dropdown menu, build from scratch.

##### 7. Modal dialogue

##### 8. Notifications of type A - regular, that will hide upon click and type B - redirect upon click

##### 9. Back to top button /on the recipe details page/

##### 10. Every click on a functional component of the website reflects on the url bar, you can then send it to a friend in order for him to see the result you want him to see.

##### 11. Users can create account, providing them with the rights to publish their own recipes and to post comments.

##### 12. Recipe owners can edit and delete their publications.

## How to Install and Run the Project

All you need to do is to write npm install and npm start in the console.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode, starting lite-server
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
