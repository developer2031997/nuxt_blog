<template>
  <nav class="menubar-bg border-gray-200 dark:bg-gray-900">
    <div
      class="container max-w-screen-xl flex flex-wrap items-center justify-between mx-auto"
    >
      <NuxtLink
        href="/"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> -->
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Medical Blogs.</span
        >
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        data-collapse-toggle="navbar-default"
        type="button"
        class="my-2 bg-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      <!-- Navigation Links -->
      <div
        :class="{ block: isOpen, hidden: !isOpen }"
        class="w-full md:block md:w-auto"
        id="navbar-default"
      >
        <ul
          class="font-medium flex flex-col p-4 md:flex-row md:space-x-8 rtl:space-x-reverse"
        >
          <li>
            <NuxtLink
              href="/"
              class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              aria-current="page"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              href="/about"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              About</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              href="/posts"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Blogs</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              href="/contact"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Contact</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="">
    <slot />
  </div>

  <footer class="menubar-bg py-2">
    <div class="container text-center">
      <h1 class="font-2xl text-white font-bold">
        Copyright © {{ new Date().getFullYear() }} Medical Blogs.
      </h1>
    </div>
  </footer>
</template>

<script setup>
const isSticky = ref(false);
const isOpen = ref(false);

const handleScroll = () => {
  if (window.pageYOffset > 200) {
    isSticky.value = true;
  } else {
    isSticky.value = false;
  }
};

const toggleMenu = () => {
  console.log("menubar is toogle");
  isOpen.value = !isOpen.value;
  console.log(isOpen.value);
};

onMounted(() => {
  // window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
a,
NuxtLink {
  text-decoration: none;
  color: #fff !important;
}

.nav-link a:hover {
  font-weight: 600;
}

p {
  padding-bottom: 0;
  margin: 0 0 7px;
}

.menubar-bg {
  background: #003a70;
}

.sticky-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: fadeInOut 0.3s ease;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.2;
  }

  100% {
    opacity: 1;
  }
}
</style>
