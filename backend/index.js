const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());


// Ruta POST de ejemplo
app.get('/numero', (req, res) => {
    let num = Math.floor(Math.random() * 100) + 1;
    res.json({ numero: num });
});


app.post("/comprobar",)
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



