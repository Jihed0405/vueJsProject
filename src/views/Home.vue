<template>
  <div class="container p-3">
    <div v-if="errorMessage" class="alert alert-danger">
        {{errorMessage}}
    </div>
    <div v-if="infoMessage" class="alert alert-success">
      {{infoMessage}}
    </div>
    <div class="d-flex flex-wrap">
      <div 
        v-for="(device, ind) in deviceList "  :key="ind" 
        class="card m-3" style="widh: 300px; background-color:#f6f6f6;">
        <div class="card-body">
          <h5 class="card-title text-uppercase">{{device.name}}</h5>
          <h6 class="card-subtitle text-muted">{{device.description}}</h6>
        </div>
        <div class="row mt-2 p-3">
          <div class="col-6 mt-2 pl-4"> 
            {{`$ ${device.price}`}}
          </div>
          <div class="col-6"><button class="btn btn-outline-success" @click="purchase(device)">
            Buy</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceService from "@/services/device.service";
import vuex from 'vuex';
import Purchase from '@/models/purchase';
import PurchaseService from '../services/purchase.service';
export default {
  name: "home",
  data(){
    return {
      deviceList:[],
      errorMessage:'',
      infoMessage:'',
    };

  },
  computed:{
    ...vuex.mapGetters(['currentUser']),
  }, 
  mounted(){
    DeviceService.getAllDevices().then((response)=>{
      this.deviceList=response.data;
    });
  },
  methods:{
    purchase(device){
        if(!this.currentUser?.id){
          this.errorMessage="you should log in to buy a device";
          return;
        }
        const purchase=new Purchase(this.currentUser.id,device.id,device.price,'black');
        PurchaseService.savePurchase(purchase).then(()=>{
          this.infoMessage="Purchase is completed.";
        }).catch((err)=>{
          this.errorMessage="Unexpected error occured.";
          console.log(err);
        })
    },
  },
};
</script>

<style></style>
