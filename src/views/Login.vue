


<template>
 <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <div v-if="errorMessage" class="alert alert-danger" style="width:83%">
        {{ errorMessage }}
      </div>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="handleLogin"
        novalidate
        :class="submitted ? 'was-validated' : ''">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                     v-model="formData.username"
            type="text"
            id="username"
            class="form-control"
            name="username"
            placeholder="Username"
            required
                      autocomplete="username"
                    />
                    <div class="invalid-feedback">Username is required.</div>
                  </CInputGroup>
                  <CInputGroup class="mb-4">
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
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4"  type="submit" @click="submitted = true"
          :disabled="loading"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                   If you want to register click here please  
                  </p>
                  <CButton @click="goToRegister()"  color="light" variant="outline" class="mt-3">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>

</template>

<script>
import User from "../models/user";
import vuex from "vuex";
import AuthenticationService from "../services/authentication.service";
import Role from "../models/role";
export default {
  name: "login",
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
    ...vuex.mapActions(["updateUser"]),
    goToRegister(){
      this.$router.push("/register");
    },
    handleLogin() {
      
      if (!this.formData.username || !this.formData.password) {
        return;
      }
      this.loading = true;
      AuthenticationService.login(this.formData)
        .then((response) => {
          this.updateUser(response.data);
          if(this.currentUser?.role !== Role.ADMIN){
          this.$router.push("/home");}
          else{
            this.$router.push("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = "Unexpected error occured.";
        })
        .then(() => (this.loading = false));
    },
  },
};
</script>

<style></style>
