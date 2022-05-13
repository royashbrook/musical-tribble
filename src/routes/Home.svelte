<script>
  import { data as secrets } from '../stores/graph/data'
  import { CosmosClient } from '@azure/cosmos'
  $: $secrets && console.log('$secrets: ', JSON.stringify($secrets, null, 2))
  let searchString
  let searchResults = {}
  const getSearchResults = async () => {

    //get cosmos settings and set query
    let connectionString = $secrets.cosmosConnection
    let endpoint = connectionString.match(/AccountEndpoint=([^;]*);/)[1]
    let key = connectionString.match(/AccountKey=([^;]*);/)[1]
    let databaseId = $secrets.cosmosDatabase
    let containerId = $secrets.cosmosContainer
    let qry = $secrets.cosmosQuery.replace(/@p1/,`'%${searchString}%'`)
    // searchResults = 'Searched for ' + searchString + ' - ' + Math.random()

    //create client
    const client = new CosmosClient({ endpoint, key })

    //set db and container
    const database = client.database(databaseId)
    const container = database.container(containerId)
    await container.items
      .query(qry)
      .fetchAll()
      .then(({ resources: items }) => searchResults = items)
      .catch((err) => console.log('error', err.message))
  }
</script>

<h4>Document Search:</h4>
<input
  placeholder="Type a value to search and hit enter."
  bind:value={searchString}
  on:change={getSearchResults} />

{#if searchResults.length > 0}
    <h5>Results:</h5>
    {#each searchResults as searchResult}
        <pre width="100%">{JSON.stringify(searchResult, null, 2)}</pre>
    {/each}
{:else}
    <h5><code>No search results</code></h5>
{/if}


