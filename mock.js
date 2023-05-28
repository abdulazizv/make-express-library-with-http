const express = require("./express");
const app = express();
const PORT = 3000;

const getData = async (url) => {
    const response = await fetch(url)
    const json = await response.json()

    return json;
}

// app.use(() => {})
app.get("/",(req,res) => {
    return res.status(200).send("Hello world");
})
app.post("/",async (req,res) => {
        const data = await getData("https://jsonplaceholder.typicode.com/users/1");
        const resp = {
            status:"OK",
            user:data
        }
        res.send(JSON.stringify(data))
})
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