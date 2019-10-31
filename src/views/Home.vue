<template>
    <div class="home">
        <Navbar />
        <Hero />
        <Products />

    </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue"
import Products from "@/sections/Products.vue"
import Login from "@/components/Login.vue"

export default {
    name: "home",
    components: {
        Hero,
        Products,
    }
};
</script>
