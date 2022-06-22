<script>
import Item from "../components/Item.svelte";
  import { apiUrl } from "../stores/url";
  import { onMount } from "svelte";

  let items = [];
  onMount(() => {
    fetch(apiUrl + "/items")
      .then((response) => {
        return response.json();
      }).then((resJson) => {
        items = resJson.data;
      });
  });
</script>

<br>
<h2>Accessories</h2>
<br>
<div class="container">
  <div class="row row-cols-auto">
    {#each items as item}
      <div class="col"><Item {item} /></div>
    {/each}
  </div>
</div>

<style>
  .col {
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
</style>