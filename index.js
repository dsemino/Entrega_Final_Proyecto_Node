import express from "express"

const app = express();
app.get("/",(req,res) => {
    res.send("Bienvenido al servidor de prueba!!!")
});

app.get("/ping",(req,res) => {
    res.send("/Pong");
});

const PORT = 3000;

app.listen(PORT,() => console.log(`http://localhost:${PORT}`));