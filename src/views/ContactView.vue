<style scoped>
  :root{ --mainBk : #f00 ;}
  body
  {
    background-color: var(--mainBk);
  }
</style>

<template>
  <div class="contact">
    <FormValidation/>
  </div>
</template>

<script>
  import FormValidation from '../components/FormValidation.vue';

  export default
  {
    name : "contact"  ,
    components : { FormValidation },
    data()
    {
      
    } ,
    methods : 
    {
      
    }
  }

</script>