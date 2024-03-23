<script>
  import { page } from '$app/stores';
  import { Button } from "flowbite-svelte";
  import { P, A } from "flowbite-svelte";
  import { Popover } from 'flowbite-svelte';
  import { SearchOutline } from 'flowbite-svelte-icons';
  import { Label, Input } from 'flowbite-svelte';

  //받아온 url의 형태
  //http://localhost:5174/result3?
  //ABL1averageResultObject=OY7jvTmO4705juO9OY7jvTmO470%
  //&CRLF2averageResultObject=AAAAAAAAAAAAAAAAAAAAAAAAAAA%3D
  //&ABL1_LikeaverageResultObject=AACAvgAAgL4AAIC%2BAACAvgAAgL4%3D
  //&ABL1selected=true
  //&CRLF2selected=true
  //&ABL1_LikeSelected=true
  //&selectedmethod=RPKM
  //&PatientID=%2BSJALL014946_D1%2BSJALL014947_D1%2BSJALL014949_D1%2BSJALL014950_D1%2BSJALL014952_D1%0D


  let url = $page.url.search;
  let values = url.split('&');
  let ABL1averageResultstr = [];
  let CRLF2averageResultstr = [];
  let ABL1_LikeaverageResultstr = [];
  let patientIDnumber = [];
  let num = [];

  function decodearray(str) {
    // DECODE TEST
    let blob = atob( str );
    let ary_buf = new ArrayBuffer( blob.length );
    let dv = new DataView( ary_buf );
    for( let i=0; i < blob.length; i++ ) dv.setUint8( i, blob.charCodeAt(i) );
    
    // For WebGL Buffers, can skip Float32Array, just return ArrayBuffer is all thats needed.
    let f32_ary = new Float32Array( ary_buf );

    return f32_ary;
  }
  let ABL1averageResult = decodearray(decodeURIComponent(values[0].split('=')[1]));
  let CRLF2averageResult = decodearray(decodeURIComponent(values[1].split('=')[1]));
  let ABL1_LikeaverageResult = decodearray(decodeURIComponent(values[2].split('=')[1]));

  for (let i=0; i<ABL1averageResult.length; i++) {
    ABL1averageResultstr.push(parseFloat(ABL1averageResult[i].toFixed(4)));
  }

  for (let i=0; i<CRLF2averageResult.length; i++) {
    CRLF2averageResultstr.push(parseFloat(CRLF2averageResult[i].toFixed(4)));
  }

  for (let i=0; i<ABL1_LikeaverageResult.length; i++) {
    ABL1_LikeaverageResultstr.push(parseFloat(ABL1_LikeaverageResult[i].toFixed(4)));
  }

  let ABL1selected = values[3].split('=')[1];
  let CRLF2selected = values[4].split('=')[1];
  let ABL1_LikeSelected = values[5].split('=')[1];
  let selectedmethod = values[6].split('=')[1];

  for (let i=1; i<values[7].split('%2B').length; i++) {
    if (i == values[7].split('%2B').length-1) {
      patientIDnumber.push(values[7].split('%2B')[i].split('%')[0]);
    }
    else {
      patientIDnumber.push(values[7].split('%2B')[i]);
    } 
    num.push(i-1);
  }

  console.log('ABL1 Average:', ABL1averageResult);
  console.log('CRLF2 Average:', CRLF2averageResult);
  console.log('ABL1_Like Average:', ABL1_LikeaverageResult);
  console.log('patientIDnumber:', patientIDnumber);

  // 파일 선택 시 호출되는 함수
  function starlocation(number) {
    let result = parseInt((parseFloat(number) + 1) * 47.3 + 1.5);
    return result;
  }

  // 페이지당 결과 수 설정
  let resultsPerPage = 1; // 한 페이지당 결과 수
  let currentPage = 1; // 현재 페이지
  const pagesToShow = 5; // 페이지네이션에 표시할 페이지 수
  let totalPages = Math.ceil(patientIDnumber.length / resultsPerPage); // 총 페이지 수

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

</script>

<div class="selection:bg-violet-300 selection:text-white relative mt-12 rounded-lg border mx-5 px-12 pt-10 bg-white">
  <p class="ml-16 text-3xl text-violet-900 font-medium mt-12">Ph(+) B-ALL Probability Calculator</p>
  <div class="relative w-full px-10 mt-8 pt-3">
    <p class="ml-8 text-3xl text-violet-700 font-medium">Results</p>
    <p class="ml-8 text-violet-400 text-base font-normal mt-2">
      {selectedmethod} Based Probability of Each Class
    </p>   
    <div class="ml-12 mr-16 justify-between flex rounded-3xl py-1 mt-8">
      <div class="py-1 cursor-pointer mt-1 w-52 flex justify-center text-xl text-center font-medium ml-5 mr-5 border-r-2 border-violet-300 text-violet-700 h-full">
        Patient ID 
        <img
          id="searchIcon"
          src="invertedtriangle2.svg"
          class="cursor-pointer w-4 h-4 ml-2 -mr-0 mt-3 h-fit text-center"
          alt="Tutorial Logo"
        /> 
      </div>
      <div class="w-full">
        <Input id="searchInput" class="bg-white text-neutral-500 text-base outline-none border-violet-200 ring-1 ring-violet-200 focus:outline-none focus:border-violet-200 focus:ring-1 focus:ring-violet-200 focus:bg-violet-100 rounded-full px-8 w-full" placeholder="Search..." />
      </div>
      <div class="py-1 mt-1 flex items-center justify-end text-xl text-center font-medium ml-5 mr-5 border-l-2 border-violet-300 text-violet-400 h-full">
        <img
        id="searchicon2"
        src="searchicon3.svg"
        class="cursor-pointer w-5 h-5 my-1 ml-8 mr-0 mt-1 h-fit text-center"
        alt="Tutorial Logo"
        /> 
      </div>
    </div>
    <div class="py-2 realtive flex mt-3 bg-violet-400 text-white ml-16 mr-16 flex rounded-full border-violet-300 rounded-full">
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
      <div class="absolute right-36 cursor-pointer ml-2 justify-end">
        <p class="ml-1 -mr-5 text-violet-100 font-medium text-base underline justify-end">More...</p>
      </div>
    </div>
    {#if patientIDnumber[calculateIndex(currentPage)]}
      <div class="bg-violet-200 mx-10 rounded-2xl border px-5 py-5 mt-4 border-neutral-200">
        <div class="mt-3 ml-3 mb-3 flex">
          <p class="ml-10 mt-16 justify-center text-2xl text-center font-semibold text-violet-800 font-medium mt-5">{patientIDnumber[calculateIndex(currentPage)]}'s Analysis Result</p>
        </div>
        <div class="cursor-pointer rounded-2xl justify-end text-lg mx-12 flex">
          <div class="border rounded-2xl bg-violet-300 px-3 py-1 mx-1 flex">
            <img
            id = "ABL1_star"
            src="Star_yellow.svg"
            class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
            alt="Tutorial Logo2"
            />
            <p class="cursor-pointer text-sm text-white">ABL1 Class</p>
          </div>
          <div class="cursor-pointer border rounded-2xl bg-violet-300 px-3 py-1 mx-1 flex">
            <img
            id = "CRLF2_star"
            src="Star_red.svg"
            class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
            alt="Tutorial Logo2"
            />
            <p class="cursor-pointer text-sm text-white">CRLF2 Class</p>
          </div>
          <div class="cursor-pointer border rounded-2xl bg-violet-300 px-3 py-1 mx-1 flex">
            <img
            id = "ABL1_Like_star"
            src="Star_mint.svg"
            class="cursor-pointer w-4 h-4 mr-1 h-fit text-center"
            alt="Tutorial Logo2"
            />
            <p class="cursor-pointer text-sm text-white">ABL1-Like Class</p>
          </div>
        </div>
        <div class="bg-violet-200 mx-10 rounded-2xl px-20 py-5 mt-3 border border-violet-300">
          <div>
            <p class="-ml-5 mb-3 text-lg text-neutral-500 font-medium mt-3">Total class</p>
            <div class="bg-white mt-5 ml-2 relative h-9 pt-2 flex rounded-full font-semibold text-medium text-neutral-400 bg-inherit border-2 border-neutral-300">
              <p class="absolute -mt-1 left-1 text-left ml-3">-1</p>
              <p class="absolute -mt-1 ml-3 left-[48%]">0</p>
              <p class="absolute -mt-1 right-5 text-right">1</p>
            </div>  
            <div class="relative mt-1 flex">
              <p class="ml-4 text-xs text-neutral-500">BALLNOS</p>
              <p class="absolute right-2 text-xs text-neutral-500">Other Classes</p>
            </div>
          </div>
          <div class="-ml-1 mt-2 bg-inherit w-full relative">
            {#if ABL1selected == 'true'}
              <img
              id = "Total_ABL1"
              src="Star_yellow.svg"
              class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
              style="left: {`${starlocation(ABL1averageResult[calculateIndex(currentPage)])}%`}"
              alt="Tutorial Logo"
              />
              <Popover triggeredBy="#Total_ABL1" class="z-40 border-4 border-neutral-100 p-1 text-sm w-68 font-light">
                <p class="text-sm text-[#FFD32A] font-semibold">ABL1 Class</p>
                <hr class="mb-2 border-1 border-neutral-100" />
                <p class="text-xs text-neutral-400">The probability of ABL1 class is <span class="ml-0 font-semibold text-neutral-500 dark:text-white">{ABL1averageResultstr[calculateIndex()]}</span>.</p>
              </Popover>
            {/if}
            {#if CRLF2selected == 'true'}
              <img
              id="Total_CRLF2"
              src="Star_red.svg"
              class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
              style="left: {`${starlocation(CRLF2averageResult[Object.keys(CRLF2averageResult)[calculateIndex(currentPage)]])}%`}"
              alt="Tutorial Logo"
              />
              <Popover triggeredBy="#Total_CRLF2" class="z-40 border-4 border-neutral-100 p-1 text-sm w-68 font-light">
                <p class="text-sm text-[#FF3F34] font-semibold">CRLF2 Class</p>
                <hr class="mb-2 border-1 border-neutral-100" />
                <p class="text-xs text-neutral-400">The probability of CRLF2 class is   <span class="ml-0 font-semibold text-neutral-500 dark:text-white">{CRLF2averageResultstr[Object.keys(CRLF2averageResultstr)[calculateIndex()]]}</span>.</p>
              </Popover>
            {/if}
            {#if ABL1_LikeSelected == 'true'}
            <img
            id="Total_ABL1_Like"
            src="Star_mint.svg"
            class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
            style="left: {`${starlocation(ABL1_LikeaverageResult[Object.keys(ABL1_LikeaverageResult)[calculateIndex(currentPage)]])}%`}"
            alt="Tutorial Logo"
            />
            <Popover triggeredBy="#Total_ABL1_Like" class="z-40 border-4 border-neutral-100 p-1 text-sm w-68 font-light">
              <p class="text-sm text-[#00D8D6] font-semibold">ABL1 Like Class</p>
              <hr class="mb-2 border-1 border-neutral-100" />
              <p class="text-xs text-neutral-400">The probability of ABL1 Like class is <span class="ml-0 font-semibold text-neutral-500 dark:text-white">{ABL1_LikeaverageResultstr[Object.keys(ABL1_LikeaverageResultstr)[calculateIndex()]]}</span>.</p>
            </Popover>
            {/if}
          </div>
        </div>              
        <div class="bg-violet-200 mx-10 rounded-2xl px-20 py-5 mt-5">
          {#if ABL1selected == 'true'}
            <div class="mb-10">
              <div class="-ml-5 flex mt-5">
                <p class="ml-3 text-lg text-neutral-500 font-medium">ABL1 Class</p>
                <p class="ml-1 text-lg text-neutral-400 font-lg">: {ABL1averageResultstr[calculateIndex(currentPage)]}</p>
              </div>
              <div class="bg-white mt-5 ml-3 relative h-9 pt-2 flex rounded-full font-semibold text-medium text-neutral-400 bg-inherit border-2 border-neutral-300">
                <p class="absolute -mt-1 left-1 text-left ml-3">-1</p>
                <p class="absolute -mt-1 ml-4 left-[47.7%]">0</p>
                <p class="absolute -mt-1 right-4 text-right">1</p>
              </div>  
              <div class="relative mt-1 flex">
                <p class="ml-5 text-xs text-neutral-500">BALLNOS</p>
                <p class="absolute right-2 text-xs text-neutral-500">ABL1</p>
              </div>
              <div class="mt-2 bg-inherit w-full relative">
                <img
                id="ABL1"
                src="Star_yellow.svg"
                class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
                style="left: {`${starlocation(ABL1averageResult[Object.keys(ABL1averageResult)[calculateIndex(currentPage)]])}%`}"
                alt="Tutorial Logo"
                />
                <Popover triggeredBy="#ABL1" class="z-40 border-4 border-neutral-100 p-1 text-sm w-68 font-light">
                  <p class="text-sm text-[#FFD32A] font-semibold">ABL1 Class</p>
                  <hr class="mb-2 border-1 border-neutral-100" />
                  <p class="text-xs text-neutral-400">The probability of ABL1 class is <span class="ml-0 font-semibold text-neutral-500 dark:text-white">{ABL1averageResultstr[Object.keys(ABL1averageResultstr)[calculateIndex()]]}</span>.</p>
                </Popover>
              </div>
            </div>              
          {/if}
          {#if CRLF2selected == 'true'}
            <div class="my-10">
              <div class="-ml-5 flex mt-10">
                <p class="ml-3 text-lg text-neutral-500 font-medium mt-5">CRLF2 Class</p>
                <p class="mt-5 ml-1 text-lg text-neutral-400 font-lg mt-5">: {CRLF2averageResultstr[Object.keys(CRLF2averageResultstr)[calculateIndex(currentPage)]]}</p>
              </div>
              <div class="bg-white mt-5 ml-3 relative h-9 pt-2 flex rounded-full font-semibold text-medium text-neutral-400 bg-inherit border-2 border-neutral-300">
                <p class="absolute -mt-1 left-1 text-left ml-3">-1</p>
                <p class="absolute -mt-1 ml-4 left-[47.7%]">0</p>
                <p class="absolute -mt-1 right-4 text-right">1</p>
              </div>  
              <div class="relative mt-1 flex">
                <p class="ml-5 text-xs text-neutral-500">BALLNOS</p>
                <p class="absolute right-2 text-xs text-neutral-500">CRLF2</p>
              </div>
              <div class="mt-2 bg-inherit w-full relative">
                <img
                id="CRLF2"
                src="Star_red.svg"
                class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
                style="left: {`${starlocation(CRLF2averageResult[Object.keys(CRLF2averageResult)[calculateIndex(currentPage)]])}%`}"
                alt="Tutorial Logo"
                />
                <Popover triggeredBy="#CRLF2" class="z-40 border-4 border-neutral-100 p-1 text-sm w-68 font-light">
                  <p class="text-sm text-[#FF3F34] font-semibold">CRLF2 Class</p>
                  <hr class="mb-2 border-1 border-neutral-100" />
                  <p class="text-xs text-neutral-400">The probability of CRLF2 class is   <span class="ml-0 font-semibold text-neutral-500 dark:text-white">{CRLF2averageResultstr[calculateIndex()]}</span>.</p>
                </Popover>
              </div>
            </div>              
          {/if}  
          {#if ABL1_LikeSelected == 'true'}
            <div class="my-10">
              <div class="-ml-5 flex mt-10">
                <p class="ml-3 text-lg text-neutral-500 font-medium mt-5">ABL1-Like Class</p>
                <p class="mt-5 ml-1 text-lg text-neutral-400 font-lg mt-5">: {ABL1_LikeaverageResultstr[Object.keys(ABL1_LikeaverageResultstr)[calculateIndex(currentPage)]]}</p>
              </div>
              <div class="bg-white mt-5 ml-3 relative h-9 pt-2 flex rounded-full font-semibold text-medium text-neutral-400 bg-inherit border-2 border-neutral-300">
                <p class="absolute -mt-1 left-1 text-left ml-3">-1</p>
                <p class="absolute -mt-1 ml-4 left-[47.7%]">0</p>
                <p class="absolute -mt-1 right-4 text-right">1</p>
              </div>  
              <div class="relative mt-1 flex">
                <p class="ml-5 text-xs text-neutral-500">BALLNOS</p>
                <p class="absolute right-2 text-xs text-neutral-500">ABL1-Like</p>
              </div>
              <div class="mt-2 bg-inherit w-full relative">
                <img
                id="ABL1_Like"
                src="Star_mint.svg"
                class="cursor-pointer absolute w-6 h-6 ml-3 -mt-20 h-fit text-center"
                style="left: {`${starlocation(ABL1_LikeaverageResult[Object.keys(ABL1_LikeaverageResult)[calculateIndex(currentPage)]])}%`}"
                alt="Tutorial Logo"
                />
                <Popover triggeredBy="#ABL1_Like" class="z-40 border-4 border-neutral-100 p-1 text-sm w-68 font-light">
                  <p class="text-sm text-[#00D8D6] font-semibold">ABL1 Like Class</p>
                  <hr class="mb-2 border-1 border-neutral-100" />
                  <p class="text-xs text-neutral-400">The probability of ABL1 Like class is <span class="ml-0 font-semibold text-neutral-500 dark:text-white">{ABL1_LikeaverageResultstr[Object.keys(ABL1_LikeaverageResultstr)[calculateIndex()]]}</span>.</p>
                </Popover>
              </div>
            </div>              
          {/if}
        </div>
        <!-- 페이지네이션 UI -->
        <div class="flex justify-center items-center mt-10 mb-5 h-12">
          <!-- 이전 페이지 그룹 버튼 -->
          <button
            class="cursor-pointer text-violet-800 mx-1 px-3 py-1 focus:outline-none focus:border-violet-500"
            on:click={() => prevPageGroup()}
            disabled={currentPage === 1}>
            <img
            src="left2.svg"
            class="mx-5 h-8"
            alt="SPADOMA Logo"/>
          </button>
          <!-- 페이지 버튼 -->
          {#each getPageNumbers() as pageNumber}
            {#if currentPage === pageNumber}
              <button
                class="font-semibold text-neutral-400 rounded-full text-xl mx-2 px-5 py-3 focus:outline-none bg-violet-300 text-white"
                on:click={() => {
                  changePage(pageNumber);
                  scrollToTop(); // 페이지 변경 시 맨 위로 스크롤
                }}
              >
                {pageNumber}
              </button>
            {:else}
              <button
                class="font-semibold text-neutral-400 rounded-full text-xl mx-2 px-5 py-3 focus:outline-none hover:text-white hover:bg-violet-300"
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
            class="mx-5 h-8"
            alt="SPADOMA Logo"/>
          </button>
        </div>
      </div>
      
    {:else}
      <p class="mx-10 mt-8 text-center text-gray-500">No results found for this page.</p>
    {/if}

    
    <div class="mt-20 mb-8 text-center">
      <Button
      href="/analysis"
      class="mb-5 px-7 py-4 text-xl font-semibold bg-violet-800 hover:bg-violet-900 focus:ring-white"
      >Return</Button>
    </div>
    <footer>
      <div class="mt-16 mb-2 px-2 sm:px-4">
          <div class="mx-auto flex flex-col container">
              <P class="text-violet-700 text-center">This website is maintained by <A class="text-violet-400 underline" href="https://pnucolab.com/" target="_blank">Computational Omics Lab</A>, Pusan National University College of Biomedical Convergence Engineering, South Korea. </P>
          </div>
      </div>
    </footer>
  </div>
</div>
