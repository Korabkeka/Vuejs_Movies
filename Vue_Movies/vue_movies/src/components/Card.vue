<template>
    <div @click.stop.prevent="goToMovie" :movie="movie">
        <h1>{{movie.title}}</h1>
        <p>{{movie.runtime}} minutes</p>
        <p>{{movie.director}}</p>
        <img :src="movie.posterUrl" :alt="movie.title">
    </div>
</template>

<script>
export default {
    name: "Card",
    props: ["movie"],
    methods: {
        goToMovie(){
            this.$router.push({path: `/movies/${this.movie.id}`});
        }
    }
}
</script>