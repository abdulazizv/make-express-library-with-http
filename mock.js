const express = require("./express");
const app = express();
const PORT = 3000;
app.use(() => {})
app.get("/",(req,res) => {})
app.post("/",(req,res) => {})
app.put("/",(req,res) => {})
app.delete("/",(req,res) => {})
app.listen(PORT,() => {});
/*
req.body
req.params
req.query
req.headers
 */
res.send("")
res.json([])
res.status(200).json({});
res.sendFile(path)