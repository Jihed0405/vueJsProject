<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">404</h1>
            <h4 class="pt-3">Oops! You're lost.</h4>
            <p class="text-medium-emphasis float-start">
              The page you are looking for was not found.
            </p>
          </div>
          <CInputGroup class="input-prepend">
            <CInputGroupText>
              <CIcon icon="cil-magnifying-glass" />
            </CInputGroupText>
            <CFormInput type="text" placeholder="What are you looking for?" />
            <CButton color="info">Search</CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <span class="display-1"> 404 </span>
        <div class="mb-4 lead">
          Oops! We can't seem to find the page you are looking for.
        </div>
        <router-link to="/home" class="btn btn-link">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "not-found",
};
</script>

<style></style>
