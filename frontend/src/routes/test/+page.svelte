<script>
  import { P, A, Input, Label, Helper } from "flowbite-svelte";
  import { Fileupload, Button, Checkbox } from "flowbite-svelte";
  import { Select } from "flowbite-svelte";
  import { onMount } from 'svelte';

  let selected1;
  let selected2;
  let Single_Patient = [
    { value: "Single", name: "Single_Patient" },
    { value: "Multi", name: "Multi_Patients" },
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
</script>    

<form type="submit">
  <div class="rounded-lg border mx-5 px-12 py-10 bg-white">
    <p class="ml-5 text-3xl text-violet-800 font-medium mt-5">Ph(+) B-ALL & Ph-like B-ALL Probability Calculator</p>
    <div class="mt-5">
      <div class="w-full px-10 py-3 rounded-lg border-2 border-neutral-300">
        <p class="text-3xl text-violet-800 font-normal mt-5">Data</p>
        <p class="mt-2 text-neutral-500 text-base font-normal">
          Upload your RPKM matrix file ( csv, tsv, or ... )
        </p>   
        <Label class="w-32 mt-1 space-y-2 mb-2">
          <Fileupload class = "w-32 opacity-0" bind:value/>
        </Label>           
        <div class="-mt-12 flex">
          <div>
            <Button class="y-4 mt-1 py-2 bg-violet-300 hover:bg-violet-400 text-base font-semibold"
              >Select File</Button
            >
          </div>
          <div class="text-center mt-4">
            <Label class="text-neutral-300 text-center text-[16px] font-normal px-3 mt-1">{value}</Label>
          </div>
        </div>
        <div class="mt-10">
          <p class="text-neutral-500 text-base font-normal">
            Single or Multiple Patient
          </p>
          <Select
            id="Patient"
            size="sm" 
            placeholder="Number of Patients"
            class="mt-3 text-base text-violet-500 bg-inherit border-violet-300 focus:ring-white focus:border-violet-300"
            bind:value={selected1}
          >
            <option selected value="all">Number of patients</option>
  
            {#each Single_Patient as { value, name }}
              <option {value}>{name}</option>
            {/each}
          </Select>
        </div>
        <p class="mt-16 text-3xl text-violet-800 font-normal">Settings</p>     
        <div>
          <p class="mt-2 text-neutral-500 text-base font-normal">
            RPKM or RANK Based
          </p>
          <Select
            id="Patient"
            size="sm" 
            placeholder="Data Format"
            class="mt-3 text-base text-violet-500 bg-inherit border-violet-300 focus:ring-white focus:border-violet-300"
            bind:value={selected2}
          >
            <option selected value="all">Data Format</option>
  
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
              <p class="ml-5 text-neutral-400 text-sm font-normal">
              Adq / fair / inadq
              </p>
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
          href="/result"
          class="text-xl font-semibold bg-violet-700 hover:bg-violet-800 focus:ring-violet-700"
          >Predict Probability</Button>
        </div>
      </div> 
    </div>
    <div class="w-full px-10 mt-10 mb-5 pt-3 pb-10 rounded-lg border-2 border-neutral-300">
      <p class="text-3xl text-violet-800 font-normal mt-5">Results</p>
      <p class="text-neutral-500 text-base font-normal mt-2">
        Probability of Each Class
      </p>   
      <div class="flex mt-3">
        <p class="text-xl text-violet-800 font-normal my-5">Probability Score</p>
        <p class="mt-6 ml-2 text-sm text-violet-400 font-normal my-5">(Range: -1 ~ 1)</p>
      </div>
      <div>
        <p class="ml-3 text-lg text-neutral-600 font-normal">Total class</p>
        <div>
          <div class="relative flex">
            <img
            src="red_triangle.svg"
            class="absolute left-16 ml-3 mt-4 h-fit text-center"
            alt="Tutorial Logo"
            />
            <img
            src="yellow_triangle.svg"
            class="absolute ml-3 mt-4 left-10 h-fit text-center"
            alt="Tutorial Logo"
            />
            <img
            src="blue_triangle.svg"
            class="ml-3 mt-4 absolute h-fit text-center"
            alt="Tutorial Logo"
            />
          </div>
          <div class="mt-8 ml-3 relative h-11 pt-2 pb-4 flex rounded-lg font-semibold text-medium text-neutral-500 bg-inherit border-2 border-neutral-300">
            <p class="absolute left-2 text-left ml-3">-1</p>
            <p class="absolute left-1/2">0</p>
            <p class="absolute right-4 text-right">1</p>
          </div>
        </div>
      </div>
      <div>
        <div class="flex mt-5">
          <p class="ml-3 text-lg text-red-500 font-normal mt-5">ABL1 Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: -0.0078</p>
        </div>
        <div class="relative">
          <img
          src="red_triangle.svg"
          class="absolute ml-3 mt-4 h-fit text-center"
          alt="Tutorial Logo"
          />
        </div>  
        <div class="mt-8 ml-3 relative h-11 pt-2 pb-4 flex rounded-lg font-semibold text-medium text-neutral-500 bg-inherit border-2 border-neutral-300">
          <p class="absolute left-2 text-left ml-3">-1</p>
          <p class="absolute left-1/2">0</p>
          <p class="absolute right-4 text-right">1</p>
        </div>  
      </div>
      <div>
        <div class="flex mt-5">
          <p class="ml-3 text-lg text-yellow-300 font-normal mt-5">CRLF2 Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: -0.8765</p>
        </div>
        <div class="relative">
          <img
          src="yellow_triangle.svg"
          class="absolute ml-3 mt-4 h-fit text-center"
          alt="Tutorial Logo"
          />
        </div>
        <div class="mt-8 ml-3 relative h-11 pt-2 pb-4 flex rounded-lg font-semibold text-medium text-neutral-500 bg-inherit border-2 border-neutral-300">
          <p class="absolute left-2 text-left ml-3">-1</p>
          <p class="absolute left-1/2">0</p>
          <p class="absolute right-4 text-right">1</p>
        </div>  
      </div>
      <div>
        <div class="flex mt-5">
          <p class="ml-3 text-lg text-blue-500 font-normal mt-5">ABL1-Like Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: 0.0236</p>
        </div>
        <div class="relative">
          <img
          src="blue_triangle.svg"
          class="absolute ml-3 mt-4 h-fit text-center"
          alt="Tutorial Logo"
          />
        </div>
        <div class="mt-8 ml-3 relative h-11 pt-2 pb-4 flex rounded-lg font-semibold text-medium text-neutral-500 bg-inherit border-2 border-neutral-300">
          <p class="absolute left-2 text-left ml-3">-1</p>
          <p class="absolute left-1/2">0</p>
          <p class="absolute right-4 text-right">1</p>
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