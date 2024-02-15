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

  $: activeUrl = $page.url.pathname === "/result" ? "/analysis" : $page.url.pathname;
  let activeClass = '-mt-2 text-white bg-violet-700 md:bg-transparent md:text-violet-700 md:dark:text-white dark:bg-violet-600 md:dark:bg-transparent';
  let nonActiveClass = "-mt-2 text-violet-400 md:hover:text-violet-700 font-semibold text-base active:text-violet-700";
</script>

<header class="relative">
  <Navbar class="fixed py-3 border-b border-violet-200" let:hidden let:toggle>
      <NavBrand href="/">
          <img
              src="logo.svg"
              class="absolute left-0 h-8"
              alt="SPADOMA Logo"
          />
      </NavBrand>
      <NavHamburger on:click={toggle} />
      <NavUl {activeUrl} {activeClass} {nonActiveClass}>
          <NavLi
              href="/"
              class="absolute right-80 text-violet-400 md:hover:text-violet-700 font-semibold text-sm active:text-violet-700"
          >Home</NavLi>
          <NavLi
              href="/about"
              class="absolute right-56 text-violet-400 md:hover:text-violet-700 font-semibold text-sm active:text-violet-700 ml-7"
          >About</NavLi>
          <NavLi
              href="/tutorial"
              class="absolute right-32 text-violet-400 md:hover:text-violet-700 font-semibold text-sm active:text-violet-700 ml-7"
          >Tutorial</NavLi>
          <NavLi
              href="/analysis"
              class="absolute right-8 text-violet-400 md:hover:text-violet-700 font-semibold text-sm active:text-violet-700 ml-7"
          >Analysis</NavLi>
      </NavUl>
  </Navbar>
</header>
<main class="bg-gray-100 py-5">
  <slot />
</main>
<footer>
  <hr />
  <div class="text-center py-5">
      <p class="text-sm text-gray-500">
          © 2024 CAlculator. All rights reserved.
      </p>
  </div>
</footer>
