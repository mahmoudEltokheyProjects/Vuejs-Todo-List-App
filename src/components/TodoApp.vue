<style scoped>
  .cursor-pointer
  {
    cursor : pointer
  }
  .finished
  {
    text-decoration : line-through ;
  }
</style>

<template>
  <div class="container">
    <h2 class="text-center mt-5">Vue Todo-List App</h2>
    <!-- inputFields -->
    <div class="d-flex mt-3">
      <input v-model="task" type="text" class="form-control rounded-0" id="input1Id" placeholder="Enter Task">
      <button @click="submitTask" class="btn btn-warning rounded-0 ms-4">Submit</button>
    </div>
    <!-- Table -->
    <table class="table  table-bordered mt-3">
      <thead>
        <tr  class="text-center">
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="(task,index) in tasks" :key="index">
          <td>
            <span :class="{'finished' : task.status == 'finished'}">{{task.name}}</span>
          </td>
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
          <td>
            <div class="text-center"   @click='editTask(index)'>
              <span class="fa fa-pen  cursor-pointer"></span>
            </div>
          </td>
          <td>
            <div class="text-center"  @click='deleteTask(index)'>
              <span class="fa fa-trash  cursor-pointer"></span>
            </div>
          </td>
        </tr> 
      </tbody>
    </table>
  </div>
</template>

<script>
  export default
  {
    name : "todo" ,
    data()
    {
      return {
          task : '' ,
          editedTask : null ,
          availableStatuses : [ 'to-do' , 'in-progress' , 'finished'],
          tasks : [ 
          {
            name : "Steal banana from the store." ,
            status : "to-do"
          } ,
          {
            name : "Eat 1kg chocolate in 1 hour." ,
            status : "in-progress"
          }
        ]
      }
    } ,
    methods : 
    {
      // ++++++++++++++++++++ Add() Task ++++++++++++++++++++
      submitTask()
      {
        if( this.task.length == 0 )
        {
          return ;
        }
        if( this.editedTask == null )
        {
          this.tasks.push({
            name : this.task ,
            status : "to-do"
          });
        }
        else
        {
          // When "Edit Task" , Take the "inputField value" and assign it as "name" of "Selected task"
          this.tasks[this.editedTask].name = this.task ;
          // Reset the value of "editedTask" variable
          this.editedTask = null ;
        }
        // After Add new task , Clean inputField
        this.task = ''
      } ,
      // ++++++++++++++++++++ Delete() Task ++++++++++++++++++++
      deleteTask(index)
      {
        console.log(index);
        this.tasks.splice(index,1);
      } ,
      // ++++++++++++++++++++ Update() Task ++++++++++++++++++++
      editTask(index)
      {
        // put the "name" of "selected task" in "inputField"
         this.task = this.tasks[index].name; 
         this.editedTask = index ;
      } ,
      // ++++++++++++++++++++ Update() Status ++++++++++++++++++++
      changeStatus(index)
      {
        let newIndex = this.availableStatuses.indexOf( this.tasks[index].status );
        if( ++newIndex > 2 ) newIndex = 0 ;
        this.tasks[index].status = this.availableStatuses[newIndex];
      }, 
      // +++++++++++++ firstCharUpper() : Make "First character" of String is "UpperCase" +++++++++++++
      firstCharUpper(strVar)
      {
        return strVar.charAt(0).toUpperCase() + strVar.slice(1);
      }
    }
  }
</script>
