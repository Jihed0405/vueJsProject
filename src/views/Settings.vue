<template>
 
  <div class="container">
    
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>Settings</h3>
            </div>
            
          </div>
        </div>
     
      </div>
    </div>
 

 
</template>

<script>

import DeviceService from "../services/device.service";
import DeviceModal from "../components/Device";
import DeviceDeleteModel from"../components/DeviceDeleteConfirm";
import Device from '@/models/device';
import { nextTick } from '@vue/runtime-core';
import DeviceDeleteConfirm from '@/components/DeviceDeleteConfirm.vue';
export default {
  name: "users",
  components: { DeviceModal,DeviceDeleteConfirm },

}
</script>

<style></style>
