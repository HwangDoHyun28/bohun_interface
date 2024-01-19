<script>
    import "../app.pcss";
    import {
      Navbar,
      NavBrand,
      NavLi,
      NavUl,
      NavHamburger,
    } from "flowbite-svelte";
    import { page } from "$app/stores";
    $: activeUrl = $page.url.pathname;
    let activeClass = 'text-white bg-violet-700 md:bg-transparent md:text-violet-700 md:dark:text-white dark:bg-green-600 md:dark:bg-transparent';
    let nonActiveClass = "text-violet-400 md:hover:text-violet-700 font-semibold text-base active:text-violet-700 ml-4"

  </script>
  
  <header class="border-b border-violet-200">
    <Navbar class="py-2" let:hidden let:toggle>
      <NavBrand href="/">
        <img
          src="logo.svg"
          class="-py-10 -ml-12 h-12 sm:h-12"
          alt="SPADOMA Logo"
        />
      </NavBrand>
      <NavHamburger on:click={toggle} />
      <NavUl {activeUrl} {activeClass} {nonActiveClass}>
        <NavLi
          href="/"
          class="text-violet-400 md:hover:text-violet-700 font-semibold text-base active:text-violet-700 ml-4"
          >Home</NavLi
        >
        <NavLi
          href="/about"
          class="text-violet-400 md:hover:text-violet-700 font-semibold text-base active:text-violet-700 ml-4"
          >About</NavLi
        >
        <NavLi
          href="/tutorial"
          class="text-violet-400 md:hover:text-violet-700 font-semibold text-base active:text-violet-700 ml-4"
          >Tutorial</NavLi
        >
        <NavLi
          href="/analysis"
          class="text-violet-400 md:hover:text-violet-700 font-semibold text-base active:text-violet-700 ml-4 -mr-10"
          >Analysis</NavLi
        >
      </NavUl>
    </Navbar>
  </header>
  <main class="bg-gray-100 py-5">
    <slot />
  </main>
  <footer class="mt-10">
    <hr />
    <div class="text-center py-5">
      <span class="text-sm text-gray-500">
        © 2024 CAlculator. All rights reserved.
      </span>
    </div>
  </footer>