<script>
  import { Input, Label, Helper } from "flowbite-svelte";
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
  <div class="rounded-lg border mx-5 px-16 py-10 bg-white">
    <div class="mt-5">
      <p class="text-3xl text-violet-800 font-medium my-5">Ph(+) B-ALL & Ph-like B-ALL Probability Calculator</p>
    </div>
    <div class="mt-12 flex">
      <div class="w-1/2 px-16 py-8 mb-0 rounded-lg border-2 border-violet-300">
        <p class="text-4xl text-violet-800 font-semibold mt-5">Data</p>
        <p class="mt-3 text-neutral-500 text-lg font-normal">
          Upload your RPKM matrix file ( csv, tsv, or ... )
        </p>   
        <Label class="w-32 mt-1 space-y-2 mb-2">
          <Fileupload class = "w-32 opacity-0" bind:value/>
        </Label>           
        <div class="-mt-12 flex">
          <div>
            <Button class="y-5 mt-3 py-2 bg-violet-300 hover:bg-violet-400 text-base font-semibold"
              >Select File</Button
            >
          </div>
          <div class="text-center mt-4">
            <Label class="text-neutral-300 text-center text-[16px] font-normal px-3 mt-1">{value}</Label>
          </div>
        </div>
        <div class="mt-16">
          <p class="text-neutral-500 text-lg font-normal">
            Single or Multiple Patient
          </p>
          <Select
            id="Patient"
            size="sm" 
            placeholder="Small input"
            class="mt-3 text-base text-violet-500 bg-inherit border-violet-300 focus:ring-white focus:border-violet-300"
            bind:value={selected1}
          >
            <option selected value="all">Number of patients</option>
  
            {#each Single_Patient as { value, name }}
              <option {value}>{name}</option>
            {/each}
          </Select>
        </div>
        <img
        src="dotted_line.svg"
        class="mt-12 h-fit text-center"
        alt="Tutorial Logo"
        />
        <p class="mt-12 text-3xl text-violet-800 font-semibold">Settings</p>     
        <div>
          <p class="mt-3 text-neutral-500 text-lg font-normal">
            RPKM or RANK Based
          </p>
          <Select
            id="Patient"
            size="sm" 
            placeholder="Small input"
            class="mt-3 text-base text-violet-500 bg-inherit border-violet-300 focus:ring-white focus:border-violet-300"
            bind:value={selected2}
          >
            <option selected value="all">Data Format</option>
  
            {#each Based as { value, name }}
              <option {value}>{name}</option>
            {/each}
          </Select>
        </div>
        <div class="mt-16">
          <p class="text-neutral-500 text-lg font-medium">
            Quality Check
          </p>
          <div class="mt-5 flex">
            <Checkbox
            id="boxplot-check"
            bind:checked={selected3}
            on:click={() => {
              selected3 = !selected3;
            }}
            class="w-5 h-5 bg-inherit checked:bg-violet-500 focus:ring-white"
          />
          <p class="ml-5 text-neutral-400 text-base font-normal">
            Adq / fair / inadq
          </p>
          </div>
          <div class="mt-6 flex">
            <Checkbox
            id="boxplot-check"
            bind:checked={selected4}
            on:click={() => {
              selected4 = !selected4;
            }}
            class="w-5 h-5 bg-inherit checked:bg-violet-300 focus:ring-white"
          />
          <p class="ml-5 text-neutral-400 text-base font-normal">
            House Keeping Gene Value
          </p>
          </div>
          </div>
          <div class="mt-16 mb-16 relative flex">
            <div>
              <p class="text-neutral-500 text-lg font-medium">
                Score Class
              </p>
              <div class="mt-6 flex">
                <Checkbox
                id="boxplot-check"
                bind:checked={selected5}
                on:click={() => {
                  selected5 = !selected5;
                }}
                class="h-5 w-5 bg-inherit checked:bg-violet-800 focus:ring-white"
              />
              <p class="ml-5 text-neutral-400 text-base font-normal">
                ABL1 Class
              </p>
              </div>
              <div class="mt-6 flex">
                <Checkbox
                id="boxplot-check"
                bind:checked={selected6}
                on:click={() => {
                  selected6 = !selected6;
                }}
                class="w-5 h-5 bg-inherit checked:bg-violet-500 focus:ring-white"
              />
              <p class="ml-5 text-neutral-400 text-base font-normal">
                CRLF2 Class
              </p>
              </div>
              <div class="mt-6 flex">
                <Checkbox
                id="boxplot-check"
                bind:checked={selected7}
                on:click={() => {
                  selected7 = !selected7;
                }}
                class="w-5 h-5 bg-inherit checked:bg-violet-300 focus:ring-white"
              />
              <p class="ml-5 text-neutral-400 text-base font-normal">
                ABL1-Like Class
              </p>
              </div>
            </div>
            <div class="absolute top-0 right-0">
              <p class="text-neutral-500 text-lg font-medium">
                Color Palette
              </p> 
              <div class="mt-4 ml-10 rounded-full w-8 h-8 bg-red-500"/>
              <div class="mt-4 ml-10 rounded-full w-8 h-8 bg-yellow-300"/>   
              <div class="mt-4 ml-10 rounded-full w-8 h-8 bg-blue-500"/>   
            </div>
          </div>  
          <div class="relative my-10 place-content-center">
            <Button
            href="/result"
            class="ml-32 object-center mt-12 mb-5 text-xl font-semibold bg-violet-700 hover:bg-violet-800 focus:ring-violet-700"
            >Predict Probability</Button>
          </div>
      </div>
      <div class="w-1/2 px-16 ml-10 mb-0 pl-16 pt-8 rounded-lg border-2 border-violet-300">
        <p class="text-4xl text-violet-800 font-semibold my-5">Results</p>
        <p class="text-neutral-500 text-lg font-normal">
          Quality Check & Probability of Each Class
        </p>   
        <div class="mt-8 ml-8">
          <div>
            <p class="text-violet-500 text-2xl font-semibold">QC 1</p>
            <div class="flex">
              <p class="mt-3 ml-3 text-neutral-400 text-lg font-normal">AdqAdq / fair / inadq</p>
            </div>
          </div>
          <div>
            <p class="mt-12 text-violet-300 text-2xl font-semibold">QC 2</p>
            <div class="flex">
              <p class="mt-3 ml-3 text-neutral-400 text-lg font-normal">House Keeping Gene Value</p>
            </div>
          </div>
        </div>
        <img
        src="dotted_line.svg"
        class="mt-12 h-fit text-center"
        alt="Tutorial Logo"
        />
        <div class="flex mt-8">
          <p class="ml-0 text-2xl text-violet-800 font-semibold my-5">Probability Score</p>
          <p class="mt-7 ml-2 text-base text-violet-500 font-semibold my-5">(Range: -1 ~ 1)</p>
        </div>
        <div>
          <p class="ml-3 text-xl text-violet-800 font-semibold mt-3">Total class</p>
          <div>
            <div class="relative mt-0 flex">
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
            <div class="mt-8 ml-3 relative h-11 pt-2 pb-4 flex rounded-lg font-bold text-medium text-violet-500 bg-inherit border-2 border-violet-500">
              <p class="absolute left-2 text-left ml-3">-1</p>
              <p class="absolute left-1/2">0</p>
              <p class="absolute right-4 text-right">1</p>
            </div>
          </div>
        </div>
        <div>
          <div class="flex mt-12">
            <p class="ml-3 text-xl text-red-500 font-semibold mt-5">ABL1 Class</p>
            <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: -0.0078</p>
          </div>
          <div class="relative">
            <img
            src="red_triangle.svg"
            class="absolute ml-3 mt-4 h-fit text-center"
            alt="Tutorial Logo"
            />
          </div>  
          <div class="mt-8 ml-3 relative h-11 pt-2 pb-4 flex rounded-lg bg-amber-0 mt-0 font-bold text-medium text-red-500 bg-inherit border-2 border-red-500">
            <p class="absolute left-2 text-left ml-3">-1</p>
            <p class="absolute left-1/2">0</p>
            <p class="absolute right-4 text-right">1</p>
          </div>  
        </div>
        <div>
          <div class="flex mt-12">
            <p class="ml-3 text-xl text-yellow-300 font-semibold mt-5">CRLF2 Class</p>
            <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: -0.8765</p>
          </div>
          <div class="relative">
            <img
            src="yellow_triangle.svg"
            class="absolute ml-3 mt-4 h-fit text-center"
            alt="Tutorial Logo"
            />
          </div>
          <div class="mt-8 ml-3 relative h-11 pt-2 pb-4 flex rounded-lg bg-amber-0 mt-0 font-bold text-medium text-yellow-300 bg-inherit border-2 border-yellow-300">
            <p class="absolute left-2 text-left ml-3">-1</p>
            <p class="absolute left-1/2">0</p>
            <p class="absolute right-4 text-right">1</p>
          </div>  
        </div>
        <div>
          <div class="flex mt-12">
            <p class="ml-3 text-xl text-blue-500 font-semibold mt-5">ABL1-Like Class</p>
            <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: 0.0236</p>
          </div>
          <div class="relative">
            <img
            src="blue_triangle.svg"
            class="absolute ml-3 mt-4 h-fit text-center"
            alt="Tutorial Logo"
            />
          </div>
          <div class="mt-8 ml-3 relative h-11 pt-2 pb-4 flex rounded-lg bg-amber-0 mt-0 font-bold text-medium text-blue-500 bg-inherit border-2 border-blue-500">
            <p class="absolute left-2 text-left ml-3">-1</p>
            <p class="absolute left-1/2">0</p>
            <p class="absolute right-4 text-right">1</p>
          </div>
        </div>
        </div>
        </div>
    
  
    <div class="mt-12 -mb-10 ml-0 h-max bg-inherit hover:bg-inherit rounded-lg place-content-center">
      <Button target="self"
      href="https://pnucolab.com/"
      class="-mt-96 ml-3 h-max bg-inherit hover:bg-inherit rounded-lg place-content-center focus:ring-white">
        <img
        src="lab_tag.svg"
        alt="Tutorial Logo"
      />
      </Button>
    </div>
  </div>
</form>