<template>
  <router-link to="/">
    <button class="buttonimg" >
      <img src="@/assets/atras.png" alt="Atrás">
    </button>
  </router-link>
  
  <div class="historial">
    <h2>Historial</h2>
    <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Juego</th>
          <th>Intentos</th>
          <th>Tiempo</th>
          <th>Ganador</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in this.historial" :key="index">
          <td> {{ item.juego.jugador1.nombre }} - {{ item.juego.jugador2.nombre }}</td>
          <td>{{ item.juego.jugador1.intentos}} - {{ item.juego.jugador2.intentos}}</td>
          <td> {{ minutos(item.juego.jugador1.tiempo)}}:{{segundos(item.juego.jugador1.tiempo)}} - {{ minutos(item.juego.jugador2.tiempo)}}:{{segundos(item.juego.jugador2.tiempo)}}  </td>
          <td>{{ item.juego.ganador }}</td>
          
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  data() {
    return{
      historial: []
    }
    
  },
   mounted() {
    fetch('http://localhost:3000/historial')
      .then(res => res.json())
      .then(data => {
        this.historial = data;
      });
  },

  methods:{
     minutos(tiempo) {
      return String(Math.floor(tiempo / 60)).padStart(2, '0');
    },
    segundos(tiempo) {
      return String(tiempo % 60).padStart(2, '0');
    },
  }
}
</script>

