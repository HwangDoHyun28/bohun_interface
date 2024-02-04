<script>
    import { onMount } from 'svelte';
  
    let geneExpressions = {};
  
    // 파일을 읽어서 특정 유전자의 gene expression 값을 추출하는 함수
    function extractGeneExpressions(content) {
      const lines = content.split('\n');
  
      lines.forEach(line => {
        const [geneName, expressionStr] = line.split('\t');
        const expression = parseFloat(expressionStr);
  
        if (!isNaN(expression)) {
          geneExpressions[geneName] = expression;
        }
      });
       // 특정 유전자의 gene expression 값을 출력
      console.log('CASP10 Expression:', geneExpressions['CASP10']);
      console.log('CMTM7 Expression:', geneExpressions['CMTM7']);
      console.log('CRLF2 Expression:', geneExpressions['CRLF2']);
    
      // 각 gene expression 값에 대한 조건을 적용하고 결과를 반환
      const casp10Result = applyExpressionCondition('CASP10', geneExpressions['CASP10'], 657, 1398, 1398, 3123, 3121, 5016);
      const cmtm7Result = applyExpressionCondition('CMTM7', geneExpressions['CMTM7'], 832, 1325, 1325, 4060, 4060, 5452);
      const crlf2Result = applyExpressionCondition('CRLF2', geneExpressions['CRLF2'], 48, 419, 419, 7410, 7410, 13061);
  
      // 결과 반환
      return {
        casp10Result,
        cmtm7Result,
        crlf2Result
      };
    }
  
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
  
    // 파일 선택 시 호출되는 함수
    function handleFileSelect(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];
  
      if (file) {
        processFile(file);
      }
    }
  
    // 파일을 읽어서 특정 유전자의 gene expression 값을 추출하고 결과를 출력하는 함수
    function processFile(file) {
      const reader = new FileReader();
  
      reader.onload = function(event) {
        const content = event.target.result;
        const results = extractGeneExpressions(content);
  
        // 각 유전자의 결과 출력
        console.log('CASP10 Result:', results.casp10Result);
        console.log('CMTM7 Result:', results.cmtm7Result);
        console.log('CRLF2 Result:', results.crlf2Result);
  
        // 세 결과의 평균을 구하고 출력
        const averageResult = (results.casp10Result + results.cmtm7Result + results.crlf2Result) / 3;
        console.log('Average Result:', averageResult);
      };
  
      reader.readAsText(file);
    }
  
    // 파일 선택 이벤트에 핸들러 등록
    onMount(() => {
      const fileInput = document.getElementById('fileInput');
      fileInput.addEventListener('change', handleFileSelect);
    });
  </script>
  
  <style>
    /* 필요한 스타일을 추가하세요 */
  </style>
  
  <div>
    <input class="mt-16" type="file" id="fileInput" />
  </div>
  