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


app.get('/comprobar', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  let resultado;
  if (a > b) {
    resultado = "mayor";
  } else if (a < b) {
    resultado = "menor";
  } else {
    resultado = "igual";
  }
  res.json({ resultado: resultado });
});
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



