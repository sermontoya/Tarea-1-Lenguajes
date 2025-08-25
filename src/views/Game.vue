<template>
  <!-- Botón de retroceso   -->
  <router-link to="/">
    <button class="buttonimg" >
      <img src="@/assets/atras.png" alt="Atrás">
    </button>
  </router-link>

  <div class="nombres">
    <form class="nombres" @submit.prevent="jugar">
      <label for="Nombre1" class="textinput">Escribe el nombre del jugador 1:</label>
      <input v-model="nombre1" id="Nombre1" class="input" type="text" placeholder="Escribe aquí el nombre..." maxlength="15">

      <label for="Nombre2" class="textinput">Escribe el nombre del jugador 2:</label>
      <input v-model="nombre2" id="Nombre2" class="input" type="text" placeholder="Escribe aquí el nombre..." maxlength="15">

      <button type="submit" class="btn-enviar">Jugar</button>
    </form>
  </div>

    <transition name="fade">
      <div v-if="alertaVisible" class="modal">
        <div class="modal-content">
          <h3>Error</h3>
          <p>Escribe los nombres de ambos jugadores</p>
          <button class="btn-enviar" @click="cerrarAlerta">OK</button>
        </div>
      </div>
    </transition>

    

  <div>

  </div>
  

  <Credito/>
</template>


<script>
import Credito from '../components/credito.vue';

export default {
  name: 'GamePage',
  components: {
    Credito
  },
  data() {
    return {
      nombre1: "",
      nombre2: "",
      alertaVisible: false,
      ruta:"http://localhost:3000/"
    }
  },
  methods: {
    async ordenJugadores(){
        await fetch(`${this.ruta}elegirJ`)
        .then(res => res.json())
        .then(data => {
            if(data.numero){
              
              const temp = this.nombre1;
              this.nombre1 = this.nombre2;
              this.nombre2 = temp;
              
            }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    },
    async jugar() {
      if(this.nombre1.trim()=="" || this.nombre2.trim()==""){
        this.alertaVisible= !this.alertaVisible;
      }
      else{
        await this.ordenJugadores();
        this.$router.push({ name: 'Play', query: { nombre1: this.nombre1, nombre2: this.nombre2 } })
      }
    },
    cerrarAlerta() {
      this.alertaVisible = false;
    }
  }
}
</script>



