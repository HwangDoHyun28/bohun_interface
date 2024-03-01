<script>
  let fileContent = "";
  let fileRows = [];
  let loading = false; // 로딩 상태를 나타내는 변수

  // 파일을 읽어서 내용을 미리보기로 표시하는 함수
  function processFile(file) {
    loading = true; // 파일 처리가 시작되었으므로 로딩 상태를 true로 설정
    const reader = new FileReader();

    reader.onload = function(event) {
      fileContent = event.target.result;
      fileRows = fileContent.split('\n').map(row => row.split(','));
      loading = false; // 파일 처리가 완료되었으므로 로딩 상태를 false로 설정
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
</script>

<!-- 로딩 화면 -->
{#if loading}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
  </div>
{/if}

<!-- 파일 선택 폼과 파일 미리보기 -->
<form type="submit">
  <div class="mt-12 rounded-lg border mx-5 px-12 py-10 bg-white">
    <!-- 파일 업로드 섹션 -->
    <div class="w-full px-10 rounded-lg">
      <p class="text-3xl text-violet-700 font-medium">Select Data File</p>
      <input type="file" id="fileInput" accept=".csv" class="mt-3" on:change={handleFileSelect}>
    </div>

    <!-- 파일 미리보기 섹션 -->
    <div class="mt-5 px-10">
      <table class="mt-3 border border-neutral-300 text-violet-500">
        {#each fileRows.slice(0, 6) as row, rowIndex}
          {#if rowIndex === 0}
            <tr>
              {#each row as cell, cellIndex}
                <th class="border text-white border-neutral-300 bg-violet-700 p-2">{cell}</th>
              {/each}
            </tr>
          {:else}
            <tr>
              {#each row as cell, cellIndex}
                <td class="border border-violet-900 p-2">{cell}</td>
              {/each}
            </tr>
          {/if}
        {/each}
      </table>
    </div>
</form>
