# Project Atelier | Hack Reactor Front-end Capstone

**Application Demo Video (3 mins)**
[Demo Video Link](https://drive.google.com/file/d/1GkncRLSr4gJ6SqRkvX-jTrm1gU-W8X27/view?usp=sharing)
---
**Overview**

This Hack Reactor front-end project is a single-page shopping website simulation of e-commerce websites. Users will be able to interact with the UI and view products or services for sale. Feature highlights include adding user questions, reviews, and uploading photos using a restful API.

Given a wireframe design, our group of three software engineering students had to develop a front-end project reflecting the design and following a list of features requirements.

***Table of Contents***
* Team Members
* Description
* Installation
* LightHouse Audit Results
* Roadmap
---
**Team Members**

*Hack Reactor Cohort - RPP29*
*Group - Manchego*

* Louis La - Product Overview Module
* Isaac Kim - Questions & Answers Module
* Helena Tanubrata - Ratings & Reviews Module

---
**Description**

Our application allows the user to click through products and styles to add to their shopping carts. In addition, users can see the current questions asked for the selected product as well as add their own questions & answers. At the very bottom, users can view reviews written by other customers. There is a star rating for each product. The user can add their own rating and review to the products. Overall, there is a click tracker that logs the users’ click interactions into an API.

*Main Components*
1) Product Overview
* The Overview module is top-most module on the Product Detail page.
* This component will guide the customer through selecting a specific style and size to add to their cart.
2) Questions & Answers
* The Questions & Answers module allows asking and answering of questions for the product selected.
* This component extends the ability to view and search questions, ask questions, answer questions and provide feedback on questions about the current product.
3) Ratings & Reviews
* The Ratings & Reviews module will allow viewing and submission of reviews for the product selected.
* This component extends the ability to write, read, and browse through reviews for the current product.

![alt text](https://github.com/FEC-Manchego/Atelier/blob/main/screenshots/ProductOverview.png?raw=true)
![alt text](https://github.com/FEC-Manchego/Atelier/blob/main/screenshots/RelatedProducts.png?raw=true)
![alt text](https://github.com/FEC-Manchego/Atelier/blob/main/screenshots/QuestionsAnswers.png?raw=true)
![alt text](https://github.com/FEC-Manchego/Atelier/blob/main/screenshots/RatingsReviews.png?raw=true)

---
**Installation**

Our application uses React, Express, Axios, jQuery,  webpack, and babelrc mainly. The developer needs node installed and would just need to run an npm install and then run the npm commands to start webpack and the server. The developer would also need their own config files such as a GitHub token and an imgBB key, in order to use the image upload function.

1) Install all packages by running the following commands in your terminal.
`npm install`

2) Start the server.
`npm run server`

3) On a separate terminal, run webpack.
`npm run webpack`

4) Rename the `example.config.js` file to `config.js`

5) Insert your own GitHub token and imgBB token into the `config.js` file.

6) Open the project in your web browser.
http://localhost:3000/

---
**LightHouse Audit Results**

These are screenshots of the LightHouse audit results (taken locally) for both desktop and mobile.

![alt text]()
![alt text]()

---
**Roadmap - future enhancements**

* CSS overhaul to have each component's CSS style align better
* Login/User creation - Store user data associated to a certain user
* Database integration with user data via MongoDB
* Adding security certificate to allow for ‘https’ access