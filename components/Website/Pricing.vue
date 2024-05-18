<script setup>
    // get getPackages from useMainStore
    const store = useMainStore()
    store.getPackages();
    const packages = computed(() => store.packages)
     console.log(packages,'packages')
    const type = ref(false)
</script>
<template>
    <div class="priceing-area pt-115 pb-115 fix">
        <div class="container">
            <div class="row">
                <div class="col-xxl-12">
                    <div class="sasup-section-heading-5 text-center wow fadeInUp" data-wow-delay=".4s">
                        <h5 class="sasup-section-heading-5-subtitle">Our Pricing</h5>
                        <h3 class="sasup-section-heading-5-title" data-wow-delay=".2s">
                            The right <span>Pricing </span> for you</h3>
                    </div>
                </div>
            </div>
            <div class="advanced-pricing-tab text-center">
                <div class="d-inline-block p-rel advance-pricing-inline-content-2">
                    <div class="advanced-pricing-tab-key"> 
                        <span class="advanced-pricing-tab-key-text">Save up to <span>50%</span></span>
                        <div class="advanced-pricing-tab-key-shape">
                            <img src="/assets/img/shape/line_pricing.webp" alt="no image found">
                        </div>
                    </div>
                    <div class="advanced-pricing-tab-key-2">
                        
                        <ul class="nav" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="advanced-tab-1 annual-tab-btn" :class="type==false?'active':''" data-bs-toggle="tab" @click="type=!type"
                                  role="tab">Monthly </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="advanced-tab-2" :class="type==true?'active':''" data-bs-toggle="tab" @click="type=!type"
                                 role="tab">Yearly</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="advanced-pricing-widget-tab-content-wrapper-2">
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show show active" role="tabpanel"
                        aria-labelledby="monthly-tab0">
                            <div class="row">
                                <div v-for="(plan,index) in packages" :key="index" class="col-xl-4 col-lg-4 col-md-6">
                                    <div class="sasup-pricing-box-2 mb-30">
                                        <div class="sasup-pricing-box-top-2">
                                            <div class="sasup-pricing-box-hover-bg">
                                                <img src="/assets/img/shape/shape_circle_price.webp" alt="image not found">
                                            </div>
                                            <span v-if="plan.is_featured" class="sasup-pricing-box-top-subtitle-2">Featured</span>
                                            <span v-else class="sasup-pricing-box-top-subtitle-2"></span>
                                            <h3 class="sasup-pricing-box-top-title-2">
                                                {{plan.name}}</h3>
                                            <p class="sasup-pricing-box-top-desc-2">
                                                {{plan.short_descriptions}}</p>
             <nuxtLink :class="plan.is_featured?'active':''" to="/sign-up?plan=1&type=0" class="sasup-pricing-box-top-action-2">Get Started</nuxtLink>
                                        </div>
                                        <div class="sasup-pricing-box-bottom-2">
                                            <div class="sasup-pricing-box-bottom-title-wrap-2">
                                                <h4 class="sasup-pricing-box-bottom-price-2">
                                                    ${{ type==false?plan.cost_per_month:plan.cost_per_year }}
                                                </h4> 
                                            </div>
                                            <div class="sasup-pricing-box-bottom-list-2 ">
                                                <ul>
                                                    <li>
                                                        <i :class="plan.premium_templates==0? 'sasup-pricing-box-none fa-times':'fa-check'" class="fal  "></i>
                 <span class="price-feature-text">  Access Premium projects</span>
                                                    </li>
                                                    <li>
                                                        <i :class="plan.projects==0? 'sasup-pricing-box-none fa-times':'fa-check'" class="fal  "></i>
                 <span class="price-feature-text">  {{plan.projects==null?'Unlimited':plan.projects}} Public Projects</span>
                                                    </li>
                                                    <li>
                                                        <i :class="plan.public_share==0? 'sasup-pricing-box-none fa-times':'fa-check'" class="fal  "></i>
                 <span class="price-feature-text">  Access Public Share</span>
                                                    </li>
                                                    <li>
                                                        <i :class="plan.private_projects==0? 'sasup-pricing-box-none fa-times':'fa-check'" class="fal  "></i>
                 <span class="price-feature-text">  {{plan.private_projects==null?'Unlimited':plan.private_projects}} Private Projects</span>
                                                    </li>
                                                    <li>
                                                        <i :class="plan.private_share==0? 'sasup-pricing-box-none fa-times':'fa-check'" class="fal  "></i>
                 <span class="price-feature-text">  Access Private Share</span>
                                                    </li>
                                                    <li>
                                                        <i :class="plan.chat_support==0? 'sasup-pricing-box-none fa-times':'fa-check'" class="fal  "></i>
                 <span class="price-feature-text">  Access Chat Support</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             
                            </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>
<style>
</style>