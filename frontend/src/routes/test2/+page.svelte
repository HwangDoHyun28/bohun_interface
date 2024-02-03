<script>
    import Result from '../../lib/Results.svelte';
    import { P, A, Input, Label, Helper } from "flowbite-svelte";
    import { Fileupload, Button, Checkbox } from "flowbite-svelte";
    import { Select } from "flowbite-svelte";
    import { onMount } from 'svelte';
  
    let selected1;
    let selected2;
    let Single_Patient = [
      { value: "Single", name: "Single patient" },
      { value: "Multi", name: "Multiple patients" },
    ];
    let Based = [
      { value: "RPKM", name: "RPKM based" },
      { value: "RANK", name: "Rank based" },
    ];
  
    let value;
    let selected3 = true;
    let selected4 = true;
    let selected5 = true;
    let selected6 = true;
    let selected7 = true;

    export let files;

    let predict = false;

    async function run() {
      // scroll to result page
      window.scrollTo(0,document.body.scrollHeight);
      predict = true;
	}

  </script>    
  
  <form type="submit">
    <div class="rounded-lg border mx-5 px-12 py-10 bg-white">
      <p class="ml-5 text-3xl text-neutral-800 font-semibold mt-5">Ph(+) B-ALL & Ph-like B-ALL Probability Calculator</p>
      <div class="mt-5">
        <div class="w-full px-10 py-3 rounded-lg border-2 border-neutral-300">
          <p class="text-3xl text-neutral-800 font-normal mt-5">Data</p>
          <p class="mt-2 text-neutral-500 text-base font-normal">
            Upload your RPKM matrix file ( csv, tsv, or ... )
          </p>   
          <div>
            <Label class="mt-3 space-y-2 mb-2">
                <Fileupload bind:files={files} />
            </Label>
          </div>
          <div class="mt-10">
            <p class="text-neutral-500 text-base font-normal">
              Single or Multiple Patients
            </p>
            <Select
              id="Patient"
              size="sm" 
              class="mt-3 text-base text-violet-500 bg-inherit border-violet-300 focus:ring-white focus:border-violet-300"
              bind:value={selected1}
            >
              {#each Single_Patient as { value, name }}
                <option {value}>{name}</option>
              {/each}
            </Select>
          </div>
          <hr class="mt-10">
          <p class="mt-8 text-3xl text-violet-800 font-normal">Settings</p>     
          <div>
            <p class="mt-2 text-neutral-500 text-base font-normal">
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
          <div class="mt-12">
            <div>
              <p class="text-neutral-500 text-lg font-normal">
                Quality Check
              </p>
              <div class="mt-4 flex">
                <Checkbox
                id="boxplot-check"
                bind:checked={selected3}
                on:click={() => {
                  selected3 = !selected3;
                }}
                class="w-5 h-5 bg-inherit checked:bg-violet-500 focus:ring-white"/>
                <label class="ml-5 text-neutral-400 text-sm font-normal" for="boxplot-check">
                Adq / fair / inadq
                </label>
              </div>
              <div class="mt-5 flex">
                <Checkbox
                id="boxplot-check"
                bind:checked={selected4}
                on:click={() => {
                  selected4 = !selected4;
                }}
                class="w-5 h-5 bg-inherit checked:bg-violet-300 focus:ring-white"/>
              <p class="ml-5 text-neutral-400 text-sm font-normal">
                House Keeping Gene Value
              </p>
            </div>        
            <div class="mt-10 mb-16 flex">
              <div class>
                <p class="text-neutral-500 text-lg font-normal">
                  Score Class
                </p>
                <div class="mt-4 flex">
                  <Checkbox
                  id="boxplot-check"
                  bind:checked={selected5}
                  on:click={() => {
                    selected5 = !selected5;
                  }}
                  class="h-5 w-5 bg-inherit checked:bg-violet-800 focus:ring-white"
                />
                <p class="ml-5 text-neutral-400 text-sm font-normal">
                  ABL1 Class
                </p>
                </div>
                <div class="mt-5 flex">
                  <Checkbox
                  id="boxplot-check"
                  bind:checked={selected6}
                  on:click={() => {
                    selected6 = !selected6;
                  }}
                  class="w-5 h-5 bg-inherit checked:bg-violet-500 focus:ring-white"
                />
                <p class="ml-5 text-neutral-400 text-sm font-normal">
                  CRLF2 Class
                </p>
                </div>
                <div class="mt-5 flex">
                  <Checkbox
                  id="boxplot-check"
                  bind:checked={selected7}
                  on:click={() => {
                    selected7 = !selected7;
                  }}
                  class="w-5 h-5 bg-inherit checked:bg-violet-300 focus:ring-white"
                />
                <p class="ml-5 text-neutral-400 text-sm font-normal">
                  ABL1-Like Class
                </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-8 text-center">
            <Button
            on:click={() => run()} type="submit"
            class="text-xl font-semibold bg-neutral-700 hover:bg-neutral-800 focus:ring-white-700"
            >Predict Probability</Button>
          </div>
        </div> 
      </div>
      {#if predict==true}
          <Result/>
      {/if}
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