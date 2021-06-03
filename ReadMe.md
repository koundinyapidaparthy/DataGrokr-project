# This Project has two main files Client and Server

1. Client - Contains Front-End Part
2. Server - Contains Back-End and DataBase Part

# ❤️ Client

This is a Front end part. Used **React** To Build this

Here user provide his Contact details and he can Store them either in server or in LocalFile.

And Email, PhoneNumber, ZipCode Validations happen

## 🚀️ npm packages used in Client

**Styled-components** - To write CSS in JSX.

# ❤️ Server

This is a Backend and Database part. Used **Node.js, Express.js, Mongoose** To Build this

Here Also User details are Validate same as Client


👀️ **Fs** module in NodeJS Helps me to create a File To Store Contact Details In a LocalFile

👀️ Mongoose Help to create a Document in mongodb atlas to Store Contact Details in Database



## 🚀️ npm packages used in Server

**Express**- To create a fast server

**mongoose5.11 version** - To connect mongoose atlas

**dotenv**- To Secure My MongoDb keys.

# How it Works

When user clicked on **Submit** button front-end validate

* None of the input box is empty
* PhoneNumber validate according to Indians number Start with 6-9 and must contains 10 digits
* Email also validate according to regex value given
* ZipCode validate according to Indian zipcodes Start with 1-6 and must contains 6 digits

Then

According to storage medium value data goes to server links with the help of proxy

In server It again validate every input feild and serves the data into localfile or database acording to user selection in storage medium
