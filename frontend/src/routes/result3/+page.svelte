<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { Button } from "flowbite-svelte";
  import { P, A } from "flowbite-svelte";
  import { Popover } from 'flowbite-svelte';
  import { Input } from 'flowbite-svelte';

  let ABL1averageResultstr = [];
  let CRLF2averageResultstr = [];
  let ABL1_LikeaverageResultstr = [];
  let patientIDnumberstr = [];
  
  // 페이지당 결과 수 설정 
  let currentPage = 1; // 현재 페이지
  const pagesToShow = 5; // 페이지네이션에 표시할 페이지 수
  let totalPages = 0; // 총 페이지 수


  // 변수를 reactive하게 선언합니다.
  let ABL1averageResult = writable('');
  let CRLF2averageResult = writable('');
  let ABL1_LikeaverageResult = writable('');
  let ABL1selected = writable('');
  let CRLF2selected = writable('');
  let ABL1_LikeSelected = writable('');
  let selectedmethod = writable('');
  let patientIDnumber = writable('');

  let params;

  onMount(() => {
    params = new URLSearchParams(window.location.search);

    // 변수 값이 변경되면 store에 새로운 값을 설정합니다.
    ABL1averageResult.set(params.get('ABL1') || '');
    CRLF2averageResult.set(params.get('CRLF2') || '');
    ABL1_LikeaverageResult.set(params.get('ABL1_L') || '');
    ABL1selected.set(params.get('ABL1s') || '');
    CRLF2selected.set(params.get('CRLF2s') || '');
    ABL1_LikeSelected.set(params.get('ABL1_Ls') || '');
    selectedmethod.set(params.get('smthd') || '');
    patientIDnumber.set(params.get('PatID') || '');
  });

  // ABL1averageResult 값이 변경될 때마다 실행됩니다.
  ABL1averageResult.subscribe(value => {
    // value를 decode하고 배열에 추가하는 등의 작업을 수행합니다.
    let decodedArray = decodearray(value);
    console.log('ABL1 Average:', decodedArray);
    // 새로운 변수에 저장하려면 아래와 같이 할당합니다.
    ABL1averageResultstr = decodedArray;
    console.log('ABL1averageResultstr:', ABL1averageResultstr);
  });

  // CRLF2averageResult 값이 변경될 때마다 실행됩니다.
  CRLF2averageResult.subscribe(value => {
    let decodedArray = decodearray(value);
    console.log('CRLF2 Average:', decodedArray);
    CRLF2averageResultstr = decodedArray;
    console.log('CRLF2averageResultstr:', CRLF2averageResultstr);
  });

  // ABL1_LikeaverageResult 값이 변경될 때마다 실행됩니다.
  ABL1_LikeaverageResult.subscribe(value => {
    let decodedArray = decodearray(value);
    console.log('ABL1_Like Average:', decodedArray);
    ABL1_LikeaverageResultstr = decodedArray;
    console.log('ABL1_LikeaverageResultstr:', ABL1_LikeaverageResultstr);
  });

  // ABL1selected 값이 변경될 때마다 실행됩니다.
  ABL1selected.subscribe(value => {
    console.log('Selected ABL1:', value);
  });

  // CRLF2selected 값이 변경될 때마다 실행됩니다.
  CRLF2selected.subscribe(value => {
    console.log('Selected CRLF2:', value);
  });

  // ABL1_LikeSelected 값이 변경될 때마다 실행됩니다.
  ABL1_LikeSelected.subscribe(value => {
    console.log('Selected ABL1_Like:', value);
  });

  // selectedmethod 값이 변경될 때마다 실행됩니다.
  selectedmethod.subscribe(value => {
    console.log('Selected Method:', value);
  });

  // patientIDnumber 값이 변경될 때마다 실행됩니다.
  patientIDnumber.subscribe(value => {
    console.log('Patient ID:', value);
    // +를 기준으로 split하여 첫 번째 값을 제외하고, 마지막 값의 '\r'을 제거한 나머지 값을 patientIDnumberstr에 할당합니다.
    let splitValues = value.split('+').slice(1);
    patientIDnumberstr = splitValues.map(item => item.replace(/\r$/, ''));
    console.log('patientIDnumberstr:', patientIDnumberstr);
    let resultsPerPage = 1; // 한 페이지당 결과 수
    totalPages = Math.ceil(patientIDnumberstr.length / resultsPerPage); // 총 페이지 수
    console.log('Total Pages:', totalPages);
  });

  function decodearray(str) {
    let blob = atob(str);
    let ary_buf = new ArrayBuffer(blob.length);
    let dv = new DataView(ary_buf);
    for (let i = 0; i < blob.length; i++) dv.setUint8(i, blob.charCodeAt(i));

    // For WebGL Buffers, can skip Float32Array, just return ArrayBuffer is all thats needed.
    let f32_ary = new Float32Array(ary_buf);

    return f32_ary;
  }

  // 파일 선택 시 호출되는 함수
  function starlocation(number) {
    let result = parseInt((parseFloat(number) + 1) * 47.3 + 1.5);
    return result;
  }

  
  // 페이지 변경 함수
  function changePage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      currentPage = pageNumber;
      console.log('Current Page:', currentPage);
    }
  }

  // 페이지네이션에 표시될 페이지 번호 계산 함수
  function getPageNumbers() {
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(currentPage - halfPagesToShow, 1);
    let endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    // Adjust startPage and endPage when near the beginning or end of the page list
    if (totalPages - endPage < halfPagesToShow) {
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    } else if (startPage <= halfPagesToShow) {
      endPage = Math.min(startPage + pagesToShow - 1, totalPages);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  // 이전 페이지 그룹으로 이동하는 함수
  function prevPageGroup() {
    if (currentPage > pagesToShow) {
      currentPage -= pagesToShow;
    } else {
      currentPage = 1;
    }
  }

  // 다음 페이지 그룹으로 이동하는 함수
  function nextPageGroup() {
    if (currentPage + pagesToShow <= totalPages) {
      currentPage += pagesToShow;
    } else {
      currentPage = totalPages;
    }
  }

  // 현재 페이지에서 표시할 결과 인덱스 계산
  function calculateIndex(currentPage) {
    return currentPage - 1;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 적용
    });
  }

  let searchKeyword = '';

  function handleSearch() {
  // 검색어를 가져와서 searchKeyword 변수에 저장합니다.
  searchKeyword = document.getElementById('searchInput').value.trim().toLowerCase();
  // 페이지를 1페이지로 초기화합니다.
  changePage(1);
  }

  import { Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
  let group2 = 1;
</script>



<div class="selection:bg-indigo-400 selection:text-white relative mt-12 rounded-lg border mx-5 px-8 pt-10 bg-zinc-700">
  <p class="ml-16 text-3xl text-violet-100 font-medium mt-8">Ph(+) B-ALL Probability Calculator</p>
  <div class="relative w-full px-10 mt-0 pt-3">
    <p class="mt-8 ml-8 text-3xl text-violet-300 font-medium">Results</p>
    <p class="ml-8 text-violet-200 text-base font-normal mt-2">
      {$selectedmethod} Based Probability of Each Class
    </p>  
    {#if $patientIDnumber[calculateIndex(currentPage)]}
      <div class="bg-zinc-600 mx-10 rounded-2xl border px-5 pb-5 pt-3 mt-8 border-zinc-500">
        <div class="ml-0 mr-5 justify-between flex rounded-3xl py-1 mt-0">
          <div class="rounded-2xl py-1 cursor-pointer mt-1 w-52 flex justify-center text-xl text-center font-medium text-violet-300 h-full">
            <div class="rounded-2xl flex">
              <Button class="focus:ring-zinc-600 text-violet-300 text-xl">Patient ID</Button>
              <img
              id="searchIcon"
              src="invertedtriangle2.svg"
              class="cursor-pointer w-4 h-4 mt-5 h-fit text-center"
              alt="Tutorial Logo"/> 
            </div>
            <Dropdown class="place-items-start place-content-start justify-items-start focus:ring-inherit rounded bg-zinc-700 w-48 p-2 space-y-1">
              <li class="place-items-start place-content-start justify-items-start rounded-2xl py-1 text-neutral-300 hover:bg-zinc-600 dark:hover:bg-gray-600">
                <input id="Patient" class="-ml-7 mr-2 focus:ring-transparent rounded-2xl text-neutral-300" type="radio" name="group2" bind:group={group2} value={1}/>
                <label class="text-base text-neutral-300 peer-checked/draft:text-sky-500" for="Patient">Patient ID</label>
              </li>
              <li class="place-content-start justify-start rounded-2xl py-1 hover:bg-zinc-600 dark:hover:bg-gray-600">
                <input id="Page" class="focus:ring-transparent rounded-2xl text-neutral-300" type="radio" name="group2" bind:group={group2} value={2}/>
                <label class="mr-2 text-base text-neutral-300 peer-checked/draft:text-sky-500" for="Page">Page Number</label>
              </li>
            </Dropdown> 
            
          </div>
          <div class="mt-2 w-full">
            <Input id="searchInput" class="bg-zinc-700 text-neutral-200 focus:text-neutral-200 text-base outline-none border-inherent focus:outline-none focus:border-violet-200 focus:ring-1 focus:ring-violet-200 focus:bg-zinc-500 rounded-full px-8 w-full" placeholder="Search..." />
          </div>
          <div class="py-1 mt-3 flex items-center justify-end text-xl text-center font-medium mx-0 text-violet-400 h-full">
            <img
            id="searchicon2"
            src="searchicon3.svg"
            class="cursor-pointer w-5 h-5 my-1 ml-8 mr-0 mt-1 h-fit text-center"
            alt="Tutorial Logo"
            /> 
          </div>
        </div>
        <hr class="mb-5 mt-3 border-zinc-500"/>
        <div class="mt-5 ml-3 mb-3 flex">
          <p class="ml-10 mt-16 justify-center text-2xl text-center font-semibold text-violet-100 font-medium mt-5">{patientIDnumberstr[calculateIndex(currentPage)]}'s Analysis Result</p>
        </div>
        <div class="cursor-pointer rounded-2xl justify-end text-lg mx-12 flex">
          <div class="rounded-2xl bg-zinc-500 px-3 py-1 mx-1 flex">
            <img
            id = "ABL1_star"
            src="Star_yellow.svg"
            class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
            alt="Tutorial Logo2"
            />
            <p class="cursor-pointer text-sm text-violet-100">ABL1 Class</p>
          </div>
          <div class="cursor-pointer rounded-2xl bg-zinc-500 px-3 py-1 mx-1 flex">
            <img
            id = "CRLF2_star"
            src="Star_red.svg"
            class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
            alt="Tutorial Logo2"
            />
            <p class="cursor-pointer text-sm text-violet-100">CRLF2 Class</p>
          </div>
          <div class="cursor-pointer rounded-2xl bg-zinc-500 px-3 py-1 mx-1 flex">
            <img
            id = "ABL1_Like_star"
            src="Star_mint.svg"
            class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
            alt="Tutorial Logo2"
            />
            <p class="cursor-pointer text-sm text-violet-100">ABL1-Like Class</p>
          </div>
        </div>
        <div class="bg-zinc-700 mx-10 rounded-2xl px-20 py-5 mt-3">
          <div>
            <p class="-ml-5 mb-3 text-lg text-violet-300 font-medium mt-3">Total class</p>
            <div class="bg-zinc-600 mt-16 ml-2 relative h-9 pt-2 flex rounded-full font-semibold text-medium text-violet-100 bg-inherit border-2 border-violet-100">
              <p class="absolute -mt-1 left-1 text-left ml-3">-1</p>
              <p class="absolute -mt-1 ml-3 left-[48%]">0</p>
              <p class="absolute -mt-1 right-5 text-right">1</p>
            </div>  
            <div class="relative mt-1 flex">
              <p class="ml-4 text-xs text-violet-200">BALLNOS</p>
              <p class="absolute right-2 text-xs text-violet-200">Other Classes</p>
            </div>
          </div>
          <div class="-ml-1 mt-2 bg-inherit w-full relative">
            {#if $ABL1selected == 'true'}
              <img
              id = "Total_ABL1"
              src="Star_yellow.svg"
              class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
              style="left: {`${starlocation(ABL1averageResultstr[calculateIndex(currentPage)])}%`}"
              alt="Tutorial Logo"
              />
              <Popover triggeredBy="#Total_ABL1" class="bg-zinc-600 z-40 border-2 border-neutral-100 p-1 text-sm w-68 font-light">
                <div class="flex mb-1">
                  <img
                    id = "ABL1_star"
                    src="Star_yellow.svg"
                    class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
                    alt="Tutorial Logo2"
                    />
                    <p class="text-sm text-[#FFD32A] font-semibold">ABL1 Class</p>
                </div>
                <hr class="mb-2 border-1 border-neutral-100" />
                <p class="text-xs text-neutral-100">The probability of ABL1 class is <span class="ml-0 font-semibold text-neutral-400 dark:text-white">{ABL1averageResultstr[calculateIndex(currentPage)]}</span>.</p>
              </Popover>
            {/if}
            {#if $CRLF2selected == 'true'}
              <img
              id="Total_CRLF2"
              src="Star_red.svg"
              class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
              style="left: {`${starlocation(CRLF2averageResultstr[calculateIndex(currentPage)])}%`}"
              alt="Tutorial Logo"
              />
              <Popover triggeredBy="#Total_CRLF2" class="bg-zinc-600 z-40 border-2 border-neutral-100 p-1 text-sm w-68 font-light">
                <div class="flex mb-1">
                  <img
                    id = "CRLF2_star"
                    src="Star_red.svg"
                    class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
                    alt="Tutorial Logo2"
                    />
                    <p class="text-sm text-[#FF3F34] font-semibold">CRLF2 Class</p>
                </div>
                <hr class="mb-2 border-1 border-neutral-100" />
                <p class="text-xs text-neutral-100">The probability of CRLF2 class is   <span class="ml-0 font-semibold text-neutral-400 dark:text-white">{CRLF2averageResultstr[calculateIndex(currentPage)]}</span>.</p>
              </Popover>
            {/if}
            {#if $ABL1_LikeSelected == 'true'}
            <img
            id="Total_ABL1_Like"
            src="Star_mint.svg"
            class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
            style="left: {`${starlocation(ABL1_LikeaverageResultstr[calculateIndex(currentPage)])}%`}"
            alt="Tutorial Logo"
            />
            <Popover triggeredBy="#Total_ABL1_Like" class="bg-zinc-600 z-40 border-2 border-neutral-100 p-1 text-sm w-68 font-light">
              <div class="flex mb-1">
                <img
                  id = "ABL1_Like_star"
                  src="Star_mint.svg"
                  class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
                  alt="Tutorial Logo2"
                  />
                  <p class="text-sm text-[#00D8D6] font-semibold">ABL1 Like Class</p>
              </div>
              <hr class="mb-2 border-1 border-neutral-100" />
              <p class="text-xs text-neutral-100">The probability of ABL1 Like class is <span class="ml-0 font-semibold text-neutral-400 dark:text-white">{ABL1_LikeaverageResultstr[calculateIndex(currentPage)]}</span>.</p>
            </Popover>
            {/if}
          </div>
        </div>              
        <div class="bg-zinc-700 mx-10 rounded-2xl px-20 py-5 mt-5">
          {#if $ABL1selected == 'true'}
            <div class="mb-10">
              <div class="-ml-5 flex mt-5">
                <p class="ml-3 text-lg text-violet-300 font-medium">ABL1 Class</p>
                <p class="ml-1 text-lg text-neutral-200 font-lg">: {ABL1averageResultstr[calculateIndex(currentPage)]}</p>
              </div>
              <div class="-mx-5 mt-5 cursor-pointer py-1 relative flex bg-violet-400 text-white flex rounded-full rounded-full">
                <div class="flex ml-3 justify-start">
                  <img
                    id="Star_purple"
                    src="Star_violet.svg"
                    class="w-4 h-4 mx-2 mt-1 text-center"
                    alt="Tutorial Logo"
                    />
                  <p class="font-medium text-base">5 out of 10 gene of the model matched</p>
                  <p class="ml-1 text-violet-800 text-base font-semibold">(50%)</p>
                </div>
                <div class="absolute right-12 cursor-pointer ml-2 justify-end">
                  <p class="ml-1 -mr-8 text-white font-medium text-base underline justify-end">More...</p>
                </div>
              </div>           
              <div class="bg-zinc-600 mt-16 ml-3 relative h-9 pt-2 flex rounded-full font-semibold text-medium text-violet-100 bg-inherit border-2 border-violet-100">
                <p class="absolute -mt-1 left-1 text-left ml-3">-1</p>
                <p class="absolute -mt-1 ml-4 left-[47.7%]">0</p>
                <p class="absolute -mt-1 right-4 text-right">1</p>
              </div>  
              <div class="relative mt-1 flex">
                <p class="ml-5 text-xs text-violet-200">BALLNOS</p>
                <p class="absolute right-2 text-xs text-violet-200">ABL1</p>
              </div>
              <div class="my-2 bg-inherit w-full relative">
                <img
                id="ABL1"
                src="Star_yellow.svg"
                class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
                style="left: {`${starlocation(ABL1averageResultstr[calculateIndex(currentPage)])}%`}"
                alt="Tutorial Logo"
                />
                <Popover triggeredBy="#ABL1" class="bg-zinc-600 z-40 border-2 border-neutral-100 p-1 text-sm w-68 font-light">
                  <div class="flex mb-1">
                    <img
                      id = "ABL1_star"
                      src="Star_yellow.svg"
                      class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
                      alt="Tutorial Logo2"
                      />
                      <p class="text-sm text-[#FFD32A] font-semibold">ABL1 Class</p>
                  </div>
                  <hr class="mb-2 border-1 border-neutral-100" />
                  <p class="text-xs text-neutral-100">The probability of ABL1 class is <span class="ml-0 font-semibold text-neutral-400 dark:text-white">{ABL1averageResultstr[calculateIndex(currentPage)]}</span>.</p>
                </Popover>
              </div>
              <hr class="-mx-5 my-5 border-zinc-500"/>
            </div>              
          {/if}
          {#if $CRLF2selected == 'true'}
            <div class="my-10">
              <div class="-ml-5 flex mt-10">
                <p class="ml-3 text-lg text-violet-300 font-medium mt-5">CRLF2 Class</p>
                <p class="mt-5 ml-1 text-lg text-neutral-200 font-lg mt-5">: {CRLF2averageResultstr[calculateIndex(currentPage)]}</p>
              </div>
              <div class="-mx-5 mt-5 cursor-pointer py-1 relative flex bg-violet-400 text-white flex rounded-full rounded-full">
                <div class="flex ml-3 justify-start">
                  <img
                    id="Star_purple"
                    src="Star_violet.svg"
                    class="w-4 h-4 mx-2 mt-1 text-center"
                    alt="Tutorial Logo"
                    />
                  <p class="font-medium text-base">5 out of 10 gene of the model matched</p>
                  <p class="ml-1 text-violet-800 text-base font-semibold">(50%)</p>
                </div>
                <div class="absolute right-12 cursor-pointer ml-2 justify-end">
                  <p class="ml-1 -mr-8 text-white font-medium text-base underline justify-end">More...</p>
                </div>
              </div>
              <div class="bg-zinc-600 mt-16 ml-3 relative h-9 pt-2 flex rounded-full font-semibold text-medium text-violet-100 bg-inherit border-2 border-violet-100">
                <p class="absolute -mt-1 left-1 text-left ml-3">-1</p>
                <p class="absolute -mt-1 ml-4 left-[47.7%]">0</p>
                <p class="absolute -mt-1 right-4 text-right">1</p>
              </div>  
              <div class="relative mt-1 flex">
                <p class="ml-5 text-xs text-violet-200">BALLNOS</p>
                <p class="absolute right-2 text-xs text-violet-200">CRLF2</p>
              </div>
              <div class="mt-2 bg-inherit w-full relative">
                <img
                id="CRLF2"
                src="Star_red.svg"
                class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
                style="left: {`${starlocation(CRLF2averageResultstr[calculateIndex(currentPage)])}%`}"
                alt="Tutorial Logo"
                />
                <Popover triggeredBy="#CRLF2" class="bg-zinc-600 z-40 border-2 border-neutral-100 p-1 text-sm w-68 font-light">
                  <div class="flex mb-1">
                    <img
                      id = "CRLF2_star"
                      src="Star_red.svg"
                      class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
                      alt="Tutorial Logo2"
                      />
                      <p class="text-sm text-[#FF3F34] font-semibold">CRLF2 Class</p>
                  </div>
                  <hr class="mb-2 border-1 border-neutral-100" />
                  <p class="text-xs text-neutral-100">The probability of CRLF2 class is   <span class="ml-0 font-semibold text-neutral-400 dark:text-white">{CRLF2averageResultstr[calculateIndex(currentPage)]}</span>.</p>
                </Popover>
              </div>
              <hr class="-mx-5 my-5 border-zinc-500"/>
            </div>              
          {/if}  
          {#if $ABL1_LikeSelected == 'true'}
            <div class="my-10">
              <div class="-ml-5 flex mt-10">
                <p class="ml-3 text-lg text-violet-300 font-medium mt-5">ABL1-Like Class</p>
                <p class="mt-5 ml-1 text-lg text-neutral-200 font-lg mt-5">: {ABL1_LikeaverageResultstr[calculateIndex(currentPage)]}</p>
              </div>
              <div class="-mx-5 mt-5 cursor-pointer py-1 relative flex bg-violet-400 text-white flex rounded-full rounded-full">
                <div class="flex ml-3 justify-start">
                  <img
                    id="Star_purple"
                    src="Star_violet.svg"
                    class="w-4 h-4 mx-2 mt-1 text-center"
                    alt="Tutorial Logo"
                    />
                  <p class="font-medium text-base">5 out of 10 gene of the model matched</p>
                  <p class="ml-1 text-violet-800 text-base font-semibold">(50%)</p>
                </div>
                <div class="absolute right-12 cursor-pointer ml-2 justify-end">
                  <p class="ml-1 -mr-8 text-white font-medium text-base underline justify-end">More...</p>
                </div>
              </div>
              <div class="bg-zinc-600 mt-16 ml-3 relative h-9 pt-2 flex rounded-full font-semibold text-medium text-violet-100 bg-inherit border-2 border-violet-100">
                <p class="absolute -mt-1 left-1 text-left ml-3">-1</p>
                <p class="absolute -mt-1 ml-4 left-[47.7%]">0</p>
                <p class="absolute -mt-1 right-4 text-right">1</p>
              </div>  
              <div class="relative mt-1 flex">
                <p class="ml-5 text-xs text-violet-200">BALLNOS</p>
                <p class="absolute right-2 text-xs text-violet-200">ABL1-Like</p>
              </div>
              <div class="mt-2 bg-inherit w-full relative">
                <img
                id="ABL1_Like"
                src="Star_mint.svg"
                class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
                style="left: {`${starlocation(ABL1_LikeaverageResultstr[calculateIndex(currentPage)])}%`}"
                alt="Tutorial Logo"
                />
                <Popover triggeredBy="#ABL1_Like" class="bg-zinc-600 z-40 border-2 border-neutral-100 p-1 text-sm w-68 font-light">
                  <div class="flex mb-1">
                    <img
                      id = "ABL1_Like_star"
                      src="Star_mint.svg"
                      class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
                      alt="Tutorial Logo2"
                      />
                      <p class="text-sm text-[#00D8D6] font-semibold">ABL1 Like Class</p>
                  </div>
                  <hr class="mb-2 border-1 border-neutral-100" />
                  <p class="text-xs text-neutral-100">The probability of ABL1 Like class is <span class="ml-0 font-semibold text-neutral-400 dark:text-white">{ABL1_LikeaverageResultstr[calculateIndex(currentPage)]}</span>.</p>
                </Popover>
              </div>
            </div>              
          {/if}
        </div>
        
        <!-- 페이지네이션 UI -->
        <div class="flex justify-center items-center mt-5 mb-0 h-12">
          <!-- 이전 페이지 그룹 버튼 -->
          <button
            class="cursor-pointer text-violet-800 mx-1 px-3 py-1 focus:outline-none focus:border-violet-500"
            on:click={() => prevPageGroup()}
            disabled={currentPage === 1}>
            <img
            src="left2.svg"
            class="mx-5 h-7"
            alt="SPADOMA Logo"/>
          </button>
          <!-- 페이지 버튼 -->
          {#each getPageNumbers() as pageNumber}
            {#if currentPage === pageNumber}
              <button
                class="font-semibold text-violet-200 rounded-full text-lg mx-2 px-4 py-2 focus:outline-none bg-violet-300 text-violet-700"
                on:click={() => {
                  changePage(pageNumber);
                  scrollToTop(); // 페이지 변경 시 맨 위로 스크롤
                }}
              >
                {pageNumber}
              </button>
            {:else}
              <button
                class="font-semibold text-violet-200 rounded-full text-lg mx-2 px-4 py-2 focus:outline-none hover:text-violet-700 hover:bg-violet-300"
                on:click={() => {
                  changePage(pageNumber);
                  scrollToTop(); // 페이지 변경 시 맨 위로 스크롤
                }}
              >
                {pageNumber}
              </button>
            {/if}
          {/each}
          <!-- 다음 페이지 그룹 버튼 -->
          <button
            class="cursor-pointer mx-1 px-3 py-1 focus:outline-none focus:border-violet-500"
            on:click={() => nextPageGroup()}
            disabled={currentPage === totalPages}>
            <img
            src="right2.svg"
            class="mx-5 h-7"
            alt="SPADOMA Logo"/>
          </button>
        </div>
      </div>
      
    {:else}
      <p class="mx-10 mt-8 text-center text-gray-500">No results found for this page.</p>
    {/if}

    
    <div class="mt-12 mb-8 text-center">
      <Button
      href="/analysis"
      class="text-violet-200 mb-5 px-7 py-4 text-xl font-semibold bg-zinc-800 ring ring-violet-300 hover:bg-zinc-700 focus:ring-white"
      >Return</Button>
    </div>
    <footer>
      <div class="mt-16 mb-2 px-2 sm:px-4">
          <div class="mx-auto flex flex-col container">
              <P class="text-zinc-300 text-center">This website is maintained by <A class="text-zinc-400 underline" href="https://pnucolab.com/" target="_blank">Computational Omics Lab</A>, Pusan National University College of Biomedical Convergence Engineering, South Korea. </P>
          </div>
      </div>
    </footer>
  </div>
</div>
