<script>
  import toastr from "../components/toastrConfig.js";
  import { apiUrl } from "../stores/url.js";

  let email="";

  function sendEmail(email) {
    if(email===""){
      toastr["warning"]("Enter email");
      return
    }
    fetch(apiUrl + "/reset-password-email", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",},
      body: JSON.stringify({email}),
    }).then((response) => {
      const status = response.status;
      switch (status) {
        case 201:
          toastr["success"](
            "And email has been sent to the given adress. Check your mailbox."
          );
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          break;
        case 401:
          toastr["warning"]("No user with givens email");
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
      <label for="inputEmail1">Input your email adress</label>
      <input
        type="email"
        bind:value={email}
        class="form-control"
        id="inputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        required
      />
    </div>
    <button
      on:click|preventDefault={() => sendEmail(email)}
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
