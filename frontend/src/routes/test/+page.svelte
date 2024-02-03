<script>
  import { P, A, Input, Label, Helper } from "flowbite-svelte";
  import { Fileupload, Button, Checkbox } from "flowbite-svelte";
  import { Select } from "flowbite-svelte";
  import { onMount } from 'svelte';

  
  let selected2;
  let Based = [
    { value: "RPKM", name: "RPKM based" },
    { value: "RANK", name: "Rank based" },
  ];

  export let value;
  let selected5 = true;
  let selected6 = true;
  let selected7 = true;
</script>    

<form type="submit">
  <div class="mt-12 rounded-lg border mx-5 px-12 py-10 bg-white">
    <p class="ml-8 text-3xl text-violet-900 font-medium mt-2">Ph(+) B-ALL & Ph-like B-ALL Probability Calculator</p>
    <div class="mt-12">
      <div class="w-full px-10 rounded-lg">
        <p class="text-3xl text-violet-700 font-medium">Data</p>
        <p class="mt-2 text-violet-400 text-base font-normal">
          Upload your RPKM matrix file ( csv, tsv, or ... )
        </p>   
        <Label class="w-32 space-y-2 mb-2">
          <Fileupload class = "w-32 opacity-0" bind:value/>
        </Label>           
        <div class="-mt-12 flex">
          <div>
            <Button class="y-5 mt-3 py-2 bg-violet-400 hover:bg-violet-400 text-base font-semibold"
              >Select File</Button
            >
          </div>
          <div class="text-center mt-4">
            <Label class="text-neutral-300 text-center text-[16px] font-normal px-3 mt-1">{value}</Label>
          </div>
        </div>
        <p class="mt-20 text-3xl text-violet-700 font-medium">Settings</p>   
        <div class="mb-10 w-full flex">
          <div class="w-full mr-24">
            <p class="mt-2 text-violet-400 text-base font-normal">
              RPKM or RANK Based
            </p>
            <Select
              id="Patient"
              size="sm" 
              class="mt-3 text-base text-violet-500 bg-inherit border-violet-300 focus:ring-white focus:border-violet-300"
              bind:value={selected2}
            >
              {#each Based as { value, name }}
                <option {value}>{name}</option>
              {/each}
            </Select>
          </div>
          <div class="w-full mt-2">
            <p class="text-violet-400 text-lg font-normal">
              Score Class
            </p>
            <div class="flex">
              <div class="mt-4 flex">
                <Checkbox
                id="boxplot-check"
                bind:checked={selected5}
                on:click={() => {
                  selected5 = !selected5;
                }}
                class="h-5 w-5 bg-inherit checked:bg-violet-800 focus:ring-white"/>
                <p class="ml-4 text-neutral-400 text-base font-normal">
                  ABL1 Class
                </p>
              </div>
              <div class="ml-16 mt-4 flex">
                <Checkbox
                id="boxplot-check"
                bind:checked={selected6}
                on:click={() => {
                  selected6 = !selected6;
                }}
                class="w-5 h-5 bg-inherit checked:bg-violet-500 focus:ring-white"
              />
              <p class="ml-4 text-neutral-400 text-base font-normal">
                CRLF2 Class
              </p>
              </div>
              <div class="ml-16 mt-4 flex">
                <Checkbox
                id="boxplot-check"
                bind:checked={selected7}
                on:click={() => {
                  selected7 = !selected7;
                }}
                class="w-5 h-5 bg-inherit checked:bg-violet-300 focus:ring-white"
              />
              <p class="ml-4 text-neutral-400 text-base font-normal">
                ABL1-Like Class
              </p>
              </div>
            </div>
          </div>
        </div>  
        <div class="mt-28 mb-12 text-center">
          <Button
          href="/result"
          class="text-xl font-semibold bg-violet-700 hover:bg-violet-800 focus:ring-violet-700"
          >Predict Probability</Button>
        </div>
      </div> 
    </div>
    <div class="-mb-10 h-max bg-inherit hover:bg-inherit rounded-lg place-content-center">
      <P class="text-neutral-700 p-1 flex justify-center text-base" whitespace='nowrap'>This website is maintained by 
        <A
          class="pl-1 underline"
          href="https://pnucolab.com/">Computational Omics Lab
        </A>, Pusan National University College of Biomedical Convergence
          Engineering, South Korea.
        <A class="pl-1 underline">Contact US</A>
      </P>
    </div>
  </div>
</form>