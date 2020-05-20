<template>
  <div>
    <header class="header-main">
      <nav>
        <a href="index.html" class="logo" rel="home"><span>wp2gen</span></a>
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
      <div class="padding">
        <div class="row max-width-l">
          <div class="col-one-fifth">
            <h6>Startup</h6>
            <ul class="blank">
              <li><a href="#">Getting Started</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Design</a></li>
              <li><a href="#">Tutorials</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          <div class="col-one-fifth">
            <h6>Support</h6>
            <ul class="blank">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Requirements</a></li>
              <li><a href="#">License</a></li>
              <li><a href="#">Updates</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div class="col-one-fifth">
            <h6>Connect</h6>
            <ul class="blank">
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Medium</a></li>
            </ul>
          </div>
          <div class="col-two-fifths">
            <div class="max-width-s">
              <h6>Join The Newsletter</h6>
              <p>
                Get the latest news and resources right into your inbox every
                monday.
              </p>
              <form class="row reduce-spacing">
                <div class="col-two-thirds">
                  <input
                    id="subscribe"
                    type="email"
                    name="email"
                    placeholder="Your email..."
                  />
                </div>
                <div class="col-one-third">
                  <a
                    href="#"
                    class="button button-primary button-m full-width"
                    role="button"
                    >Subscribe</a
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p class="copyright">
        <span>HTML Template by </span
        ><a href="https://uiuxassets.com/" target="_blank">UI/UX Assets</a
        ><span> - © 2018, all rights reserved.</span>
      </p>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
