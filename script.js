const form = document.getElementsByTagName("form");
form[0].addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submit");
  getformData();
});

const getformData = () => {
  let checkproduct = document.getElementsByClassName("product_id");
  let validation = true;
  // check for product id
  if (form[0].elements.product_id.value.length > 0) {
    for (let product of checkproduct) {
      console.log(product);
      if (form[0].elements.product_id.value == product.getAttribute("id")) {
        console.log("duplicate id");
        product.parentElement.classList.add("error-red");
        form[0].elements.product_id.style.border = "1px solid red";
        validation = false;
      }
    }
  } else {
    validation = false;
    form[0].elements.product_id.style.border = "1px solid red";
  }

  if (validation == true) {
    form[0].elements.product_id.style.border = "1px solid #555";
  }

  if (
    Number.isInteger(Number(form[0].elements.product_qty.value)) &&
    Number(form[0].elements.product_qty.value) > 0
  ) {
    console.log("integer");
  } else {
    console.log("string");
    form[0].elements.product_qty.style.border = "1px solid red";
    validation = false;
  }

  if (validation) {
    const product = {
      product_id: form[0].elements.product_id.value,
      product_name: form[0].elements.product_name.value,
      product_qty: form[0].elements.product_qty.value,
    };

    document.querySelectorAll(".error-red").forEach(function (element) {
      element.classList.remove("error-red");
    });
    form[0].elements.product_qty.style.border = "1px solid #555";

    console.log(product);
    productList(product);
  }
};

const productList = (product) => {
  let products = document.getElementById("products");
  let list = document.createElement("tr");
  for (const productdetail in product) {
    console.log(product[productdetail]);
    list.innerHTML =
      list.innerHTML +
      `<td class="${productdetail}">${product[productdetail]}</td>`;
  }

  list
    .getElementsByClassName("product_id")[0]
    .setAttribute("id", product["product_id"]);
  //list.querySelector('.product_id').setAttribute("id",product['product_id']);
  const productQuantity = list.getElementsByClassName("product_qty")[0];
  productQuantity.innerHTML =
    productQuantity.innerHTML +
    ` <button class="subtract 2">-</button>
    <button class="addition">+</button>`;

  products.append(list);
  // console.log(list)
};

products.addEventListener("click", (event) => {
  console.log(this);
  console.log(event);
  console.log(event.target);
  console.log(event.currentTarget);
  console.log(event.delegateTarget);
  console.log(event.relatedTarget);

  if (event.target.classList.contains("subtract")) {
    console.log("subtract");
    // console.log(event.target.parentNode);
    let currentQty = Number(event.target.parentElement.firstChild.nodeValue);
    if (currentQty > 0) {
      event.target.parentElement.firstChild.nodeValue = currentQty - 1;
    }

    //console.log(event.target.parentElement.getElementsByClassName('product_qty'));
  }
  if (event.target.classList.contains("addition")) {
    console.log("addition");
    let currentQty = Number(event.target.parentElement.firstChild.nodeValue);

    event.target.parentElement.firstChild.nodeValue = currentQty + 1;
  }
});
