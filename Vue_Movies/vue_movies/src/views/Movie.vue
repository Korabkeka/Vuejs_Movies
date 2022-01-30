<template>
    <div>
        <p>
            <button v-if="modifying" @click="deleteMovie">Supprimer</button>
            <button v-else>modifier</button>
        </p>
        <div>
            <label v-if="modifying" for="title">Titre: </label>
            <input v-if="modifying" type="text" name="title" id="title" v-model="movie.title">
            <h1 v-else>{{movie.title}}</h1>
        </div>
        <div>
            <label v-if="modifying" for="year">Année de sortie</label>
            <input v-if="modifying" type="number" name="year" id="year" v-model="movie.year">
            <p v-else>Année de sortie: {{movie.year}}</p>
        </div>
        <div>
            <label v-if="modifying" for="runtime">Durée: </label>
            <input v-if="modifying" type="number" name="runtime" id="runtime" v-model="movie.runtime">
            <p v-else>Durée: {{movie.runtime}} minutes</p>
        </div>
        <div>
            <label v-if="modifying" for="genres">Genres: </label>
            <input v-if="modifying" type="text" name="genres" id="genres" v-model="movie.genres">
            <ul v-else>
            Genres:
                <li v-for="(genre, index) in movie.genres" :key="index" >{{genre}}</li>
            </ul>
        </div>
        <div>
            <label v-if="modifying" for="director">Réalisateur: </label>
            <input v-if="modifying" type="text" name="director" id="director" v-model="movie.director">
            <p v-else>Réalisateur: {{movie.director}}</p>
        </div>
        <div>
            <label v-if="modifying" for="actors">Acteurs: </label>
            <input v-if="modifying" type="text" name="actors" id="actors" v-model="movie.actors">
            <p v-else>Acteurs: {{movie.actors}}</p>
        </div>
        <div>
            <label v-if="modifying" for="plot">Résumé: </label>
            <input v-if="modifying" type="text" name="plot" id="plot" v-model="movie.plot">
            <p v-else>Résumé: {{movie.plot}}</p>
        </div>
        <div>
            <label v-if="modifying" for="posterUrl">Url de l'image: </label>
            <input v-if="modifying" type="text" name="posterUrl" id="posterUrl" v-model="movie.posterUrl">
            <img v-else :src="movie.posterUrl" :alt="movie.title">
        </div>
        <p>
            <button v-if="modifying" @click.stop.prevent="modifyMovie">modifier</button>
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Movie',
    data(){
        return{
            movie: "",
            modifying: true
        }
    },
    computed: {
        ...mapState(['movies'])
    },
    created(){
        this.movie = this.movies.find(el => el.id == this.$route.params.id);
        console.log(this.movie);
    },
    methods: {
        modifyMovie(){
            this.$store.dispatch('modifyFilm', this.movie);
            this.modifying = false;
        },
        deleteMovie(){
            this.$store.dispatch('deleteFilm', this.movie.id);
        }
    }
}
</script>