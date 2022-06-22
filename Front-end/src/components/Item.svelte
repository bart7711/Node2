<script>
  export let item = {
    ammount: "",
    category: "",
    description: "",
    id: "",
    imageLink: "",
    name: "",
    price: "",
    user_id: "",
  };

</script>

<div class="card">
  <img src={item.imageLink} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
    <h6 class="price">Price: {item.price}DKK </h6>
    <h6 class="ammount">Ammount:{item.ammount}</h6>
    <br>
    <a href="/item/{item.id}" class="btn btn-primary">Read More</a>
  </div>
</div>

<style>
  .card {
    width: 18rem;
    height: 40rem;
  }
  .price, .ammount{
    text-align: left;
  }
</style>
