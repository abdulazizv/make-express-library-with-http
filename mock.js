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
    console.log(req.headers);
    console.log(JSON.stringify(req.query));
    res.status(200).send("Hello world");
})

app.get("/file",(req,res) => {
    res.sendFile("./index.html");
})
app.post("/",async (req,res) => {
        const data = await getData("https://jsonplaceholder.typicode.com/users/1");
        const resp = {
            status:"OK",
            user:data
        }
        res.send(resp)
})
app.put("/",(req,res) => {
    const requestBody = req.body;
    res.json(requestBody);
})
app.delete("/users/:id",(req,res) => {
    // you can write anything after users/:${anything}
    // and console it console.log(req.params.anything);
    const userId = req.params.id;
    res.send(`Your user id is ${userId}`);
})
app.listen(PORT,() => {
    console.log(`Server running at ${PORT}`);
});
/*
req.body worked ✅
req.params worked ✅
req.query worked ✅
req.headers worked ✅
 */
// res.send("") worked ✅
// res.json([]) worked ✅
// res.status(200).json({}); worked ✅
// res.sendFile(path)