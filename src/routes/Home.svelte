<script>
  import { getSearchResults, searchResults } from '../stores/search/search'
  let searchString
  const handleChange = async (e) => {
    await getSearchResults(searchString)
  }
</script>

<h4>Document Search:</h4>
<input
  placeholder="Type a value to search and hit enter."
  bind:value={searchString}
  on:change={handleChange} />

<h5>Results:</h5>

{#if $searchResults}
    {#if $searchResults.length === 0}
        <h5><code>No search results</code></h5>
    {:else}
        {#each $searchResults as searchResult}
            <pre width="100%">{JSON.stringify(searchResult, null, 2)}</pre>
        {/each}
    {/if}
{:else}
    <h5><code>Please type a search value and hit enter</code></h5>
{/if}


