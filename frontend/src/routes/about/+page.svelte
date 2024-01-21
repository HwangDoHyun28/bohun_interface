<script>
    import { Input, Label, Helper } from "flowbite-svelte";
    import { ButtonGroup, Button } from "flowbite-svelte";
    import { Select } from "flowbite-svelte";
  </script>

<div class="-mt-5 py-5 bg-violet-400 -mb-5">
    <div class="px-20 py-0 rounded-lg mx-5 border y-100 pb-1 bg-white">
      <p class="mt-14 text-4xl text-violet-800 font-semibold my-5">About</p>
      <p class="text-slate-400 text-lg font-normal">
        We implement a 16S full-length rRNA analysis pipeline as a web interface to facilitate data processing and obtain analysis
results without the need for professional bioinformatics background knowledge. In particular, interactive visualizations 
such as PCoA plots, taxonomic composition bar charts, or diversity index comparison charts can quickly and visually
 identify microbiome configurations in the data, reveal how microbiomes interact with their hosts, and be targeted for
 therapeutic purposes.
      </p>
      <p class="mt-2 text-violet-400 text-xl font-semibold">
        Enjoy the coolness of CAlculator!
      </p>
      <div class="place-content-center">
       <img
        src="aboutfig.svg"
        class="ml-48 mt-32 mb-12"
        alt="CAlculator Logo"
      />
      </div>
      <div class="h-max rounded-lg place-content-center">
        <Button target="self"
        href="https://pnucolab.com/"
        class="-mb-16 mt-10 h-max bg-inherit hover:bg-inherit rounded-lg place-content-center focus:ring-white">
          <img
          src="lab_tag.svg"
          alt="Tutorial Logo"
        />
        </Button>
      </div>
    </div>
   
    
</div>