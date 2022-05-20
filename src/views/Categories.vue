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
              <h3>All Categories</h3>
            </div>
            <div class="col-6 text-right">
              <button class="btn btn-primary" @click="createCategryRequest">Create Category</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category, ind) in categoriesList" :key="ind">
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ category.categoryname }}</td>
               
                <td>
                  <button class="btn btn-primary mr-1" @click="editCategoryRequest(category)">Edit</button>
                  <button class="btn btn-danger" @click="deleteCategoryRequest(category,ind)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <category-modal ref="categoryModal" 
    :selected-category="selectedCategory"
  @saved="categorySaved"/>
  <category-delete-confirm
  ref="CategoryDeleteModal"
  @confirmed="deleteCategory"/>
</template>

<script>

import CategoryService from "../services/category.service";
import CategoryModal from "../components/Category.vue";
import CategoryDeleteConfirm from"../components/CategoryDeleteConfirm.vue";
import Category from '@/models/category';
import { nextTick } from '@vue/runtime-core';

export default {
  name: "categories",
  components: { CategoryModal,CategoryDeleteConfirm },

  data() {
    return {
      categoriesList: [],
      selectedCategory: new Category(), 
      errorMessage:'',
      selectedIndex:undefined,
    };
  },
  mounted() {
    CategoryService.getAllCategories().then((response) => {
      this.categoriesList = response.data;
    });
  },
  methods:{
    createCategryRequest(){
      this.selectedCategory=new Category();
      nextTick( ()=>{
          this.$refs['categoryModal'].showCategoryModal();
      });
          
    },
    editCategoryRequest(category){
      this.selectedCategory= Object.assign({},category);
        nextTick( ()=>{
          this.$refs['categoryModal'].showCategoryModal();
      });
    },   
    deleteCategoryRequest(category,ind){
      this.selectedCategory=category;
      this.selectedIndex=ind;
       nextTick( ()=>{
          this.$refs['CategoryDeleteModal'].showDeleteModel();
      });
    },                      
    categorySaved(category){
      const itemIndex=this.categoriesList.findIndex(item=>item.id===category.id);
      if(itemIndex!==-1){
        this.categoriesList[itemIndex]=category;
      }else{
        this.categoriesList.push(category);
      }
     
    },
    deleteCategory(){
      CategoryService.deleteCategory(this.selectedCategory).then(()=>{
        this.categoriesList.splice(this.selectedIndex,1);
      }).catch((err)=>{
        this.errorMessage='Unexpected error occured.';
        console.log(err);
      });
    },
  }
};
</script>

<style></style>
