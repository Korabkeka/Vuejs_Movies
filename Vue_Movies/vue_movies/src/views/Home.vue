<template>
  <div class="home">
    <label for="search">rechercher par titre:</label>
    <input type="text" name="searchBar" id="searchBar" v-model="searchBar">
    <button @click.stop.prevent="changeFilter">filtrer par {{filterBy}}</button>
    <button @click.stop.prevent="changeOrder">par ordre {{filterOrder}}</button>

    <card v-for="movie in filteredMovies" :movie="movie" :key="movie.id"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// @ is an alias to /src
import Store from '../store'
import Card from '../components/Card.vue'

export default {
  name: 'Home',
  components: {
    Card
  },
  data(){
    return{
      searchBar: "",
      filterBy: "titre",
      filterOrder: "croissant"
    }
  },
  beforeCreate(){
    Store.dispatch("fetchFilms");
  },
  computed: {
    ...mapState(["movies"]),
    searchedMovies(){
      if(this.searchBar.length > 0){
        let toLower = this.searchBar.toLowerCase();
        let filterMovies = [...this.movies].filter(movie => movie.title.toLowerCase().includes(`${toLower}`));
        return filterMovies;
      }else{
        return [...this.movies];
      }   
    },
    filteredMovies(){
      let filtered = [...this.searchedMovies];

      if(this.filterBy === "titre"){
        if(this.filterOrder === "croissant"){
          return filtered.sort((a,b)=> a.title.localeCompare(b.title));
        }
        if(this.filterOrder === "décroissant"){
          return filtered.sort((a,b)=> b.title.localeCompare(a.title));
        }
      }
      
      if(this.filterBy === "année"){
        if(this.filterOrder === "croissant"){
          return filtered.sort((a,b)=> parseInt(a.year) - parseInt(b.year));
        }
        if(this.filterOrder === "décroissant"){
          return filtered.sort((a,b)=> parseInt(b.year) - parseInt(a.year));
        }
      }
      return filtered;
    }
  },
  methods: {
    changeFilter(){
      this.filterBy = this.filterBy === "titre" ? "année" : "titre";
    },
    changeOrder(){
      this.filterOrder = this.filterOrder === "croissant" ? "décroissant" : "croissant";
    }

  }

}
</script>
