<script>
  import { Router, Route, Link } from "svelte-navigator";
  import { apiUrl } from "../stores/url.js";
  import PrivateRoute from "../components/PrivateRoute.svelte"
  import {isLoggedIn} from "../stores/userInfo";

  import Login from "../pages/Login.svelte";
  import Register from "../pages/Register.svelte";
  import Main from "../pages/Main.svelte";
  import Item from "../pages/ItemPage.svelte";
  import ResetPassEmail from "../pages/ResetPassEmail.svelte";
  import ResetPassInput from "../pages/ResetPassInput.svelte";
  import ShoppingBasket from "../pages/ShoppingBasket.svelte";


  export let currentUser;

  function logOut() {
    fetch(apiUrl + "/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTimeout(() => {
      $isLoggedIn = false;
      window.location.href = "/";
    }, 500);
  }
</script>

<Router>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <Link to="/" class="nav=link"><button>Home</button></Link>
      
      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
        </ul>

        {#if !currentUser}
          <Link to="/login" class="nav-link"><button>Log in</button></Link>
          <Link to="/register" class="nav-link"><button>Sign up</button></Link>
        {:else}
          <button
            on:click={() => {
              logOut();
            }}>Log out</button
          >
          {#if currentUser.role === "buyer"}
            <Link to="/shopping-basket" class="nav-link ">
              <form class="shopping-button" width="70">
                <input
                  type="image"
                  src="https://cdn-icons-png.flaticon.com/512/68/68892.png?w=360"
                  alt="Shopping Basket"
                  height="50"
                  width="50"
                />
              </form>
            </Link>
          {/if}
        {/if}
      </div>
    </div>
  </nav>

  <Route path="/login" component={Login} />
  <Route path="/register" component={Register} />
  <Route path="/" component={Main} />
  <Route path="/forgot-password" component={ResetPassEmail} />
  <Route path="/reset-password/:token" component={ResetPassInput} />
  <PrivateRoute path="/shopping-basket" let:location>
    <ShoppingBasket/>
  </PrivateRoute>
  <Route path ="item/:id" component ={Item}/>
</Router>

<style>
  nav {
    margin-left: 5%;
    margin-right: 5%;
    height: 5rem;
  }
  .shopping-button {
    background-color: transparent;
  }
</style>
