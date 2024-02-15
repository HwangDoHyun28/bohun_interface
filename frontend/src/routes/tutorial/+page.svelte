<script>
    import { Input, Label, Helper } from "flowbite-svelte";
    import { Button } from "flowbite-svelte";
    import { P, A } from "flowbite-svelte";
  
  </script>
  
  <div class="rounded-lg border mx-10 px-20 py-10 bg-white">
    <div class="mt-5">
      <p class="text-4xl text-violet-800 font-medium my-5">Tutorial</p>
      <p class="text-neutral-400 text-lg font-normal">
        Let's find out how to use the CAculator tool!
      </p>
    </div>
    <img
      src="tutorialfig.svg"
      class="mt-5 h-fit text-center"
      alt="Tutorial Logo"
    />
    <div class="mt-16 -mb-9 h-max bg-inherit hover:bg-inherit rounded-lg place-content-center">
      <P class="text-violet-700 p-1 flex justify-center text-base" whitespace='nowrap'>This website is maintained by 
        <A
          class="text-violet-400 pl-1 underline"
          href="https://pnucolab.com/">Computational Omics Lab
        </A>, Pusan National University College of Biomedical Convergence
          Engineering, South Korea.
        <A class="text-violet-400 pl-1 underline">Contact US</A>
      </P>
    </div>
  </div>