<template>

  <div class="modal fade" id="customerModal" tabindex="-1" >
    <div class="modal-dialog">
      <div class="modal-content">
          <form @submit.prevent="saveCustomer" novalidate :class="submitted ? 'was-validated':''">
          <div class="modal-header">
            <h5 class="modal-title">customer Details</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-if="errorMessage">
              <strong>Error! </strong>{{errorMessage}}
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model="customer.name"                      
                      type="text" 
                      id="name" 
                      name="name"
                      class="form-control" required/>
              <div class="invalid-feedback">
                Customer name is required.
              </div>
            </div>
             <div class="form-group">
              <label for="description">Adress</label>
              <textarea v-model="customer.address"                      
                    
                      id="address" 
                      name="address"
                      class="form-control" required></textarea>
              <div class="invalid-feedback">
                Customer Adress is required .
              </div>
            </div>
            <div class="form-group">
              <label for="description">Phone</label>
              <textarea v-model="customer.phone"                      
                    
                      id="phone" 
                      name="phone"
                      class="form-control" required></textarea>
              <div class="invalid-feedback">
                Customer Phone is required .
              </div>
            </div>
            <div class="form-group">
              <label for="description">Details</label>
              <textarea v-model="customer.details"                      
                    
                      id="details" 
                      name="details"
                      class="form-control" required></textarea>
              <div class="invalid-feedback">
                Customer Details is required .
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
import Customer from "@/models/customer";
import CustomerService from "@/services/customer.service";
import $ from 'jquery';


export default {
  name: "customer-modal",
  props: {
    selectedCustomer: {type:Object},
  },
  data() {
    return {
      customer: new Customer(),
      errorMessage: "",
      submitted: false,
     
    };
  },
  methods: {
    saveCustomer() {
      if(!this.customer.name ){
        return;
      }
      CustomerService.saveCustomer(this.customer)
        .then((response) => {
          //console.log(response.data);
          this.$emit('saved',response.data);
          $('#customerModal').modal('hide');
        })
        .catch((err) => {
          this.errorMessage = "Unexpected error occured.";
          console.log(err);
        });
    },
    showCustomerModal(){
      this.customer= Object.assign({},this.selectedCustomer);
    $('#customerModal').modal('show');
    }
  },
};
</script>

<style></style>
