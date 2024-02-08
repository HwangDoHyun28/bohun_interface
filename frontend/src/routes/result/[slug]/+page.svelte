<!-- src/routes/result4/+page.svelte -->

<script context="module">
  export async function load({ page }) {
    // 페이지가 로드될 때 결과 데이터를 가져옴
    return {
      props: {
        casp10Result: page.query.casp10Result || null, // null 또는 기본값 설정
        cmtm7Result: page.query.cmtm7Result || null, // null 또는 기본값 설정
        crlf2Result: page.query.crlf2Result || null, // null 또는 기본값 설정
        averageResult: page.query.averageResult || null // null 또는 기본값 설정
      }
    };
  }
</script>

<script>
  export let casp10Result;
  export let cmtm7Result;
  export let crlf2Result;
  export let averageResult;
</script>

<div class="mt-16">
  <p>CASP10 Result: {casp10Result}</p>
  <p>CMTM7 Result: {cmtm7Result}</p>
  <p>CRLF2 Result: {crlf2Result}</p>
  <p>Average Result: {averageResult}</p>
</div>
