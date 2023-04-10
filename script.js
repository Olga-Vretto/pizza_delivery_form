const categories = [
  {
    name: "Pizza",
    products: [
      {
        img: "./images/pizza/peperoni.webp",
        name: "Peperoni",
        text: "Tomato sauce, pepperoni salami, mozzarella",
        price: "5$",
      },

      {
        img: "./images/pizza/chicken_bbq.webp",
        name: "Chicken BBQ",
        text: "Tomato sauce, pepperoni salami, mozzarella",
        price: "4$",
      },
      {
        img: "./images/pizza/quattro_formaggi.webp",
        name: "Quattro Formaggi",
        text: "Mozzarella, cheddar, blue cheese, Parmesan cheese, alfredo sauce",
        price: "6$",
      },
    ],
  },

  {
    name: "Snacks",
    products: [
      {
        img: "./images/snacks/baked_potatoes.webp",
        name: "Baked Potatoes",
        text: "Baked browned fries with bacon, pickled cucumbers, fresh tomatoes and BBQ sauce",
        price: "2$",
      },
      {
        img: "./images/snacks/dodster.webp",
        name: "Dodster",
        text: "Mozzarella, chicken breast, fresh tomatoes, ranch sauce, wrapped in cuttlefish.",
        price: "4$",
      },
      {
        img: "./images/snacks/nuggets.webp",
        name: "Nuggets",
        text: "Delicate pieces of breaded chicken fillet, baked in the oven. Crispy crust.",
        price: "4$",
      },
      {
        img: "./images/snacks/greek_salad.webp",
        name: "Greek Salad",
        text: "Eisberg salad, cherry tomatoes, cucumbers, olives, peppers, Feta and olive oil.",
        price: "3$",
      },
    ],
  },

  {
    name: "Desserts",
    products: [
      {
        img: "./images/desserts/cheesecake.webp",
        name: "Cheesecake",
        text: "Delicate dessert of whipped cream and cheese, with a sweet and velvety taste.",
        price: "3$",
      },
      {
        img: "./images/desserts/cocoa_doughnut.webp",
        name: "Cocoa doughnut",
        text: "Fluffy dough decorated with a layer of Belgian chocolate.",
        price: "1$",
      },
      {
        img: "./images/desserts/sweet_rolls.webp",
        name: "Sweet Rolls Cranberriess",
        text: "Rolls with cranberries, sugar and condensed milk.",
        price: "2$",
      },
    ],
  },

  {
    name: "Drinks",
    products: [
      {
        img: "./images/drinks/mineral_water.webp",
        name: "Mineral Water",
        text: "Water without gas 250ml",
        price: "1$",
      },
      {
        img: "./images/drinks/fresh_orange_juice.webp",
        name: "Orange Juice",
        text: "Fresh orange juice 250ml.",
        price: "2$",
      },
      {
        img: "./images/drinks/pepsi.webp",
        name: "Pepsi",
        text: "Pepsi 250ml",
        price: "1$",
      },
    ],
  },
];

const categoriesBlock = document.getElementById("categories");
const productsBlock = document.getElementById("products");
const productInfoBlock = document.getElementById("product-info");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector("#form");
const sendButton = document.querySelector("#btn-send");
const ordersBtn = document.querySelector("#orders-btn");
const myOrders = document.querySelector("#my-orders");

const localStorageService = {
  getOrders: function () {
    return localStorage.getItem("orders") || "[]";
  },
  setOrders: function (orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
  },
};

function showCategories() {
  categoriesBlock.innerHTML = "";
  formContainer.style.display = "none";

  for (const category of categories) {
    const categoryBtn = document.createElement("button");
    categoryBtn.textContent = category.name;
    categoryBtn.classList.add("categories-btn");

    categoryBtn.addEventListener("click", () => {
      showProducts(category.products);
      productsBlock.style.backgroundColor = "#ffffff7d";
      productsBlock.style.border = "2px solid rgba(241, 204, 136, 0.8)";
      productsBlock.style.padding = "15px";
    });
    categoriesBlock.appendChild(categoryBtn);
  }
}

function showProducts(products) {
  productsBlock.innerHTML = "";

  for (const product of products) {
    const productBtn = document.createElement("button");
    productBtn.textContent = product.name;
    productBtn.classList.add("product-btn");

    productBtn.addEventListener("click", () => {
      showProductInfo(product);
      productInfoBlock.style.backgroundColor = "#ffffff7d";
      productInfoBlock.style.border = "2px solid rgba(241, 204, 136, 0.8)";
      productInfoBlock.style.padding = "15px";
    });
    productsBlock.appendChild(productBtn);
  }
}

function showProductInfo(product) {
  productInfoBlock.innerHTML = "";

  const productImg = document.createElement("img");
  productImg.classList.add("image");
  productImg.src = product.img;

  const productName = document.createElement("h3");
  productName.textContent = product.name;
  productName.classList.add("product-name");

  const productDescription = document.createElement("p");
  productDescription.textContent = product.text;
  productDescription.classList.add("describe-txt");

  const productPrice = document.createElement("p");
  productPrice.textContent = "Price: " + product.price;
  productPrice.classList.add("price-txt");

  const buyBtn = document.createElement("button");
  buyBtn.textContent = "Buy";
  buyBtn.classList.add("buy-button");

  const container = document.querySelector(".container");
  const mainSubTitle = document.querySelector(".main-subtitle");

  buyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    container.innerHTML = "";
    mainSubTitle.innerHTML = "";

    formContainer.style.display = "block";

    window.product = product;
  });

  productInfoBlock.appendChild(productImg);
  productInfoBlock.appendChild(productName);
  productInfoBlock.appendChild(productDescription);
  productInfoBlock.appendChild(productPrice);
  productInfoBlock.appendChild(buyBtn);
}

showCategories();

sendButton.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const city = document.querySelector("#city").value;
  const address = document.querySelector("#address").value;
  const payment = document.querySelector("input[type=radio]:checked");
  const quantity = document.querySelector("#quantity").value;
  const comments = document.querySelector("#comments").value;

  if (!name || !city || !address || !payment || !quantity) {
    alert("Please fill in all the nessesary fields.");
    return;
  }

  formContainer.style.display = "none";
  categoriesBlock.style.display = "none";

  let valuesArr = [];

  valuesArr.push(name);
  valuesArr.push(city);
  valuesArr.push(address);
  valuesArr.push(payment.value);
  valuesArr.push(quantity);
  valuesArr.push(comments);

  makeTable(valuesArr);

  const orders = JSON.parse(localStorageService.getOrders());
  const savedOrder = {
    date: new Date().toLocaleString(),
    name: name,
    city: city,
    address: address,
    quantity: quantity,
    payment: payment.value,
    comments: comments,
    product: product,
  };

  orders.push(savedOrder);
  localStorageService.setOrders(orders);
});

function makeTable(value) {
  const table = document.querySelector("#table");
  const subtitle = document.createElement("thead");
  table.append(subtitle);
  subtitle.innerHTML = "Information about order";
  subtitle.classList.add("subtitle");

  const tr = document.createElement("tr");
  table.append(tr);
  tr.classList.add("tr");

  const namesArr = [
    "Name: ",
    "City: ",
    "Delivery Address: ",
    "Payment Type: ",
    "Quantity: ",
    "Order Comments: ",
  ];

  for (let i = 0; i < namesArr.length; i++) {
    const td = document.createElement("td");
    tr.append(td);
    td.innerHTML = `${namesArr[i]} ${value[i]}`;
    td.classList.add("td");
  }

  const tableBtn = document.querySelector("#table-btn");
  tableBtn.style.display = "block";
  renderCart();
}

function renderCart() {
  const orderTitle = document.querySelector(".main-subtitle");
  orderTitle.innerHTML = "Orders";

  myOrders.innerHTML = "";

  const orders = JSON.parse(localStorageService.getOrders());
  orders.forEach((order, index) => {
    const orderBtn = document.createElement("button");
    orderBtn.textContent = `${index + 1}. ${order.product.name} - Date: ${
      order.date
    }`;
    orderBtn.classList.add("order-button");

    orderBtn.addEventListener("click", () => {
      renderOrderDescription(order, index);
    });

    myOrders.appendChild(orderBtn);
  });
}

function renderOrderDescription(order, index) {
  myOrders.innerHTML = "";

  const orderInfo = document.createElement("div");
  orderInfo.classList.add("order-info");
  orderInfo.innerHTML = `
   <div> <img src = "${order.product.img}" class = "order-img"></div>
   <div> <h4 class = "order-title">${index + 1}. ${order.product.name}</h4>
   <p class = "order-txt">Quantity: ${order.quantity}</p> 
   <p class = "order-txt">Description: ${order.product.text}</p>
   <p class = "order-txt">Price: ${order.product.price}</p>
   <p class = "order-txt">Name: ${order.name}</p>
   <p class = "order-txt">City: ${order.city}</p> 
   <p class = "order-txt">Address: ${order.address}</p> 
   <p class = "order-txt">Payment: ${order.payment}</p>
   <p class = "order-txt">Comments: ${order.comments}</p> 
    <p class = "order-txt">Date: ${order.date}</p></div>
  `;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");

  removeBtn.addEventListener("click", () => {
    const orders = JSON.parse(localStorageService.getOrders());
    orders.splice(index, 1);
    localStorageService.setOrders(orders);
    renderCart();
  });

  const backBtn = document.createElement("button");
  backBtn.textContent = "Back to orders";
  backBtn.classList.add("back-btn");

  backBtn.addEventListener("click", () => {
    renderCart();
  });

  myOrders.appendChild(orderInfo);
  myOrders.appendChild(removeBtn);
  myOrders.appendChild(backBtn);
}

ordersBtn.addEventListener("click", () => {
  categoriesBlock.style.display = "none";
  productsBlock.style.display = "none";
  productInfoBlock.style.display = "none";
  myOrders.style.display = "block";

  renderCart();
});
