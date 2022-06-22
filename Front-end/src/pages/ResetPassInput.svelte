<script>

  import toastr from "../components/toastrConfig.js";
  import { apiUrl } from "../stores/url.js";
  let password = "";
  let repeatPassword = "";
  export let token;

  function resetPassword(password, repeatPassword) {
    if(password===""||repeatPassword===""){
      toastr["warning"]("You have to fill out all the forms");
      return;
    }
    if(password !== repeatPassword){toastr["warning"]("passwords dont' match"); return;}

    fetch(apiUrl + "/reset-password" + "?token=" + token, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password}),
    }).then((response) => {
      const status = response.status;
      switch (status) {
        case 201:
          toastr["success"]("Password has been changed succesfully");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          break;
        case 401:
          toastr["warning"]("this token doesn't exist");
          break;
        default:
          toastr["error"]("");
      }
    });
  }
</script>

<br />
<main>
  <form>
    <div class="form-group">
      <label for="inputEmail1">Reset password</label>
      <input
        type="password"
        bind:value={password}
        class="form-control"
        placeholder="Enter your new password"
      />
      <input
        type="password"
        bind:value={repeatPassword}
        class="form-control"
        placeholder="Repeat password"
      />
    </div>
    <button
      on:click|preventDefault={() => resetPassword(password, repeatPassword)}
      type="submit"
      class="btn btn-primary">Submit</button
    >
  </form>
</main>

<style>
  .form-group {
    width: 100%;
    max-width: 444px;
    padding: 10px;
    margin: auto;
  }
</style>
