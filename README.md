This repository contains the code for a website with three main pages: Home, Stocks, and Dogs. Each page offers unique functionalities and features.

#Overview
The website aims to provide users with a platform to explore stock data, view charts, discover popular stocks on Reddit, browse through pictures of various dog breeds, and learn about specific dog breeds. It incorporates custom CSS buttons, dynamic content loading, and audio command functionalities for ease of navigation.

#Pages
1. Home Page
The Home Page features two custom CSS buttons labeled "Stocks" and "Dogs."
Upon loading, the homepage retrieves and displays a stock quote using an API.
2. Stocks Page
The Stocks Page allows users to input a stock ticker and select a timeframe (30, 60, or 90 days).
It displays a line chart using Chart.js library to visualize the stock's performance over the selected timeframe.
Stock data, including closing values, is fetched from the Polygon.IO API and converted from EPOCH format to a readable date.
Additionally, a table showcases the top 5 stocks discussed on Reddit, obtained from an API. The table includes fields such as Ticker, Comment Count, and Sentiment, with bullish or bearish icons displayed accordingly. Each ticker is linked to its Yahoo Finance equivalent.
3. Dogs Page
The Dogs Page loads 10 random pictures of dogs from the Random Dog API and displays them using a JavaScript carousel (such as Simple-Slider).
It dynamically generates buttons for each dog breed fetched from another API, with custom styling.
Clicking on a dog breed button reveals a container displaying information about the selected breed, including Name, Description, Min Life, and Max Life.
Audio Commands
Users can utilize audio commands on both the Stocks and Dogs pages:

For stocks, they can say "Lookup [stock]" to populate the field and display the chart for the specified ticker for 30 days.
For dogs, saying "Load Dog Breed [Dog Breed Name]" opens the container displaying information about the specified dog breed.
Getting Started
Clone the repository.
Navigate to the project directory.
Open the index.html file in a web browser to view the website locally.
Credits
This project utilizes various APIs for fetching stock data, Reddit stock discussions, random dog pictures, and dog breed information.
Chart.js library is used for visualizing stock data.
Simple-Slider library is used for the carousel functionality.
Custom CSS stylings and buttons are implemented for enhanced user experience.
