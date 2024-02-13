<!-- src/routes/result4/+page.svelte -->

<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>


<script context="module">
  export async function load({ page }) {
    const casp10Result = page.query.casp10Result || null;
    const cmtm7Result = page.query.cmtm7Result || null;
    const crlf2Result = page.query.crlf2Result || null;
    const averageResult = page.query.averageResult || null;

    console.log('CASP10 Result:', casp10Result);
    console.log('CMTM7 Result:', cmtm7Result);
    console.log('CRLF2 Result:', crlf2Result);
    console.log('Average Result:', averageResult);

    // 페이지가 로드될 때 결과 데이터를 가져옴
    return {
      props: {
        casp10Result,
        cmtm7Result,
        crlf2Result,
        averageResult
      }
    };
  }

  export let casp10Result; // prop으로 받음
  export let cmtm7Result;
  export let crlf2Result;
  export let averageResult;

  console.log('CASP10 Result:', casp10Result);
  console.log('CMTM7 Result:', cmtm7Result);
  console.log('CRLF2 Result:', crlf2Result);
  console.log('Average Result:', averageResult);
  
  </script>
  
  <div class="mt-12">
    <p>CASP10 Result: {casp10Result}</p>
    <p>CMTM7 Result: {cmtm7Result}</p>
    <p>CRLF2 Result: {crlf2Result}</p>
    <p>Average Result: {averageResult}</p>
  </div>
  