<script>
    import {Link} from "svelte-navigator";
    import { apiUrl } from "../stores/url.js";
    import toastr from "../components/toastrConfig.js";
    import { useNavigate, useLocation } from "svelte-navigator";
	  import { isLoggedIn } from "../stores/userInfo";

    const navigate = useNavigate();
	  const location = useLocation();


    let data = {
        email: "",
        password: ""
    };

    function logIn(data) {
    if(data.email==="" || data.password ===""){return;}
    fetch(apiUrl + "/login", {
      method: "POST", 
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      const status = response.status;
      switch (status) {
        case 200:
          isLoggedIn.set(true);
          window.location.href = "/";
          break;
        case 401:
          toastr["warning"]("Wrong email or password");
          break;
        case 429:
          toastr["warning"]("There has been wierd activity, try again later");
          break;
        default:
          toastr["error"]("");
      }
    });
  }
</script>

<main>
    <section class="vh-100">
        <div class="container">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <!-- svelte-ignore a11y-img-redundant-alt -->
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Phone image">
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <!-- E-mail input -->
                <div class="form-outline mb-4">
                  <input type="email" bind:value={data.email} id="form1Example13" placeholder="E-mail" name="E-mail" class="form-control form-control-lg" required />
                </div>
      
                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" bind:value={data.password} id="form1Example23" placeholder="Password" name="password" class="form-control form-control-lg" required />
                </div>
              
                <!-- Submit button -->
                <button on:click|preventDefault={() => logIn(data)} class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <br>
                <Link to="/register">
                    <button class="w-100 btn btn-primary btn-lg btn-block">Sign up</button>
                </Link>
                <br>
                <br>
                <Link to="/forgot-password">
                    <button class="w-100 btn btn-primary btn-lg btn-block">Forgot password?</button>
                </Link>

              </form>
            </div>
          </div>
        </div>
      </div>
      </section>
</main>

