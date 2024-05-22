<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import menuLinks from "../utils/menuLinks";
import CloseIcon from "../assets/images/close.svg";
import MenuIcon from "../assets/images/Menu.svg";
const breakpoints = useBreakpoints(breakpointsTailwind);
const md = computed(() => breakpoints.current().value.includes("md"));
const showNavbar = ref(true);

onMounted(() => {
  const prevScrollY = ref(0);
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll <= 64) {
      showNavbar.value = true;
      return;
    }
    if (currentScroll > prevScrollY.value) {
      showNavbar.value = false;
      currentSubmenu.value = "";
    } else {
      showNavbar.value = true;
    }
    prevScrollY.value = currentScroll;
  });
});

const iconLinks = []

const showMenu = ref(false);
const currentSubmenu = ref("");

watch(
  () => [showMenu.value, md.value],
  () => {
    if (showMenu.value && !md.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
);

// useNuxtApp().hook("page:loading:start", () => {
//   showMenu.value = false;
//   currentSubmenu.value = "";
// });
</script>

<template>
  <!-- Navbar - Hide on Scroll -->
  <header :class="[
    'fixed z-30 w-screen text-white transition-[top] duration-300 left-0',
    showNavbar ? 'top-0' : '-top-16',
    { 'top-0': showMenu },
  ]">
    <!-- Main Nav -->
    <div class="fixed z-40 w-full bg-[#111111]/75 text-white/50 backdrop-blur">
      <div class="px-6 mx-auto flex w-full max-w-[1328px] flex-row items-start justify-between">
        <!-- Left -->
        <div class="flex flex-row px-6 md:px-20" :class="{ 'flex-col md:flex-row': showMenu }">
          <!-- Logo -->
          <div :class="['flex h-[4rem] items-center text-white']">
            <a href="/">Zima</a>
          </div>
          <!-- Links -->
          <ul class="flex flex-row" :class="{ 'flex-col md:flex-row': showMenu }">
            <li :class="[
              'flex flex-col transition-all duration-700 md:visible md:h-[4rem] md:flex-row md:items-center md:opacity-100 md:transition-none',
              showMenu ? 'h-dvh opacity-100' : 'h-0 opacity-0',
            ]">
              <span v-for="group in menuLinks" :class="[
                'block cursor-pointer pt-8 transition-all duration-300 md:pl-8 md:pt-0',
                'hover:text-white',
                {
                  'text-white': currentSubmenu == group.title,
                  'hidden opacity-0 md:block md:opacity-100': !showMenu,
                  'opacity-100': showMenu,
                },
              ]" @click="currentSubmenu = group.title" @pointerenter="md && (currentSubmenu = group.title)">
                {{ group.title }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Right -->
        <ul class="flex h-[4rem] items-center gap-4 text-xl text-white/50">
          <!-- IconLinks -->
          <li v-for="link in iconLinks" :class="[
            'opacity-0 transition-opacity duration-300 md:opacity-100',
            {
              'opacity-100': showMenu,
            },
          ]">
            <a class="flex items-center" :title="link.name" :href="link.href" :onClick="link.action">
              <!-- <Icon :name="link.icon" /> -->
            </a>
          </li>


          <!-- Menu Trigger -->
          <li class="md:hidden">
            <button class="flex items-center" :class="{ 'text-white': showMenu }" @click="showMenu = !showMenu">
              <CloseIcon v-show="showMenu" />
              <MenuIcon v-show="!showMenu" />
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Submenu -->
    <div :class="[
      'fixed top-0 z-50 w-full transition-[opacity] duration-300 md:z-30',
      'bg-[#111111] text-white backdrop-blur-lg md:bg-[#111111]/25',
      currentSubmenu ? 'h-dvh opacity-100' : 'h-0 p-0 opacity-0',
      { '': currentSubmenu },
    ]">
      <div :class="[
        'bg-[#111111]/10 md:bg-[#111111]/70 md:transition-all md:duration-500',
        currentSubmenu
          ? 'h-dvh pt-16 md:h-auto md:max-h-dvh'
          : 'max-h-0 pt-0',
      ]">
        <div v-for="group in menuLinks" :class="[
          'gpx mx-auto max-w-[1328px] px-12 md:px-[104px] animate-fade-right pb-10 pt-6 animate-duration-300 md:animate-fade',
          { hidden: currentSubmenu != group.title },
        ]" @pointerenter="md && (currentSubmenu = group.title)" @pointerleave="md && (currentSubmenu = '')">
          <!-- Back -->
          <button class="pb-8 text-2xl text-white md:hidden" @click="currentSubmenu = ''">
            <!-- <Icon class="-ml-1" :name="'material-symbols:arrow-left-alt'" /> -->
          </button>
          <!-- Title -->
          <h3 class="pb-4 opacity-50">{{ group.title }}</h3>
          <!-- Links -->
          <ul class="flex flex-col gap-4">
            <li class="transition-transform duration-300 hover:translate-x-1" v-for="link in group.links">
              <a style="text-decoration: none;" :href="`${link.href}?utm_source=head&utm_medium=menu`" target="_blank">{{
                link.title
                }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
