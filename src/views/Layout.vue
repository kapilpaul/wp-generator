<template>
  <div>
    <header class="header-main">
      <nav>
        <a href="https://wp-generator.com" class="logo" rel="home"
          ><span>wp generator</span></a
        >
        <div class="nav-toggle"></div>

        <ul class="inline">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/restapi">Rest API</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="footer-main bg-light">
      <p class="copyright copyright1 pt-50 mb-2">
        <span>Plugin structures by </span>
        <a href="https://tareq.co/" target="_blank">Tareq Hasan</a>
      </p>
      <p class="copyright">
        <span>Made with ❤️ by </span>
        <a href="https://kapilpaul.me/" target="_blank">Kapil Paul</a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  mounted() {
    //mobile menu toggle
    this.mobileMenuToggle();
  },
  methods: {
    mobileMenuToggle() {
      Array.from(document.getElementsByClassName("nav-toggle")).forEach(
        function(el) {
          el.addEventListener("click", function() {
            Array.from(document.getElementsByTagName("body")).forEach(function(
              el
            ) {
              el.classList.toggle("no-scroll");
            });
            Array.from(document.getElementsByClassName("header-main")).forEach(
              function(el) {
                el.classList.toggle("active");
              }
            );
          });
        }
      );
    },
  },
};
</script>

<style scoped>
.footer-main .copyright1 {
  padding: 0;
}
</style>
