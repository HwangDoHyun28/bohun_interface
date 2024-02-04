<script>
    import { onMount } from 'svelte';
  
    let totalExpression = 0;
  
    // 파일을 읽어서 gene expression 값을 합산하는 함수
    function sumGeneExpressions(content) {
      const lines = content.split('\n');
  
      lines.forEach(line => {
        const [geneName, expressionStr] = line.split('\t');
        const expression = parseFloat(expressionStr);
  
        if (!isNaN(expression)) {
          totalExpression += expression;
        }
      });
  
      console.log('Total Gene Expression:', totalExpression);
    }
  
    // 파일 선택 시 호출되는 함수
    function handleFileSelect(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];
  
      if (file) {
        readFile(file);
      }
    }
  
    // 파일을 읽어서 gene expression 값을 합산하는 함수 호출
    function readFile(file) {
      const reader = new FileReader();
  
      reader.onload = function(event) {
        const content = event.target.result;
        sumGeneExpressions(content);
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
  