# restaurants-geofinder

## how to start app

    1. Download the repo 

    2. Run npm install command on terminal to install all packages 

    3. add .env file to the root directory

        a. Add mongoURI variable wich has <your username in mongodb>:<your password>

        b. Add JWT_SECRET variable in .env file 

    4. now run the 'node index.js' command.

### Your app is running now 

## To upload the data in database

    1. Open Mongo DB compass and create  collection named restaurants inside Geo-resto database

    2. Click on import and select the file named 'restaurantData.json' from root directory

    3. Add index named "address.coord" and give type 2dsphere

## Test the app 

    1. Open postman 

    2. Import postman collection provided in the root directory inside it

    3. Test the app, replace token and data if needed.