//setup .env path 
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'configs', '.env') });
//setup modules
const express = require('express');
const app = express();
const dbConnect = require('./util/database');
//setup server port number
const PORT = 3000 || process.env.PORT;
//serving static file 
app.use(express.static('public'));
//importing routes
const signUpRoute = require('./routes/signUpRoutes');
//handling routes 
app.use('/signup', signUpRoute);
//setup async IIFE function to run the server with database connection
(async () => {
    try {
        if (await dbConnect()) {
            app.listen(PORT, (err) => {
                if (!err) {
                    console.log(`server running on http://localhost:${PORT}`);
                } else {
                    console.log(err);
                }
            });
            console.log('db is connected');
        } else {
            console.log('database connection error');
        }
    } catch (err) {
        console.log(err);
    }
})();