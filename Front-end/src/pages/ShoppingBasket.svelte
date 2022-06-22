<script>
  import toastr from "../components/toastrConfig.js";
  import { apiUrl } from "../stores/url.js";
  import { userID } from "../stores/userInfo";
  import { onMount } from "svelte";
  import ShoppingBasketBox from "../components/ShoppingBasketBox.svelte";

  let items = [];
  let finalPrice = 0;

  function evaluateItem(item0, ammount, user_id) {
    if (item0 === "failed") {
      return;
    }

    const item = item0.data;
    const object = {
      item_id: item.id,
      user_id: user_id,
      name: item.name,
      image: item.imageLink,
      price: item.price,
      ammount: ammount,
      description: item.description,
    };
    finalPrice += object.price * ammount;
    items.push(object);
    //WTF Ok so for some reason Svelte does not
    //detect [].push() as mutating the state of the array variable
    //So i force it to see by making items=items xD
    items = items;
  }

  function getItems(data) {
    data.forEach((datum) => {
      const id = datum.item_id;
      fetch(apiUrl + "/item/" + id, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            const failed = "failed";
            return failed;
          }
        })
        .then((resJson) => {
          evaluateItem(resJson, datum.ammount, datum.user_id);
        });
    });
  }

  function buyItems(items) {
    const user_id = $userID;
    items.forEach((item) => {
      const item_id = item.item_id;
      const ammount = item.ammount;

      fetch(apiUrl + "/buy-item", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, item_id, ammount }),
      }).then((response) => {
        const status = response.status;
        switch (status) {
          case 200:
            toastr["success"]("You bought the items");
            setTimeout(() => {
              window.location.href = "/";
            }, 1500);
            break;
          default:
            toastr["error"]("Something went really wrong");
        }
      });
    });
  }

  onMount(() => {
    fetch(apiUrl + "/basketItems/" + $userID, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        getItems(response.data);
      });
  });
</script>

<body>
  <div class="basket-container">
    <div class="Header">
      <h3 class="Heading">SHOPPING CART</h3>
    </div>
    {#each items as item}
      <ShoppingBasketBox {item} />
    {/each}
    <br />
    <hr />
  </div>
  <div class="checkout">
    <div class="total">
      <div>
        <div class="Subtotal">Sub-Total</div>
        <div class="items">{items.length}</div>
      </div>
      <div class="total-amount">{finalPrice} DKK</div>
    </div>
    <button class="button" on:click={() => buyItems(items)}>Checkout</button>
  </div>
</body>

<style>
  .basket-container {
    margin-left: 5%;
    margin-right: 5%;
    width: 70%;  
    display: flex;  
    flex-wrap: wrap; 
    min-height: 30%;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 25px 40px #1687d933;
  }

  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(to bottom right, #e3f0ff, #fafcff);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Header {
    margin: auto;
    width: 90%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Heading {
    font-size: 20px;
    font-family: "Open Sans";
    font-weight: 700;
    color: #2f3841;
  }
  hr {
    width: 66%;
    float: right;
    margin-right: 5%;
  }
  .checkout {
    float: right;
    margin-right: 5%;
    width: 28%;
  }
  .total {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .Subtotal {
    font-size: 18px;
    font-family: ‘Open Sans’;
    font-weight: 700;
    color: #202020;
  }
  .items {
    font-size: 13px;
    font-family: "Open Sans";
    font-weight: 500;
    color: #909090;
    line-height: 10px;
  }
  .total-amount {
    font-size: 22px;
    font-family: "Open Sans";
    font-weight: 900;
    color: #202020;
  }
  .button {
    margin-top: 5px;
    width: 100%;
    height: 40px;
    border: none;
    background: linear-gradient(to bottom right, #b8d7ff, #8eb7eb);
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    font-family: "Open Sans";
    font-weight: 600;
    color: #202020;
  }
</style>
