<template>
  <div>
        <h1> Bienvenido a Batalla de Numeros</h1>
    </div>
    <div>
        <router-link to="/game">
            <button class="button">Jugar</button>
        </router-link>
        <router-link to="/historial">
           <button class="button" >Historial</button>
        </router-link>
       
    </div>
  <Credito/>
</template>

<script>
import Credito from '../components/credito.vue';

export default {
  name: 'HomePage',
  components: {
    Credito
  }
}
</script>