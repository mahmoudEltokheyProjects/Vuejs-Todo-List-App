<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav m-auto mb-2 mb-lg-0">
                    <li class="nav-item  ms-5 ">
                        <router-link  class="nav-link" to="/contact">Contact</router-link>
                    </li>
                    <li class="nav-item me-5">
                        <router-link class="nav-link"  aria-current="page" to="/tasks">Tasks</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default 
    {
        methods : {
            
        }
    }
</script>

<style>
    
</style>