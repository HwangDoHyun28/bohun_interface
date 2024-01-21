<!-- App.svelte -->

<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let chartContainer;

  // 파일 업로드 관련 변수
  let fileInput;
  let fileContent = '';
  
  // 결과 표시 변수
  let result = null;

  onMount(() => {
    // 파일 내용이 변경되면 실행되는 함수
    $: {
      if (fileContent) {
        // 파일 내용이 변경되면 실행되는 로직
        const data = d3.csvParse(fileContent, d => ({ id: +d.gene_id, expression: +d.gene_expression }));
        const processedData = processData(data);
        visualizeData(processedData);
      }
    }
  });

  // 파일 업로드 이벤트 핸들러
  function handleFileUpload() {
    const file = fileInput.files[0];
    if (file && file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = () => {
        fileContent = reader.result;
      };
      reader.readAsText(file);
    } else {
      alert('올바른 파일 형식을 선택하세요. (.txt)');
    }
  }

  // 데이터 처리 함수
  function processData(data) {
    // 각 유전자에 대해 -1, 0, 1 점 부여
    data.forEach(d => {
      d.score = d.expression < -0.5 ? -1 : (d.expression > 0.5 ? 1 : 0);
    });

    // 평균 계산
    const averageScore = d3.mean(data, d => d.score);
    return { data, averageScore };
  }

  // 시각화 함수
  function visualizeData({ data, averageScore }) {
    // D3.js를 사용하여 바 차트 생성
    const chart = d3.select(chartContainer)
      .append('svg')
      .attr('width', 200)
      .attr('height', 100);

    // 바 그리기
    chart.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 50)
      .attr('y', d => (1 - d.score) * 50)
      .attr('width', 40)
      .attr('height', d => Math.abs(d.score) * 50)
      .attr('fill', d => (d.score === 1) ? 'green' : ((d.score === -1) ? 'red' : 'gray'));

    // 평균 점수 표시
    chart.append('line')
      .attr('x1', 0)
      .attr('y1', (1 - averageScore) * 50)
      .attr('x2', 200)
      .attr('y2', (1 - averageScore) * 50)
      .attr('stroke', 'blue')
      .attr('stroke-width', 2);
  }

  // 결과 예측 버튼 클릭 이벤트 핸들러
  function predictProbability() {
    // 여기에 결과를 예측하는 로직 추가
    // 결과를 result 변수에 할당하고 화면에 표시
    result = calculateProbability(); // 이 함수는 실제 결과를 계산하는 로직으로 대체되어야 합니다.
  }

  // 예측 로직 (임시 함수, 실제로는 모델을 사용하거나 다른 예측 로직으로 대체)
  function calculateProbability() {
    // 여기에 실제 예측 로직 추가
    return Math.random(); // 임시로 랜덤값을 반환하는 예제
  }
</script>

<style>
  /* 스타일링 옵션 추가 */
</style>

<input type="file" accept=".txt" bind:this={fileInput} on:change={handleFileUpload} />
<button on:click={predictProbability}>Predict Probability</button>
<div bind:this={chartContainer}></div>

{#if result !== null}
  <p>예측 확률: {result.toFixed(2)}</p>
{/if}
