<template>

  <div class="modal fade" id="categoryModal" tabindex="-1" >
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="saveCategory" novalidate :class="submitted ? 'was-validated':''">
          <div class="modal-header">
            <h5 class="modal-title">Category Details</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-if="errorMessage">
              <strong>Error! </strong>{{errorMessage}}
            </div>
            <div class="form-group">
              <label for="categoryname">Name</label>
              <input v-model="category.categoryname"                      
                      type="text" 
                      id="categoryname" 
                      name="categoryname"
                      class="form-control" required/>
              <div class="invalid-feedback">
                Categoey name is required.
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
import Category from "@/models/category";
import CategoryService from "@/services/category.service";
import $ from 'jquery';


export default {
  name: "category-modal",
  props: {
    selectedCategory: {type:Object},
  },
  data() {
    return {
      category: new Category(),
      errorMessage: "",
      submitted: false,
     
    };
  },
  methods: {
    saveCategory() {
      if(!this.category.categoryname ){
        return;
      }
      CategoryService.saveCategory(this.category)
        .then((response) => {
          //console.log(response.data);
          this.$emit('saved',response.data);
          $('#categoryModal').modal('hide');
        })
        .catch((err) => {
          this.errorMessage = "Unexpected error occured.";
          console.log(err);
        });
    },
    showCategoryModal(){
      this.category= Object.assign({},this.selectedCategory);
    $('#categoryModal').modal('show');
    }
  },
};
</script>

<style></style>
