<template>

  <div class="modal fade" id="supplierModal" tabindex="-1" >
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="saveSupplier" novalidate :class="submitted ? 'was-validated':''">
          <div class="modal-header">
            <h5 class="modal-title">supplier Details</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-if="errorMessage">
              <strong>Error! </strong>{{errorMessage}}
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model="supplier.name"                      
                      type="text" 
                      id="name" 
                      name="name"
                      class="form-control" required/>
              <div class="invalid-feedback">
                Supplier name is required.
              </div>
            </div>
             <div class="form-group">
              <label for="description">Adress</label>
              <textarea v-model="supplier.address"                      
                    
                      id="address" 
                      name="address"
                      class="form-control" required></textarea>
              <div class="invalid-feedback">
                Supplier Adress is required .
              </div>
            </div>
            <div class="form-group">
              <label for="description">Phone</label>
              <textarea v-model="supplier.phone"                      
                    
                      id="phone" 
                      name="phone"
                      class="form-control" required></textarea>
              <div class="invalid-feedback">
                Supplier Phone is required .
              </div>
            </div>
            <div class="form-group">
              <label for="description">Details</label>
              <textarea v-model="supplier.details"                      
                    
                      id="details" 
                      name="details"
                      class="form-control" required></textarea>
              <div class="invalid-feedback">
                Supplier Details is required .
              </div>
            </div>
             
            

          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
            <button class="btn btn-primary" type="submit" @click="submitted = true">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Supplier from "@/models/supplier";
import SupplierService from "@/services/supplier.service";
import $ from 'jquery';


export default {
  name: "supplier-modal",
  props: {
    selectedSupplier: {type:Object},
  },
  data() {
    return {
      supplier: new Supplier(),
      errorMessage: "",
      submitted: false,
     
    };
  },
  methods: {
    saveSupplier() {
      if(!this.supplier.name ){
        return;
      }
      SupplierService.saveSupplier(this.supplier)
        .then((response) => {
          //console.log(response.data);
          this.$emit('saved',response.data);
          $('#supplierModal').modal('hide');
        })
        .catch((err) => {
          this.errorMessage = "Unexpected error occured.";
          console.log(err);
        });
    },
    showSupplierModal(){
      this.supplier= Object.assign({},this.selectedSupplier);
    $('#supplierModal').modal('show');
    }
  },
};
</script>

<style></style>
