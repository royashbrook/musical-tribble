import { writable,get } from 'svelte/store';
import { data } from '../graph/data'
import { CosmosClient } from '@azure/cosmos'

export const searchResults = writable(null);

export const getSearchResults = async (searchString) => {

  //empty search results
  searchResults.set(null);
  
  //get cosmos settings and set query
  const secrets = get(data)
  let connectionString = secrets.cosmosConnection
  let endpoint = connectionString.match(/AccountEndpoint=([^;]*);/)[1]
  let key = connectionString.match(/AccountKey=([^;]*);/)[1]
  let databaseId = secrets.cosmosDatabase
  let containerId = secrets.cosmosContainer
  let qry = secrets.cosmosQuery.replace(/@p1/,`'%${searchString}%'`)
    
  // let qry = {
  //   "query": secrets.cosmosQuery,
  //   "parameters": [
  //       {"name": "@p1", "value": `'%${searchString}%'`},
  //   ]
  // }

  //create client
  const client = new CosmosClient({ endpoint, key })

  //set db and container
  const database = client.database(databaseId)
  const container = database.container(containerId)
  await container.items
    .query(qry)
    .fetchAll()
    .then(({ resources: items }) => searchResults.set(items))
    .catch((err) => console.log('error', err.message))

}