<template>
 
  <div class="container">
    <div class="pt-5">

      <div class="alert alert-danger" v-if="errorMessage">
        {{errorMessage}}
      </div>
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>All Purchases</h3>
            </div>
            <div class="col-6 text-right">
              <button class="btn btn-primary" @click="createPurchaseRequest">Create Purchase</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Type</th>
                 <th scope="col">Color</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(purchase, ind) in purchaseList" :key="ind">
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ purchase.name }}</td>
                <td>{{ `$ ${purchase.price}` }}</td>
                <td>{{ purchase.type.categoryname }}</td>
                  <td>{{ purchase.color }}</td>
                <td>{{ new Date(purchase.purchaseTime).toLocaleDateString() }}</td>
                <td>
                  <button class="btn btn-primary mr-1" @click="editPurchaseRequest(purchase)">Edit</button>
                  <button class="btn btn-danger" @click="deletePurchaseRequest(purchase,ind)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <purchase-modal ref="purchaseModal" 
    :selected-purchase="selectedPurchase"
  @saved="purchaseSaved"/>
  <purchase-delete-confirm
  ref="purchaseDeleteModal"
  @confirmed="deletepurchase"/>
</template>

<script>

import purchaseService from "../services/purchase.service";
import PurchaseModal from "../components/Purchase.vue";
import PurchaseDeleteModel from"../components/PurchaseDeleteConfirm";
import Purchase from '@/models/purchase';
import { nextTick } from '@vue/runtime-core';
import PurchaseDeleteConfirm from '../components/PurchaseDeleteConfirm';
export default {
  name: "purchases",
  components: { PurchaseModal,PurchaseDeleteConfirm },

  data() {
    return {
      purchaseList: [],
      selectedPurchase: new Purchase(), 
      errorMessage:'',
      selectedIndex:undefined,
    };
  },
  mounted() {
    purchaseService.getAllPurchaseItems().then((response) => {
      this.purchaseList = response.data;
    });
  },
  methods:{
    createPurchaseRequest(){
      this.selectedPurchase=new Purchase();
      nextTick( ()=>{
          this.$refs['purchaseModal'].showPurchaseModal();
      });
          
    },
    editPurchaseRequest(purchase){
      this.selectedPurchase= Object.assign({},purchase);
        nextTick( ()=>{
          this.$refs['purchaseModal'].showPurchaseModal();
      });
    },   
    deletePurchaseRequest(purchase,ind){
      this.selectedPurchase=purchase;
      this.selectedIndex=ind;
       nextTick( ()=>{
          this.$refs['purchaseDeleteModal'].showDeleteModel();
      });
    },                      
    purchaseSaved(purchase){
      const itemIndex=this.purchaseList.findIndex(item=>item.id===purchase.id);
      if(itemIndex!==-1){
        this.purchaseList[itemIndex]=purchase;
      }else{
        this.purchaseList.push(purchase);
      }
     
    },
    deletepurchase(){
      purchaseService.deletepurchase(this.selectedPurchase).then(()=>{
        this.purchaseList.splice(this.selectedIndex,1);
      }).catch((err)=>{
        this.errorMessage='Unexpected error occured.';
        console.log(err);
      });
    },
  }
};
</script>

<style></style>
