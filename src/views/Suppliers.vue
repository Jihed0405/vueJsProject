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
              <h3>All Suppliers</h3>
            </div>
            <div class="col-6 text-right">
              <button class="btn btn-primary" @click="createSupplierRequest">Create Supplier</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Adress</th>
                <th scope="col">Phone</th>
                <th scope="col">Details</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(supplier, ind) in supplierList" :key="ind">
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ supplier.name }}</td>
                <td>{{ supplier.address}}</td>
                <td>{{ supplier.phone }}</td>
                <td>{{supplier.details }}</td>
                <td>
                  <button class="btn btn-primary mr-1" @click="editSupplierRequest(supplier)">Edit</button>
                  <button class="btn btn-danger" @click="deleteSupplierRequest(supplier,ind)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <supplier-modal ref="supplierModal" 
    :selected-supplier="selectedSupplier"
  @saved="supplierSaved"/>
  <supplier-delete-confirm
  ref="supplierDeleteModal"
  @confirmed="deletesupplier"/>
</template>

<script>

import SupplierService from "../services/supplier.service";
import SupplierModal from "../components/Supplier";
import SupplierDeleteConfirm from '../components/SupplierDeleteConfirm';
import Supplier from '@/models/supplier';
import { nextTick } from '@vue/runtime-core';

export default {
  name: "suppliers",
  components: { SupplierModal,SupplierDeleteConfirm },

  data() {
    return {
      supplierList: [],
      selectedSupplier: new Supplier(), 
      errorMessage:'',
      selectedIndex:undefined,
    };
  },
  mounted() {
    SupplierService.getAllSupplier().then((response) => {
      this.supplierList = response.data;
    });
  },
  methods:{
    createSupplierRequest(){
      this.selectedSupplier=new Supplier();
      nextTick( ()=>{
          this.$refs['supplierModal'].showSupplierModal();
      });
          
    },
    editSupplierRequest(supplier){
      this.selectedSupplier= Object.assign({},supplier);
        nextTick( ()=>{
          this.$refs['supplierModal'].showSupplierModal();
      });
    },   
    deleteSupplierRequest(supplier,ind){
      this.selectedSupplier=supplier;
      this.selectedIndex=ind;
       nextTick( ()=>{
          this.$refs['supplierDeleteModal'].showDeleteModel();
      });
    },                      
    supplierSaved(supplier){
      const itemIndex=this.supplierList.findIndex(item=>item.id===supplier.id);
      if(itemIndex!==-1){
        this.supplierList[itemIndex]=supplier;
      }else{
        this.supplierList.push(supplier);
      }
     
    },
    deletesupplier(){
      supplierService.deletesupplier(this.selectedSupplier).then(()=>{
        this.supplierList.splice(this.selectedIndex,1);
      }).catch((err)=>{
        this.errorMessage='Unexpected error occured.';
        console.log(err);
      });
    },
  }
};
</script>

<style></style>
