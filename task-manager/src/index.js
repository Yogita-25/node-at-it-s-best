const app = require('./app');
const env = require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server is up on port ', port);
});

