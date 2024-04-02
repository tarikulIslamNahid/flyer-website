<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
const model = ref([
    {
        // label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Users List',
                        icon: 'pi pi-fw pi-minus',
                        to: '/users'
                    },
                    {
                        label: 'Role & Permission',
                        icon: 'pi pi-fw pi-minus',
                        to: '/users/role-permissions'
                    }, 
                ]
            },
            { label: 'Packages', icon: 'pi pi-fw pi-book', to: '/packages' },
            { label: 'Coupons', icon: 'pi pi-fw pi-tags', to: '/coupons' },
            {
                label: 'Subscriptions',
                icon: 'pi pi-fw pi-calculator',
                items: [
                    {
                        label: 'Subscription List',
                        icon: 'pi pi-fw pi-minus',
                        to: '/subscriptions'
                    },
                    {
                        label: 'Pending Subscription',
                        icon: 'pi pi-fw pi-minus',
                        to: '/subscriptions/pending'
                    }, 
                    {
                        label: 'Active Subscription',
                        icon: 'pi pi-fw pi-minus',
                        to: '/subscriptions/active'
                    }, 
                    {
                        label: 'Expired Subscription',
                        icon: 'pi pi-fw pi-minus',
                        to: '/subscriptions/expire'
                    }, 
                ]
            },
            {
                label: 'Flyer Management',
                icon: 'pi pi-fw pi-calculator',
                items: [
                    {
                        label: 'Default Flyer List',
                        icon: 'pi pi-fw pi-minus',
                        to: '/subscriptions'
                    },
                    {
                        label: 'Subscriber Flyer List',
                        icon: 'pi pi-fw pi-minus',
                        to: '/subscriptions/pending'
                    },
                ]
            },
            {
                label: 'Invoices',
                icon: 'pi pi-fw pi-id-card',
                items: [
                    {
                        label: 'Invoice List',
                        icon: 'pi pi-fw pi-minus',
                        to: '/invoices'
                    },
                    {
                        label: 'Pending Invoice',
                        icon: 'pi pi-fw pi-minus',
                        to: '/invoices/pending'
                    }, 
                    {
                        label: 'Paid Invoice',
                        icon: 'pi pi-fw pi-minus',
                        to: '/invoices/paid'
                    }, 
                    {
                        label: 'Overdue Invoice',
                        icon: 'pi pi-fw pi-minus',
                        to: '/invoices/overdue'
                    }, 
                    {
                        label: 'Upcoming Invoice',
                        icon: 'pi pi-fw pi-minus',
                        to: '/invoices/upcoming'
                    }, 
                ]
            },
            {
                label: 'Website Manager',
                icon: 'pi pi-fw pi-globe',
                items: [
                    {
                        label: 'FAQ',
                        icon: 'pi pi-fw pi-minus',
                        to: '/website-manager/faq'
                    },
                    {
                        label: 'Blogs',
                        icon: 'pi pi-fw pi-minus',
                        to: '/website-manager/blogs'
                    }, 
                    {
                        label: 'Newsletters',
                        icon: 'pi pi-fw pi-minus',
                        to: '/website-manager/newsletters'
                    }, 
                    {
                        label: 'pages',
                        icon: 'pi pi-fw pi-minus',
                        to: '/website-manager/terms-conditions'
                    }, 
                    {
                        label: 'Features',
                        icon: 'pi pi-fw pi-minus',
                        to: '/website-manager/refund-policy'
                    },
                ]
            },
            { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/settings' },
            {
                label: 'Activity Logs',
                icon: 'pi pi-fw pi-history',
                items: [
                    {
                        label: 'Users Activity Logs',
                        icon: 'pi pi-fw pi-minus',
                        to: '/website-manager/faq'
                    },
                    {
                        label: 'Subscriber Activity Logs',
                        icon: 'pi pi-fw pi-minus',
                        to: '/website-manager/blogs'
                    },
                ]
            },
        ]
    }, 
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item  :item="item" :index="i"></app-menu-item>
        </template>
 
    </ul>
</template>

<style>
.layout-root-menuitem .layout-submenu:first-child {
    padding: 20px;
  }
</style>
