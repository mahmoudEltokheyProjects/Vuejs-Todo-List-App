<style scoped>
  :root
  {
    --mainBk : #3598dc ;
  }
  h2 
  { 
    margin-top: 80px !important ;
    margin-bottom: 21px !important ;
  }
  .parent
  {
    height: 100%;
    color: #fff;
    background-color: var(--mainBk);
  }
</style>

<template>
  <div class="parent">
    <div class="container py-1">
      <!-- ++++++++++++++++++++++++ header ++++++++++++++++ -->
      <h2 class="text-center">Vue Form Validation App</h2>
      <!-- =========================== inputFields =========================== -->
      <form @submit="validateForm" method="get"  action="/tasks">
        <!-- ++++++++++++++++ Errors Container ++++++++++++++++ -->
        <div class="errors-list">
          <div class="alert alert-danger" role="alert" v-for = "(error,index) in formErrors" :key="index">
            {{ error }}
          </div>
        </div>
        <!-- ++++++++++++++++ Username inputField ++++++++++++++++ -->
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Username</label>
          <input type="text" class="form-control" v-model="username">
        </div>
        <!-- ++++++++++++++++ Password inputField ++++++++++++++++ -->
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <div class="password d-flex w-100">
            <input :type="passwordType" class="form-control" v-model="password">
            <div class="ms-3" @click="switchPassword">
              <button class="btn btn-danger text-white" :disabled=" !password " type="button">{{showHidePassBtn}}</button>
            </div> 
          </div>
        </div>
        <!-- ++++++++++++++++ Subject inputField ++++++++++++++++ -->
        <div class="mb-3">
          <label for="exampleInputSubject" class="form-label">Subject</label>
          <input type="text" class="form-control" v-model="subject">
        </div>
        <!-- ++++++++++++++++ Message Textarea ++++++++++++++++ -->
        <div class="mb-3">
          <label for="textarea" class="form-label">Message</label>
          <textarea class="form-control" id="textarea" rows="3" v-model="textarea"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mb-5">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default
  {
    name : "todo" ,
    data()
    {
      return {
          formErrors : [ ] ,
          username : null ,
          subject : null ,
          password : null ,
          showHidePassBtn : "show",
          passwordType : "password" ,
          message : null ,
          maxChar : 10 
      }
    },
    methods : 
    {
      /* ++++++++++++++++++++ validateForm() Function ++++++++++++++++++++ */
      validateForm(e)  
      {
        // Make "formError" array is "Empty" in the "beignning of Form" To start fresh
        this.formErrors = [] ;
        // 1- Check if "username" is "Empty"
        if( !this.username )
        {
          this.formErrors.push("Username Can't be Empty");
        }
        // 2- Check if "subject" is "Empty"
        if( !this.subject )
        {
          this.formErrors.push("Subject Can't be Empty");
        }
        // 3- Check if "password" is "Empty"
        if( !this.password )
        {
          this.formErrors.push("Password Can't be Empty");
        }
        // 4- Check if "Number" of "Username" character is greater than "maxChar" or not
        if( this.username && this.username.length > this.maxChar )
        {
          this.formErrors.push(`username Can't Be More Than ${this.maxChar} characters`);
        } 
        // 5- If "No Errors" Return "True"
        if( !this.formErrors.length  )
        {
          return true ;
        }
        e.preventDefault();
      } ,
      // +++++++++++++++++++++++++++++ switchPassword() Function +++++++++++++++++++++++++++++
      switchPassword()
      {
        if( this.password.length && this.passwordType == "text")
        {
          this.passwordType = "password" ;
          this.showHidePassBtn = "Show";
        }
        else
        {
          this.passwordType = "text" ;
          this.showHidePassBtn = "Hide";
        }
      } 
    }
  }
</script>
