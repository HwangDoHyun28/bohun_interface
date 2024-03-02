<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Select } from "flowbite-svelte";
  import { P, A, Input, Label, Helper } from "flowbite-svelte";
  import { Fileupload, Button, Checkbox } from "flowbite-svelte";


  let value = "";
  let file_value = "";
  let selectedmethod;
  let Based = [
    { value: "RPKM", name: "RPKM based" },
    { value: "RANK", name: "Rank based" },
  ];

  let ABL1selected = true;
  let CRLF2selected = true;
  let ABL1_LikeSelected = true;

  let geneExpressions = {};

  let ABL1geneScores = {};
  let CRLF2geneScores = {};
  let ABL1_LikegeneScores = {};

  let ABL1rankScores = {};
  let CRLF2rankScores = {};
  let ABL1_LikerankScores = {};

  let casp10Result = 0;
  let cmtm7Result = 0;
  let crlf2Result = 0;

  let ABL1averageResult = 0;
  let CRLF2averageResult = 0;
  let ABL1_LikeaverageResult = 0;

  // gene expression 값에 대한 조건을 적용하여 결과를 반환하는 함수
  function applyExpressionCondition(value, lower1, upper1, lower2, upper2) {
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

  let fileContent = "";
  let fileRows = [];
  let loading = false; // 로딩 상태를 나타내는 변수
  let preview = false; // 파일 미리보기 상태를 나타내는 변수

  // 파일을 읽어서 특정 유전자의 gene expression 값을 추출하고 결과를 출력하는 함수
  function processFile(file) {
    loading = true; // 파일 처리가 시작되었으므로 로딩 상태를 true로 설정
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
      fileContent = event.target.result;
      fileRows = fileContent.split('\n').map(row => row.split(','));
      const length = fileRows.length;
      selectedColumns = Array.from({ length: length }, () => true);

      loading = false; // 파일 처리가 완료되었으므로 로딩 상태를 false로 설정
      preview = true; 
    };
    reader.readAsText(file);
  }

  // 파일 선택 시 호출되는 함수
  function handleFileSelect(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      processFile(event.target.files[0]);
    }
  }

  // 버튼 클릭 시 결과 페이지로 이동하는 함수
  async function handlePredictProbability() {
    if (selectedmethod == "RPKM") {
      if (ABL1selected == true) {
        // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
        ABL1geneScores['WNT9A'] = applyExpressionCondition(geneExpressions['WNT9A'], 0.5654433, 58.45411, 0, 4.883518);
        ABL1geneScores['SPATS2L'] = applyExpressionCondition(geneExpressions['SPATS2L'], 13.46951, 700.5429, 0.2895722, 87.59672);
        ABL1geneScores['SLC2A5'] = applyExpressionCondition(geneExpressions['SLC2A5'], 15.26396, 205.1955, 0.1024562, 54.12377);
        ABL1geneScores['WSB2'] = applyExpressionCondition(geneExpressions['WSB2'], 11.93495, 40.47132, 3.555556, 27.80424);
        ABL1geneScores['SOCS2'] = applyExpressionCondition(geneExpressions['SOCS2'], 171.042, 756.3316, 0.6464725, 457.4958);
        ABL1geneScores['NEURL1B'] = applyExpressionCondition(geneExpressions['NEURL1B'], 48.08602, 377.4831, 0.808105, 87.74368);
        ABL1geneScores['AFAP1L2'] = applyExpressionCondition(geneExpressions['AFAP1L2'], 2.67134324933023, 148.361961244139, 0.276805776923961, 12.8356383275342);
        ABL1geneScores['CEACAM21'] = applyExpressionCondition(geneExpressions['CEACAM21'], 15.46394, 65.26508, 4.370161, 47.89709);
        ABL1geneScores['ELFN2'] = applyExpressionCondition(geneExpressions['ELFN2'], 3.731676, 160.7782, 0.08965376, 31.71739);
        ABL1geneScores['ZFHX3'] = applyExpressionCondition(geneExpressions['ZFHX3'], 1.363497, 11.44101, 0.08152398, 4.554561);
        ABL1geneScores['ABL1'] = applyExpressionCondition(geneExpressions['ABL1'], 13.0397867876073, 100.822441272638, 7.0543970000532, 58.5511885839582);
        ABL1geneScores['DCTN4'] = applyExpressionCondition(geneExpressions['DCTN4'], 61.16148, 243.7928, 15.17781, 105.4528);
        ABL1geneScores['SLFN13'] = applyExpressionCondition(geneExpressions['SLFN13'], 4.167124, 33.07598, 0.8668036, 17.89969);
        ABL1geneScores['HPCAL1'] = applyExpressionCondition(geneExpressions['HPCAL1'], 87.19817, 375.5679, 33.24991, 212.7731);
        ABL1geneScores['SH2D4A'] = applyExpressionCondition(geneExpressions['SH2D4A'], 0.04547993, 9.107743, 0, 1.3434);
        ABL1geneScores['CASP10'] = applyExpressionCondition(geneExpressions['CASP10'], 31.45275, 257.4393, 15.5387, 91.99394);
        ABL1geneScores['DEXI'] = applyExpressionCondition(geneExpressions['DEXI'], 11.99806, 55.72624, 2.747108, 27.06386);
        ABL1geneScores['LAIR1'] = applyExpressionCondition(geneExpressions['LAIR1'], 153.355, 960.5403, 22.27905, 532.9934); 

        console.log('WNT9A Result:', geneExpressions['WNT9A']);
        console.log('SPATS2L Result:', geneExpressions['SPATS2L']);
        console.log('SLC2A5 Result:', geneExpressions['SLC2A5']);
        console.log('WSB2 Result:', geneExpressions['WSB2']);
        console.log('SOCS2 Result:', geneExpressions['SOCS2']);
        console.log('NEURL1B Result:', geneExpressions['NEURL1B']);
        console.log('AFAP1L2 Result:', geneExpressions['AFAP1L2']);
        console.log('CEACAM21 Result:', geneExpressions['CEACAM21']);
        console.log('ELFN2 Result:', geneExpressions['ELFN2']);
        console.log('ZFHX3 Result:', geneExpressions['ZFHX3']);
        console.log('ABL1 Result:', geneExpressions['ABL1']);
        console.log('DCTN4 Result:', geneExpressions['DCTN4']);
        console.log('SLFN13 Result:', geneExpressions['SLFN13']);
        console.log('HPCAL1 Result:', geneExpressions['HPCAL1']);
        console.log('SH2D4A Result:', geneExpressions['SH2D4A']);
        console.log('CASP10 Result:', geneExpressions['CASP10']);
        console.log('DEXI Result:', geneExpressions['DEXI']);
        console.log('LAIR1 Result:', geneExpressions['LAIR1']);

        ABL1averageResult = (ABL1geneScores['WNT9A'] + ABL1geneScores['SPATS2L'] + ABL1geneScores['SLC2A5'] + ABL1geneScores['WSB2'] + ABL1geneScores['SOCS2'] + ABL1geneScores['NEURL1B'] + ABL1geneScores['AFAP1L2'] + ABL1geneScores['CEACAM21'] + ABL1geneScores['ELFN2'] + ABL1geneScores['ZFHX3'] + ABL1geneScores['ABL1'] + ABL1geneScores['DCTN4'] + ABL1geneScores['SLFN13'] + ABL1geneScores['HPCAL1'] + ABL1geneScores['SH2D4A'] + ABL1geneScores['CASP10'] + ABL1geneScores['DEXI'] + ABL1geneScores['LAIR1']) / 18;
        
        console.log('ABL1 Sum:', ABL1averageResult);
      }

      if (CRLF2selected == true) {
        // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
        CRLF2geneScores['CASP10'] = applyExpressionCondition(geneExpressions['CASP10'], 657, 3123, 1398, 5016);
        CRLF2geneScores['CMTM7'] = applyExpressionCondition(geneExpressions['CMTM7'], 832, 4060, 1325, 5452);
        CRLF2geneScores['CRLF2'] = applyExpressionCondition(geneExpressions['CRLF2'], 48, 7410, 419, 13061);

        console.log('CASP10 Result:', CRLF2geneScores['CASP10']);
        console.log('CMTM7 Result:', CRLF2geneScores['CMTM7']);
        console.log('CRLF2 Result:', CRLF2geneScores['CRLF2']);

        CRLF2averageResult = (CRLF2geneScores['CASP10'] + CRLF2geneScores['CMTM7'] + CRLF2geneScores['CRLF2']) / 3;
      }

      if (ABL1_LikeSelected == true) {
        // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
        ABL1_LikegeneScores['SPATS2L'] = applyExpressionCondition(geneExpressions['SPATS2L'], 4.101311,	853.4433,	0.2895722,	83.71679);
        ABL1_LikegeneScores['SAV1'] = applyExpressionCondition(geneExpressions['SAV1'], 14.06004, 76.60259, 0.3860737, 26.77266);
        ABL1_LikegeneScores['SNAP47'] = applyExpressionCondition(geneExpressions['SNAP47'], 5.299292, 59.40034, 1.991974, 20.32479);
        ABL1_LikegeneScores['JCHAIN'] = applyExpressionCondition(geneExpressions['JCHAIN'], 11.55285, 2401.916, 1.834375, 814.8963);
        ABL1_LikegeneScores['WNT9A'] = applyExpressionCondition(geneExpressions['WNT9A'], 0.6469912, 56.28609, 0, 4.883518);
        ABL1_LikegeneScores['WSB2'] = applyExpressionCondition(geneExpressions['WSB2'], 11.3198, 39.32335, 3.555556, 27.80424);
        ABL1_LikegeneScores['SOCS2'] = applyExpressionCondition(geneExpressions['SOCS2'], 73.41159, 1177.613, 0.6464725, 457.4958);
        ABL1_LikegeneScores['ABCA9'] = applyExpressionCondition(geneExpressions['ABCA9'], 0.012253011315132, 61.1093687703313, 0, 9.05664532319996);

        console.log('SPATS2L Result:', ABL1_LikegeneScores['SPATS2L']);
        console.log('SAV1 Result:', ABL1_LikegeneScores['SAV1']);
        console.log('SNAP47 Result:', ABL1_LikegeneScores['SNAP47']);
        console.log('JCHAIN Result:', ABL1_LikegeneScores['JCHAIN']);
        console.log('WNT9A Result:', ABL1_LikegeneScores['WNT9A']);
        console.log('WSB2 Result:', ABL1_LikegeneScores['WSB2']);
        console.log('SOCS2 Result:', ABL1_LikegeneScores['SOCS2']);
        console.log('ABCA9 Result:', ABL1_LikegeneScores['ABCA9']);

        ABL1_LikeaverageResult = (ABL1_LikegeneScores['SPATS2L'] + ABL1_LikegeneScores['SAV1'] + ABL1_LikegeneScores['SNAP47'] + ABL1_LikegeneScores['JCHAIN'] 
        + ABL1_LikegeneScores['WNT9A'] + ABL1_LikegeneScores['WSB2'] + ABL1_LikegeneScores['SOCS2'] + ABL1_LikegeneScores['ABCA9']) / 8;
      }
      console.log('ABL1 Average Result:', ABL1averageResult);
      console.log('CRLF2 Average Result:', CRLF2averageResult);
      console.log('ABL1_Like Average Result:', ABL1_LikeaverageResult);     
    }

    else if (selectedmethod == "RANK") {
      const sortedGenes = Object.keys(geneExpressions).sort((a, b) => geneExpressions[b] - geneExpressions[a]);

      if (ABL1selected == true) {
        ABL1averageResult = 0;
      }

      if (CRLF2selected == true) {
        // CASP10, CMTM7, CRLF의 gene expression 값을 기준으로 순위 계산
        const casp10Rank = sortedGenes.indexOf('CASP10') + 1;
        const cmtm7Rank = sortedGenes.indexOf('CMTM7') + 1;
        const crlf2Rank = sortedGenes.indexOf('CRLF2') + 1;
        
        // 각 유전자의 결과 출력
        console.log('CASP10 Rank:', casp10Rank);
        console.log('CMTM7 Rank:', cmtm7Rank);
        console.log('CRLF2 Rank:', crlf2Rank);

        // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
        CRLF2rankScores['CASP10'] = applyExpressionCondition(casp10Rank, 657, 1398, 1398, 3123, 3121, 5016);
        CRLF2rankScores['CMTM7'] = applyExpressionCondition(cmtm7Rank, 832, 1325, 1325, 4060, 4060, 5452);
        CRLF2rankScores['CRLF2'] = applyExpressionCondition(crlf2Rank, 48, 419, 419, 7410, 7410, 13061);

        console.log('CASP10 Result:', CRLF2rankScores['CASP10']);
        console.log('CMTM7 Result:', CRLF2rankScores['CMTM7']);
        console.log('CRLF2 Result:', CRLF2rankScores['CRLF2']);

        CRLF2averageResult = (CRLF2rankScores['CASP10'] + CRLF2rankScores['CMTM7'] + CRLF2rankScores['CRLF2']) / 3;
      }

      if (ABL1_LikeSelected == true) {
        ABL1_LikeaverageResult = 0;
      }

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
      ABL1_LikeSelected: ABL1_LikeSelected,
      selectedmethod: selectedmethod
    });

    // URL에 데이터를 추가하여 다음 페이지로 이동
    goto(`/result?${queryParams.toString()}`);
  }

  // 파일 선택 시 파일 이름을 추출하여 레이블에 표시하는 함수
  function updateFileName(event) {
    const fileInput = event.target;

    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      file_value = fileName;
    } else {
      file_value = '';
    }
  }

  // 파일 선택 이벤트에 핸들러 등록
  onMount(() => {
    const fileInput = document.getElementById('fileInput');
    
    fileInput.addEventListener('change', handleFileSelect);
  });

  let selectedColumns = []; // 각 열의 선택 여부를 저장하는 배열

  function toggleColumn(cellIndex) {
    selectedColumns[cellIndex] = !selectedColumns[cellIndex];
  }

</script>
<style>
  /* YourComponent에 대한 스타일 */
  @import '/home/hdh1028/Downloads/Bohun_Ranking_Pathway/bohun_interface/frontend/src/routes/scrollbar.css'; /* scrollbar.css 파일 임포트 */
</style>

<!-- 로딩 화면 -->
{#if loading}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
  </div>
{/if}


<form type="submit">
  <div class="mt-12 rounded-lg border mx-5 px-12 py-10 bg-white">
    <p class="ml-8 text-3xl text-violet-900 font-medium mt-5">Ph(+) B-ALL Probability Calculator</p>
    <div class="mt-10">
      <div class="w-full px-10 rounded-lg">
        <p class="text-3xl text-violet-700 font-medium">Data</p>
        <p class="mt-2 text-violet-400 text-base font-normal">
          Upload your RPKM matrix file ( txt, csv, tsv, or ... )
        </p>   
        <Label class="w-32 space-y-2 mb-2">
          <Fileupload id="fileInput" class = "w-32 opacity-0" bind:value on:change={updateFileName}/>
        </Label>           
        <div class="-mt-12 flex">
          <div>
            <Button class="y-5 mt-3 py-2 bg-violet-400 hover:bg-violet-500 text-base font-semibold hover:ring-transparent"
              >Select File</Button
            >
          </div>
          <div class="text-center mt-4">
            <Label class="text-neutral-300 text-center text-[16px] font-normal px-3 mt-1">{file_value}</Label>
          </div>
          
        </div>
        {#if preview}
          <div class="flex mt-12">
            <p class="text-violet-400 text-lg font-normal">
              Preview
            </p>
            <p class="ml-1 mt-1 text-neutral-300 text-sm font-normal">
              (Select Columns)
            </p>
          </div>
          <!-- 파일 미리보기 섹션 -->
          <div class="mt-2 overflow-x-auto">
            <table class="mt-1 border-2 text-sm border-neutral-100 text-neutral-400">
              {#each fileRows.slice(0, 6) as row, rowIndex}
                {#if rowIndex === 0}
                  <tr>
                    {#each row as cell, cellIndex}
                      <th class="border-2 text-center text-white text-sm border-neutral-100 bg-violet-300 p-2 mr-5">
                        <div class="mx-2 flex">
                          <Checkbox
                            id="{cellIndex}"
                            bind:checked={selectedColumns[cellIndex]}
                            class="mr-2 w-4 h-4 bg-inherit checked:bg-violet-500 focus:ring-transparent"
                            on:click={() => toggleColumn(cellIndex)}
                          />
                          <label for="{cellIndex}">
                            {cell}
                          </label>
                        </div>
                      </th>
                    {/each}
                  </tr>
                {:else}
                  <tr>
                    {#each row as cell, cellIndex}
                      <td class="mr-2 text-center border-2 text-sm border-neutral-100 p-2">{cell}</td>
                    {/each}
                  </tr>
                {/if}
              {/each}
            </table>
          </div>
        {/if}
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
                <option class="group-hover:text-white group-hover:bg-neutral-200" {value}>{name}</option>
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
          class="text-xl font-semibold bg-violet-800 hover:bg-violet-900 focus:ring-transparent"
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

