<script>
  import { P, A } from "flowbite-svelte";
  import CarouselItemAbout0 from '/home/hdh1028/Downloads/Bohun_Ranking_Pathway/bohun_interface/frontend/src/lib/about0.svelte';
  import CarouselItemAbout1 from '/home/hdh1028/Downloads/Bohun_Ranking_Pathway/bohun_interface/frontend/src/lib/about1.svelte';

let currentIndex = 0;

const items = [
  { component: CarouselItemAbout0 },
  { component: CarouselItemAbout1 }
];

function next() {
  currentIndex = (currentIndex + 1) % items.length;
}

function prev() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
}
</script>

<div class="py-5 bg-violet-300 -mb-5">
<div class="mt-8 px-10 py-0 rounded-lg mx-5 border y-100 pb-1 bg-white place-content-center">
  <div class="relative carousel flex">
    <button class="absolute left-0 top-1/2 fixed w-12 h-16" on:click={prev}>
      <img
        src="left_botton6.svg"
        alt="CAlculator Logo"
        class="w-12 h-12"
      />
    </button>
    {#if items[currentIndex]}
      <svelte:component this={items[currentIndex].component}/>
    {/if}
    <button class="absolute right-0 top-1/2 fixed w-12 h-16" on:click={next}>
      <img
        src="right_botton6.svg"
        alt="CAlculator Logo"
        class="w-12 h-12"
      />
    </button>
  </div>
  <footer>
    <div class="mt-2 mb-1 px-2 sm:px-4">
        <div class="mx-auto flex flex-col container">
            <P class="text-violet-700 text-center">This website is maintained by <A class="text-violet-400 underline" href="https://sites.google.com/view/kimlab" target="_blank">Computational Omics Lab</A>, Pusan National University College of Biomedical Convergence Engineering, South Korea. </P>
        </div>
    </div>
  </footer>    
</div>  
</div>

