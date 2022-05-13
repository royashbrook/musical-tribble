<script>
  export let searchResult
  import DownloadButton from './DownloadButton.svelte'
</script>

<div>
  <pre>{JSON.stringify(searchResult, null, 2)}</pre>
  <DownloadButton {searchResult} />
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