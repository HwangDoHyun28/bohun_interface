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
    let result = parseInt((parseFloat(number) + 1) * 46.5 + 2);
    return result;
  }
  console.log('ABL1 Starlocation:', starlocation(ABL1averageResult));
  console.log('CRLF2 Starlocation:', starlocation(CRLF2averageResult));
  console.log('ABL1_Like Starlocation:', starlocation(ABL1_LikeaverageResult));
</script>

<div class="relative mt-12 rounded-lg border mx-5 px-12 pt-10 bg-white">
  <p class="ml-8 text-3xl text-violet-900 font-medium mt-2">Ph(+) B-ALL Probability Calculator</p>
  <div class="relative w-full px-10 mt-8 pt-3">
    <p class="text-3xl text-violet-700 font-medium">Results</p>
    <p class="text-violet-400 text-base font-normal mt-2">
      {selectedmethod} Based Probability of Each Class
    </p>   
    <div class="my-10">
      <div class="mt-10">
        <p class="ml-3 text-lg text-neutral-500 font-medium mt-5">Total class</p>
      </div>
      <div class="mt-5 ml-2 relative h-9 pt-2 flex rounded-lg font-semibold text-medium text-neutral-400 bg-inherit border-2 border-violet-300">
        <p class="absolute -mt-1 left-2 text-left ml-3">-1</p>
        <p class="absolute -mt-1 ml-4 left-[48%]">0</p>
        <p class="absolute -mt-1 right-4 text-right">1</p>
      </div>  
      <div class="relative mt-1 flex">
        <p class="ml-5 text-xs text-neutral-500">BALLNOS</p>
        <p class="absolute right-0 ml-5 text-xs text-neutral-500">Other Classes</p>
      </div>
      <div class="mt-2 bg-inherit w-full relative">
        {#if ABL1selected == 'true'}
          <img
          src="Star_violet_800_2.svg"
          class="absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
          style="left: {`${starlocation(ABL1averageResult)}%`}"
          alt="Tutorial Logo"
          />
        {/if}
        {#if CRLF2selected == 'true'}
          <img
          src="Star_violet_500_2.svg"
          class="absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
          style="left: {`${starlocation(CRLF2averageResult)}%`}"
          alt="Tutorial Logo"
          />
        {/if}
        {#if ABL1_LikeSelected == 'true'}
        <img
        src="Star_violet_300_2.svg"
        class="absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
        style="left: {`${starlocation(ABL1_LikeaverageResult)}%`}"
        alt="Tutorial Logo"
        />
        {/if}
      </div>
    </div>              

    {#if ABL1selected == 'true'}
      <div class="my-10">
        <div class="flex mt-10">
          <p class="ml-3 text-lg text-violet-800 font-medium mt-5">ABL1 Class</p>
          <p class="mt-5 ml-1 text-lg text-neutral-400 font-lg mt-5">: {ABL1averageResult}</p>
        </div>
        <div class="mt-5 ml-3 relative h-9 pt-2 flex rounded-lg font-semibold text-medium text-neutral-400 bg-inherit border-2 border-violet-300">
          <p class="absolute -mt-1 left-2 text-left ml-3">-1</p>
          <p class="absolute -mt-1 ml-4 left-[47.7%]">0</p>
          <p class="absolute -mt-1 right-4 text-right">1</p>
        </div>  
        <div class="relative mt-1 flex">
          <p class="ml-5 text-xs text-neutral-500">BALLNOS</p>
          <p class="absolute right-0 ml-5 text-xs text-neutral-500">ABL1</p>
        </div>
        <div class="mt-2 bg-inherit w-full relative">
          <img
          src="Star_violet_800_2.svg"
          class="absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
          style="left: {`${starlocation(ABL1averageResult)}%`}"
          alt="Tutorial Logo"
          />
        </div>
      </div>              
    {/if}
    {#if CRLF2selected == 'true'}
      <div class="my-10">
        <div class="flex mt-10">
          <p class="ml-3 text-lg text-violet-500 font-medium mt-5">CRLF2 Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: {CRLF2averageResult}</p>
        </div>
        <div class="mt-5 ml-3 relative h-9 pt-2 flex rounded-lg font-semibold text-medium text-neutral-400 bg-inherit border-2 border-violet-300">
          <p class="absolute -mt-1 left-2 text-left ml-3">-1</p>
          <p class="absolute -mt-1 ml-4 left-[47.7%]">0</p>
          <p class="absolute -mt-1 right-4 text-right">1</p>
        </div>  
        <div class="relative mt-1 flex">
          <p class="ml-5 text-xs text-neutral-500">BALLNOS</p>
          <p class="absolute right-0 ml-5 text-xs text-neutral-500">CRLF2</p>
        </div>
        <div class="mt-2 bg-inherit w-full relative">
          <img
          src="Star_violet_500_2.svg"
          class="absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
          style="left: {`${starlocation(CRLF2averageResult)}%`}"
          alt="Tutorial Logo"
          />
        </div>
      </div>              
    {/if}  
    {#if ABL1_LikeSelected == 'true'}
      <div class="my-10">
        <div class="flex mt-10">
          <p class="ml-3 text-lg text-violet-300 font-medium mt-5">ABL1-Like Class</p>
          <p class="mt-5 ml-2 text-lg text-neutral-400 font-lg mt-5">: {ABL1_LikeaverageResult}</p>
        </div>
        <div class="mt-5 ml-3 relative h-9 pt-2 flex rounded-lg font-semibold text-medium text-neutral-400 bg-inherit border-2 border-violet-300">
          <p class="absolute -mt-1 left-2 text-left ml-3">-1</p>
          <p class="absolute -mt-1 ml-4 left-[47.7%]">0</p>
          <p class="absolute -mt-1 right-4 text-right">1</p>
        </div>  
        <div class="relative mt-1 flex">
          <p class="ml-5 text-xs text-neutral-500">BALLNOS</p>
          <p class="absolute right-0 ml-5 text-xs text-neutral-500">ABL1-Like</p>
        </div>
        <div class="mt-2 bg-inherit w-full relative">
          <img
          src="Star_violet_300_2.svg"
          class="absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
          style="left: {`${starlocation(ABL1_LikeaverageResult)}%`}"
          alt="Tutorial Logo"
          />
        </div>
      </div>              
    {/if}
    <div class="my-12 text-center">
      <Button
      href="/analysis"
      class="mb-5 px-7 text-xl font-semibold bg-violet-800 hover:bg-violet-900 focus:ring-white"
      >Return</Button>
    </div>
    <footer>
      <div class="mt-16 mb-2 px-2 sm:px-4">
          <div class="mx-auto flex flex-col container">
              <P class="text-violet-700 text-center">This website is maintained by <A class="text-violet-400 underline" href="https://sites.google.com/view/kimlab" target="_blank">Computational Omics Lab</A>, Pusan National University College of Biomedical Convergence Engineering, South Korea. </P>
          </div>
      </div>
    </footer>
  </div>
</div>
