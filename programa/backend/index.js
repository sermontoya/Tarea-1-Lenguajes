const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs =require("fs") 

app.use(cors());

app.use(express.json());

app.get('/numero', (req, res) => {
    let num = Math.floor(Math.random() * 100) + 1;
    res.json({ numero: num });
});

app.get('/elegirJ', (req, res) => {
    let num = Math.floor(Math.random() * 2);
    res.json({ numero: num });
});

app.get('/ganador', (req, res) => {
    let tiempo1= req.query.tiempo1;
    let tiempo2= req.query.tiempo2
    let intentos1= Number(req.query.intentos1)
    let intentos2 = Number(req.query.intentos2)
    let jugador1= req.query.nombre1
    let jugador2= req.query.nombre2
    let ganador=""
  
    if(intentos1<intentos2){ganador=jugador1}
    else if(intentos1>intentos2){ ganador=jugador2}
    else{
      if(tiempo1<tiempo2) {ganador= jugador1; }
      else if(tiempo1>tiempo2) {ganador= jugador2}
      else{ ganador="Empate"}
    }
    
    
    res.json({ ganador: ganador });
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

app.post('/guardar', (req, res) => {
  const data = req.body;

  const jsonFinal = {
     juego: {
      jugador1: {
        nombre: data.nombre1,
        intentos: data.intentosJugador1,
        tiempo: data.tiempoJugador1
      },
      jugador2: {
        nombre:data.nombre2,
        intentos: data.intentosJugador2,
        tiempo: data.tiempoJugador2
      },
      ganador: data.ganador
    }
  };

  fs.readFile("historial.json", 'utf8', (err, contenido) => {
    if (err) return res.status(500).send({ mensaje: 'Error al leer el archivo' });

    let juegos = JSON.parse(contenido); 
    juegos.push(jsonFinal);
    fs.writeFile("historial.json", JSON.stringify(juegos, null, 2), (err) => {
      if (err) return res.status(500).send({ mensaje: 'Error al guardar' });
      res.send({ mensaje: 'Juego agregado correctamente' });
    });
  });
})

app.get('/historial', (req, res) => {
  fs.readFile("historial.json", 'utf8', (err, contenido) => {
    if (err) {
      return res.status(500).send({ mensaje: 'Error al leer historial' });
    }

    try {
      const juegos = JSON.parse(contenido);
      res.json(juegos);
    } catch (parseErr) {
      res.status(500).send({ mensaje: 'Error al parsear historial' });
    }
  });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



