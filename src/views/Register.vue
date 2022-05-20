<template>
<div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <div v-if="errorMessage" class="alert alert-danger" style="width:83%">
        {{ errorMessage }}
      </div>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm  @submit.prevent="handleRegister"
        novalidate
        :class="submitted ? 'was-validated' : ''">
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                 <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput v-model="formData.name"
            type="text"
            id="name"
            class="form-control"
            name="name"
            placeholder="Full Name"
            required />
             <div class="invalid-feedback">Full name is required.</div>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput v-model="formData.username"
            type="text"
            id="username"
            class="form-control"
            name="username"
            placeholder="Username"
            required />
             <div class="invalid-feedback">Username is required.</div>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput  v-model="formData.email" id="email"
            name="email" type="email" placeholder="name@example.com"  required />
                   <div class="invalid-feedback">Email is required.</div>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="formData.password"
            type="password"
            id="password"
            class="form-control"
            name="password"
            placeholder="Passsword"
            required
                  />
                   <div class="invalid-feedback">Password is required.</div>
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                  v-model="formData.passwordConfirm"
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                    required
                  />
                   <div class="invalid-feedback">Confrim password is required.</div>
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="success"  @click="submitted = true"
          :disabled="loading" type="submit">Create Account</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
 
</template>

<script>
import User from "../models/user";
import vuex from "vuex";
import AuthenticationService from "../services/authentication.service";
export default {
  name: "register",
  data() {
    return {
      formData: new User(),
      loading: false,
      submitted: false,
      errorMessage: "",
    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),
  },
  mounted() {
    if (this.currentUser?.username) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      console.log("in reg");
      if (
        !this.formData.username ||
        !this.formData.password ||
        !this.formData.name||
        !this.formData.email||
        !this.formData.passwordConfirm
      ) {console.log("vide");
        return;
      }
      if(this.formData.password!==this.formData.passwordConfirm){
        console.log("not match");
         this.errorMessage = "passsword does not match plz enter it again";
         
      }
      else{
        console.log("send");
      this.loading = true;
      AuthenticationService.register(this.formData)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.status === 409) {
            this.errorMessage = "Username is not valid";
          } else {
            this.errorMessage = "Unexpected error occured";
          }
        })
        .then(() => (this.loading = false));}
    },
  },
};
</script>

<style scoped>
.custom-card {
  width: 350px;
  max-width: 100%;
  background-color: #1aabc5;
}
.user-icon {
  font-size: 100px;
  color: darkblue;
}
</style>
