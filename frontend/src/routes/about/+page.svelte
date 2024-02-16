<script>
    import { P, A } from "flowbite-svelte";
  </script>

<div class="py-5 bg-violet-300 -mb-5">
    <div class="mt-8 px-20 py-0 rounded-lg mx-5 border y-100 pb-1 bg-white">
      <p class="mt-14 text-4xl text-violet-800 font-medium my-5">About</p>
      <p class="text-neutral-400 text-lg font-normal">
        We implement a gene expression based predicting tool as a web interface to facilitate data processing and obtain prediction
results without the need for professional bioinformatics background knowledge. In particular, interactive visualizations can quickly and visually
 identify cancer patient probability in the data, reveal how simillar cancers is distinguished with gene expression, and be targeted for
 clinical purposes.
      </p>
      <p class="mt-2 text-violet-400 text-xl font-normal">
        Enjoy the coolness of CAlculator!
      </p>
      <div class="place-content-center">
        <div class="text-center place-content-center justify-center mt-28 mb-16">
          <img
            src="aboutfig.svg"
            alt="CAlculator Logo"
            class="px-16"
          />
        </div>
      </div>
      <hr/>
      <div>
        <p class="mt-16 text-3xl text-violet-500 font-medium my-5">Model Validation</p>
        <p class="text-neutral-400 text-lg font-normal">
          We implement a gene expression based predicting tool as a web interface to facilitate data processing and obtain prediction
  results without the need for professional bioinformatics background knowledge. 
        </p>
        <div class="text-center place-content-center justify-center mt-12 mb-12">
          <img
            src="rpkm_BCRABL1.svg"
            alt="CAlculator Logo"
          />
        </div>
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