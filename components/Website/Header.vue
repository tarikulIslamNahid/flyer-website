<script setup>
const config = useRuntimeConfig();

// onclick mobile-bar-control toggle bar-control-clicked class
const mobileBarControl = () => {
  const mobileBarControl = document.querySelector(".mobile-bar-control");
  mobileBarControl.classList.toggle("bar-control-clicked");
  const responsiveSidebar = document.querySelector(".responsive-sidebar");
  responsiveSidebar.classList.toggle("responsive-sidebar-visible");
};
// onclick responsive-sidebar-close toggle responsive-sidebar-open class
const responsiveSidebarClose = () => {
  const responsiveSidebar = document.querySelector(".responsive-sidebar");
  responsiveSidebar.classList.toggle("responsive-sidebar-visible");
  const mobileBarControl = document.querySelector(".mobile-bar-control");
  mobileBarControl.classList.toggle("bar-control-clicked");
};
</script>
<template>
    <div>

  <header>
    <div class="header-transparent sasup-header-style-5 header-sticky">
      <div class="header-main">
        <div class="container">
          <div class="row align-items-center justify-content-between">
            <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-6">
              <div class="sasup-logo mr-35 d-inline-block">
                <a href="index.html" class="logo-1"
                  >
                  <img :src="config.public.APP_URL + '/layout/images/icon.svg'"
                    alt="image not found" width="25px"/>
                  <img :src="config.public.APP_URL + '/layout/images/logo-icon.svg'"
                    alt="image not found"  />
            </a>
                <a href="index.html" class="logo-2"
                  ><img src="/assets/img/logo/logo.webp" alt="image not found"
                /></a>
              </div>
            </div>
            <div class="col-xxl-6 col-xl-6 col-lg-6 d-none d-lg-block text-center">
              <div class="sasup-header d-none d-lg-inline-block">
                <nav id="mobile-menu">
                  <ul>
                    <li>
                      <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/features">Features</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/pricing">Pricing</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/about">About</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/about">Blog</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/contact">Contact</nuxt-link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-8 col-6">
              <div class="sasup-header-action-5 text-end">
                <a href="sign-in.html" class="sasup-login-btn-5"
                  ><i class="fal fa-user"></i> Log in</a
                >
                <a href="sign-up.html" class="sasup-header-white-btn-5 header-btn"
                  >Join US</a
                >
                <div
                  @click="mobileBarControl"
                  class="mobile-bar-control mobile-bar-control-white d-inline-block d-lg-none"
                >
                  <div class="line"></div>
                  <div class="line"></div>
                  <div class="line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- responsive sidebar start -->
  <div class="responsive-sidebar d-block d-lg-none">
    <div class="responsive-sidebar-inner">
      <div class="logo mb-30">
        <div class="row">
          <div class="col-6">
            <img src="/assets/img/logo/logo.webp" alt="image not found" />
          </div>
          <div class="col-6">
            <div class="text-end">
              <button @click="responsiveSidebarClose" class="responsive-sidebar-close">
                <i class="fal fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="resposive-sidebar-menu mb-50">
        <div class="mobile-menu mean-container">
          <div class="mean-bar">
            <a
              href="#nav"
              class="meanmenu-reveal"
              style="right: 0px; left: auto; display: inline"
              ><span
                ><span><span></span></span></span
            ></a>
            <nav class="mean-nav">
              <ul style="display: none">
                <li>
                    <nuxt-link to="/">Home</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/features">Features</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/pricing">Pricing</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/about">About</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/about">Blog</nuxt-link>
                  </li>
                  <li class="mean-last">
                    <nuxt-link to="/contact">Contact</nuxt-link>
                  </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="responsive-sidebar-actions">
        <a
          href="contact.html"
          class="sasup-border-btn d-block sasup-broder-btn-space-3 ms-0 text-center mb-2"
          >login</a
        >
        <a
          href="contact.html"
          class="sasup-theme-btn text-center d-inline-block d-sm-none w-100"
          ><span>Free Trial</span></a
        >
      </div>
    </div>
  </div>
</div>

</template> 
