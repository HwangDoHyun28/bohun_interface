<script>
    import { Button } from "flowbite-svelte";
    import { P, A } from "flowbite-svelte";
  </script>

<div class="font-Catamaran place-content-center rounded-lg border y-100 mx-5 mt-12 bg-white">
    <div class="content-center place-content-center px-10 pt-10 rounded-lg border y-100 bg-violet-400">
      <div class="text-center content-center place-content-center">
        <p class="mt-28 place-content-center text-2xl text-white font-sans font-semibold my-3">Gene Expression based Predicting Tool</p>
        <p class="mt-5 place-content-center text-6xl text-white font-semibold my-3">
        Cancer Patient
        </p>
        <p class="place-content-center text-6xl text-white font-sans font-semibold my-3">
        Probability Calculator
        </p>
        <div class="mt-16 left-96 place-content-center">
          <Button
            href="/about"
            class="place-content-center py-4 px-8 mt-5 text-2xl font-semibold bg-violet-700 hover:bg-violet-800 focus:ring-transparent"
          >About</Button>
          <div class="mt-16 mb-5 place-content-center flex">
            <Button href="https://pnucolab.com/" type="submit" target="self" class="ring-transparent">
              <img
              src="colablogo.svg"
              class="w-56 mx-5 mt-12 h-fit text-center"
              alt="Tutorial Logo"
            />
            </Button>
            <Button href="https://www.kvmri.org" type="submit" target="self" class="ring-transparent">
              <img
              src="bohunlogo.svg"
              class="w-60 mx-5 mt-16 h-fit text-center"
              alt="Tutorial Logo"
            />
            </Button>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="text-base font-semibold mt-1 mb-2 px-2 sm:px-4">
          <div class="mx-auto flex flex-col container">
              <P class="font-medium text-base text-violet-700 text-center">This website is maintained by <A class="text-violet-400 underline" href="https://sites.google.com/view/kimlab" target="_blank">Computational Omics Lab</A>, Pusan National University College of Biomedical Convergence Engineering, South Korea. </P>
          </div>
      </div>
    </footer>    
    
</div>