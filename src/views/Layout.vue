<template>
  <div>
    <header class="header-main">
      <nav>
        <a href="index.html" class="logo" rel="home"
          ><span>wp generator</span></a
        >
        <div class="nav-toggle"></div>

        <ul class="inline">
          <li><router-link to="/">Home</router-link></li>
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
export default {};
</script>

<style scoped>
.footer-main .copyright1 {
  padding: 0;
}
</style>
