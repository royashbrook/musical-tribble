<script>
  export let searchResult
</script>

<div>
  <pre>{JSON.stringify(searchResult, null, 2)}</pre>
  <!-- <a href="{getURL(doc['74'])}">{doc['74']}</a> -->
  <!-- <button id="{doc['74']}" on:click={downloadFile(doc['74'])}>{doc['74']}</button> -->
</div>

<style>
  div {
    display:inline-block;
    font-size:xx-small;
    margin:0.25rem;
  }
  pre {
    width:10rem;
    height:10rem;
  }
</style>