<template>
  <div class="container">
    <div class="pt-5">
      <div class="alert alert-danger" v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>All Customers</h3>
            </div>
            <div class="col-6 text-right">
              <button class="btn btn-primary" @click="createCustomerRequest">
                Create Customer
              </button>
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
              <tr v-for="(customer, ind) in customerList" :key="ind">
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ customer.name }}</td>
                 <td>{{ customer.address}}</td>
                <td>{{ customer.phone }}</td>
                <td>{{customer.details }}</td>
                <td>
                  <button
                    class="btn btn-primary mr-1"
                    @click="editCustomerRequest(customer)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger"
                    @click="deleteCustomerRequest(customer, ind)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <customer-modal
    ref="customerModal"
    :selected-customer="selectedCustomer"
    @saved="customerSaved"
  />
  <customer-delete-confirm
    ref="customerDeleteModal"
    @confirmed="deletecustomer"
  />
</template>

<script>
import CustomerService from "../services/customer.service";
import CustomerModal from "../components/Customer";
import CustomerDeleteConfirm from "../components/CategoryDeleteConfirm.vue";
import Customer from "@/models/customer";
import { nextTick } from "@vue/runtime-core";

export default {
  name: "customers",
  components: { CustomerModal, CustomerDeleteConfirm },

  data() {
    return {
      customerList: [],
      selectedCustomer: new Customer(),
      errorMessage: "",
      selectedIndex: undefined,
    };
  },
  mounted() {
    CustomerService.getAllCustomer().then((response) => {
      this.customerList = response.data;
    });
  },
  methods: {
    createCustomerRequest() {
      this.selectedCustomer = new Customer();
      nextTick(() => {
        this.$refs["customerModal"].showCustomerModal();
      });
    },
    editCustomerRequest(customer) {
      this.selectedCustomer = Object.assign({}, customer);
      nextTick(() => {
        this.$refs["customerModal"].showCustomerModal();
      });
    },
    deleteCustomerRequest(customer, ind) {
      this.selectedCustomer = customer;
      this.selectedIndex = ind;
      nextTick(() => {
        this.$refs["customerDeleteModal"].showDeleteModel();
      });
    },
    customerSaved(customer) {
      const itemIndex = this.customerList.findIndex(
        (item) => item.id === customer.id
      );
      if (itemIndex !== -1) {
        this.customerList[itemIndex] = customer;
      } else {
        this.customerList.push(customer);
      }
    },
    deletecustomer() {
      CustomerService.deletecustomer(this.selectedCustomer)
        .then(() => {
          this.customerList.splice(this.selectedIndex, 1);
        })
        .catch((err) => {
          this.errorMessage = "Unexpected error occured.";
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
