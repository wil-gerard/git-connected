const axios = require('axios');

async function run(){ 
    const response = await axios.get('http://localhost:8000');
    console.log(response.status);
}


run();