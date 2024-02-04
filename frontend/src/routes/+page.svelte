<script>
    import { Input, Label, Helper } from "flowbite-svelte";
    import { ButtonGroup, Button } from "flowbite-svelte";
    import { Select } from "flowbite-svelte";
  </script>

<div class="place-content-center rounded-lg border y-100 mx-5 mt-12 bg-white">
    <div class="content-center place-content-center px-10 py-10 rounded-lg border y-100 pb-10 bg-violet-400">
      <div class="text-center content-center place-content-center">
        <p class="mt-28 place-content-center text-2xl text-white font-sans font-semibold my-3">Gene Expression based Predicting Tool</p>
        <p class="mt-8 place-content-center text-7xl text-white font-semibold my-3">
        Cancer Patient
        </p>
        <p class="place-content-center text-7xl text-white font-sans font-semibold my-3">
        Probability Calculator
        </p>
        <div class="my-20 left-96 place-content-center">
          <Button
            href="/about"
            class="my-0 place-content-center py-4 px-6 mt-5 text-xl font-semibold bg-violet-700 hover:bg-violet-800 focus:ring-violet-700"
          >About</Button>
        </div>
      </div>
    </div>
    <div class="mt-3 h-max rounded-lg place-content-center">
        <Button target="self"
        href="https://pnucolab.com/"
        class="justify-center -mt-96 ml-3 h-max bg-inherit hover:bg-inherit rounded-lg place-content-center focus:ring-white">
          <img
          src="lab_tag.svg"
          alt="Tutorial Logo"
          class="h-5 sm:h-5"
        />
        </Button>
      </div>
    
</div>