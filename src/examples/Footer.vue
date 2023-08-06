<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div
            class="text-sm text-center copyright text-muted"
            :class="this.$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            ©
            {{ new Date().getFullYear() }}, made with
            <i class="fa fa-heart"></i> by
            <a
              href="https://www.google.com/search?q=Jemish+Dhameliya"
              class="font-weight-bold"
              target="_blank"
              >Jemish Dhameliya</a
            >
            for an Interview Demo
          </div>
        </div>
        <div class="col-lg-6">
          <ul
            class="nav nav-footer justify-content-center justify-content-lg-end"
          >
            <li class="nav-item">
              <a
                href="https://www.linkedin.com/in/jemish-dhameliya"
                class="nav-link text-muted"
                target="_blank"
                >Linkedin</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://github.com/jemysh007"
                class="nav-link text-muted"
                target="_blank"
                >Github</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://www.hackerrank.com/jemysh007"
                class="nav-link text-muted"
                target="_blank"
                >Hackerrank</a
              >
            </li>
          </ul>
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
