<h1 align="center">Recipe Book</h1>

<p align="center">
  <img width=150 height=150 src="https://recepti-na-shushanite.web.app/static/images/cooking.png">
</p>

<details>
<summary>Table of contents</summary>

 [1. Project Description](#project-description)
 - [History](#history)
 - [Application Demo](#application-demo)
 
 [2. Technology Stack and libraries](#technology-stack)
 - [Main Client](#main-client)
 - [Mobile Client](#mobile-admin-panel-client)
 - [Main Server](#main-rest-api-server)
 - [Notification Server](#notifications-server)
 
 [3. Features](#features)
 
 [4. Main client reference](client/README.md)
 
 [5. Mobile admin panel client reference](mobile/README.md)
 
 [6. Main REST API server reference](recipes-server/README.md)
 
 [7. Notification server reference](notifications-server/README.md)
 
</details>

## Project Description

Cookbook for recording the most delicious recipes and their ingredients, originally intended for me and my family. Made with pure Vanilla JS, everyone can register and engage by commenting different recipes, share their experience or create their own recipe. 

### History

December, 12, 2021, the project was originaly found under backend as a service solution from [back4app](https://www.back4app.com/) that uses MongoDB as database. At that time i just finished my javascript course at [SoftUni](https://softuni.bg/) and i wanted to practice my new skills. I had no idea how to make backend on my own, so i used one as a service. Choosing between firebase and back4app i picked the less popular one. I wanted to have fun. 

To my surprise, back4app proved to be simple to use and more importantly it's free, so it's perfect for student projects and small applications. There is also a good and easy to follow documentation.  

From 12th to 21st of December, 2021, for 9 days i builded the main website features and deployed my frontend: 
- non responsive design
- login
- register
- recipe catalogue page
- recipe creation page
- recipe details page
- recipe edit and delete from resource owners
- comments
- pagination
- modal dialogues
- notifications
- loading spinners
- search 
- categorization  

April 10th, 2022, 4 months later i finished MySQL, Spring Data and HTML & CSS courses. I had new skills and was time to improve the app with:

- I splitted my CSS spagetti into different files, cuz it was impossible to maintain around 1200+ lines of css code.
- Responsive web design from 320px width to 4k monitors support.
- Redesign
- Code refactoring
- Back to top button on recipe details page, it tends to become long, because of the comment section and bigger recipe steps and ingredients, so it was handy.

After that i started to learn React JS and the next activity was in May.

In May, 16th i started the SoftUni Spring MVC course, where i would finally learn how to build my own server. From then until the end of July the application evolved into multiple clients and servers. It started to support web client, mobile multi-platform client, suitable on Android and iOS mobile and tablet devices, realtime notification Node.JS server and Java REST API server.    

### Application demo

You can browse the deployed application [here](https://recepti-na-shushanite.web.app/)

## Technology Stack

### Main Client

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

### Mobile Admin Panel Client

This client is made with React Native. I choosed this framework because i wanted to have multiplatform support - both for Android and iOS, since i am using Android device, my girlfriend - iOS device. We both manage this application so React Native was the way to go.

- Expo

Expo is the perfect development enviorement for me. It connects your mobile device directly to the code, letting you use something real, that you develop for, instead of emulator. Also you can deploy your app in very convenient way and grants alot of extra goodies for development.

- Font Awesome

Font Awesome has support for react native applications. Very handy.

- React Navigation

Routing and navigation engine.

- Native Notify 

Library for mobile push notifications. It makes your life reaaaally easy with this.

- React Native Async Storage

A way to persist information into the application.

- React Native Chart Kit

This is the react native version of the chart JS library i used in the main client.

### Main REST API server

The main application server is builded with Spring.

- Spring Boot
- Spring Security
- auth0 JWT Token
- Model Mapper
- Amazon AWS
- Gradle
- MySQL
- HSQLDB

### Notifications Server

The notifications server is build on Node.JS and is using the Socket.io library. Why writing 200 lines of code on Java when u can write 50 lines on node and the end result is the same? 

- nodemon
- socket.io

## Features

#### 1. Single Page Application Architecture

#### 2. Fully responsive design from 320px width to 4k monitors support.

![320px](https://user-images.githubusercontent.com/74171353/181359459-c7811c93-186f-497e-afeb-e5981b93de5c.jpg)

![2560](https://user-images.githubusercontent.com/74171353/181359457-4bfb8389-0c49-44e6-9126-fef9340745a9.jpg)

#### 3. Search feature

![New Bitmap Image](https://user-images.githubusercontent.com/74171353/181359984-a79f4664-dace-4f01-bf5d-d8858f10e24e.jpg)

#### 4. Filtration feature

![dropdown](https://user-images.githubusercontent.com/74171353/181360276-1e3427ac-9caa-4d10-9e5d-5e0a622caef8.jpg)

#### 5. Custom pagination, build from scratch.

#### 6. Custom dropdown menu, build from scratch.

#### 7. Modal dialogue

![modal](https://user-images.githubusercontent.com/74171353/181360556-d3abec58-8699-4af9-8710-7985542f2f1f.jpg)

#### 8. Notifications of type A - regular, that will hide upon click and type B - redirect upon click

![notification](https://user-images.githubusercontent.com/74171353/181360905-ccd6b742-dcb3-433a-91c9-2f6444d3e065.jpg)

#### 9. Back to top button /on the recipe details page/

#### 10. Every click on a functional component of the website reflects on the url bar, you can then send it to a friend in order for him to see the result you want him to see.

#### 11. Users can create account, providing them with the following rights:

- Manage their profile /change username, email, password, preferences, avatar image/cover image by url address or by local upload/:

![profile management](https://user-images.githubusercontent.com/74171353/181361422-88ab7cb7-5284-41e6-94e7-4c90c59de629.jpg)
![change pass](https://user-images.githubusercontent.com/74171353/181361623-9802e437-ef71-4588-91d6-7d5802c0a257.jpg)
![profile edit](https://user-images.githubusercontent.com/74171353/181371958-351770d1-1612-45e2-b814-56e54143fee0.jpg)

- Make their own collection of favourite recipes:

![favourite recipes](https://user-images.githubusercontent.com/74171353/181362079-3f278db8-8a7d-4071-80a8-6074d715bcb9.jpg)

- Browse their created recipes:

![created recipes](https://user-images.githubusercontent.com/74171353/181362308-67724161-4b83-4f0c-8de7-97ea9db8bf0b.jpg)

- Receive real time notifications:

![realtime](https://user-images.githubusercontent.com/74171353/181362888-28ae5e08-aad1-4122-9181-e845f714f91d.jpg)
![notifications](https://user-images.githubusercontent.com/74171353/181363183-523996a0-62e8-4115-bf96-68f801a33470.jpg)

- Create recipes:

![create](https://user-images.githubusercontent.com/74171353/181363648-3d7cb6d3-44ce-4a1f-93f8-a77e017d231a.jpg)

- Delete / Edit their own recipes:

![delete](https://user-images.githubusercontent.com/74171353/181364001-0ee9c8f0-7330-4cef-b853-430db4c853fd.jpg)
![edit](https://user-images.githubusercontent.com/74171353/181364140-4c035d6c-7cbb-4adb-bf61-1305e120cbd6.jpg)

- Add comments as well as editing and deleting their own comments:

![add comment](https://user-images.githubusercontent.com/74171353/181364604-fda0aa89-0071-4107-9fa5-5afa9fb3c511.jpg)
![delete comment](https://user-images.githubusercontent.com/74171353/181364722-c82c13ea-18cb-49b7-b3af-9c337c8036d6.jpg)
![edit comment](https://user-images.githubusercontent.com/74171353/181364906-1a1f4adc-255e-4abb-b19b-9dd8222abdc2.jpg)

- Add recipes to their favourites collection:

![favourite](https://user-images.githubusercontent.com/74171353/181365178-e44375be-9b68-42a8-8d5b-2e99ee650775.jpg)

- Reset their forgotten password:

![forgotten password1](https://user-images.githubusercontent.com/74171353/181371887-be46505e-8094-4c50-be7a-622d255061b5.jpg)
![forgotten password2](https://user-images.githubusercontent.com/74171353/181371890-1feda163-0a01-4fa1-8292-72272e048ebd.jpg)
![forgotten password3](https://user-images.githubusercontent.com/74171353/181371891-ba53959b-79a8-4519-b987-36474e09e583.jpg)
![forgotten password4](https://user-images.githubusercontent.com/74171353/181371894-d42b2acf-2c52-46b8-80eb-2874e6d70122.jpg)
![forgotten password5](https://user-images.githubusercontent.com/74171353/181371896-112f9772-9adb-4d27-8cce-5b1a99fafa2e.jpg)
![forgotten password6](https://user-images.githubusercontent.com/74171353/181371898-1c9b9ce1-0963-4318-8655-35079dcf4cd2.jpg)

#### 12. Moderators receive notifications for created/edited comments from any user aswell as notifications for edited recipe. They can edit/delete any comments and edit any recipe

#### 13. Administrators receive notifications for any new action on the website and they have access to the admin panel and mobile app, from where they can manage any single resource - from user profiles ot recipes, manage roles, block users, approve recipes and so on.

- Recipe approval conventional way - without the admin panel

![approve recipe1](https://user-images.githubusercontent.com/74171353/181373393-6714555b-d948-42af-9085-6e28328bbbe8.jpg)
![approve recipe2](https://user-images.githubusercontent.com/74171353/181373389-d14eaeca-8f8a-4a9f-b75a-ad4bcda2e451.jpg)

#### 14. Admin Panel:

- Dashboard

![admin dashboard](https://user-images.githubusercontent.com/74171353/181373578-95635b42-4181-4134-91c2-7f1c590c4633.jpg)

- Users collection

![user management](https://user-images.githubusercontent.com/74171353/181373684-53ed40d0-107e-4a86-b163-980850e169d0.jpg)

- Recipes collection

![recipe managements](https://user-images.githubusercontent.com/74171353/181373737-f7856130-a2c0-40f5-ac39-609d40e762e4.jpg)

- Comments collection

![comments](https://user-images.githubusercontent.com/74171353/181373786-849e1712-59a0-4394-8984-1f990e471434.jpg)

- Users settings and role management
 
![role management](https://user-images.githubusercontent.com/74171353/181373839-f94bfccf-64a4-432f-b09b-81ec47274742.jpg)

- Global search /accessable only from the dashboard/

![global search](https://user-images.githubusercontent.com/74171353/181373962-f7f27001-ff52-450e-b44a-48a468bca004.jpg)
![global search 2](https://user-images.githubusercontent.com/74171353/181373956-7822207e-6330-4f0b-a48d-ec422a44f0dc.jpg)

- Individual collection search /the search bar adjusts automaticly, depending on the collection administrator is currently browsing/

![collection search](https://user-images.githubusercontent.com/74171353/181374199-6da2a524-8863-4a78-8413-8bd2dad3453b.jpg)

- Admin panel recipe approval

![approve recipe from panel](https://user-images.githubusercontent.com/74171353/181374278-3f9c0ab0-5c6d-4538-b1a4-d8cbf56bd824.jpg)

- Block user by IP

![block user](https://user-images.githubusercontent.com/74171353/181374378-3ae87ad4-a122-4090-89c2-8e54484cf74c.jpg)
![block user2](https://user-images.githubusercontent.com/74171353/181374382-bb5137f8-621e-4d9e-b86f-dba5d5ab5237.jpg)
![block user3](https://user-images.githubusercontent.com/74171353/181374384-a9fea21b-8793-47c5-97a0-f7bc351af927.jpg)
