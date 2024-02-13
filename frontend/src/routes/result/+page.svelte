<script>
  import { P, A } from "flowbite-svelte";
  import { Button } from "flowbite-svelte";
</script>


<form type="submit">
  <div class="mt-12 rounded-lg border mx-5 px-12 py-10 bg-white">
    <p class="ml-8 text-3xl text-violet-900 font-medium mt-2">Ph(+) B-ALL Probability Calculator</p>
    <div class="relative w-full px-10 mt-8 mb-5 pt-3 pb-10">
      <p class="text-3xl text-violet-700 font-medium">Results</p>
      <p class="text-violet-400 text-base font-normal mt-2">
        Probability of Each Class
      </p>   
      <div class="mt-8">
        <p class="ml-3 text-lg text-neutral-600 font-normal">Total class</p>
        <div>
          <div class="mt-5 ml-3 relative h-10 pt-2 flex rounded-lg font-medium text-neutral-500 bg-inherit border-2 border-violet-300">
            <p class="absolute left-2 text-left ml-3">-1</p>
            <p class="absolute left-1/2">0</p>
            <p class="absolute right-4 text-right">1</p>
          </div>
          <div class="relative mt-1 flex">
            <p class="ml-5 text-sm text-neutral-500">BALLNOS</p>
            <p class="absolute right-0 ml-5 text-sm text-neutral-500">Other Classes</p>
          </div>
          <div class="-mt-24 relative flex">
            <img
            src="Star_violet_800.svg"
            class="w-7 h-7 absolute right-1/2 ml-3 mt-4 h-fit text-center"
            alt="Tutorial Logo"
            />
            <img
            src="Star_violet_500.svg"
            class="w-7 h-7 absolute left-0 ml-3 mt-4 left-10 h-fit text-center"
            alt="Tutorial Logo"
            />
            <img
            src="Star_violet_300.svg"
            class="w-7 h-7 ml-3 mt-4 absolute left-1/2 h-fit text-center"
            alt="Tutorial Logo"
            />
          </div>
          
        </div>
      </div>
      <div>
        <div class="flex mt-20">
          <p class="ml-3 text-lg text-violet-800 font-normal mt-5">ABL1 Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: -0.0078</p>
        </div>
        <div class="mt-5 ml-3 relative h-10 pt-2 flex rounded-lg font-medium text-medium text-neutral-500 bg-inherit border-2 border-violet-300">
          <p class="absolute left-2 text-left ml-3">-1</p>
          <p class="absolute left-1/2">0</p>
          <p class="absolute right-4 text-right">1</p>
        </div> 
        <div class="relative mt-1 flex">
          <p class="ml-5 text-sm text-neutral-500">BALLNOS</p>
          <p class="absolute right-0 ml-5 text-sm text-neutral-500">ABL1</p>
        </div>
        <div class="bg-inherit w-full relative">
          <img
          src="Star_violet_800.svg"
          class="absolute right-1/2 w-7 h-7 ml-3 -mt-20 h-fit text-center"
          alt="Tutorial Logo"
          />
        </div>
      </div>
      <div>
        <div class="flex mt-10">
          <p class="ml-3 text-lg text-violet-500 font-normal mt-5">CRLF2 Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: -0.8765</p>
        </div>
        <div class="mt-8 ml-3 relative h-10 pt-2 flex rounded-lg font-medium text-medium text-neutral-500 bg-inherit border-2 border-violet-300">
          <p class="absolute left-2 text-left ml-3">-1</p>
          <p class="absolute left-1/2">0</p>
          <p class="absolute right-4 text-right">1</p>
        </div>  
        <div class="relative mt-1 flex">
          <p class="ml-5 text-sm text-neutral-500">BALLNOS</p>
          <p class="absolute right-0 ml-5 text-sm text-neutral-500">CRLF2</p>
        </div>
        <div class="bg-inherit w-full relative">
          <img
          src="Star_violet_500.svg"
          class="absolute left-0 w-7 h-7 ml-3 -mt-20 h-fit text-center"
          alt="Tutorial Logo"
          />
        </div>
      </div>
      <div>
        <div class="flex mt-10">
          <p class="ml-3 text-lg text-violet-300 font-normal mt-5">ABL1-Like Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: 0.0236</p>
        </div>
        <div class="mt-8 ml-3 relative h-10 pt-2 flex rounded-lg font-medium text-medium text-neutral-500 bg-inherit border-2 border-violet-300">
          <p class="absolute left-2 text-left ml-3">-1</p>
          <p class="absolute left-1/2">0</p>
          <p class="absolute right-4 text-right">1</p>
        </div>
        <div class="relative mt-1 flex">
          <p class="absolute left-0 ml-5 text-sm text-neutral-500">BALLNOS</p>
          <p class="absolute right-0 ml-5 text-sm text-neutral-500">ABL1-Like</p>
      </div>
      <div class="bg-inherit w-full relative">
        <img
        src="Star_violet_300.svg"
        class="absolute left-1/2 w-7 h-7 ml-3 -mt-16 h-fit text-center"
        alt="Tutorial Logo"
        />
      </div>
      <div class="mt-16 text-center">
        <Button
        href="/analysis"
        class="mb-5 px-7 text-xl font-semibold bg-violet-800 hover:bg-violet-900 focus:ring-white"
        >Return</Button>
      </div>
      <div class="-mb-16 w-full bg-inherit absolute bottom-0 text-center">
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
  </div>
</form>


