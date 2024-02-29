<script>
    import { P, A } from "flowbite-svelte";
    import CarouselItemAbout0 from '/home/hdh1028/Downloads/Bohun_Ranking_Pathway/bohun_interface/frontend/src/lib/about0.svelte';
    import CarouselItemAbout1 from '/home/hdh1028/Downloads/Bohun_Ranking_Pathway/bohun_interface/frontend/src/lib/about1.svelte';
    import CarouselItemAbout2 from '/home/hdh1028/Downloads/Bohun_Ranking_Pathway/bohun_interface/frontend/src/lib/about2.svelte';

  let currentIndex = 0;

  const items = [
    { component: CarouselItemAbout0 },
    { component: CarouselItemAbout1 },
    { component: CarouselItemAbout2 }
    // 다른 CarouselItem들도 여기에 추가하세요
  ];

  function next() {
    currentIndex = (currentIndex + 1) % items.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
  }
</script>

<div class="py-5 bg-violet-300 -mb-5">
  <div class="mt-8 px-20 py-0 rounded-lg mx-5 border y-100 pb-1 bg-white place-content-center">
    <div class="carousel flex justify-center">
      <button on:click={prev}>Prev</button>
      {#if items[currentIndex]}
        <svelte:component this={items[currentIndex].component} />
      {/if}
      <button on:click={next}>Next</button>
    </div>
    <div class="mt-10 h-max bg-inherit hover:bg-inherit rounded-lg place-content-center">
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
