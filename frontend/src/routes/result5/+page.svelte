<script>
  import { page } from '$app/stores';
  import { Button } from "flowbite-svelte";
  import { P, A } from "flowbite-svelte";

  let url = $page.url.search;
  let values = url.split('&');
  let ABL1averageResult = parseFloat(values[0].split('=')[1]).toFixed(4);
  let CRLF2averageResult = parseFloat(values[1].split('=')[1]).toFixed(4);
  let ABL1_LikeaverageResult = parseFloat(values[2].split('=')[1]).toFixed(4);
  let ABL1selected = values[3].split('=')[1];
  let CRLF2selected = values[4].split('=')[1];
  let ABL1_LikeSelected = values[5].split('=')[1];
  let selectedmethod = values[6].split('=')[1];
  console.log('selectedmethod:', selectedmethod);
  console.log('ABL1 Average:', ABL1averageResult);
  console.log('CRLF2 Average:', CRLF2averageResult);
  console.log('ABL1_Like Average:', ABL1_LikeaverageResult);

  // 파일 선택 시 호출되는 함수
  function starlocation(number) {
    let result = parseInt((parseFloat(number) + 1) * 50);
    return `absolute left-[${result}%] w-7 h-7 ml-3 -mt-20 h-fit text-center`;
  }
  console.log('ABL1 Starlocation:', starlocation(ABL1averageResult));
  console.log('CRLF2 Starlocation:', starlocation(CRLF2averageResult));
  console.log('ABL1_Like Starlocation:', starlocation(ABL1_LikeaverageResult));
</script>

<div class="mt-12 rounded-lg border mx-5 px-12 pt-10 bg-white">
  <p class="ml-8 text-3xl text-violet-900 font-medium mt-2">Ph(+) B-ALL Probability Calculator</p>
  <div class="relative w-full px-10 mt-8 mb-0 pt-3 pb-0">
    <p class="text-3xl text-violet-700 font-medium">Results</p>
    <p class="text-violet-400 text-base font-normal mt-2">
      {selectedmethod} Based Probability of Each Class
    </p>   
    <div class="my-10">
      <div class="mt-10">
        <p class="ml-3 text-lg text-neutral-600 font-normal mt-5">Total class</p>
      </div>
      <div class="mt-8 ml-3 relative h-10 pt-2 flex rounded-lg font-medium text-medium text-neutral-500 bg-inherit border-2 border-violet-300">
        <p class="absolute left-2 text-left ml-3">-1</p>
        <p class="absolute left-1/2">0</p>
        <p class="absolute right-4 text-right">1</p>
      </div>  
      <div class="relative mt-1 flex">
        <p class="ml-5 text-sm text-neutral-500">BALLNOS</p>
        <p class="absolute right-0 ml-5 text-sm text-neutral-500">Other Classes</p>
      </div>
      <div class="bg-inherit w-full relative">
        {#if ABL1selected}
          <img
          src="Star_violet_800.svg"
          class={starlocation(ABL1averageResult)}
          alt="Tutorial Logo"
          />
        {/if}
        {#if CRLF2selected}
          <img
          src="Star_violet_500.svg"
          class={starlocation(CRLF2averageResult)}
          alt="Tutorial Logo"
          />
        {/if}
        {#if ABL1_LikeSelected}
          <img
          src="Star_violet_300.svg"
          class={starlocation(ABL1_LikeaverageResult)}
          alt="Tutorial Logo"
          />
        {/if}
      </div>
    </div>              

    {#if ABL1selected == 'true'}
      <div class="my-10">
        <div class="flex mt-10">
          <p class="ml-3 text-lg text-violet-800 font-normal mt-5">ABL1 Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: {ABL1averageResult}</p>
        </div>
        <div class="mt-8 ml-3 relative h-10 pt-2 flex rounded-lg font-medium text-medium text-neutral-500 bg-inherit border-2 border-violet-300">
          <p class="absolute left-2 text-left ml-3">-1</p>
          <p class="absolute left-1/2">0</p>
          <p class="absolute right-4 text-right">1</p>
        </div>  
        <div class="relative mt-1 flex">
          <p class="ml-5 text-sm text-neutral-500">BALLNOS</p>
          <p class="absolute right-0 ml-5 text-sm text-neutral-500">ABL1</p>
        </div>
        <div class="bg-inherit w-full relative">
          <img
          src="Star_violet_800.svg"
          class={starlocation(ABL1averageResult)}
          alt="Tutorial Logo"
          />
        </div>
      </div>              
    {/if}
    {#if CRLF2selected == 'true'}
      <div class="my-10">
        <div class="flex mt-10">
          <p class="ml-3 text-lg text-violet-500 font-normal mt-5">CRLF2 Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: {CRLF2averageResult}</p>
        </div>
        <div class="mt-8 ml-3 relative h-10 pt-2 flex rounded-lg font-medium text-medium text-neutral-500 bg-inherit border-2 border-violet-300">
          <p class="absolute left-2 text-left ml-3">-1</p>
          <p class="absolute left-1/2">0</p>
          <p class="absolute right-4 text-right">1</p>
        </div>  
        <div class="relative mt-1 flex">
          <p class="ml-5 text-sm text-neutral-500">BALLNOS</p>
          <p class="absolute right-0 ml-5 text-sm text-neutral-500">CRLF2</p>
        </div>
        <div class="bg-inherit w-full relative">
          <img
          src="Star_violet_500.svg"
          class={starlocation(CRLF2averageResult)}
          alt="Tutorial Logo"
          />
        </div>
      </div>              
    {/if}  
    {#if ABL1_LikeSelected == 'true'}
      <div class="my-10">
        <div class="flex mt-10">
          <p class="ml-3 text-lg text-violet-300 font-normal mt-5">ABL1-Like Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: {ABL1_LikeaverageResult}</p>
        </div>
        <div class="mt-8 ml-3 relative h-10 pt-2 flex rounded-lg font-medium text-medium text-neutral-500 bg-inherit border-2 border-violet-300">
          <p class="absolute left-2 text-left ml-3">-1</p>
          <p class="absolute left-1/2">0</p>
          <p class="absolute right-4 text-right">1</p>
        </div>  
        <div class="relative mt-1 flex">
          <p class="ml-5 text-sm text-neutral-500">BALLNOS</p>
          <p class="absolute right-0 ml-5 text-sm text-neutral-500">ABL1-Like</p>
        </div>
        <div class="bg-inherit w-full relative">
          <img
          src="Star_violet_300.svg"
          class={starlocation(ABL1_LikeaverageResult)}
          alt="Tutorial Logo"
          />
        </div>
      </div>              
    {/if}
    <div class="my-12 text-center">
      <Button
      href="/result3"
      class="mb-5 px-7 text-xl font-semibold bg-violet-800 hover:bg-violet-900 focus:ring-white"
      >Return</Button>
    </div>
    <div class="w-full bg-inherit text-center">
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