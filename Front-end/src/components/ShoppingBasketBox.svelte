<script>
  import { apiUrl } from "../stores/url.js";
  import toastr from "../components/toastrConfig.js";

  export let item = {
    item_id: "",
    user_id: "",
    name: "",
    image: "",
    price: "",
    ammount: "",
    description: "",
  };

  function removePurchase(user_id, item_id) {
    fetch(apiUrl + "/basketRemove", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_id,item_id}),
    }).then((response) => {
      const status = response.status;
      switch (status) {
        case 200:
          window.location.href = "/";
          break;
        default:
          toastr["error"]("Something went really wrong");
      }
    });
  }
</script>

<div class="Cart-Items">
  <div class="image-box">
    <img class="main-image" src={item.image} alt="..." />
  </div>
  <div class="about">
    <h1 class="title">{item.name}</h1>
    <h3 class="subtitle">{item.price} DKK</h3>
  </div>
  <div class="counter">
    <div class="count">x{item.ammount}</div>
  </div>
  <div class="prices">
    <div class="amount">{item.ammount * item.price} DKK</div>
    <div class="remove"><u on:click={()=>removePurchase(item.user_id,item.item_id)}>Remove</u></div>
  </div>
</div>

<style>
  .main-image {
    height: 120px;
  }
  .Cart-Items {
    margin: auto;
    width: 90%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .image-box {
    width: 15%;
    text-align: center;
  }
  .about {
    height: 100%;
  }
  .title {
    padding-top: 50px;
    line-height: 20px;
    font-size: 20px;
    font-family: "Open Sans";
    font-weight: 800;
    color: #202020;
  }
  .subtitle {
    line-height: 10px;
    font-size: 18px;
    font-family: "Open Sans";
    font-weight: 600;
    color: #909090;
  }

  .counter {
    width: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .count {
    font-size: 15px;
    font-family: "Open Sans";
    font-weight: 900;
    color: #202020;
  }
  .prices {
    height: 100%;
    text-align: right;
  }
  .amount {
    padding-top: 20px;
    font-size: 28px;
    font-family: "Open Sans";
    font-weight: 800;
    color: #202020;
  }
  .remove {
    padding-top: 5px;
    font-size: 20px;
    font-family: "Open Sans";
    font-weight: 600;
    color: #e44c4c;
    cursor: pointer;
  }
</style>
