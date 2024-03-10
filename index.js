import express from "express";
import fs from 'fs';
import { format } from "date-fns";

const app = express();
const PORT = 4000;  // http://localhost:4000/grtProducts

app.get('/', (req, res) => {
  // res.status(200).json({ message: 'hai my dear team, we will become a FSD Developer' }) 
  res.status(200).send(`<div style = "background-color:red; color:white " > <h1>   </h1> </div>`)
})

app.get('/get-data', (req, res) => {
  res.status(200).json({ message: "data", data: { name: "hello world" } })
})

// app.get('/write', (req, res) => {
//   let today = format(new Date(), 'dd-mm-yyyy-HH-mm-ss')
//   console.log(('today', today));
//   const filePath = `TimeStamp/${today}.txt`
//   fs.writeFileSync(filePath, `${today}`, 'utf8')
//   let data = fs.readFileSync(filePath, 'utf8')
//   res.status(200).send(data)
// })

app.get('/write', async (req, res) => {

  try {

    let today = format(new Date(), 'dd-mm-yyyy-HH-mm-ss')
    console.log(('today', today));
    const filePath = `TimeStamp/${today}.txt`
    await fs.writeFileSync(filePath, `${today}`, 'utf8')
    res.status(200).send(`File ${today}.txt created successfully`)

  } catch (error) {

    console.error('Error:', error);
    res.status(500).send('Internal Server Error');

  }

})

app.get('/read/:today', async (req, res) => {
  try {
    const { today } = req.params;
    const filePath = `./TimeStamp/${today}.txt`
    const data = fs.readFileSync(filePath, 'utf8');
    res.status(200).send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error);
  }
})

// let data = fs.readFileSync(filePath , 'utf8')
// res.status(200).send(data)

app.listen(PORT, () => {
  console.log(`App is running in the port  ${PORT}`);
}) // running


