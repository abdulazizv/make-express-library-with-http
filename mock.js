const express = require("./express");
const app = express();
const PORT = 3000;
// app.use(() => {})
app.get("/",(req,res) => {
    return res.status(200).send("Hello world");

})
// app.post("/",(req,res) => {})
// app.put("/",(req,res) => {})
// app.delete("/",(req,res) => {})
app.listen(PORT,() => {
    console.log("Server running at 3000 port")
});
/*
req.body
req.params
req.query
req.headers
 */
// res.send("")
// res.json([])
// res.status(200).json({});
// res.sendFile(path)