<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Select } from "flowbite-svelte";
  import { P, A, Input, Label, Helper } from "flowbite-svelte";
  import { Fileupload, Button, Checkbox } from "flowbite-svelte";
  import { Alert } from 'flowbite-svelte';
  import model from '../../lib/model.json';

  let columnNumber;
  let filetype = "";
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
    const reader = new FileReader();

    reader.onload = function(event) {
      if (filetype=="txt") {
        fileContent = event.target.result;
        fileRows = fileContent.split('\n').map(row => row.split('\t'));
      }
      else if (filetype=="csv") {
        fileContent = event.target.result;
        fileRows = fileContent.split('\n').map(row => row.split(','));
      }
      else if (filetype=="tsv") {
        fileContent = event.target.result;
        fileRows = fileContent.split('\n').map(row => row.split('\t'));
      }
      else if (filetype=="xlsx") {
        fileContent = event.target.result;
        fileRows = fileContent.split('\n').map(row => row.split(','));
      }
      else {
        file_value = "";
        preview = false;
        alert("Please select right format file");
        return;
      }

      try {
        columnNumber = fileRows[0].length;
      } catch (e) {
        file_value = "";
        preview = false;
        alert("Please select right format file");
        return;
      } finally {
        columnNumber = fileRows[0].length;
        selectedColumns = Array.from({ length: columnNumber }, () => true);

        preview = true; 
      }
      
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
    let true_length = selectedColumns.filter(element => true === element).length;

    if (true_length < 2) {
      alert("Please select 2 columns");
      return;
    }

    else if (true_length > 2) {
      alert("Please select 2 columns");
      return;
    }

    else if (true_length == 2){
      let step;
      let num = 0;
      for (step=0; step<selectedColumns.length; step++) {
        if (selectedColumns[step] == true) {
          num = num + 1;
          if (num ==1) {
            let step2;
            for (step2=1; step2<fileRows.length-1; step2++) {
              value = fileRows[step2][step];
              geneExpressions[value] = 0;
            }
          }
          else if (num == 2) {
            let step2;
            for (step2=1; step2<fileRows.length; step2++) {
              geneExpressions[value] = fileRows[step2][step];
            }
          }
        }
      }
      if (selectedmethod == "RPKM") {
        if (ABL1selected == true) {
          let idx; 
          for (idx=0; idx<Object.keys(model["RPKM"]["ABL1"]).length; idx++) {
            // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
            ABL1geneScores[Object.keys(model["RPKM"]["ABL1"])[idx]] = applyExpressionCondition(geneExpressions[Object.keys(model["RPKM"]["ABL1"])[idx]], model["RPKM"]["ABL1"][Object.keys(model["RPKM"]["ABL1"])[idx]][0], model["RPKM"]["ABL1"][Object.keys(model["RPKM"]["ABL1"])[idx]][1], model["RPKM"]["ABL1"][Object.keys(model["RPKM"]["ABL1"])[idx]][2], model["RPKM"]["ABL1"][Object.keys(model["RPKM"]["ABL1"])[idx]][3]);
          }
          
          let ABL1sum = 0;

          for (let i = 0; i < ABL1geneScores.length; i++ ) {
            ABL1sum += ABL1geneScores[i];
          }

          ABL1averageResult = ABL1sum / ABL1geneScores.length;
        }

        if (CRLF2selected == true) {
          let idx; 
          for (idx=0; idx<Object.keys(model["RPKM"]["CRLF2"]).length; idx++) {
            // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
            CRLF2geneScores[Object.keys(model["RPKM"]["CRLF2"])[idx]] = applyExpressionCondition(geneExpressions[Object.keys(model["RPKM"]["CRLF2"])[idx]], model["RPKM"]["CRLF2"][Object.keys(model["RPKM"]["CRLF2"])[idx]][0], model["RPKM"]["CRLF2"][Object.keys(model["RPKM"]["CRLF2"])[idx]][1], model["RPKM"]["CRLF2"][Object.keys(model["RPKM"]["CRLF2"])[idx]][2], model["RPKM"]["CRLF2"][Object.keys(model["RPKM"]["CRLF2"])[idx]][3]);
          }
          
          let CRLF2sum = 0;

          for (let i = 0; i < CRLF2geneScores.length; i++ ) {
            CRLF2sum += CRLF2geneScores[i];
          }

          CRLF2averageResult = CRLF2sum / CRLF2geneScores.length;
        }

        if (ABL1_LikeSelected == true) {
          let idx;
          for (idx=0; idx<Object.keys(model["RPKM"]["ABL1_Like"]).length; idx++) {
            // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
            ABL1_LikegeneScores[Object.keys(model["RPKM"]["ABL1_Like"])[idx]] = applyExpressionCondition(geneExpressions[Object.keys(model["RPKM"]["ABL1_Like"])[idx]], model["RPKM"]["ABL1_Like"][Object.keys(model["RPKM"]["ABL1_Like"])[idx]][0], model["RPKM"]["ABL1_Like"][Object.keys(model["RPKM"]["ABL1_Like"])[idx]][1], model["RPKM"]["ABL1_Like"][Object.keys(model["RPKM"]["ABL1_Like"])[idx]][2], model["RPKM"]["ABL1_Like"][Object.keys(model["RPKM"]["ABL1_Like"])[idx]][3]);

            let ABL1_Likesum = 0;

            for (let i = 0; i < ABL1_LikegeneScores.length; i++ ) {
              ABL1_Likesum += ABL1_LikegeneScores[i];
            }

            ABL1_LikeaverageResult = ABL1_Likesum / ABL1_LikegeneScores.length;
          }  
        }
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

      else {
        alert("Please select the method");
        return;
      }

      if (ABL1selected===false && CRLF2selected===false && ABL1_LikeSelected===false) {
        alert("Please select at least one class");
        return;
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
      loading = true; // 파일 처리가 시작되었으므로 로딩 상태를 true로 설정
      // URL에 데이터를 추가하여 다음 페이지로 이동
      goto(`/result?${queryParams.toString()}`);
      loading = false; // 파일 처리가 완료되었으므로 로딩 상태를 false로 설정
    }
  }
    

  // 파일 선택 시 파일 이름을 추출하여 레이블에 표시하는 함수
  function updateFileName(event) {
    const fileInput = event.target;

    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      
      file_value = fileName;
      filetype = file_value.split('.')[file_value.split('.').length - 1];

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
  <div class="mt-12 rounded-lg border mx-5 px-12 pt-10 bg-white">
    <p class="ml-8 text-3xl text-violet-900 font-medium mt-5">Ph(+) B-ALL Probability Calculator</p>
    <div class="mt-10">
      <div class="w-full px-10 rounded-lg">
        <p class="text-3xl text-violet-700 font-medium">Data</p>
        <p class="mt-2 text-violet-400 text-base font-medium">
          Upload your RPKM matrix file ( txt, csv, tsv, or ... )
        </p>           
        <div class="flex">
          <Label for="fileInput" class="font-Catamaran w-28 rounded-lg text-center text-white mt-3 py-2 bg-violet-400 hover:bg-violet-500 text-base font-semibold hover:ring-transparent">
            Select File
          </Label>
          <Label class="text-neutral-300 text-center text-[16px] font-normal px-3 mt-5">{file_value}</Label>
          <Input class="hidden" type="file" id="fileInput" style={{display:"none"}} on:change={updateFileName}/>
        </div>
        {#if preview}
          <div class="flex mt-12">
            <p class="text-violet-400 text-lg font-medium">
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
            <p class="mt-2 text-violet-400 text-base font-medium">
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
            <p class="text-violet-400 text-base font-medium">
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
                <label class="ml-5 text-neutral-400 text-base font-medium" for="boxplot-check1">
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
                <label class="ml-5 text-neutral-400 text-base font-medium" for="boxplot-check2">
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
                <label class="ml-5 text-neutral-400 text-base font-medium" for="boxplot-check3">
                  ABL1-Like Class
                </label>
              </div>
            </div>
          </div>
        </div>  
        <div class="mt-28 mb-12 text-center">
          <Button
          class="font-Catamaran text-xl font-semibold bg-violet-800 hover:bg-violet-900 focus:ring-transparent"
          on:click={handlePredictProbability}
          >Predict Probability</Button>
        </div>
      </div> 
    </div>
    <footer>
      <div class="mt-20 mb-2 px-2 sm:px-4">
          <div class="mx-auto flex flex-col container">
              <P class="text-violet-700 text-center">This website is maintained by <A class="text-violet-400 underline" href="https://sites.google.com/view/kimlab" target="_blank">Computational Omics Lab</A>, Pusan National University College of Biomedical Convergence Engineering, South Korea. </P>
          </div>
      </div>
    </footer>    
  </div>
</form>


