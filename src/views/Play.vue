<template>
  <!-- Botón de salir   -->
  <router-link to="/">
    <button class="buttonimg" >
      <img src="@/assets/atras.png" alt="Atrás">
    </button>
  </router-link>


  <div v-if="!alertaVisible">
    <h3 class="textoJugador">Jugador: {{ jugadorActual}}</h3>
    <h3 class="crono">Cronómetro: {{ minutos }}:{{ segundos }}</h3>
    <div >
      <form  class="nombres" @submit.prevent="comprobar">
      <label for="num" class="textinput">Escribe el numero en el que piensas: </label>
    <input v-model="ingresado" id="num" class="input" type="number" placeholder="Numero" min="1" max="100">

      <button type="submit" class="btn-enviar">Comprobar</button>
    </form>
    </div>
    <button class="btn-enviar" @click="pausar">Pausar</button>
  </div>


  <transition name="fade">
      <div v-if="alertaVisible" class="modal">
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
      tiempo: 1, 
      intervalo: null,
      alertaVisible: true,
      pausa: false,
      tiempoJugador1: 0,
      tiempoJugador2: 0, 
      jugadorActual: this.$route.query.nombre1, 
      numero: 1,
      ingresado: 1
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
        fetch (`http://localhost:3000/comprobar?a=${Number(this.numero)}&b=${Number(this.ingresado)}`)
        .then(res => res.json())
        .then(data => {
            
            respuesta = String(data.resultado)
            if (respuesta=="mayor"){
            alert("El numero es mayor")
        } else if(respuesta=="menor"){
            alert("el numero es menor")
        } else{
            alert("ganó")
            this.adivina()
        }
        })
        .catch(error => {
        console.error('Error:', error);
        });

        
        
    },
    adivina(){
        if(this.jugadorActual== this.$route.query.nombre1){
            this.tiempoJugador1= this.tiempo
            this.jugadorActual= this.$route.query.nombre2
            this.reiniciar()
            this.tiempo=10
            this.alertaVisible= !this.alertaVisible
            this.contador()
            this.obtenerNum()
           
            
            
        }else{
            this.tiempoJugador2= this.tiempo
            this.reiniciar()
            alert("terminar")
        }
    }
  }
}

</script>


