<script>
  import { apiUrl } from "../stores/url.js";
  import toastr from "../components/toastrConfig.js";
  import {isLoggedIn} from "../stores/userInfo";


  let data = {
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
  };

  function register(data) {
    if (
      data.username === "" ||
      data.email === "" ||
      data.password === "" ||
      data.repeatedPassword === ""
    ) {
      toastr["warning"]("You have to fill out all the forms");
      return;
    }

    if (data.password !== data.repeatedPassword) {
      toastr["warning"]("The passwords don't match");
      return;
    }
    fetch(apiUrl + "/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      const status = response.status;
      switch (status) {
        case 201:
          login(data);
          break;
        case 401:
          toastr["warning"]("User with given email already exists");
          break;
        default:
          toastr["error"]("Something went wrong "+status);
      }
    });
  }

  function login(data) {
    fetch(apiUrl + "/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      isLoggedIn.set(true);
      window.location.href = "/";
    });
  }
</script>

<section class="vh-100" style="background-color: #eee;">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <form class="mx-1 mx-md-4">
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div class="form-outline flex-fill mb-0">
                      <input
                        type="email"
                        bind:value={data.email}
                        id="Email"
                        class="form-control"
                        required
                      />
                      <label class="form-label" for="form3Example3c"
                        >Your Email</label
                      >
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div class="form-outline flex-fill mb-0">
                      <input
                        type="username"
                        bind:value={data.username}
                        id="Username"
                        class="form-control"
                        required
                      />
                      <label class="form-label" for="form3Example3c"
                        >Username</label
                      >
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw" />
                    <div class="form-outline flex-fill mb-0">
                      <input
                        type="password"
                        bind:value={data.password}
                        id="Password"
                        class="form-control"
                        required
                      />
                      <label class="form-label" for="form3Example4c"
                        >Password</label
                      >
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw" />
                    <div class="form-outline flex-fill mb-0">
                      <input
                        type="password"
                        bind:value={data.repeatedPassword}
                        id="RepeatedPassword"
                        class="form-control"
                        required
                      />
                      <label class="form-label" for="form3Example4cd"
                        >Repeat your password</label
                      >
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button
                      on:click|preventDefault={() => register(data)}
                      type="submit"
                      class="btn btn-primary btn-lg">Sign Up</button
                    >
                  </div>
                </form>
              </div>
              <div
                class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
              >
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img
                  src="https://www.icarsh.org/wp-content/uploads/2018/10/Reg-online.png"
                  class="img-fluid"
                  alt="Sample image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
