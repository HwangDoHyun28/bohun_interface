<script>
    import { Input, Label, Helper } from "flowbite-svelte";
    import { ButtonGroup, Button } from "flowbite-svelte";
    import { Select } from "flowbite-svelte";
  </script>

<div class="-mt-5 py-5 bg-violet-400 -mb-5">
    <div class="px-16 py-5 rounded-lg mx-5 border y-100 pb-10 bg-white">
      <p class="text-4xl text-violet-800 font-semibold my-5">About</p>
      <p class="text-slate-400 text-lg font-normal">
        We implement a 16S full-length rRNA analysis pipeline as a web interface to facilitate data processing and obtain analysis
results without the need for professional bioinformatics background knowledge. In particular, interactive visualizations 
such as PCoA plots, taxonomic composition bar charts, or diversity index comparison charts can quickly and visually
 identify microbiome configurations in the data, reveal how microbiomes interact with their hosts, and be targeted for
 therapeutic purposes.
      </p>
      <p class="mt-2 text-violet-400 text-xl font-normal">
        Enjoy the coolness of SPADOMA!
      </p>
      <div>
        <img
        src="aboutfig.svg"
        class="ml-28 mt-24 place-content-center"
        alt="CAlculator Logo"
      />
      </div>
      <div class="mt-10 h-max rounded-lg place-content-center">
        <Button target="self"
        href="https://pnucolab.com/"
        class="ml-3 h-max bg-inherit hover:bg-inherit rounded-lg place-content-center focus:ring-white">
          <img
          src="lab_tag.svg"
          alt="Tutorial Logo"
          class="h-5 sm:h-5"
        />
        </Button>
      </div>
    </div>
   
    
</div>