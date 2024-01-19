<script>
    import { Input, Label, Helper } from "flowbite-svelte";
    import { ButtonGroup, Button } from "flowbite-svelte";
    import { Select } from "flowbite-svelte";
  </script>

<div class="rounded-lg border y-100 mx-5 bg-white">
    <div class="px-10 py-10 rounded-lg border y-100 pb-10 bg-violet-400">
      <p class="text-2xl text-white font-sans font-semibold my-3">Predicting Tool</p>
      <p class="text-5xl text-white font-sans font-semibold my-3">
        Cancer Patient
      </p>
      <p class="text-5xl text-white font-sans font-semibold my-3">
        Probability Calculator
      </p>
      <div class="left-96">
        <Button
          href="/about"
          class="py-4 px-6 mt-5 text-xl font-semibold bg-violet-700 hover:bg-violet-800 focus:ring-violet-700"
          >About</Button>
    </div>
    </div>
    <div class="mt-3 h-max rounded-lg place-content-center">
        <Button target="self"
        href="https://pnucolab.com/"
        class="-mt-96 ml-3 h-max bg-inherit hover:bg-inherit rounded-lg place-content-center focus:ring-white">
          <img
          src="lab_tag.svg"
          alt="Tutorial Logo"
          class="h-4 sm:h-4"
        />
        </Button>
      </div>
    
</div>