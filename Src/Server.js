const express = require('express');
const dotenv = require("dotenv").config();
const path = require('path');
const Routes = require('./Routes');
const app = express();

// APP SET
app.set('json spaces', 2)
app.use(express.static(path.join(__dirname, 'public')));



// RENDER
function render() {
  Routes(app)
}


// SERVER START
app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}. Port Dinleniyor`);
  render();
  
});