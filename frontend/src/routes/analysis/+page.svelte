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
        <p class="text-4xl text-violet-800 font-[450] my-5">Ph(+) B-ALL & Ph-like B-ALL Probability Calculator</p>
      </div>
      <div class="mt-10 flex">
        <div class="w-1/2 px-16 py-8 rounded-lg border-2 border-violet-300">
          <p class="text-4xl text-violet-800 font-[450] mt-5">Data</p>
          <p class="mt-3 text-neutral-400 text-lg font-normal">
            Upload your RPKM matrix file ( csv, tsv, or ... )
          </p>      
          <div class="mt-3 flex">
            <div>
              <Button class="y-5 mt-2 py-2 bg-violet-300 hover:bg-violet-400 text-base font-semibold"
                >Select File</Button
              >
            </div>
          <div class="text-center mt-3">
              <Label class="text-slate-300 text-center text-[16px] font-normal px-3 mt-1">{value}</Label>
            </div>
          </div>
          <div class="mt-8">
            <p class="text-slate-400 text-lg font-normal">
              Single or Multiple Patient
            </p>
            <Select
              id="Patient"
              class="mt-2 text-slate-500 bg-inherit focus:ring-white focus:border-spadoma1"
              bind:value={selected1}
              placeholder=""
            >
              <option selected value="all">Number of patients</option>
    
              {#each Single_Patient as { value, name }}
                <option {value}>{name}</option>
              {/each}
            </Select>
          </div>
          <p class="mt-20 text-3xl text-violet-800 font-semibold">Settings</p>     
          <div>
            <p class="mt-1 text-slate-400 text-lg font-normal">
              RPKM or RANK Based
            </p>
            <Select
              id="Based"
              class="mt-2 text-slate-500 bg-inherit focus:ring-white focus:border-violet-300"
              bind:value={selected1}
              placeholder=""
            >
              <option selected value="all">Data Format</option>
    
              {#each Based as { value, name }}
                <option {value}>{name}</option>
              {/each}
            </Select>
          </div>
          <div class="mt-10">
            <p class="text-slate-400 text-lg font-normal">
              Quality Check
            </p>
            <div class="mt-3 flex">
              <Checkbox
              id="boxplot-check"
              bind:checked={selected3}
              on:click={() => {
                selected3 = !selected3;
              }}
              class="bg-inherit checked:bg-violet-500 focus:ring-white"
            />
            <p class="text-slate-400 text-lg font-normal">
              Adq / fair / inadq
            </p>
            </div>
            <div class="mt-3 flex">
              <Checkbox
              id="boxplot-check"
              bind:checked={selected4}
              on:click={() => {
                selected4 = !selected4;
              }}
              class="bg-inherit checked:bg-violet-300 focus:ring-white"
            />
            <p class="text-slate-400 text-lg font-normal">
              House Keeping Gene Value
            </p>
            </div>
            </div>
            <div class="mt-10 mb-16 relative flex">
              <div class="mt-0">
                <p class="text-slate-400 text-lg font-normal">
                  Score Class
                </p>
                <div class="mt-3 flex">
                  <Checkbox
                  id="boxplot-check"
                  bind:checked={selected5}
                  on:click={() => {
                    selected5 = !selected5;
                  }}
                  class="bg-inherit checked:bg-violet-800 focus:ring-white"
                />
                <p class="text-slate-400 text-lg font-normal">
                  ABL1 Class
                </p>
                </div>
                <div class="mt-3 flex">
                  <Checkbox
                  id="boxplot-check"
                  bind:checked={selected6}
                  on:click={() => {
                    selected6 = !selected6;
                  }}
                  class="bg-inherit checked:bg-violet-500 focus:ring-white"
                />
                <p class="text-slate-400 text-lg font-normal">
                  CRLF2 Class
                </p>
                </div>
                <div class="mt-3 flex">
                  <Checkbox
                  id="boxplot-check"
                  bind:checked={selected7}
                  on:click={() => {
                    selected7 = !selected7;
                  }}
                  class="bg-inherit checked:bg-violet-300 focus:ring-white"
                />
                <p class="text-slate-400 text-lg font-normal">
                  ABL1-Like Class
                </p>
                </div>
              </div>
              <div class="absolute top-0 right-0">
                <p class="text-slate-400 text-lg font-normal">
                  Color Palette
                </p> 
                <div class="mt-3 ml-10 rounded-full w-6 h-6 bg-red-500"/>
                <div class="mt-3 ml-10 rounded-full w-6 h-6 bg-yellow-300"/>   
                <div class="mt-3 ml-10 rounded-full w-6 h-6 bg-blue-500"/>   
              </div>
            </div>  
            <div class="relative my-10 place-content-center">
              <Button
              href="/result"
              class="ml-48 object-center text-xl font-semibold bg-violet-700 hover:bg-violet-800 focus:ring-violet-700"
              >Predict Probability</Button>
            </div>
        </div>
        <div class="w-1/2 px-16 ml-10 pl-16 py-8 rounded-lg border-2 border-violet-300">
          <p class="text-4xl text-violet-800 font-[450] my-5">Results</p>
          <p class="text-neutral-400 text-lg font-normal">
            Quality Check & Probability of Each Class
          </p>   
          <div class="mt-8 ml-12">
            <div>
              <p class="text-violet-500 text-3xl font-normal">QC 1</p>
              <div class="flex">
                <p class="mt-3 ml-3 text-neutral-400 text-lg font-normal">AdqAdq / fair / inadq</p>
              </div>
            </div>
            <div>
              <p class="mt-16 text-violet-300 text-3xl font-normal">QC 2</p>
              <div class="flex">
                <p class="mt-3 ml-3 text-neutral-400 text-lg font-normal">House Keeping Gene Value</p>
              </div>
            </div>
          </div>
          <img
          src="dotted_line.svg"
          class="mt-20 h-fit text-center"
          alt="Tutorial Logo"
          />
          <div class="flex mt-12">
            <p class="ml-5 text-3xl text-violet-800 font-[450] my-5">Probability Score</p>
            <p class="mt-6 ml-2 text-xl text-violet-800 font-[450] my-5">(Range: -1 ~ 1)</p>
          </div>
          <div class="mt-0">
            <p class="ml-5 text-3xl text-violet-800 font-lg my-5">Total class</p>
          </div>
          <img
          src="scorebar_purple.svg"
          class="ml-20 mt-10 h-fit text-center"
          alt="Tutorial Logo"
          />
          <div class="flex mt-12">
            <p class="ml-5 text-3xl text-neutral-500 font-lg my-5">ABL1 Class</p>
            <p class="mt-6 ml-2 text-2xl text-neutral-400 font-lg my-5">: -0.0078</p>
          </div>
          <img
          src="scorebar_red.svg"
          class="ml-20 mt-10 h-fit text-center"
          alt="Tutorial Logo"
          />
          <div class="flex mt-12">
            <p class="ml-5 text-3xl text-violet-800 font-lg my-5">CRLF2 Class</p>
            <p class="mt-6 ml-2 text-xl text-violet-800 font-lg my-5">: -0.8765</p>
          </div>
          <img
          src="scorebar_yellow.svg"
          class="ml-20 mt-10 h-fit text-center"
          alt="Tutorial Logo"
          />
          <div class="flex mt-12">
            <p class="ml-5 text-3xl text-violet-800 font-lg my-5">ABL1-Like Class</p>
            <p class="mt-6 ml-2 text-xl text-violet-800 font-lg my-5">: 0.0236</p>
          </div>
          <img
          src="scorebar_blue.svg"
          class="ml-20 mt-10 h-fit text-center"
          alt="Tutorial Logo"
          />
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