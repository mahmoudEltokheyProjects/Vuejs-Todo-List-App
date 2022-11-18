<template>
    <div class="colorBox toggleClass">
      <div class="colorBoxIcon" @click="toggleColorPalette">
        <i class="fa fa-cog fa-2x"></i> 
      </div>
      <!-- ++++++++++++++++++++++ ColorBox ++++++++++++++++++ -->
      <ul class="switch-colors">
        <li data-color="#b71540"  @click="updateColor"></li>
        <li data-color="#0c2461"  @click="updateColor"></li>
        <li data-color="#3c6382"  @click="updateColor"></li>
        <li data-color="#079992"  @click="updateColor"></li>
        <li data-color="#e58e26"  @click="updateColor"></li>
      </ul>
    </div>  
</template>

<script>

    export default 
    {
      name : "colorBox" ,
      methods:{
        // +++++++++++++++++++++++++++++ updateColor() Function +++++++++++++++++++++++++++++
        updateColor(e)
        { 
          this.color = e.target.getAttribute("data-color") ;
          document.documentElement.style.setProperty("--mainBk",this.color);
        } ,
        // +++++++++++++++++++++++++ toggleColorPalette() function +++++++++++++++++++++++++++++
        toggleColorPalette()
        {
            var colorBox = document.querySelector(".colorBox") ;
            if( colorBox.classList.contains("toggleClass")  )
            {
              colorBox.classList.remove("toggleClass");
            }   
            else
            {
              colorBox.classList.add("toggleClass");
            }
        }
      }
    }
</script>

<style>
:root{ --mainBk : #3598dc ;}
.colorBox
{
    position : fixed;
    top: 100px ;
    right: 0 ;
    display : flex;
    width : 265px ;
    height: 50px  ;
    overflow: hidden ;
    z-index: 3 ;
    transition : all 0.3s ease-in-out ;
    /* border : 2px solid #f00 ; */
}
.toggleClass
{
  right: -215px ;
}
/* +++++++++++++++++++ Left Part : Cog icon +++++++++++++++  */
.colorBox .colorBoxIcon
{
  color : #fff;
  padding: 10px ;
  height: 55px ;  
  background-color: #000 ;
  cursor: pointer ;
}
.colorBox .switch-colors
{
  width : 100% ;
  overflow: hidden ;
  list-style : none ;
  padding: 0 ;
  margin: 0 ;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* height: auto ; */
  background-color: #e2e2e2 ;
}
.colorBox .switch-colors li
{
  width: 20px ;
  height: 20px ;
  /* margin: 20px 10px ;   */
  cursor: pointer;
  background-color: #ddd;
}
  .colorBox .switch-colors li:first-child
  {
    background-color: #b71540;
  }  
  .colorBox .switch-colors li:nth-child(2)
  {
    background-color: #0c2461;
  }  
  .colorBox .switch-colors li:nth-child(3)
  {
    background-color: #3c6382;
  } 
  .colorBox .switch-colors li:nth-child(4)
  {
    background-color: #079992;
  } 
  .colorBox .switch-colors li:nth-child(5)
  {
    background-color: #e58e26 ;
  } 
  
</style>