<template>
  <div class="bottomUpBtn">
    <i class="fa fa-arrow-up fa-2x"></i>
  </div>
</template>

<script>
export default {
  name : 'bottomUpBtn' ,
  mounted()
  {
      var upBtn = document.querySelector(".bottomUpBtn");
      document.addEventListener("scroll",function(){
          if( scrollY >= 50 )
          {
              upBtn.style.opacity = 1 ;
              console.log(upBtn);
          }
          else
          {
              upBtn.style.opacity = 0 ;   
              console.log("Fail");
          }
      });
      upBtn.addEventListener("click",function(){
          window.scrollTo(0,0);	
      });
  }
}
</script>

<style>
    .bottomUpBtn
    {
      opacity: 0 ;
      position: fixed ;
      bottom: 2% ;
      right: 1% ;
      border: none ;
      outline: none ;
      color: #fff ;
      background-color: #222 ;
      padding: 10px ;
      border-radius: 10px ;
      font-weight: normal ;
      cursor: pointer;
      transition: all 0.3s ease-in-out ;
    }
    .bottomUpBtn:hover
    {
      background-color: #ccc ;
      color: #000 ;
    }
</style>