<style scoped>
  :root
  {
    --mainBk : #000 ;
  }
  table
  {
    background-color: var(--mainBk);
    color: #fff;
  }
  h2
  {
    margin-top: 80px !important;
  }
  .cursor-pointer
  {
    cursor : pointer
  }
  .finished
  {
    text-decoration : line-through ;
  }
  button
  {
      width : 150px  ;
  }
  /* +++++++++++++++++++++++++ Transition Style +++++++++++++++++++ */
  .bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<template>
  <div class="container">
    <h2 class="text-center">Vue Todo-List App</h2>
    <!-- inputFields -->
    <div class="d-flex mt-5">
      <input v-model="task" type="text" @focus="hideAlerts()" class="form-control rounded-0 shadow-none" id="input1Id" placeholder="Enter Task">
      <button @click="submitTask" class="btn btn-warning rounded-0 ms-4 text-white">{{submitBtn}}</button>
      <button @click="deleteAll" class="btn btn-danger rounded-0 ms-4" v-if="tasks.length > 1">Delete All</button>
    </div>
    <!-- Table -->
    <table class="table  table-bordered mt-3">
      <!-- --------------------------- Table Header --------------------------- -->
      <thead>
        <tr  class="text-center">
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <!-- --------------------------- Table Body --------------------------- -->
      <tbody class="text-center">
        <tr v-for="(task,index) in tasks" :key="index">
          <!-- +++++++++++++++++ Task Name  +++++++++++++++++ -->
          <td>
            <span :class="{'finished' : task.status == 'finished'}">{{task.name}}</span>
          </td>
          <!-- +++++++++++++++++ Task Status +++++++++++++++++ -->
          <td>
            <span @click="changeStatus(index)" class="cursor-pointer" 
                  :class="{
                    'text-danger' : task.status == 'to-do' ,
                    'text-warning' : task.status == 'in-progress' ,
                    'text-success' : task.status == 'finished'
                    }"> 
              {{ firstCharUpper(task.status) }} 
            </span> 
          </td>
          <!-- ++++++++++++++++++++++ Edit Button ++++++++++++++++++++++ -->
          <td>
            <div class="text-center"   @click='editTask(index)'>
              <span class="fa fa-pen  cursor-pointer"></span>
            </div>
          </td>
          <!-- ++++++++++++++++++++++ Delete Button ++++++++++++++++++++++ -->
          <td>
            <div class="text-center"  @click='deleteTask(index)'>
              <span class="fa fa-trash  cursor-pointer"></span>
            </div>
          </td>
        </tr> 
      </tbody>
    </table>
    <!-- ++++++++++++++++++++++ "Task Added" Message ++++++++++++++++++++++ -->
    <Transition name="bounce">
      <div class="alert alert-success" v-if="addTaskFlag">Task is Added !</div>
    </Transition>
    <!-- ++++++++++++++++++++++ "Task Updated" Message ++++++++++++++++++++++ -->
    <Transition name="bounce">
      <div class="alert alert-warning" v-if="updateTaskFlag">Task is Updated !</div>
    </Transition>
    <!-- ++++++++++++++++++++++ "Task Deleted" Message ++++++++++++++++++++++ -->
    <Transition name="bounce">
      <div class="alert alert-danger" v-if="deleteTaskFlag">Task is Deleted !</div>
    </Transition>
    <!-- ++++++++++++++++++++++ "All Tasks Deleted" Message ++++++++++++++++++++++ -->
    <Transition name="bounce">
      <div class="alert alert-danger" v-if="deleteAllTaskFlag">All Task are Deleted !</div>
    </Transition>
  </div>
</template>

<script>
  export default
  {
    name : "todo" ,
    data()
    {
      return {
          submitBtn : "Add" ,
          task : '' ,
          editedTask : null ,
          availableStatuses : [ 'to-do' , 'in-progress' , 'finished'],
          tasks : [ 
          {
            name : "" ,
            status : ""
          } 
        ] ,
        addTaskFlag    : false ,
        updateTaskFlag : false ,
        deleteTaskFlag : false ,
        deleteAllTaskFlag : false 
      }
    } ,
    /* ++++++++++++++++++++++++++++++++++ Save Data in "Local Storage"  ++++++++++++++++++++++++++++++++++ */
    watch : 
    {
      handler() 
      {
        /*  Get Data from "tasks array" and assign it to "Local Storage"  */
        localStorage.setItem('Tasks',JSON.stringify(this.tasks))
      }
    } ,
    /* +++++++++++++++++++++++++ Load data from local storage +++++++++++++++++++++++++ */
    /* mounted() is lifecycle hook that’s executed after Vue instance has been created */
    mounted() 
    {
      /* 1- if "localStorage" has "data" then put them in "tasks Array" */
      if (localStorage.getItem("Tasks"))
      {
        /*  Get Data from "Local Storage" and assign it to "tasks array"  */
        this.tasks = JSON.parse(localStorage.getItem("Tasks"))
      }
      /* 2- else make "tasks Array" empty */
      else
      {
          this.tasks = [] ;
      }
    },
    methods : 
    {
      /* ++++++++++++++++++++ Add() Task ++++++++++++++++++++ */
      submitTask()  
      {
        /* Make the innerHtml of "submit button" equal "Add" */
        this.submitBtn = "Add" ;
        if( this.task.length == 0 )
        {
          // Hide "Add Task" Alert
          this.addTaskFlag = false ; 
          // Exit From Loop
          return ;
        }
        if( this.editedTask == null )
        {
          this.tasks.push({
            name : this.task ,
            status : "to-do"
          });
          this.addTaskFlag = true ; 
        }
        else
        {
          /* When "Edit Task" , Take the "inputField value" and assign it as "name" of "Selected task" */
          this.tasks[this.editedTask].name = this.task ;
          /* Reset the value of "editedTask" variable */
          this.editedTask = null ;
          // Show "Updated Task" Alert
          this.updateTaskFlag = true ; 
        }
        /* After Add new task , Clean inputField */
        this.task = '' ;
        /* ========================== Save LocalStorage ========================== */
        /* Store "Tasks object" in "Local storage" to "keep data" from "losing" when "page reload" */
        localStorage.setItem("Tasks", JSON.stringify(this.tasks) );
      } ,
      /* ++++++++++++++++++++ Delete() Task ++++++++++++++++++++ */
      deleteTask(index)
      {
        // 1- Delete "task" with index="index"
        this.tasks.splice(index,1);
        /* 2- Delete the "task" From "LocalStorage" , Through Storing The "Array After Delete task" in "localStorage" */
        localStorage.Tasks = JSON.stringify(this.tasks) ;
        // Show "Delete Task" Alert
         this.deleteTaskFlag = true ; 
        // hide "Updated Task" Alert
        this.updateTaskFlag = false ; 
        // hide "add Task" Alert
        this.addTaskFlag = false ; 
      } ,
      /* ++++++++++++++++++++ deleteAll() Task ++++++++++++++++++++ */
      deleteAll()
      {
        // 1- Delete All "tasks"
        this.tasks = [] ;
        /* 2- Delete the "task" From "LocalStorage" , Through Storing The "Array After Delete task" in "localStorage" */
        localStorage.Tasks = JSON.stringify(this.tasks) ;
         // Show "Delete All Task" Alert
         this.deleteAllTaskFlag = true ; 
        // hide "Delete Task" Alert
        this.deleteTaskFlag = false ; 
        // hide "Updated Task" Alert
        this.updateTaskFlag = false ; 
        // hide "add Task" Alert
        this.addTaskFlag = false ; 
      } ,
      /* ++++++++++++++++++++ Update() Task ++++++++++++++++++++ */
      editTask(index)
      {
        /* Make the innerHtml of "submit button" equal "Update" */
        this.submitBtn = "Update" ;
        /* put the "name" of "selected task" in "inputField" */
        this.task = this.tasks[index].name; 
        this.editedTask = index ;
      } ,
       /* ++++++++++++++++++++ Update() Status ++++++++++++++++++++ */
      changeStatus(index)
      {
        let newIndex = this.availableStatuses.indexOf( this.tasks[index].status );
        if( ++newIndex > 2 ) newIndex = 0 ;
        this.tasks[index].status = this.availableStatuses[newIndex];
      }, 
      /* +++++++++++++ firstCharUpper() : Make "First character" of String is "UpperCase" +++++++++++++ */
      firstCharUpper(strVar)
      {
        return strVar.charAt(0).toUpperCase() + strVar.slice(1);
      } ,
      /* +++++++++++++ Hide All Alerts +++++++++++++ */
      hideAlerts()
      {
        this.addTaskFlag = false , 
        this.updateTaskFlag  = false , 
        this.deleteTaskFlag = false , 
        this.deleteAllTaskFlag = false 
      }
    }
  }
</script>
