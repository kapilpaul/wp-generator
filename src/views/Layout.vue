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
        </ul>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="footer-main bg-light">
      <p class="copyright pt-50">
        <span>Made with ❤️ by </span
        ><a href="https://kapilpaul.me/" target="_blank">Kapil Paul</a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
