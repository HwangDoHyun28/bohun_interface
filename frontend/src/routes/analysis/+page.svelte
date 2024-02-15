<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Select } from "flowbite-svelte";
  import { P, A, Input, Label, Helper } from "flowbite-svelte";
  import { Fileupload, Button, Checkbox } from "flowbite-svelte";

  let value;

  let selectedmethod;
  let Based = [
    { value: "RPKM", name: "RPKM based" },
    { value: "RANK", name: "Rank based" },
  ];

  let ticket;

  let ABL1selected = true;
  let CRLF2selected = true;
  let ABL1_LikeSelected = true;

  let geneExpressions = {};

  let ABL1geneScores = {};
  let CRLF2geneScores = {};
  let ABL1_LikegeneScores = {};

  let casp10Result = 0;
  let cmtm7Result = 0;
  let crlf2Result = 0;

  let ABL1averageResult = 0;
  let CRLF2averageResult = 0;
  let ABL1_LikeaverageResult = 0;

  // gene expression 값에 대한 조건을 적용하여 결과를 반환하는 함수
  function applyExpressionCondition(geneName, value, lower1, upper1, lower2, upper2, lower3, upper3) {
    if (value >= lower1 && value <= upper1) {
      return 1;
    } else if (value > upper1 && value < lower2) {
      return 0;
    } else if (value >= lower2 && value <= upper2) {
      return -1;
    } else {
      return 0;
    }
  }

  // 파일을 읽어서 특정 유전자의 gene expression 값을 추출하고 결과를 출력하는 함수
  function processFile(file) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const content = event.target.result;
      const lines = content.split('\n');

      lines.forEach(line => {
        const [geneName, expressionStr] = line.split('\t');
        const expression = parseFloat(expressionStr);

        if (!isNaN(expression)) {
          geneExpressions[geneName] = expression;
        }
      });
    };
    reader.readAsText(file);
  }

  // 파일 선택 시 호출되는 함수
  function handleFileSelect(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      processFile(file);
    }
  }

  // 버튼 클릭 시 결과 페이지로 이동하는 함수
  async function handlePredictProbability() {
    if (selectedmethod == "RPKM") {
      if (ABL1selected == true) {

      }

      if (CRLF2selected == true) {
        // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
        CRLF2geneScores['CASP10'] = applyExpressionCondition('CASP10', geneExpressions['CASP10'], 657, 1398, 1398, 3123, 3121, 5016);
        CRLF2geneScores['CMTM7'] = applyExpressionCondition('CMTM7', geneExpressions['CMTM7'], 832, 1325, 1325, 4060, 4060, 5452);
        CRLF2geneScores['CRLF2'] = applyExpressionCondition('CRLF2', geneExpressions['CRLF2'], 48, 419, 419, 7410, 7410, 13061);

        console.log('CASP10 Result:', CRLF2geneScores['CASP10']);
        console.log('CMTM7 Result:', CRLF2geneScores['CMTM7']);
        console.log('CRLF2 Result:', CRLF2geneScores['CRLF2']);
      }

      if (ABL1_LikeSelected == true) {

      }

      // 세 결과의 평균을 구하고 출력
      ABL1averageResult = 0;
      CRLF2averageResult = (CRLF2geneScores['CASP10'] + CRLF2geneScores['CMTM7'] + CRLF2geneScores['CRLF2']) / 3;
      ABL1_LikeaverageResult = 0;

      console.log('ABL1 Average Result:', ABL1averageResult);
      console.log('CRLF2 Average Result:', CRLF2averageResult);
      console.log('ABL1_Like Average Result:', ABL1_LikeaverageResult);     
    }

    else if (selectedmethod == "RANK") {
      if (ABL1selected == true) {

      }

      if (CRLF2selected == true) {
        // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
        casp10Result = results.CRLF2geneScores['CASP10'];
        cmtm7Result = results.CRLF2geneScores['CMTM7'];
        crlf2Result = results.CRLF2geneScores['CRLF2'];
        
        // 각 유전자의 결과 출력
        console.log('CASP10 Result:', casp10Result);
        console.log('CMTM7 Result:', cmtm7Result);
        console.log('CRLF2 Result:', crlf2Result);
      }

      if (ABL1_LikeSelected == true) {

      }

      // 세 결과의 평균을 구하고 출력
      ABL1averageResult = 0;
      CRLF2averageResult = (casp10Result + cmtm7Result + crlf2Result) / 3;
      ABL1_LikeaverageResult = 0;

      console.log('CASP10:', casp10Result);
      console.log('CMTM7:', cmtm7Result);
      console.log('CRLF2:', crlf2Result);
      console.log('ABL1 Average:', ABL1averageResult);
      console.log('CRLF2 Average:', CRLF2averageResult);
      console.log('ABL1_Like Average:', ABL1_LikeaverageResult);
    }  

    const queryParams = new URLSearchParams({
      ABL1averageResult: ABL1averageResult,
      CRLF2averageResult: CRLF2averageResult,
      ABL1_LikeaverageResult: ABL1_LikeaverageResult,
      ABL1selected: ABL1selected,
      CRLF2selected: CRLF2selected,
      ABL1_LikeSelected: ABL1_LikeSelected
      // 다른 쿼리 매개변수들도 추가할 수 있습니다.
    });

    // URL에 데이터를 추가하여 다음 페이지로 이동
    goto(`/result?${queryParams.toString()}`);
  }

  // 파일 선택 이벤트에 핸들러 등록
  onMount(() => {
    const fileInput = document.getElementById('fileInput');
    
    fileInput.addEventListener('change', handleFileSelect);
  });
</script>

<form type="submit">
  <div class="mt-12 rounded-lg border mx-5 px-12 py-10 bg-white">
    <p class="ml-8 text-3xl text-violet-900 font-medium mt-2">Ph(+) B-ALL Probability Calculator</p>
    <div class="mt-10">
      <div class="w-full px-10 rounded-lg">
        <p class="text-3xl text-violet-700 font-medium">Data</p>
        <p class="mt-2 text-violet-400 text-base font-normal">
          Upload your RPKM matrix file ( csv, tsv, or ... )
        </p>   
        <Label class="w-32 space-y-2 mb-2">
          <Fileupload id="fileInput" class = "w-32 opacity-0" bind:value/>
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
        <div class="mb-10 w-full">
          <div class="w-full mr-24">
            <p class="mt-2 text-violet-400 text-base font-normal">
              RPKM or RANK Based
            </p>
            <Select
              id="Patient"
              size="sm" 
              class="mt-3 text-base text-violet-500 bg-inherit border-violet-300 focus:ring-white focus:border-violet-300"
              bind:value={selectedmethod}
            >
              {#each Based as { value, name }}
                <option {value}>{name}</option>
              {/each}
            </Select>
          </div>
          <div class="w-full mt-16 mr-5">
            <p class="text-violet-400 text-base font-normal">
              Score Class
            </p>
            <div class="flex">
              <div class="mt-4 flex">
                <Checkbox
                  id="boxplot-check1"
                  bind:checked={ABL1selected}
                  on:click={() => {
                    ABL1selected = !ABL1selected;
                  }}
                  class="h-6 w-6 bg-inherit checked:bg-violet-800 focus:ring-white"
                />
                <label class="ml-5 text-neutral-400 text-base font-normal" for="boxplot-check1">
                  ABL1 Class
                </label>
              </div>
              <div class="ml-36 mt-4 flex">
                <Checkbox
                  id="boxplot-check2"
                  bind:checked={CRLF2selected}
                  on:click={() => {
                    CRLF2selected = !CRLF2selected;
                  }}
                  class="w-6 h-6 bg-inherit checked:bg-violet-500 focus:ring-white"
                />
                <label class="ml-5 text-neutral-400 text-base font-normal" for="boxplot-check2">
                  CRLF2 Class
                </label>
              </div>
              <div class="ml-36 mt-4 flex">
                <Checkbox
                id="boxplot-check3"
                bind:checked={ABL1_LikeSelected}
                on:click={() => {
                  ABL1_LikeSelected = !ABL1_LikeSelected;
                }}
                class="w-6 h-6 bg-inherit checked:bg-violet-300 focus:ring-white"/>
                <label class="ml-5 text-neutral-400 text-base font-normal" for="boxplot-check3">
                  ABL1-Like Class
                </label>
              </div>
            </div>
          </div>
        </div>  
        <div class="mt-28 mb-12 text-center">
          <Button
          class="text-xl font-semibold bg-violet-800 hover:bg-violet-900 focus:ring-white"
          on:click={handlePredictProbability}
          >Predict Probability</Button>
        </div>
      </div> 
    </div>
    <div class="mt-16 -mb-9 h-max bg-inherit hover:bg-inherit rounded-lg place-content-center">
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
</form>