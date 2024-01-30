<script>
    import { Input, Label, Helper } from "flowbite-svelte";
    import { Fileupload, Button, Checkbox } from "flowbite-svelte";
    import { Select } from "flowbite-svelte";
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    // ... (이전 코드) ...
  
    // 결과 예측 버튼 클릭 이벤트 핸들러
    async function predictProbability() {
      if (!fileContent) {
        alert('파일을 업로드하세요.');
        return;
      }
  
      // 파일 업로드가 된 경우에만 아래 로직이 실행됩니다.
  
      // 여기에 결과를 예측하는 로직 추가
      // 결과를 result 변수에 할당하고 화면에 표시
      result = calculateProbability(); // 이 함수는 실제 결과를 계산하는 로직으로 대체되어야 합니다.
  
      // D3.js를 사용하여 간단한 차트 그리기 (예시)
      const chartData = [
        { category: 'Class A', value: 0.8 },
        { category: 'Class B', value: 0.5 },
        { category: 'Class C', value: -0.2 },
      ];
  
      drawChart(chartData);
    }
  
    // D3.js를 사용하여 간단한 차트 그리기 함수 (예시)
    function drawChart(data) {
      const chartContainer = d3.select('#chart-container');
  
      // 차트 초기화
      chartContainer.selectAll('*').remove();
  
      // 차트 생성
      const svg = chartContainer.append('svg')
        .attr('width', 300)
        .attr('height', 150);
  
      // 간단한 막대 차트 그리기
      const bars = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 100)
        .attr('y', d => (1 - d.value) * 100)
        .attr('width', 80)
        .attr('height', d => Math.abs(d.value) * 100)
        .attr('fill', d => (d.value > 0) ? 'green' : ((d.value < 0) ? 'red' : 'gray'));
    }
  
    // ... (이전 코드) ...
  </script>
  
  <!-- ... (이전 코드) ... -->
  
  <div class="relative my-10 place-content-center">
    <Button on:click={predictProbability}
      class="ml-32 object-center my-10 text-xl font-semibold bg-violet-700 hover:bg-violet-800 focus:ring-violet-700"
    >Predict Probability</Button>
  </div>
  
  <div id="chart-container"></div>
  
  <!-- ... (이전 코드) ... -->
  