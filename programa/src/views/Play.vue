<template>
  <!-- Botón de salir   -->
  <router-link to="/">
    <button class="buttonimg" >
      <img src="@/assets/atras.png" alt="Atrás">
    </button>
  </router-link>


  <div v-if="!alertaVisible && !pausa">
    <h3 class="textoJugador">Jugador: {{ jugadorActual}}</h3>
    <h3 class="crono">Tiempo: {{ minutos }}:{{ segundos }}</h3>
    <h3 class="intentoRonda">Intento {{ intentos }}. Ronda {{ ronda }}/3.</h3>
    <div >
      <form  class="nombres" @submit.prevent="!adivino && !ingresado && comprobar()">
      <label  for="num" class="textinput">Escribe el numero en el que piensas: </label>
    <input v-model="numIngresado" id="num" class="input" type="number" placeholder="Numero" min="1" max="100">

      <button type="submit" class="btn-enviar">Comprobar</button>
    </form>
    <textarea id="logs" class="logs" rows= "15" resize= "none" readonly :value="logs.join('\n')"></textarea>
    </div>
    <button class="btn-enviar" @click="pausar">Pausar</button>
  </div>

  <div>
    
    
  </div>

  <transition name="fade">
      <div v-if="alertaVisible " class="modal">
        <div class="modal-content">
          <h3>Alerta</h3>
          <p>Turno de: {{ jugadorActual }}</p>
          <p>El juego empieza en: {{tiempo}}</p>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="pausa" class="modal">
        <div class="modal-content">
          <h3>Alerta</h3>
          <p>Juego en Pausa</p>
          <button class="btn-enviar" @click="iniciar">Reanudar</button>
        </div>
        
      </div>
    </transition>

    <transition name="fade">
      <div v-if="ingresado " class="modal">
        <div class="modal-content">
          <h3>Info</h3>
          <p>El numero es {{ estado }}</p>
          <button class="btn-enviar" @click="cerrarAlerta">OK</button>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="adivino" class="modal">
        <div class="modal-content">
          <h3>Info</h3>
          <p>Has acertado el numero</p>
          <p>Espera</p>
        </div>
      </div>
    </transition>
  <Credito/>
</template>


<script>
import Credito from '../components/credito.vue';


export default {
  name: 'PlayPage',
  components: {
    Credito
  },
  data() {
    return {
      tiempo: 5, 
      intentos: 1,
      ronda: 1,
      intervalo: null,
      alertaVisible: true,
      numIngresado:0,
      ingresado: false,
      pausa: false,
      adivino: false,
      nombre1: this.$route.query.nombre1,
      nombre2: this.$route.query.nombre2,
      intentosJugador1: [],
      intentosJugador2: [],
      tiempoJugador1: [],
      tiempoJugador2: [], 
      jugadorActual: this.$route.query.nombre1, 
      numero: 1,
      estado: "",
      logs: []
    }
  },
  computed: {
    minutos() {
      return String(Math.floor(this.tiempo / 60)).padStart(2, '0');
    },
    segundos() {
      return String(this.tiempo % 60).padStart(2, '0');
    },

    },
    mounted() {
        
    this.obtenerNum();   
    
    this.contador();
    },
  methods: {
    pausar(){
        this.pausa=!this.pausa
        this.detener()
    },
    contador(){
        if (!this.intervalo) {
            this.intervalo = setInterval(() => {
          if (this.tiempo > 0) {
            this.tiempo--;
          } else {
            this.alertaVisible= !this.alertaVisible
            this.reiniciar();
            this.pausa= !this.pausa
            this.iniciar();
          }
        }, 1000);
    }
    },
    iniciar() {
      if (!this.intervalo) {
        this.intervalo = setInterval(() => {
          this.tiempo++;
        }, 1000);
      }
      if(!this.alertaVisible) this.pausa=!this.pausa
    },
    detener() {
      
      clearInterval(this.intervalo);
      this.intervalo = null;
    },
    reiniciar() {
      this.tiempo = 0;
      this.detener();
    },
    obtenerNum(){
        fetch(`http://localhost:3000/numero`)
        .then(res => res.json())
        .then(data => {
            console.log(data.numero)
            this.numero =data.numero 
        })
        .catch(error => {
        console.error('Error:', error);
        });
    },
    comprobar(){
        let respuesta;
        fetch (`http://localhost:3000/comprobar?a=${Number(this.numero)}&b=${Number(this.numIngresado)}`)
        .then(res => res.json())
        .then(async data => {
            
            respuesta = String(data.resultado)
            console.log(respuesta)
            if(respuesta==="igual"){
              this.adivino= !this.adivino
              await this.adivina()
              this.logs=[]
              this.estado= respuesta
            } else{
              this.logs.push(`El numero es ${respuesta} que ${this.numIngresado}`)
              this.intentos++
              this.ingresado= !this.ingresado
              this.estado= respuesta
            }
        })
        .catch(error => {
        console.error('Error:', error);
        });

        
        
    },
    async adivina(){
      if(this.ronda==3 && this.jugadorActual== this.$route.query.nombre2 ){
            this.tiempoJugador2.push(this.tiempo)
            this.intentosJugador2.push(this.intentos)
            this.reiniciar()
            
            this.$router.push({ name: 'Final', query: { nombre1: this.nombre1, nombre2: this.nombre2, 
              tiempo1: this.tiempoJugador1, tiempo2: this.tiempoJugador2, 
              intentos1: this.intentosJugador1, intentos2: this.intentosJugador2} })
      }
      else if(this.jugadorActual== this.$route.query.nombre1 ){
            this.detener()
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.adivino= !this.adivino
            this.tiempoJugador1.push(this.tiempo)
            this.intentosJugador1.push(this.intentos)
            this.reiniciar()
            this.intentos=1
            this.jugadorActual= this.nombre2
            this.tiempo=3
            this.alertaVisible= !this.alertaVisible
            this.contador()
            this.obtenerNum()
           
            
            
        }else{
            this.detener()
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.adivino= !this.adivino
            this.tiempoJugador2.push(this.tiempo)
            this.intentosJugador2.push(this.intentos)
            this.reiniciar()
            this.intentos=1
            this.jugadorActual= this.nombre1
            this.ronda++
            this.tiempo=3
            this.alertaVisible= !this.alertaVisible
            this.contador()
            this.obtenerNum()
        }
    },
    cerrarAlerta(){
      this.ingresado= false
    },
  }
}

</script>


