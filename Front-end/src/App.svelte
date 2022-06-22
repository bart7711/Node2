<script>
  import NavBar from "./components/NavBar.svelte";
  import { onMount } from "svelte";
  import {apiUrl} from "./stores/url"
  import {isLoggedIn, userID} from "./stores/userInfo"

  let currentUser;

  onMount(() => {
    fetch(apiUrl + "/user", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          isLoggedIn.set(true);
          return res.json();
        }else{
          isLoggedIn.set(false);
        }
      }).then((res0)=>{
        if($isLoggedIn){
        currentUser = res0;
        userID.set(res0.id);
      }
      });
  });
</script>

<main>
  <NavBar {currentUser}/>
</main>
