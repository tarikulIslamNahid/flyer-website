<script setup>
 const config = useRuntimeConfig();
 
</script>
<template>

            <!-- back to top start -->
            <div class="progress-wrap">
                <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                </svg>
            </div>
            <!-- back to top end -->
        
            <!-- footer area start -->
            <footer class="sasup-footer-4 footer-bg">
                <div class="sasup-footer-style-4 footer-top sasup-footer-space-4">
                    <div class="container">
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-3 col-md-6 col-sm-6 sasup-footer-col-flex-4-1">
                                <div id="custom_html-7"
                                    class="widget_text sasup-widget-5 sasup-footer-col-4-1 mb-30 widget_custom_html">
                                    <div class="textwidget custom-html-widget">
                                        <div class="logo">
                                            <nuxtLink to="/">
                                                <img :src="config.public.APP_URL + '/layout/images/icon.svg'"
                                                alt="image not found" width="25px"/>
                                              <img :src="config.public.APP_URL + '/layout/images/logo-icon.svg'"
                                                alt="image not found" width="120px" />
                                                </nuxtLink>
                                        </div>
                                        <p>A amazing WordPress theme designed specifically for a startup, apps, business, SaaS, and
                                            IT services.</p>
                                        <div class="sasup-subscribe-form-4">
                                            <form action="#">
                                                <div class="input-group">
                                                    <input type="email" name="sasup-subscribe" placeholder="Enter Email"
                                                        id="sasup-subscribe">
                                                </div>
                                                <button class="sasup-subscribe-theme-btn-4">Subcribe</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div class="sasup-widget-5 sasup-footer-col-4-2 mb-30">
                                    <h4 class="sasup-footer-title-4">About Us</h4>
                                    <div class="menu-resources-container">
                                        <ul id="menu-resources" class="menu">
                                            <li class="menu-item"><a
                                                    href="contact.html">Documentation</a></li>
                                            <li class="menu-item"><a
                                                    href="team-details.html">Solutions</a></li>
                                            <li class="menu-item"><a
                                                    href="portfolio.html">Road Map</a></li>
                                            <li class="menu-item"><a
                                                    href="service.html">Brand Assets</a></li>
                                            <li class="menu-item"><a
                                                    href="about.html">User Flow</a></li>
                                            <li class="menu-item"><a
                                                    href="service.html">Feature List</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-6">
                                <div class="sasup-widget-5 sasup-footer-col-4-3 mb-30 widget_nav_menu">
                                    <h4 class="sasup-footer-title-4">Useful Links</h4>
                                    <div class="menu-solutions-container">
                                        <ul id="menu-solutions" class="menu">
                                            <li><a href="portfolio.html">Support</a></li>
                                            <li><a href="contact.html">Proposals</a></li>
                                            <li><a href="team.html">Guides</a></li>
                                            <li><a href="service.html">Contracts</a></li>
                                            <li><a href="about.html">Signatures</a></li>
                                            <li><a href="team-details.html">Payments</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-6 col-sm-6 sasup-footer-col-flex-4-2">
                                <div id="custom_html-8"
                                    class="widget_text sasup-widget-5 sasup-footer-col-4-4 mb-30 widget_custom_html">
                                    <h4 class="sasup-footer-title-4">Contact Us</h4>
                                    <div>
                                        <div class="sasup-footer-list-action-4">
                                            <ul>
                                                <li>
                                                    <div class="icon bg-1">
                                                        <i class="fad fa-comments"></i>
                                                    </div>
                                                    <div class="content">
                                                        <h4 class="list-label">Email Us</h4>
                                                        <a href="../../../cdn-cgi/l/email-protection.html#96e5e3e6e6f9e4e2d6e5f7e5e3e6b8f5f9fb" class="list-value"><span class="__cf_email__" data-cfemail="70030500001f02043003110305005e131f1d">[email&#160;protected]</span></a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="icon bg-2">
                                                        <i class="fad fa-phone-alt"></i>
                                                    </div>
                                                    <div class="content">
                                                        <h4 class="list-label">Call us</h4>
                                                        <a href="tel:(481)204-7804" class="list-value">(481) 204 - 7804</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="icon bg-3">
                                                        <i class="fad fa-comments"></i>
                                                    </div>
                                                    <div class="content">
                                                        <h4 class="list-label">Chat with us</h4>
                                                        <a href="contact.html" class="list-value">Open live chat</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="divider-line pb-90"></div>
                    </div>
                </div>
                <div class="sasup-footer-copyright-4">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                <div class="sasup-footer-copyright-left-4 mb-30">
                                    <p>Copyright ©2022 Bdevs. All Rights Reserved</p>
                                </div>
                            </div>
                            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                <div class="sasup-footer-social-4 text-md-end mb-30">
                                    <span class="label">Follow us:</span>
                                    <div class="footer-links">
                                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                                        <a href="#"><i class="fab fa-twitter"></i></a>
                                        <a href="#"><i class="fab fa-pinterest-p"></i></a>
                                        <a href="#"><i class="fab fa-vimeo-v"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <!-- footer area end -->

</template>
<style>
</style>