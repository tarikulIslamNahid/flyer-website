<script setup>
useHead({
  title: `Home `,
 
});
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isLoad = ref(true);
const router = useRouter();

console.log(router.currentRoute.value.name, 'router')
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    // isLogin footer = to.meta.layout === 'website';




    next();
});
 
onMounted( async () => {
    const links = [
        '/assets/css/bootstrap.min.css',
        '/assets/css/website.css',
        '/assets/css/animate.min.css',
        '/assets/css/elegantFont.css',
        '/assets/css/flaticon.css',
        '/assets/css/fontawesome-all.min.css',
        '/assets/css/magnific-popup.css',
        '/assets/css/meanmenu.css',
        '/assets/css/odometer-theme-default.css',
        '/assets/css/website.scss',
    ]

     links.forEach((link) => {
        const head = document.getElementsByTagName('head')[0];
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = link;
     head.appendChild(linkElement);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isLoad.value = false;

     
    
});

 
    // preloader
    window.addEventListener('load', function() {
        var preloader = document.getElementById('loading');
        preloader.style.display = 'none';
    });
    // scroll to top
    window.addEventListener('scroll', function() {
        var scrollToTop = document.querySelector('.progress-wrap');
        scrollToTop.classList.toggle('active-progress', window.scrollY > 100);
    });

    // scroll to top 
window.addEventListener('click', function() {
    var scrollToTop = document.querySelector('.progress-wrap');
    scrollToTop.classList.toggle('active-progress', window.scrollY > 100);
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

</script>
<template>
     <div v-if="isLoad" id="loading">
        <div id="loading-center">
            <div id="loading-center-absolute">
                <div class="object" id="object_one"></div>
                <div class="object" id="object_two"></div>
                <div class="object" id="object_three"></div>
                <div class="object" id="object_four"></div>
            </div>
        </div>
    </div>
    <div v-else>
        <Toast />
        <websiteHeader v-if="router.currentRoute.value.name!='sign-up'"/>
        <router-view></router-view>

    </div>
    </template>
    