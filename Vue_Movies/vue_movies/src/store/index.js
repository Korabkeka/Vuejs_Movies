import Vue from 'vue'
import Vuex from 'vuex'
import Router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],

  },
  getters: {

  },
  mutations: {
    GET_MOVIES_LIST(state, payload){
      state.movies = payload;
    }
  },
  actions: {
    async fetchFilms(){
      await fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(data => {
        this.commit('GET_MOVIES_LIST', data);
      });
    },
    async addFilm(context, payload){

      let testedId = this.state.movies.length;

      do{
        testedId++
        console.log(testedId);
      }while(this.state.movies.findIndex(el => el.id === testedId) != -1);

      let movie = {
        id: testedId,
        title: payload.title,
        year: payload.year,
        runtime: payload.runtime,
        genres: payload.genres,
        director: payload.director,
        actors: payload.actors,
        plot: payload.plot,
        posterUrl: payload.posterUrl
      }

      await fetch('http://localhost:3000/movies', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
      }).then(response => response.text())
      .then(data =>{
        console.log(data);
        Router.push({path: '/'});
      });
    },
    async modifyFilm(context, payload){
      try{
        await fetch(`http://localhost:3000/movies/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).then(response => response.text()).then(data => console.log(data));
      }catch(err){
        console.log(err)
      } 
    },
    async deleteFilm(context, payload){
      try{
        await fetch(`http://localhost:3000/movies/${payload}`, {
          method: 'DELETE'
        }).then(response => response.text())
        .then(data=> {
          console.log(data);
          Router.push({path: "/"});
        })
      }catch(err){
        console.log(err);
      }
    }
  },
  modules: {
  }
})
