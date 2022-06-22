<script>
  import { apiUrl } from "../stores/url.js";
  import { isLoggedIn } from "../stores/userInfo";
  import {userID} from "../stores/userInfo";
  import { onMount } from "svelte";
  import toastr from "../components/toastrConfig.js";

  let ammount = 1;

  export let id;

  let item = {
    id: "",
    name: "",
    price: "",
    category: "",
    ammount: "",
    description: "",
    imageLink: "",
    user_id: "",
  };

  function addToBasket(ammount){
    if(!$isLoggedIn){
      toastr["warning"]("You have to be logged in to add items to basket");
      return;
    }    
    const user_id = $userID;
    const item_id = item.id;
    fetch(apiUrl + "/basketAdd", {
      method: "POST", 
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_id,item_id,ammount}),
    })
      .then((response) => {
        const status = response.status;
      switch (status) {
        case 200:
        toastr["success"]("Item added succesfully");
        setTimeout(() => {
          window.location.reload();
          }, 300);
          break;
        case 201:
          toastr["warning"]("Item out of stock or you selected too many items somehow");
          break;
        default:
          toastr["error"]("");
      }
      });
  }

  onMount(() => {
    fetch(apiUrl + "/item/"+id, {
      method: "GET", 
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        item = res.data;
        return item;
      });
  });
</script>

<main>
  <div class="container">
  <div class="card">
  <img src={item.imageLink} class="card-img-top" alt="..." />
  </div>
  <div class="text">
    <p class="text">{item.description}</p>
  </div>
  <h4 class="price" >Price: {item.price} DKK</h4>
  <h4 class="ammount" >Ammount: {item.ammount}</h4>

</div>
<div class="form-outline mb-4">
  <input type="number" id="ammount-input" bind:value={ammount} min="1" max="{item.ammount}" class="form-control form-control-lg" required />
  <br>
  <h3>Total Price {ammount*item.price} DKK</h3>
</div>
<button on:click|preventDefault={() => addToBasket(ammount)} class="w-100 btn btn-lg btn-primary" type="submit">Add to basket</button>


</main>

<style>
  .card {
    float: left;
    vertical-align:top;
    width: 25rem;
    height: 25rem;
  }
  img{
    max-width: 25rem;
    max-height: 25rem;
  }
  .price, .ammount{
    padding-right: 80%;
  }
  .text{
    padding-left: 20%;
    position: absolute;
    top: 5rem;
    width: 50rem;
    float: right;
  }

</style>
