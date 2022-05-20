<template>

  <div class="modal fade" id="deviceModal" tabindex="-1" >
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="saveDevice" novalidate :class="submitted ? 'was-validated':''">
          <div class="modal-header">
            <h5 class="modal-title">Device Details</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-if="errorMessage">
              <strong>Error! </strong>{{errorMessage}}
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model="device.name"                      
                      type="text" 
                      id="name" 
                      name="name"
                      class="form-control" required/>
              <div class="invalid-feedback">
                Device name is required.
              </div>
            </div>
             <div class="form-group">
              <label for="price">Price</label>
              <input v-model="device.price"                      
                      type="number" 
                      min="1"
                      step="any"
                      id="price" 
                      name="price"
                      class="form-control" required/>
              <div class="invalid-feedback">
                Device price is required and should be greater then 0.
              </div>
            </div>
                <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="device.description"                      
                    
                      id="description" 
                      name="description"
                      class="form-control" required></textarea>
              <div class="invalid-feedback">
                description is required .
              </div>
            </div>
                 <div class="form-group">
              <label for="type">Type</label>
              <select v-model="device.deviceType"                      
                    
                      id="type" 
                      name="type"
                      class="custom-select" required>
                      <option value="" selected>Select Device Type</option>
                      <option v-for="(type,ind) in deviceTypes" :key="ind" :value="type" >{{type.categoryname}}</option>
                      </select>
              <div class="invalid-feedback">
                Type is required .
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
import Device from "@/models/device";
import category from "@/models/category";
import DeviceType from "@/models/device-type";
import DeviceService from "@/services/device.service";
import CategoryService from "../services/category.service";
import $ from 'jquery';


export default {
  name: "device-modal",
  props: {
    selectedDevice: {type:Object},
  },
  data() {
    return {
      device: new Device(),
      category:new category(),
      errorMessage: "",
      submitted: false,
      deviceTypes: [
      ],
    };
  },
   mounted() {
    CategoryService.getAllCategories().then((response) => {
      this.deviceTypes = response.data;
      console.log("list des produits cat",this.deviceTypes);
    });
  },
  methods: {
    
    saveDevice() {
       console.log("here is cateeee",this.device);
      if(!this.device.name || !this.device.description || !this.device.price || !this.device.deviceType){
        
        return;
      }
      DeviceService.saveDevice(this.device,this.device.deviceType)
        .then((response) => {
         
          //console.log(response.data);
          this.$emit('saved',response.data);
          $('#deviceModal').modal('hide');
        })
        .catch((err) => {
          this.errorMessage = "Unexpected error occured.";
          console.log(err);
        });
    },
    showDeviceModal(){
      this.device= Object.assign({},this.selectedDevice);
    $('#deviceModal').modal('show');
    }
  },
};
</script>

<style></style>
