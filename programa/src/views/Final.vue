<template>

    <router-link to="/">
    <button class="buttonimg" >
      <img src="@/assets/casa.png" alt="Atrás">
    </button>
  </router-link>
  
    <div id="empate" v-if="empate" class="resultado">
        <h1>El juego ha resultado en un empate</h1>
    </div>
    <div v-if="!empate" class="resultado">
        <h1>El ganador es: {{ganador}}
            <br> Felicidades!
        </h1>
    </div>

<div class="rondas">
  <div class="ronda">
    <h3>Ronda 1</h3>
    <div class="jugadores">
      <div class="jugador">
        <p>Jugador: {{ nombre1 }}</p>
        <p>Intentos: {{ intentosJugador1[0] }}</p>
        <p>Tiempo: {{ minutos(tiempoJugador1[0]) }}:{{ segundos(tiempoJugador1[0]) }}</p>
      </div>
      <div class="jugador">
        <p>Jugador: {{ nombre2 }}</p>
        <p>Intentos: {{ intentosJugador2[0] }}</p>
        <p>Tiempo: {{ minutos(tiempoJugador2[0]) }}:{{ segundos(tiempoJugador2[0]) }}</p>
      </div>
    </div>
  </div>

  <div class="ronda">
    <h3>Ronda 2</h3>
    <div class="jugadores">
      <div class="jugador">
        <p>Jugador: {{ nombre1 }}</p>
        <p>Intentos: {{ intentosJugador1[1] }}</p>
        <p>Tiempo: {{ minutos(tiempoJugador1[1]) }}:{{ segundos(tiempoJugador1[1]) }}</p>
      </div>
      <div class="jugador">
        <p>Jugador: {{ nombre2 }}</p>
        <p>Intentos: {{ intentosJugador2[1] }}</p>
        <p>Tiempo: {{ minutos(tiempoJugador2[1]) }}:{{ segundos(tiempoJugador2[1]) }}</p>
      </div>
    </div>
  </div>

  <div class="ronda">
    <h3>Ronda 3</h3>
    <div class="jugadores">
      <div class="jugador">
        <p>Jugador: {{ nombre1 }}</p>
        <p>Intentos: {{ intentosJugador1[2] }}</p>
        <p>Tiempo: {{ minutos(tiempoJugador1[2]) }}:{{ segundos(tiempoJugador1[2]) }}</p>
      </div>
      <div class="jugador">
        <p>Jugador: {{ nombre2 }}</p>
        <p>Intentos: {{ intentosJugador2[2] }}</p>
        <p>Tiempo: {{ minutos(tiempoJugador2[2]) }}:{{ segundos(tiempoJugador2[2]) }}</p>
      </div>
    </div>
  </div>

  <div class="ronda">
    <h3>Totales</h3>
    <div class="jugadores">
      <div class="jugador">
        <p>Jugador: {{ nombre1 }}</p>
        <p>Intentos: {{sumarArreglo(intentosJugador1) }}</p>
        <p>Tiempo: {{ minutos(sumarArreglo(tiempoJugador1)) }}:{{ segundos(sumarArreglo(tiempoJugador1)) }}</p>
      </div>
      <div class="jugador">
        <p>Jugador: {{ nombre2 }}</p>
        <p>Intentos: {{ sumarArreglo(intentosJugador2) }}</p>
        <p>Tiempo: {{ minutos(sumarArreglo(tiempoJugador2)) }}:{{ segundos(sumarArreglo(tiempoJugador2)) }}</p>
      </div>
    </div>
  </div>

</div>


    <Credito/>
</template>

<script>
import Credito from '@/components/credito.vue';


export default {
  name: 'FinalPage',
  components: {
    Credito
  },
  data() {
    return {
      nombre1: this.$route.query.nombre1,
      nombre2: this.$route.query.nombre2,
      tiempoJugador1: this.$route.query.tiempo1,
      tiempoJugador2: this.$route.query.tiempo2,
      intentosJugador1: this.$route.query.intentos1,
      intentosJugador2: this.$route.query.intentos2,
      ganador: "",
      empate: false,
      ruta:"http://localhost:3000/"
    }
    
  },
  async mounted(){
    await this.getGanador()
    this.guardar()
  },
  
  methods: {
    minutos(tiempo) {
      return String(Math.floor(tiempo / 60)).padStart(2, '0');
    },
    segundos(tiempo) {
      return String(tiempo % 60).padStart(2, '0');
    },
    async getGanador(){
        await fetch(`${this.ruta}ganador?nombre1=${this.nombre1}&nombre2=${this.nombre2}&tiempo1=${this.sumarArreglo(this.tiempoJugador1)}&tiempo2=${this.sumarArreglo(this.tiempoJugador2)}&intentos1=${this.sumarArreglo(this.intentosJugador1)}&intentos2=${this.sumarArreglo(this.intentosJugador2)}`)
        .then(res => res.json())
        .then(data => {
            if(data.ganador!="Empate") {this.ganador = data.ganador}
            else{
                this.ganador= data.ganador 
                this.empate = true
            }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    },
    sumarArreglo(tiempos){
        let suma = 0
        tiempos.forEach( tiempo =>{
            suma=suma+ Number(tiempo)
        })
        return suma
    },

    guardar(){
        
        const datos = {
        nombre1: this.nombre1,
        nombre2: this.nombre2,
        intentosJugador1: this.sumarArreglo(this.intentosJugador1),
        intentosJugador2: this.sumarArreglo(this.intentosJugador2),
        tiempoJugador1: this.sumarArreglo(this.tiempoJugador1),
        tiempoJugador2: this.sumarArreglo(this.tiempoJugador2),
        ganador: this.ganador
        };

        fetch('http://localhost:3000/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
        })
        .then(res => res.json())
        .then(respuesta => console.log(respuesta.mensaje))
        .catch(err => console.error(err));
            }
        }
}
</script>