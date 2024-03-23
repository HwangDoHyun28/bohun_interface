<script>
  import { Button } from "flowbite-svelte";
  import { P, A } from "flowbite-svelte";
</script>
<div class="relative text-center content-center place-content-center px-5 pt-1">
  <img
  src="CAlculator2.svg"
  class="w-full mt-12 h-fit text-center"
  alt="Tutorial Logo"
  /> 
  <Button
      href="/about"
      class="text-violet-200 -ml-16 absolute bottom-64 place-content-center py-4 px-7 mt-5 text-2xl font-semibold bg-zinc-600 ring ring-zinc-500 hover:bg-zinc-500 focus:ring-transparent">
    About
  </Button>
  
  <footer class="-mt-9">
  <div class="text-base font-semibold mt-1 mb-2 px-2 sm:px-4">
      <div class="mx-auto flex flex-col container">
          <P class="font-medium text-base text-zinc-700 text-center">This website is maintained by <A class="text-zinc-400 underline" href="https://pnucolab.com/" target="_blank">Computational Omics Lab</A>, Pusan National University College of Biomedical Convergence Engineering, South Korea. </P>
      </div>
  </div>
</footer> 
</div>

