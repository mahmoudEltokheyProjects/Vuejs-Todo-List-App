<style scoped>

</style>

<template>
  <div class="tasks">
    <TodoApp/>
  </div>
</template>

<script>
  import TodoApp from '../components/TodoApp.vue';
  export default 
  {
    name : "tasks" ,
    components : { TodoApp } ,
    mounted()
    {
      document.body.style.backgroundColor = localStorage.getItem("colorStorage") ; 
    } ,
    methods : 
    {

    }
  }
</script>