<script>
import { RouterLink, RouterView } from 'vue-router'
import NavbarComp from './components/NavbarComp.vue'
import ColorBoxComp from './components/ColorBoxComp.vue';
import BottomUpBtn from './components/BottomUpBtn.vue';

export default {
  components : { NavbarComp , ColorBoxComp , BottomUpBtn}
}
</script>


<template>
 
  <NavbarComp/>
  <ColorBoxComp/>
  <RouterView />
  <BottomUpBtn/>
</template>

<style scoped>

</style>
