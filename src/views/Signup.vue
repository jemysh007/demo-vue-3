<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signUp-cover.jpg');
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center py-3">
              <h5>Signup </h5>
            </div>
            <div class="card-body py-2">
              <form role="form">
                <input
                  type="text"
                  v-model="name"
                  class="form-control my-2"
                  placeholder="Enter Name"
                />
                <input
                  type="email"
                  v-model="email"
                  class="form-control my-2"
                  placeholder="Enter Email"
                />
                <input
                  type="password"
                  v-model="password"
                  class="form-control my-2"
                  placeholder="Enter Password"
                  autocomplete="new-password"
                />

                <div class="text-center">
                  <argon-button
                    fullWidth
                    color="dark"
                    @click.prevent="signUp"
                    variant="gradient"
                    class="my-4 mb-2"
                    >Sign up</argon-button
                  >
                </div>
                <p class="text-sm mt-3 mb-0">
                  Already have an account?
                  <a href="/signin" class="text-dark font-weight-bolder"
                    >Sign in</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

import { Auth } from "@/services/Auth";
export default {
  name: "signin",
  components: {
    Navbar,
    AppFooter,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    signUp() {
      const signUpData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      Auth.signup(signUpData)
        .then((response) => {
          this.$swal({ text: response.message, icon: "success" });
          window.location.href = "/signin";
        })
        .catch((error) => {
          this.$swal({ text: error.message, icon: "error" });
        });
    },
  },

  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
