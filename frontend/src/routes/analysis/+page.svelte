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
    <div class="rounded-lg border mx-5 px-20 py-10 bg-white">
      <div class="mt-5">
        <p class="text-4xl text-violet-800 font-semibold my-5">Ph(+) B-ALL & Ph-like B-ALL Probability Calculator</p>
      </div>
      <div class="relative top-0 left-0 mt-10 flex">
        <div class="pl-16 pr-12 py-8 rounded-lg border-2 border-violet-300 pr-80">
          <p class="text-3xl text-violet-800 font-semibold mt-5">Data</p>
          <p class="text-slate-400 text-lg font-normal">
            Upload your RPKM matrix file ( csv, tsv, or ... )
          </p>      
          <div class="flex">
            <div>
              <Button class="y-5 mt-2 py-2 bg-violet-300 hover:bg-violet-400 text-base font-semibold"
                >Select File</Button
              >
            </div>
          <div class="text-center mt-3">
              <Label class="text-slate-300 text-center text-[16px] font-normal px-3 mt-1">{value}</Label>
            </div>
          </div>
          <div>
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
          <p class="text-3xl text-violet-800 font-semibold my-5">Settings</p>     
          <div>
            <p class="text-slate-400 text-lg font-normal">
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
          <div class="mt-0">
            <p class="text-slate-400 text-lg font-normal">
              Quality Check
            </p>
            <div class="flex">
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
            <div class="flex">
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
            <div class="mt-0 relative flex">
              <div>
                <p class="text-slate-400 text-lg font-normal">
                  Score Class
                </p>
                <div class="flex">
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
                <div class="flex">
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
                <div class="flex">
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
              </div>
            </div>  
            <div class="mt-10 place-content-center">
              <Button
              href="/result"
              class="mx-16 text-xl font-semibold bg-violet-700 hover:bg-violet-800 focus:ring-violet-700"
              >Predict Probability</Button
            >
          </div>
        </div>
        <div class="absolute top-0 right-0 ml-10 pl-12 pr-80 py-8 rounded-lg border-2 border-violet-300">
          <p class="text-3xl text-violet-800 font-semibold my-5">Results</p>
          <p class="text-slate-400 text-lg font-normal">
            Quality Check & Probability of Each Class
          </p>     
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