<template>
  <div>
    <app-nav />
    <nuxt />
  </div>
</template>

<script>
import NavBarVue from '../components/NavBar.vue'
export default {
  components: {
    'appNav' : NavBarVue
  }
}
</script>

<style>

</style>
