const { static } = require("express");
const WebSocket = require('ws');

const { SerialPort } = require('serialport')
const path = require("path");
const express = require("express");
const hbs =require("hbs");
const app =express();

const port =process.env.PORT || 80;


const staticPath= path.join(__dirname,"../public");
const template_Path= path.join(__dirname,"../template/views");
console.log(template_Path);
const partials_Path= path.join(__dirname,"../template/partials");
console.log(staticPath);
console.log(partials_Path);

app.set('view engine', 'hbs');
app.set('views', template_Path);
hbs.registerPartials(partials_Path);

app.use(express.static(staticPath));



// code for getting data of gnss----------------------------------------------------------------------------

// // create a new serial port instance
 const serialport = new SerialPort({ path: 'COM3', baudRate: 9600 })

// // // create a new WebSocket server instance
  const wss = new WebSocket.Server({ port: 8080 });

  let dataArray = ''

// // // Serial port opened and fetched data
   serialport.on('data', data => {
   dataArray += data.toString()


// //    // broadcast message to all connected clients
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
           client.send(JSON.stringify(message));
           
        }
        });
      
})

//  // Log the concatenated data every second
  setInterval(() => {
    console.log('------------------------------------------------')
    const lines = dataArray.split('\n') // Split the string into an array of lines
    lines.forEach(line => {
      
      const fields = line.split(',')//  Split the line into an array of fields
      const fifthData = fields[4]//  Access the 5th field (index 4)
      const eighthData = fields[7] // Access the 8th field (index 7)
      console.log('Received data - PRN:', fifthData, 'SNR:', eighthData, line)
    })
  }, 1000) // Add a closing parenthesis here

//-----------------------------------------------------------------------------------------------------

//routing
app.get("",(req,res)=>{
   res.render("index");
})

app.get("/about",(req,res)=>{
    res.render("about");
 })

 app.get("/weather",(req,res)=>{
    res.render("weather");
 })

 app.get("/covid",(req,res)=>{
   res.render("covid");
})
 app.get("/client",(req,res)=>{
   res.render("client");
})


 app.get("*",(req,res)=>{
    res.render("404error",{
        errormsg:"sorry page not found"
    });
 })
app.listen(port,()=>{
    console.log(`listening at the port no ${port}`);
})
