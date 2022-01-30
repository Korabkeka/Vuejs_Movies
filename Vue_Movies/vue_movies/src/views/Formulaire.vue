<template>
    <div>
        <p>Veuillez remplir correctement chaques champs car je n'ai pas eu le temps de faire de validation =)</p>
        <p>
            <label for="title">Titre:</label>
            <input type="text" name="title" id="title" v-model="title">
        </p>
        <p>
            <label for="year">Année:</label>
            <input type="number" name="year" id="year" v-model="year">
        </p>
        <p>
            <label for="runtime">Durée:</label>
            <input type="number" name="runtime" id="runtime" v-model="runtime">
        </p>
        <p>
            <label for="genre">Genres:</label>
            <input type="text" name="genre" id="genre" v-model="genres">
        </p>
        <p>
            <label for="director">Réalisateur:</label>
            <input type="text" name="director" id="director" v-model="director">
        </p>
        <p>
            <label for="actors">Acteurs:</label>
            <input type="text" name="actors" id="actors" v-model="actors">
        </p>
        <p>
            <label for="plot">Résumé:</label>
            <input type="text" name="plot" id="plot" v-model="plot">
        </p>
        <p>
            <label for="posterUrl">Affiche du film:</label>
            <input type="text" name="posterUrl" id="posterUrl" v-model="posterUrl">
        </p>
        <p>
            <button @click="postMovie">poster</button>
        </p>
    </div>
</template>

<script>
export default {
    name: "Formulaire",
    data(){
        return{
            title : null,
            year: null,
            runtime: null,
            genres: null,
            director: null,
            actors: null,
            plot: null,
            posterUrl: null
        }
    },
    computed: {
        genreArray(){
            if(this.genres.includes(',')){
                return this.genres.trim().split(',');
            }else{
                return this.genres.split(" ");
            }
        }
    },
    methods: {
        postMovie(){
            let movie = {
                title: this.title,
                year: this.year,
                runtime: this.runtime,
                genres: this.genreArray,
                director: this.director,
                actors: this.actors,
                plot: this.plot,
                posterUrl: this.posterUrl
            }
            this.$store.dispatch('addFilm', movie);
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>