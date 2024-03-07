<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Select } from "flowbite-svelte";
  import { P, A, Input, Label, Helper } from "flowbite-svelte";
  import { Fileupload, Button, Checkbox } from "flowbite-svelte";
  import { Alert } from 'flowbite-svelte';
  import model from '../../lib/model.json';
  import aliase from '../../lib/aliase.json';
  let columnNumber;
  let rowNumber;
  let filetype = "";
  let file_value = "";
  let checkcolumnidx = [];
  let checkrowidx = [];
  let fileContent = "";
  let fileRows = [];
  let selectedrowChecks;
  let selectedcolumnChecks;
  let tableTF; // 각 열의 선택 여부를 저장하는 배열


  let selectedmethod;
  let Based = [
    { value: "RPKM", name: "RPKM based" },
    { value: "RANK", name: "Rank based" },
  ];

  let ABL1selected = true;
  let CRLF2selected = true;
  let ABL1_LikeSelected = true;

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

  let Defaultclass = "border-2 border-neutral-100 mr-2 text-sm py-2 px-5";
  let columnCheckedclass = "font-semibold border-2 border-neutral-100 hover:bg-violet-400 bg-violet-300 text-white mr-2 text-sm py-2 px-5";
  let rowCheckedclass = "font-semibold border-2 border-neutral-100 bg-violet-300 hover:bg-violet-400 text-white mr-2 text-sm py-2 px-5";
  let crossCheckedclass = "font-semibold border-2 border-neutral-100 bg-violet-400 text-white mr-2 text-sm py-2 px-5";

  function create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
    }
    return arr;
}

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

  let loading = false; // 로딩 상태를 나타내는 변수
  let preview = false; // 파일 미리보기 상태를 나타내는 변수

  // 파일을 읽어서 특정 유전자의 gene expression 값을 추출하고 결과를 출력하는 함수
  function processFile(file) {
    checkcolumnidx = [];
    checkrowidx = [];
    fileContent = "";
    fileRows = [];

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
        rowNumber = fileRows.length;
      } 

      catch (err) {
        file_value = "";
        preview = false;
        alert("Please select right format file");
        return;
      } 
      tableTF = create2DArray(columnNumber, rowNumber);

      preview = true;
      
      //str인 셀은 true를 뱉는 2차원 array 만들기
      for (let i = 0; i < fileRows.length; i++) {
        for (let j=0; j< fileRows[i].length; j++){
          tableTF[j][i] = isNaN(fileRows[i][j]);
        }
      }

      // 열 중에서 true가 절반 이상 있는 열은 array에 담아 차후 체크박스가 나타나게 한다.
      for (let j=0; j < fileRows[0].length; j++){
        if (tableTF[j].filter(element => element == true).length >= parseInt(fileRows.length/2)) {
          checkcolumnidx.push(j+1)
        }
      }

      // 체크박스가 나타나게 한 column의 index를 제외하고 각 row의 값에서 true가 절반 이상 있는 row의 인덱스를 저장한다.
      for (let i=0; i < fileRows.length; i++) {
        let removecolumnidxrow = [];
        
        for (let j=0; j < fileRows[0].length; j++) {
          if (checkcolumnidx.includes(parseInt(j+1)) == true) {
          }
          else {
            removecolumnidxrow.push(tableTF[j][i]) 
          }
        }
        if (removecolumnidxrow.filter(element => element == true).length > parseInt((removecolumnidxrow.length)/2)) {
          checkrowidx.push(i+1)
        }
      }

      selectedrowChecks= Array.from({ length: rowNumber+1 }, () => false);
      selectedrowChecks[checkrowidx[0]] = true;
      
      selectedcolumnChecks = Array.from({ length: columnNumber+1 }, () => false);
      selectedcolumnChecks[checkcolumnidx[0]] = true;
      
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
    let column_true_length = selectedcolumnChecks.filter(element => element == true).length;
    let row_true_length = selectedrowChecks.filter(element => element == true).length;

    if ((column_true_length == 0) && (row_true_length == 0)) {
      alert("Please select 1 column and 1 row");
      return;
    }

    else if ((column_true_length == 0) && (row_true_length == 1)) {
      alert("Please select 1 column");
      return;
    }

    else if ((column_true_length == 1) && (row_true_length == 0)) {
      alert("Please select 1 row");
      return;
    }

    else if ((column_true_length > 1) && (row_true_length > 1)) {
      alert("Please select 1 column and 1 row");
      return;
    }

    else {
      // 각 체크된 row와 column의 index를 구한다
      let truecolumnidx = selectedcolumnChecks.indexOf(true)-1;
      let truerowidx = selectedrowChecks.indexOf(true)-1;
      let geneexpressionperpatient = {};

      for (let j=0; j<fileRows[0].length; j++) {
        if (checkcolumnidx.includes(j+1) == false) {
          geneexpressionperpatient[fileRows[truerowidx][j]] = {};
        }
      }

      for (let i=0; i<Object.keys(geneexpressionperpatient).length; i++) {
        for (let j=0; j<Object.keys(aliase).length; j++) {
          geneexpressionperpatient[Object.keys(geneexpressionperpatient)[i]][Object.keys(aliase)[j]] = 0
        }
      }

      //파일에서 checkcolumnidx와 checkrowidx 안에 없는 인덱스의 값만 가져와 저장한다.
      for (let i=0; i<fileRows.length; i++) {
        if (checkrowidx.includes(i+1) == false) {
          for (let j=0; j<fileRows[0].length; j++) {
            if (checkcolumnidx.includes(j+1) == false) {
              let originalgenename = "";

              // 선택한 column의 값을 alise에 따라 변환하여 저장
              for (let n=0; n<aliase.length; n++) {
                for (let k=0; k<aliase[Object.keys(Object.keys)[n]].length; k++){
                  if (fileRows[i][truecolumnidx] == aliase[n][k]) {
                    originalgenename = Object.keys(aliase)[n];
                  }
                }
              }
              geneexpressionperpatient[fileRows[truerowidx][j]][originalgenename] = fileRows[i][j];
            }
          }
        }
      }

      let ABL1averageResultObject = {};
      let CRLF2averageResultObject = {};
      let ABL1_LikeaverageResultObject = {};

      // geneexpressionperpatient에 저장한 값을 기반으로 필요한 값을 구한다. 
      for (let i=0; i<Object.keys(geneexpressionperpatient).length; i++) {
        let geneExpressions = geneexpressionperpatient[Object.keys(geneexpressionperpatient)[i]];

        if (selectedmethod == "RPKM") {
          if (ABL1selected == true) {
            for (let idx=0; idx<Object.keys(model["RPKM"]["ABL1"]).length; idx++) {
              // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
              ABL1geneScores[Object.keys(model["RPKM"]["ABL1"])[idx]] = applyExpressionCondition(geneExpressions[Object.keys(model["RPKM"]["ABL1"])[idx]], model["RPKM"]["ABL1"][Object.keys(model["RPKM"]["ABL1"])[idx]][0], model["RPKM"]["ABL1"][Object.keys(model["RPKM"]["ABL1"])[idx]][1], model["RPKM"]["ABL1"][Object.keys(model["RPKM"]["ABL1"])[idx]][2], model["RPKM"]["ABL1"][Object.keys(model["RPKM"]["ABL1"])[idx]][3]);
            }

            console.log('ABL1geneScores:', ABL1geneScores);

            let ABL1sum = 0;

            for (let idx = 0; idx < Object.keys(model["RPKM"]["ABL1"]).length; idx++ ) {
              ABL1sum += ABL1geneScores[Object.keys(model["RPKM"]["ABL1"])[idx]];
            }

            ABL1averageResult = ABL1sum / Object.keys(model["RPKM"]["ABL1"]).length;
            console.log('ABL1 Average:', ABL1averageResult);

            ABL1averageResultObject[Object.keys(geneexpressionperpatient)[i]] = ABL1averageResult;
          }

          if (CRLF2selected == true) {
            let idx; 
            for (idx=0; idx<Object.keys(model["RPKM"]["CRLF2"]).length; idx++) {
              // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
              CRLF2geneScores[Object.keys(model["RPKM"]["CRLF2"])[idx]] = applyExpressionCondition(geneExpressions[Object.keys(model["RPKM"]["CRLF2"])[idx]], model["RPKM"]["CRLF2"][Object.keys(model["RPKM"]["CRLF2"])[idx]][0], model["RPKM"]["CRLF2"][Object.keys(model["RPKM"]["CRLF2"])[idx]][1], model["RPKM"]["CRLF2"][Object.keys(model["RPKM"]["CRLF2"])[idx]][2], model["RPKM"]["CRLF2"][Object.keys(model["RPKM"]["CRLF2"])[idx]][3]);
              console.log(geneExpressions[Object.keys(model["RPKM"]["CRLF2"])[idx]]);
            }
            
            console.log('CRLF2geneScores:', CRLF2geneScores);

            let CRLF2sum = 0;

            for (let idx = 0; idx < Object.keys(model["RPKM"]["CRLF2"]).length; idx++ ) {
              CRLF2sum += CRLF2geneScores[Object.keys(model["RPKM"]["CRLF2"])[idx]];
            }

            CRLF2averageResult = CRLF2sum / Object.keys(model["RPKM"]["CRLF2"]).length;
            console.log('CRLF2 Average:', CRLF2averageResult);

            CRLF2averageResultObject[Object.keys(geneexpressionperpatient)[i]] = CRLF2averageResult;
          }

          if (ABL1_LikeSelected == true) {
            let idx;
            for (idx=0; idx<Object.keys(model["RPKM"]["ABL1_Like"]).length; idx++) {
              // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
              ABL1_LikegeneScores[Object.keys(model["RPKM"]["ABL1_Like"])[idx]] = applyExpressionCondition(geneExpressions[Object.keys(model["RPKM"]["ABL1_Like"])[idx]], model["RPKM"]["ABL1_Like"][Object.keys(model["RPKM"]["ABL1_Like"])[idx]][0], model["RPKM"]["ABL1_Like"][Object.keys(model["RPKM"]["ABL1_Like"])[idx]][1], model["RPKM"]["ABL1_Like"][Object.keys(model["RPKM"]["ABL1_Like"])[idx]][2], model["RPKM"]["ABL1_Like"][Object.keys(model["RPKM"]["ABL1_Like"])[idx]][3]);
            }  

            console.log('ABL1_LikegeneScores:', ABL1_LikegeneScores);

            let ABL1_Likesum = 0;

            for (let idx = 0; idx < Object.keys(model["RPKM"]["ABL1_Like"]).length; idx++ ) {
              ABL1_Likesum += ABL1_LikegeneScores[Object.keys(model["RPKM"]["ABL1_Like"])[idx]];
            }

            ABL1_LikeaverageResult = ABL1_Likesum / Object.keys(model["RPKM"]["ABL1_Like"]).length;
            console.log('ABL1_Like Average:', ABL1_LikeaverageResult);

            ABL1_LikeaverageResultObject[Object.keys(geneexpressionperpatient)[i]] = ABL1_LikeaverageResult;
          }
        }
        else if (selectedmethod == "RANK") {
          const sortedGenes = Object.keys(geneExpressions).sort((a, b) => geneExpressions[b] - geneExpressions[a]);

          if (ABL1selected == true) {
            for (let idx=0; idx<Object.keys(model["RANK"]["ABL1"]).length; idx++) {
              // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
              ABL1rankScores[Object.keys(model["RANK"]["ABL1"])[idx]] = applyExpressionCondition(sortedGenes.indexOf(Object.keys(model["RANK"]["ABL1"])[idx]) + 1, model["RANK"]["ABL1"][Object.keys(model["RANK"]["ABL1"])[idx]][0], model["RANK"]["ABL1"][Object.keys(model["RANK"]["ABL1"])[idx]][1], model["RANK"]["ABL1"][Object.keys(model["RANK"]["ABL1"])[idx]][2], model["RANK"]["ABL1"][Object.keys(model["RANK"]["ABL1"])[idx]][3]);
            }

            let ABL1sum = 0;

            for (let idx = 0; idx < Object.keys(model["RANK"]["ABL1"]).length; idx++ ) {
              ABL1sum += ABL1rankScores[Object.keys(model["RANK"]["ABL1"])[idx]];
            }

            ABL1averageResult = ABL1sum / Object.keys(model["RPKM"]["ABL1"]).length;
            console.log('ABL1 Average:', ABL1averageResult);
            
            ABL1averageResultObject[Object.keys(geneexpressionperpatient)[i]] = ABL1averageResult;
          }

          if (CRLF2selected == true) {
            for (let idx=0; idx<Object.keys(model["RANK"]["CRLF2"]).length; idx++) {
              // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
              CRLF2rankScores[Object.keys(model["RANK"]["CRLF2"])[idx]] = applyExpressionCondition(sortedGenes.indexOf(Object.keys(model["RANK"]["CRLF2"])[idx]) + 1, model["RANK"]["CRLF2"][Object.keys(model["RANK"]["CRLF2"])[idx]][0], model["RANK"]["CRLF2"][Object.keys(model["RANK"]["CRLF2"])[idx]][1], model["RANK"]["CRLF2"][Object.keys(model["RANK"]["CRLF2"])[idx]][2], model["RANK"]["CRLF2"][Object.keys(model["RANK"]["CRLF2"])[idx]][3]);
            }

            let CRLF2sum = 0;

            for (let idx = 0; idx < Object.keys(model["RANK"]["CRLF2"]).length; idx++ ) {
              CRLF2sum += CRLF2rankScores[Object.keys(model["RANK"]["CRLF2"])[idx]];
            }

            CRLF2averageResult = CRLF2sum / Object.keys(model["RPKM"]["CRLF2"]).length;
            console.log('CRLF2 Average:', CRLF2averageResult);
            
            CRLF2averageResultObject[Object.keys(geneexpressionperpatient)[i]] = CRLF2averageResult;
          }

          if (ABL1_LikeSelected == true) {
            for (let idx=0; idx<Object.keys(model["RANK"]["ABL1_Like"]).length; idx++) {
              // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
              ABL1_LikerankScores[Object.keys(model["RANK"]["ABL1_Like"])[idx]] = applyExpressionCondition(sortedGenes.indexOf(Object.keys(model["RANK"]["ABL1_Like"])[idx]) + 1, model["RANK"]["ABL1_Like"][Object.keys(model["RANK"]["ABL1_Like"])[idx]][0], model["RANK"]["ABL1_Like"][Object.keys(model["RANK"]["ABL1_Like"])[idx]][1], model["RANK"]["ABL1_Like"][Object.keys(model["RANK"]["ABL1_Like"])[idx]][2], model["RANK"]["ABL1_Like"][Object.keys(model["RANK"]["ABL1_Like"])[idx]][3]);
            }

            let ABL1_Likesum = 0;

            for (let idx = 0; idx < Object.keys(model["RANK"]["ABL1_Like"]).length; idx++ ) {
              ABL1_Likesum += ABL1_LikerankScores[Object.keys(model["RANK"]["ABL1_Like"])[idx]];
            }

            ABL1_LikeaverageResult = ABL1_Likesum / Object.keys(model["RPKM"]["ABL1_Like"]).length;
            console.log('ABL1_Like Average:', ABL1_LikeaverageResult);
            
            ABL1_LikeaverageResultObject[Object.keys(geneexpressionperpatient)[i]] = ABL1_LikeaverageResult;
          }
        }  

        else {
          alert("Please select the method");
          return;
        }

        if (ABL1selected===false && CRLF2selected===false && ABL1_LikeSelected===false) {
          alert("Please select at least one class");
          return;
        }
      }
      
      let ABL1 = '';
      let CRLF2 = '';
      let ABL1_Like = '';
      let PatientID = '';

      for (let i=0; i<Object.keys(ABL1averageResultObject).length; i++) {
        ABL1 = ABL1 + `+${ABL1averageResultObject[Object.keys(ABL1averageResultObject)[i]]}`;
      }

      for (let i=0; i<Object.keys(CRLF2averageResultObject).length; i++) {
        CRLF2 = CRLF2 + `+${CRLF2averageResultObject[Object.keys(CRLF2averageResultObject)[i]]}`;
      }

      for (let i=0; i<Object.keys(ABL1_LikeaverageResultObject).length; i++) {
        ABL1_Like = ABL1_Like + `+${ABL1_LikeaverageResultObject[Object.keys(ABL1_LikeaverageResultObject)[i]]}`;
      }

      for (let i=0; i<Object.keys(ABL1_LikeaverageResultObject).length; i++) {
        PatientID = PatientID+ `+${Object.keys(ABL1_LikeaverageResultObject)[i]}`;
      }

      console.log(ABL1);
      console.log(CRLF2);
      console.log(ABL1_Like);
      console.log(PatientID);

      const queryParams = new URLSearchParams({
        ABL1averageResultObject: ABL1,
        CRLF2averageResultObject: CRLF2,
        ABL1_LikeaverageResultObject: ABL1_Like,
        ABL1selected: ABL1selected,
        CRLF2selected: CRLF2selected,
        ABL1_LikeSelected: ABL1_LikeSelected,
        selectedmethod: selectedmethod,
        PatientID: PatientID

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
    file_value = '';
    filetype = "";
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

  

  function toggleColumn(cellIndex,rowIndex) {
    if (rowIndex == 0) {
      selectedcolumnChecks = Array.from({ length: columnNumber+1 }, () => false);
      selectedcolumnChecks[cellIndex] = !selectedcolumnChecks[cellIndex];
    }
    if (cellIndex == 0) {
      selectedrowChecks= Array.from({ length: rowNumber+1 }, () => false);
      selectedrowChecks[rowIndex] = !selectedrowChecks[rowIndex];
    }
  }
</script>

<style>
  /* YourComponent에 대한 스타일 */
  @import '../../routes/scrollbar.css'; /* scrollbar.css 파일 임포트 */
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
          <Label for="fileInput" class="cursor-pointer font-Catamaran w-28 rounded-lg text-center text-white mt-3 py-2 bg-violet-400 hover:bg-violet-500 text-base font-semibold hover:ring-transparent">
            Select File
          </Label>
          <Label class="text-neutral-300 text-center text-[16px] font-normal px-3 mt-5">{file_value}</Label>
          <Input class="hidden" type="file" id="fileInput" style={{display:"none"}} on:change={updateFileName}/>
        </div>
        <!-- 파일 미리보기 섹션 -->
        {#if preview}
          <div class="flex mt-12">
            <p class="text-violet-400 text-lg font-medium">
              Preview
            </p>
            <p class="ml-1 mt-1 text-violet-300 text-sm font-normal">
              (Select Column & Row)
            </p>
          </div>
          <div class="-ml-0 -mt-1 overflow-x-auto p-2">
            <table class="text-sm text-neutral-400">
              {#if fileRows.length < 10}
                {#each fileRows.slice(0, fileRows.length) as row, rowIndex}
                  {#if rowIndex === 0}
                    <tr>
                      <th class="text-center text-white text-sm bg-transparent py-2 px-5 mr-5">
                        <span class="sr-only">Check</span>
                      </th>
                      {#if row.length < 10}
                        {#each row.slice(0, row.length) as cell, cellIndex}
                          {#if checkcolumnidx.includes(parseInt(cellIndex+1)) == true}
                            <th class="place-content-center text-center py-2 px-2">
                              <Checkbox
                                id="column_{cellIndex+1}"
                                bind:checked={selectedcolumnChecks[cellIndex+1]}
                                class="text-center cursor-pointer mr-2 w-4 h-4 bg-inherit checked:bg-violet-500 focus:ring-transparent"
                                on:click={() => toggleColumn(cellIndex+1, 0)}
                              />
                            </th>
                          {:else}
                            <th class="py-2 px-5">
                              <span class="sr-only">Check</span>
                            </th>
                          {/if}
                        {/each}
                      {:else}
                        {#each row.slice(0, 10) as cell, cellIndex}
                          <th class="place-content-center text-center text-white text-sm bg-transparent py-2 px-2 mr-5">
                            <Checkbox
                              id="column_{cellIndex+1}"
                              bind:checked={selectedcolumnChecks[cellIndex+1]}
                              class="text-center cursor-pointer mr-2 w-4 h-4 bg-inherit checked:bg-violet-500 focus:ring-transparent"
                              on:click={() => toggleColumn(cellIndex+1, 0)}
                            />
                          </th>
                        {/each}
                      {/if}
                    </tr>
                    <tr>
                      {#if checkrowidx.includes(parseInt(rowIndex+1)) == true}
                        <td class="place-content-center mr-2 text-center text-sm py-2 px-2">
                          <Checkbox
                            id="row_{rowIndex+1}"
                            bind:checked={selectedrowChecks[rowIndex+1]}
                            class="text-center cursor-pointer mr-2 w-4 h-4 bg-inherit checked:bg-violet-500 focus:ring-transparent"
                            on:click={() => toggleColumn(0, rowIndex+1)}
                          />
                        </td>
                      {:else}
                        <td class="mr-2 text-center text-sm py-2 px-2">
                          <span class="sr-only">Check</span>
                        </td>
                      {/if}
                      {#each row.slice(0, 10) as cell, cellIndex}
                        {#if selectedcolumnChecks[cellIndex+1] == true}
                          {#if selectedrowChecks[rowIndex+1] == true}
                            <td class="{crossCheckedclass}">
                              {cell}
                            </td>
                          {:else}
                            <td class="{columnCheckedclass}">
                              {cell}
                            </td>
                          {/if}
                        {:else}
                          {#if selectedrowChecks[rowIndex+1] == true}
                            <td class="{rowCheckedclass}">
                              {cell}
                            </td>
                          {:else}
                          <td class="{Defaultclass}">
                            {cell}
                          </td>
                          {/if}
                        {/if}
                      {/each}
                    </tr>
                  {:else}
                    <tr>
                      {#if checkrowidx.includes(parseInt(rowIndex+1)) == true}
                        <td class="place-content-center mr-2 text-center text-sm py-2 px-2">
                          <Checkbox
                            id="row_{rowIndex+1}"
                            bind:checked={selectedrowChecks[rowIndex+1]}
                            class="text-center cursor-pointer mr-2 w-4 h-4 bg-inherit checked:bg-violet-500 focus:ring-transparent"
                            on:click={() => toggleColumn(0, rowIndex+1)}
                          />
                        </td>
                      {:else}
                        <td class="mr-2 text-center text-sm py-2 px-2">
                          <span class="sr-only">Check</span>
                        </td>
                      {/if}
                        {#each row.slice(0, 10) as cell, cellIndex}
                          {#if selectedcolumnChecks[cellIndex+1] == true}
                            {#if selectedrowChecks[rowIndex+1] == true}
                              <td class="{crossCheckedclass}">
                                {cell}
                              </td>
                            {:else}
                              <td class="{columnCheckedclass}">
                                {cell}
                              </td>
                            {/if}
                          {:else}
                            {#if selectedrowChecks[rowIndex+1] == true}
                              <td class="{rowCheckedclass}">
                                {cell}
                              </td>
                            {:else}
                            <td class="{Defaultclass}">
                              {cell}
                            </td>
                            {/if}
                          {/if}
                        {/each}
                    </tr>
                  {/if}
                {/each}
              {:else}
                {#each fileRows.slice(0, 10) as row, rowIndex}
                  {#if rowIndex === 0}
                    <tr>
                      <th class="text-center text-white text-sm bg-transparent py-2 px-5 mr-5">
                        <span class="sr-only">Check</span>
                      </th>
                      {#if row.length < 10}
                        {#each row.slice(0, row.length) as cell, cellIndex}
                          {#if checkcolumnidx.includes(parseInt(cellIndex+1)) == true}
                            <th class="place-content-center text-center text-white text-sm bg-transparent py-2 px-2 mr-5">
                              <Checkbox
                                id="column_{cellIndex+1}"
                                bind:checked={selectedcolumnChecks[cellIndex+1]}
                                class="text-center cursor-pointer mr-2 w-4 h-4 bg-inherit checked:bg-violet-500 focus:ring-transparent"
                                on:click={() => toggleColumn(cellIndex+1, 0)}
                              />
                            </th>
                          {:else}
                            <th class="text-center text-white text-sm bg-transparent py-2 px-5 mr-5">
                              <span class="sr-only">Check</span>
                            </th>
                          {/if}
                        {/each}
                      {:else}
                        {#each row.slice(0, 10) as cell, cellIndex}
                          <th class="place-content-center text-center text-white text-sm bg-transparent py-2 px-2 mr-5">
                            <Checkbox
                              id="column_{cellIndex+1}"
                              bind:checked={selectedcolumnChecks[cellIndex+1]}
                              class="text-center cursor-pointer mr-2 w-4 h-4 bg-inherit checked:bg-violet-500 focus:ring-transparent"
                              on:click={() => toggleColumn(cellIndex+1, 0)}
                            />
                          </th>
                        {/each}
                      {/if}
                    </tr>
                    <tr>
                      {#if checkrowidx.includes(parseInt(rowIndex+1)) == true}
                        <td class="place-content-center mr-2 text-center text-sm py-2 px-2">
                          <Checkbox
                            id="row_{rowIndex+1}"
                            bind:checked={selectedrowChecks[rowIndex+1]}
                            class="text-center cursor-pointer mr-2 w-4 h-4 bg-inherit checked:bg-violet-500 focus:ring-transparent"
                            on:click={() => toggleColumn(0, rowIndex+1)}
                          />
                        </td>
                      {:else}
                        <td class="mr-2 text-center text-sm py-2 px-2">
                          <span class="sr-only">Check</span>
                        </td>
                      {/if}
                      {#each row.slice(0, 10) as cell, cellIndex}
                        {#if selectedcolumnChecks[cellIndex+1] == true}
                          {#if selectedrowChecks[rowIndex+1] == true}
                            <td class="{crossCheckedclass}">
                              {cell}
                            </td>
                          {:else}
                            <td class="{columnCheckedclass}">
                              {cell}
                            </td>
                          {/if}
                        {:else}
                          {#if selectedrowChecks[rowIndex+1] == true}
                            <td class="{rowCheckedclass}">
                              {cell}
                            </td>
                          {:else}
                          <td class="{Defaultclass}">
                            {cell}
                          </td>
                          {/if}
                        {/if}
                      {/each}
                    </tr>
                  {:else}
                    <tr>
                      {#if checkrowidx.includes(parseInt(rowIndex+1)) == true}
                        <td class="place-content-center mr-2 text-center text-sm py-2 px-2">
                          <Checkbox
                            id="row_{rowIndex+1}"
                            bind:checked={selectedrowChecks[rowIndex+1]}
                            class="text-center cursor-pointer mr-2 w-4 h-4 bg-inherit checked:bg-violet-500 focus:ring-transparent"
                            on:click={() => toggleColumn(0, rowIndex+1)}
                          />
                        </td>
                      {:else}
                        <td class="mr-2 text-center text-sm py-2 px-2">
                          <span class="sr-only">Check</span>
                        </td>
                      {/if}
                        {#each row.slice(0, 10) as cell, cellIndex}
                          {#if selectedcolumnChecks[cellIndex+1] == true}
                            {#if selectedrowChecks[rowIndex+1] == true}
                              <td class="{crossCheckedclass}">
                                {cell}
                              </td>
                            {:else}
                              <td class="{columnCheckedclass}">
                                {cell}
                              </td>
                            {/if}
                          {:else}
                            {#if selectedrowChecks[rowIndex+1] == true}
                              <td class="{rowCheckedclass}">
                                {cell}
                              </td>
                            {:else}
                            <td class="{Defaultclass}">
                              {cell}
                            </td>
                            {/if}
                          {/if}
                        {/each}
                    </tr>
                  {/if}
                {/each}
              {/if}
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
              class="cursor-pointer mt-3 text-base text-violet-500 bg-inherit border-violet-300 focus:ring-white focus:border-violet-300"
              bind:value={selectedmethod}
            >
              {#each Based as { value, name }}
                <option class="cursor-pointer group-hover:text-white group-hover:bg-neutral-200" {value}>{name}</option>
              {/each}
            </Select>
          </div>
          <div class="w-full mt-16 mr-5">
            <p class="text-violet-400 text-base font-medium">
              Score Class
            </p>
            <div class="flex">
              <div class="place-content-center text-center mt-4 flex">
                <Checkbox
                  id="boxplot-check1"
                  bind:checked={ABL1selected}
                  on:click={() => {
                    ABL1selected = !ABL1selected;
                  }}
                  class="text-center cursor-pointer h-6 w-6 bg-inherit checked:bg-violet-800 focus:ring-white"
                />
                <label class="cursor-pointer ml-5 text-neutral-400 text-base font-medium" for="boxplot-check1">
                  ABL1 Class
                </label>
              </div>
              <div class="place-content-center text-center ml-36 mt-4 flex">
                <Checkbox
                  id="boxplot-check2"
                  bind:checked={CRLF2selected}
                  on:click={() => {
                    CRLF2selected = !CRLF2selected;
                  }}
                  class="text-center cursor-pointer w-6 h-6 bg-inherit checked:bg-violet-500 focus:ring-white"
                />
                <label class="cursor-pointer ml-5 text-neutral-400 text-base font-medium" for="boxplot-check2">
                  CRLF2 Class
                </label>
              </div>
              <div class="place-content-center text-center ml-36 mt-4 flex">
                <Checkbox
                id="boxplot-check3"
                bind:checked={ABL1_LikeSelected}
                on:click={() => {
                  ABL1_LikeSelected = !ABL1_LikeSelected;
                }}
                class="text-center cursor-pointer w-6 h-6 bg-inherit checked:bg-violet-300 focus:ring-white"/>
                <label class="cursor-pointer ml-5 text-neutral-400 text-base font-medium" for="boxplot-check3">
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


