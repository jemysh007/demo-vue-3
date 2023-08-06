<template>
  <footer class="py-5 footer">
    <div class="container">
      <div class="row">
        <div class="mx-auto mt-2 mb-4 text-center col-lg-8">
          
          <a
            href="https://www.linkedin.com/in/jemish-dhameliya/"
            target="_blank"
            class="text-secondary me-xl-4 me-4"
          >
            <span class="text-lg fab fa-linkedin"></span>
          </a>
          <a
            href="https://github.com/jemysh007"
            target="_blank"
            class="text-secondary me-xl-4 me-4"
          >
            <span class="text-lg fab fa-github"></span>
          </a>
         
        </div>
      </div>
      <div class="row">
        <div class="mx-auto mt-1 text-center col-8">
          <p class="mb-0 text-secondary">
            Copyright © {{ new Date().getFullYear() }} Soft by Jemish Dhameliya
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>
