<template>

  <div class="modal fade" id="purchaseModal" tabindex="-1" >
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="savePurchase" novalidate :class="submitted ? 'was-validated':''">
          <div class="modal-header">
            <h5 class="modal-title">purchase Details</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-if="errorMessage">
              <strong>Error! </strong>{{errorMessage}}
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model="purchase.name"                      
                      type="text" 
                      id="name" 
                      name="name"
                      class="form-control" required/>
              <div class="invalid-feedback">
                Purchase name is required.
              </div>
            </div>
             <div class="form-group">
              <label for="price">Price</label>
              <input v-model="purchase.price"                      
                      type="number" 
                      min="1"
                      step="any"
                      id="price" 
                      name="price"
                      class="form-control" required/>
              <div class="invalid-feedback">
                Purchase price is required and should be greater then 0.
              </div>
            </div>
              <div class="form-group">
              <label for="type">Type</label>
              <select v-model="purchase.type"                      
                    
                      id="type" 
                      name="type"
                      class="custom-select" required>
                      <option value="" selected>Select Purchase Type</option>
                      <option v-for="(type,ind) in deviceTypes" :key="ind" :value="type" >{{type}}</option>
                      </select>
              <div class="invalid-feedback">
                Type is required .
              </div>
            </div>
             <div class="form-group">
              <label for="name">Color</label>
              <input v-model="purchase.color"                      
                      type="text" 
                      id="name" 
                      name="name"
                      class="form-control" required/>
              <div class="invalid-feedback">
                Purchase color is required.
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
import Purchase from "@/models/purchase";
import PurchaseService from "@/services/purchase.service";
import $ from 'jquery';


export default {
  name: "purchase-modal",
  props: {
    selectedPurchase: {type:Object},
  },
  data() {
    return {
      purchase: new Purchase(),
      errorMessage: "",
      submitted: false,
     
    };
  },
  methods: {
    savePurchase() {
      if(!this.purchase.name ){
        return;
      }
      PurchaseService.savePurchase(this.purchase)
        .then((response) => {
          //console.log(response.data);
          this.$emit('saved',response.data);
          $('#purchaseModal').modal('hide');
        })
        .catch((err) => {
          this.errorMessage = "Unexpected error occured.";
          console.log(err);
        });
    },
    showPurchaseModal(){
      this.purchase= Object.assign({},this.selectedPurchase);
    $('#purchaseModal').modal('show');
    }
  },
};
</script>

<style></style>
