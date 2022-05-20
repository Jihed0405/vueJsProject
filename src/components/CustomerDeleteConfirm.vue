<template>
  <div class="modal fade" id="CustomerdeleteModal" tabindex="-1" >
    <div class="modal-dialog">
      <div class="modal-content">
<div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button>
          </div>
           <div class="modal-body">
               Are you sure to delete the selected Customer?
           </div>
            <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
            <button class="btn btn-danger" type="submit" @click="deletecustomer">I'm sure!</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
 name:'Customer-delete-modal',
 methods:{
     showDeleteModel(){
    $('#CustomerdeleteModal').modal('show');
     },
     deletecustomer(){
         this.$emit('confirmed');
    $('#CustomerdeleteModal').modal('hide');
     },
 },
};
</script>

<style>

</style>