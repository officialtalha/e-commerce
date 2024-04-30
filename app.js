//setup .env path 
const path = require('path');
const dotEnv = require('dotenv').config({ path: path.join(__dirname, 'configs', '.env') });
//setup modules
const express = require('express');
const app = express();
//setup server port number
const PORT = 3000 || process.env.PORT;

//setup async IIFE function to run the server 
(async () => {
    try {
        app.listen(PORT, (err) => {
            if (!err) {
                console.log(`server running on http://localhost:${PORT}`);
            }
        });
    } catch (err) {
        console.log(err);
    }
})();