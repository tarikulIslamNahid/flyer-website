<script setup>
definePageMeta({
    layout: 'website',
    // middleware: 'guest' 
});
useHead({
  title: `Home `,
});

</script>

<template>
    <main>
        <!-- breadcrumb area start -->
        <div class="breadcrumb-area pt-215 pb-140 mb-115 pb-130">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <h3 class="breadcrumb-title">Features</h3>
                    <div class="breadcrumb-trail">
                        <nav>
                            <ul class="trail-items">
                                <li class="trail-item">
                                    <nuxt-link to="/"><span>Home</span></nuxt-link>
                                    </li>
                                <li class="trail-item"><span>Features</span></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <!-- breadcrumb area end -->
        <!-- features area start -->
        <section class="faetures-area features-space-1 pb-110">
            <div class="container">
                <div class="row mb-40">
                    <div class="col-xxl-12">
                        <div class="section-title text-center">
                            <span class="sasup-s-subtitle wow fadeInUp" data-wow-delay="0">Special Layout</span>
                            <h3 class="sasup-s-title wow fadeInUp" data-wow-delay=".2s">Features that<br> Help you
                                build
                                better.</h3>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-xxl-10">
                        <div class="row">
                            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                <div class="sasup-single-feature has-feature-shadow mb-30 wow fadeInUp"
                                    data-wow-delay=".2s" data-bg-color="#fff">
                                    <div class="sasup-feature-logo mb-35">
                                        <img src="/assets/img/feature/feature-1.webp" alt="image not found">
                                    </div>
                                    <div class="sasup-feature-content">
                                        <h4 class="sasup-feature-title"><a href="service-details.html">Create pages
                                                using tons of hand
                                                crafted sections</a>
                                        </h4>
                                         
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                <div class="sasup-single-feature has-feature-shadow mb-30  wow fadeInUp"
                                    data-wow-delay=".4s" data-bg-color="#fff">
                                    <div class="sasup-feature-logo mb-35">
                                        <img src="/assets/img/feature/feature-2.webp" alt="image not found">
                                    </div>
                                    <div class="sasup-feature-content">
                                        <h4 class="sasup-feature-title"><a href="service-details.html">Start your
                                                website project the
                                                right way with Inform</a></h4>
                                         
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                <div class="sasup-single-feature has-feature-shadow mb-30  wow fadeInUp"
                                    data-wow-delay=".6s" data-bg-color="#fff">
                                    <div class="sasup-feature-logo mb-35">
                                        <img src="/assets/img/feature/feature-3.webp" alt="image not found">
                                    </div>
                                    <div class="sasup-feature-content">
                                        <h4 class="sasup-feature-title"><a href="service-details.html">Adapt Inform to
                                                your brand
                                                Using the style guide</a></h4>
                                     
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                <div class="sasup-single-feature has-feature-shadow mb-30  wow fadeInUp"
                                    data-wow-delay=".8s" data-bg-color="#fff">
                                    <div class="sasup-feature-logo mb-35">
                                        <img src="/assets/img/feature/feature-4.webp" alt="image not found">
                                    </div>
                                    <div class="sasup-feature-content">
                                        <h4 class="sasup-feature-title"><a href="service-details.html">Power your
                                                business<br>
                                                with multiple CMS integrations</a></h4>
                                         
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- features area end -->
        <!-- service area start -->
        <div class="service-area pt-110 pb-115 mb-115 sasup-bg-1">
            <div class="container">
                <div class="row">
                    <div class="col-xxl-12">
                        <div class="section-title-3 mb-60 text-center">
                            <h3 class="s-title visile-br-lg">The only one<br>
                                Template you need</h3>
                            <p class="s-desc">Explore 50+ integrations that make your apps do more.</p>
                        </div>
                    </div>
                </div>
                <div class="row g-0 mb-80">
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                        <div class="service-left mb-30 mb-md-0">
                            <div class="service-info-wrapper" data-bg-color="#0a1426">
                                <div class="icon mb-35 wow fadeInUp" data-wow-delay=".2s">
                                    <svg version="1.1" id="light" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                        xml:space="preserve">
                                        <g>
                                            <path class="white-fill" d="M480,128H202.7c-17.6,0-32-14.4-32-32V32c0-17.6,14.4-32,32-32H480c17.6,0,32,14.4,32,32v64
		C512,113.6,497.6,128,480,128z M202.7,21.3c-5.9,0-10.7,4.8-10.7,10.7v64c0,5.9,4.8,10.7,10.7,10.7H480c5.9,0,10.7-4.8,10.7-10.7
		V32c0-5.9-4.8-10.7-10.7-10.7H202.7z" />
                                        </g>
                                        <g>
                                            <path class="white-fill" d="M64,128C28.7,128,0,99.3,0,64S28.7,0,64,0s64,28.7,64,64S99.3,128,64,128z M64,21.3
		c-23.5,0-42.7,19.1-42.7,42.7s19.1,42.7,42.7,42.7s42.7-19.1,42.7-42.7S87.5,21.3,64,21.3z" />
                                        </g>
                                        <g>
                                            <path class="white-fill" d="M480,512H32c-17.6,0-32-14.4-32-32V202.7c0-17.6,14.4-32,32-32h448c17.6,0,32,14.4,32,32V480
		C512,497.6,497.6,512,480,512z M32,192c-5.9,0-10.7,4.8-10.7,10.7V480c0,5.9,4.8,10.7,10.7,10.7h448c5.9,0,10.7-4.8,10.7-10.7
		V202.7c0-5.9-4.8-10.7-10.7-10.7H32z" />
                                        </g>
                                        <g>
                                            <path class="white-fill" d="M416.1,448H287.9c-17.6,0-32-14.4-32-32V266.7c0-17.6,14.4-32,32-32H416c17.6,0,32,14.4,32,32V416
		C448.1,433.6,433.7,448,416.1,448z M287.9,256c-5.9,0-10.7,4.8-10.7,10.7V416c0,5.9,4.8,10.7,10.7,10.7H416
		c5.9,0,10.7-4.8,10.7-10.7V266.7c0-5.9-4.8-10.7-10.7-10.7H287.9z" />
                                        </g>
                                        <g>
                                            <path class="white-fill" d="M202.6,277.3h-128c-5.9,0-10.7-4.8-10.7-10.7S68.7,256,74.6,256h128c5.9,0,10.7,4.8,10.7,10.7
		S208.5,277.3,202.6,277.3z" />
                                        </g>
                                        <g>
                                            <path class="white-fill" d="M202.6,341.3h-128c-5.9,0-10.7-4.8-10.7-10.7S68.7,320,74.6,320h128c5.9,0,10.7,4.8,10.7,10.7
		S208.5,341.3,202.6,341.3z" />
                                        </g>
                                        <g>
                                            <path class="white-fill" d="M202.6,405.3h-128c-5.9,0-10.7-4.8-10.7-10.7c0-5.9,4.8-10.7,10.7-10.7h128c5.9,0,10.7,4.8,10.7,10.7
		C213.3,400.6,208.5,405.3,202.6,405.3z" />
                                        </g>
                                    </svg>
                                </div>
                                <div class="content">
                                    <h4 class="service-info-title white-color wow fadeInUp" data-wow-delay=".4s"><a
                                            href="service-details.html">Personal agent dashboard</a>
                                    </h4>
                                    <p class="service-info-desc white-color wow fadeInUp" data-wow-delay=".6s">Increase
                                        your revenue bye participating for
                                        exclusive
                                        brand funded promotions affect gross margins.</p>
                                    <a href="service-details.html"
                                        class="service-read-more-btn white-color wow fadeInUp pb-5" data-wow-delay=".8s">  </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                        <div class="service-right custom-h-100 fix">
                            <div class="service-img-boxed-group custom-h-100" data-bg-color="#2d73f8">
                                <div class="single-service-img has-shadow animated-top-bottom d-inline-block">
                                    <div class="single-service-img-inner wow bounceInUp" data-wow-delay=".2s">
                                        <img class="service-img-1 " src="/assets/img/service/service-dashbord-1.webp"
                                            alt="image not found">
                                    </div>
                                </div>
                                <div class="single-service-img negative-space text-end">
                                    <div class="single-service-img-inner wow bounceInUp" data-wow-delay=".4s">
                                        <img class="service-img-2 animated-cornar"
                                            src="/assets/img/service/service-dashbord-2.webp" alt="image not found">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="service-list">
                    <div class="row">
                        <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                            <div class="single-service-list">
                                <div class="service-count-list">
                                    <span class="service-count-number">1</span>
                                </div>
                                <div class="service-content-list">
                                    <h4 class="service-title-list"><a href="service-details.html">Schedule
                                            Appointment</a></h4>
                                    <p class="service-content-list">The wireless horse play all gone <br>to that down.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                            <div class="single-service-list">
                                <div class="service-count-list">
                                    <span class="service-count-number">2</span>
                                </div>
                                <div class="service-content-list">
                                    <h4 class="service-title-list"><a href="service-details.html">Business
                                            Consultation</a></h4>
                                    <p class="service-content-list">The wireless horse play all gone <br>to that down.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                            <div class="single-service-list">
                                <div class="service-count-list">
                                    <span class="service-count-number">3</span>
                                </div>
                                <div class="service-content-list">
                                    <h4 class="service-title-list"><a href="service-details.html">Launch Your
                                            Business</a></h4>
                                    <p class="service-content-list">The wireless horse play all gone <br>to that down.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- service area end -->
        <!-- pricing area start -->
        <div class="pricing-area pricing-space pb-115">
            <div class="container">
                <div class="pricing-tab-top mb-40">
                    <div class="row">
                        <div class="col-xxl-12 mb-45">
                            <div class="section-title text-center">
                                <span class="sasup-s-subtitle wow fadeInUp" data-wow-delay="0">Pricing Plans</span>
                                <h3 class="sasup-s-title wow fadeInUp" data-wow-delay=".2s">Choose a plan and<br>
                                    start
                                    your business today</h3>
                            </div>
                        </div>
                        <div class="col-xxl-12">
                            <div class="pricing-tab-control">
                                <ul class="nav justify-content-center">
                                    <li class="nav-item">
                                        <button class="monthly-tab-btn" data-bs-toggle="pill" data-bs-target="#tab-1-1"
                                            type="button">Monthly</button>
                                    </li>
                                    <li class="nav-item">
                                        <button data-bs-toggle="pill" class="annual-tab-btn active"
                                            data-bs-target="#tab-1-2" type="button">Annually Save 30%</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pricing-tab-bottom mb-25">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade" id="tab-1-1">
                            <div class="row">
                                <div class="col-xxl-3 col-xl-3 col-lg-6 col-md-6">
                                    <div class="single-price item-1 mb-30 text-center">
                                        <div class="pricing-shapes">
                                            <div class="shape-1">
                                                <img src="/assets/img/shape/pricing-shape/shape_01.webp" alt="image not found">
                                            </div>
                                            <div class="shape-2">
                                                <img src="/assets/img/shape/pricing-shape/shape_02.webp" alt="image not found">
                                            </div>
                                            <div class="shape-3">
                                                <img src="/assets/img/shape/pricing-shape/shape_03.webp" alt="image not found">
                                            </div>
                                            <div class="shape-4">
                                                <img src="/assets/img/shape/pricing-shape/shape_04.webp" alt="image not found">
                                            </div>
                                            <div class="shape-5">
                                                <img src="/assets/img/shape/pricing-shape/shape_05.webp" alt="image not found">
                                            </div>
                                            <div class="shape-6">
                                                <img src="/assets/img/shape/pricing-shape/shape_06.webp" alt="image not found">
                                            </div>
                                        </div>
                                        <div class="single-price-wrap">
                                            <h4 class="single-pricing-title">Free</h4>
                                            <p class="single-pricing-info">For individuals and small projects</p>
                                            <h3 class="single-pricing-amount">$0</h3>
                                            <span class="single-pricing-label">Free Forever</span>
                                            <a href="price.html" class="sasup-gray-border-btn">Get started for
                                                free</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3  col-xl-3 col-lg-6 col-md-6">
                                    <div class="single-price item-2  mb-30 text-center">
                                        <div class="pricing-shapes">
                                            <div class="shape-1">
                                                <img src="/assets/img/shape/pricing-shape/shape_01.webp" alt="image not found">
                                            </div>
                                            <div class="shape-2">
                                                <img src="/assets/img/shape/pricing-shape/shape_02.webp" alt="image not found">
                                            </div>
                                            <div class="shape-3">
                                                <img src="/assets/img/shape/pricing-shape/shape_03.webp" alt="image not found">
                                            </div>
                                            <div class="shape-4">
                                                <img src="/assets/img/shape/pricing-shape/shape_04.webp" alt="image not found">
                                            </div>
                                            <div class="shape-5">
                                                <img src="/assets/img/shape/pricing-shape/shape_05.webp" alt="image not found">
                                            </div>
                                            <div class="shape-6">
                                                <img src="/assets/img/shape/pricing-shape/shape_06.webp" alt="image not found">
                                            </div>
                                        </div>
                                        <div class="single-price-wrap">
                                            <h4 class="single-pricing-title">Plus</h4>
                                            <p class="single-pricing-info">For small teams with simple workflows</p>
                                            <h3 class="single-pricing-amount">$10</h3>
                                            <span class="single-pricing-label">User / Month</span>
                                            <a href="price.html" class="sasup-gray-border-btn theme-bg">Get started
                                                for
                                                free</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3  col-xl-3 col-lg-6 col-md-6">
                                    <div class="single-price item-3  mb-30 text-center">
                                        <div class="pricing-shapes">
                                            <div class="shape-1">
                                                <img src="/assets/img/shape/pricing-shape/shape_01.webp" alt="image not found">
                                            </div>
                                            <div class="shape-2">
                                                <img src="/assets/img/shape/pricing-shape/shape_02.webp" alt="image not found">
                                            </div>
                                            <div class="shape-3">
                                                <img src="/assets/img/shape/pricing-shape/shape_03.webp" alt="image not found">
                                            </div>
                                            <div class="shape-4">
                                                <img src="/assets/img/shape/pricing-shape/shape_04.webp" alt="image not found">
                                            </div>
                                            <div class="shape-5">
                                                <img src="/assets/img/shape/pricing-shape/shape_05.webp" alt="image not found">
                                            </div>
                                            <div class="shape-6">
                                                <img src="/assets/img/shape/pricing-shape/shape_06.webp" alt="image not found">
                                            </div>
                                        </div>
                                        <div class="single-price-wrap">
                                            <h4 class="single-pricing-title">Pro</h4>
                                            <p class="single-pricing-info">For small teams with simple workflows</p>
                                            <h3 class="single-pricing-amount">$24</h3>
                                            <span class="single-pricing-label">User / Month</span>
                                            <a href="price.html" class="sasup-gray-border-btn">Get started for
                                                free</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3  col-xl-3 col-lg-6 col-md-6">
                                    <div class="single-price item-4  mb-30 text-center">
                                        <div class="pricing-shapes show-shapes">
                                            <div class="shape-1">
                                                <img src="/assets/img/shape/pricing-shape/shape_01.webp" alt="image not found">
                                            </div>
                                            <div class="shape-2">
                                                <img src="/assets/img/shape/pricing-shape/shape_02.webp" alt="image not found">
                                            </div>
                                            <div class="shape-3">
                                                <img src="/assets/img/shape/pricing-shape/shape_03.webp" alt="image not found">
                                            </div>
                                            <div class="shape-4">
                                                <img src="/assets/img/shape/pricing-shape/shape_04.webp" alt="image not found">
                                            </div>
                                            <div class="shape-5">
                                                <img src="/assets/img/shape/pricing-shape/shape_05.webp" alt="image not found">
                                            </div>
                                            <div class="shape-6">
                                                <img src="/assets/img/shape/pricing-shape/shape_06.webp" alt="image not found">
                                            </div>
                                        </div>
                                        <div class="single-price-wrap">
                                            <h4 class="single-pricing-title">Enterprise</h4>
                                            <p class="single-pricing-info space-last">For medium to large teams with
                                                20+
                                                members</p>
                                            <h3 class="lets-chet">Let's chat!</h3>
                                            <a href="price.html" class="sasup-gray-border-btn theme-3">Contact
                                                Sales</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade show active" id="tab-1-2">
                            <div class="row">
                                <div class="col-xxl-3  col-xl-3 col-lg-6  col-md-6">
                                    <div class="single-price item-1 mb-30 text-center">
                                        <div class="pricing-shapes">
                                            <div class="shape-1">
                                                <img src="/assets/img/shape/pricing-shape/shape_01.webp" alt="image not found">
                                            </div>
                                            <div class="shape-2">
                                                <img src="/assets/img/shape/pricing-shape/shape_02.webp" alt="image not found">
                                            </div>
                                            <div class="shape-3">
                                                <img src="/assets/img/shape/pricing-shape/shape_03.webp" alt="image not found">
                                            </div>
                                            <div class="shape-4">
                                                <img src="/assets/img/shape/pricing-shape/shape_04.webp" alt="image not found">
                                            </div>
                                            <div class="shape-5">
                                                <img src="/assets/img/shape/pricing-shape/shape_05.webp" alt="image not found">
                                            </div>
                                            <div class="shape-6">
                                                <img src="/assets/img/shape/pricing-shape/shape_06.webp" alt="image not found">
                                            </div>
                                        </div>
                                        <div class="single-price-wrap">
                                            <h4 class="single-pricing-title">Free</h4>
                                            <p class="single-pricing-info">For individuals and small projects</p>
                                            <h3 class="single-pricing-amount">$40</h3>
                                            <span class="single-pricing-label">Free Forever</span>
                                            <a href="price.html" class="sasup-gray-border-btn">Get started for
                                                free</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3  col-xl-3 col-lg-6  col-md-6">
                                    <div class="single-price item-2  mb-30 text-center">
                                        <div class="pricing-shapes">
                                            <div class="shape-1">
                                                <img src="/assets/img/shape/pricing-shape/shape_01.webp" alt="image not found">
                                            </div>
                                            <div class="shape-2">
                                                <img src="/assets/img/shape/pricing-shape/shape_02.webp" alt="image not found">
                                            </div>
                                            <div class="shape-3">
                                                <img src="/assets/img/shape/pricing-shape/shape_03.webp" alt="image not found">
                                            </div>
                                            <div class="shape-4">
                                                <img src="/assets/img/shape/pricing-shape/shape_04.webp" alt="image not found">
                                            </div>
                                            <div class="shape-5">
                                                <img src="/assets/img/shape/pricing-shape/shape_05.webp" alt="image not found">
                                            </div>
                                            <div class="shape-6">
                                                <img src="/assets/img/shape/pricing-shape/shape_06.webp" alt="image not found">
                                            </div>
                                        </div>
                                        <div class="single-price-wrap">
                                            <h4 class="single-pricing-title">Plus</h4>
                                            <p class="single-pricing-info">For small teams with simple workflows</p>
                                            <h3 class="single-pricing-amount">$20</h3>
                                            <span class="single-pricing-label">User / Month</span>
                                            <a href="price.html" class="sasup-gray-border-btn theme-bg">Get started
                                                for
                                                free</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3  col-xl-3 col-lg-6  col-md-6">
                                    <div class="single-price item-3  mb-30 text-center">
                                        <div class="pricing-shapes">
                                            <div class="shape-1">
                                                <img src="/assets/img/shape/pricing-shape/shape_01.webp" alt="image not found">
                                            </div>
                                            <div class="shape-2">
                                                <img src="/assets/img/shape/pricing-shape/shape_02.webp" alt="image not found">
                                            </div>
                                            <div class="shape-3">
                                                <img src="/assets/img/shape/pricing-shape/shape_03.webp" alt="image not found">
                                            </div>
                                            <div class="shape-4">
                                                <img src="/assets/img/shape/pricing-shape/shape_04.webp" alt="image not found">
                                            </div>
                                            <div class="shape-5">
                                                <img src="/assets/img/shape/pricing-shape/shape_05.webp" alt="image not found">
                                            </div>
                                            <div class="shape-6">
                                                <img src="/assets/img/shape/pricing-shape/shape_06.webp" alt="image not found">
                                            </div>
                                        </div>
                                        <div class="single-price-wrap">
                                            <h4 class="single-pricing-title">Pro</h4>
                                            <p class="single-pricing-info">For small teams with simple workflows</p>
                                            <h3 class="single-pricing-amount">$45</h3>
                                            <span class="single-pricing-label">User / Month</span>
                                            <a href="price.html" class="sasup-gray-border-btn">Get started for
                                                free</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3  col-xl-3 col-lg-6  col-md-6">
                                    <div class="single-price item-4  mb-30 text-center">
                                        <div class="pricing-shapes show-shapes">
                                            <div class="shape-1">
                                                <img src="/assets/img/shape/pricing-shape/shape_01.webp" alt="image not found">
                                            </div>
                                            <div class="shape-2">
                                                <img src="/assets/img/shape/pricing-shape/shape_02.webp" alt="image not found">
                                            </div>
                                            <div class="shape-3">
                                                <img src="/assets/img/shape/pricing-shape/shape_03.webp" alt="image not found">
                                            </div>
                                            <div class="shape-4">
                                                <img src="/assets/img/shape/pricing-shape/shape_04.webp" alt="image not found">
                                            </div>
                                            <div class="shape-5">
                                                <img src="/assets/img/shape/pricing-shape/shape_05.webp" alt="image not found">
                                            </div>
                                            <div class="shape-6">
                                                <img src="/assets/img/shape/pricing-shape/shape_06.webp" alt="image not found">
                                            </div>
                                        </div>
                                        <div class="single-price-wrap">
                                            <h4 class="single-pricing-title">Enterprise</h4>
                                            <p class="single-pricing-info space-last">For medium to large teams with
                                                20+
                                                members</p>
                                            <h3 class="lets-chet">Let's chat!</h3>
                                            <a href="price.html" class="sasup-gray-border-btn theme-3">Contact
                                                Sales</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pricing-tab-extra-info text-center">
                    <div class="icon d-inline-block mb-3 mb-lg-0">
                        <img src="/assets/img/icon/i_icon.webp" alt="image not found">
                    </div>
                    <div class="content d-inline-block">
                        <p class="text-center text-md-start">Les services de paiement sont disponibles via des
                            <br>applications
                            mobiles
                            et de bureau.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- pricing area end -->
        <!-- cta area start -->
            <div class="cta-area">
                <div class="container">
                    <div class="row">
                        <div class="col-xxl-12">
                            <div class="sasup-cta-content-5">
                                <h3 class="sasup-cta-title-5">Ready to dive in?<br> Start your <span>Free</span>
                                    trial today.</h3>
                                <div class="sasup-cta-action-wrapper-5">
                                    <a class="sasup-cta-action-link-5" href="sign-up.html">Get Started</a>
                                    <a class="sasup-cta-action-transparent-link-5" href="about.html">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- cta area end -->
    </main>
    <websiteFooter/>

</template> 