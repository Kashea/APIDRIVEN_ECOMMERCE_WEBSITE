class CartItem {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.quantity = 1;
  }
}

let cart = [];
let wishlist = [];

function addToCart(id, title, price) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const newItem = new CartItem(id, title, price);
    cart.push(newItem);
  }
  updateCartDropdown();
}

function addToWishlist(id, title, price) {
  const existingItem = wishlist.find((item) => item.id === id);
  if (!existingItem) {
    const newItem = new CartItem(id, title, price);
    wishlist.push(newItem);
  }
  updateWishlistDropdown();
}

function moveFromWishlistToCart(id) {
  const itemIndex = wishlist.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    const { id, title, price } = wishlist[itemIndex];
    wishlist.splice(itemIndex, 1);
    addToCart(id, title, price);
    updateWishlistDropdown();
    updateCartDropdown();
  }
}

function updateCartDropdown() {
  let cartDropdownContent = '';
  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    cartDropdownContent += `
      <div class="dropdown-item">
        <img src="https://via.placeholder.com/50" alt="Product Image">
        <div class="item-details">
          <h6>${item.title}</h6>
          <div class="item-quantity d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary me-2" onclick="decrementQuantity(${
              item.id
            })">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary ms-2" onclick="addToCart(${
              item.id
            }, '${item.title}', ${item.price})">+</button>
          </div>
          <div class="item-price">$${item.price.toFixed(2)}</div>
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${
            item.id
          })">Remove</button>
        </div>
      </div>
    `;
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
  });

  cartDropdownContent += `
    <div class="dropdown-item">
      <strong>Total: $${totalPrice.toFixed(2)}</strong>
    </div>
    <div class="dropdown-item">
      <button class="btn btn-primary" onclick="proceedToCheckout()">Proceed to checkout</button>
    </div>
  `;

  document.querySelector('#cart-dropdown').innerHTML = cartDropdownContent;
  document.querySelector('#cart-count').textContent = totalQuantity;
}

function updateWishlistDropdown() {
  let wishlistDropdownContent = '';
  let totalWishlistItems = 0;

  wishlist.forEach((item) => {
    wishlistDropdownContent += `
      <div class="dropdown-item">
        <img src="https://via.placeholder.com/50" alt="Product Image">
        <div class="item-details">
          <h6>${item.title}</h6>
          <div class="buttons">
            <button class="btn btn-sm btn-outline-secondary" onclick="moveFromWishlistToCart(${item.id})">Add to Cart</button>
            <button class="btn btn-sm btn-danger" onclick="removeFromWishlist(${item.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
    totalWishlistItems++;
  });

  document.querySelector('#wishlist-dropdown').innerHTML =
    wishlistDropdownContent;
  document.querySelector('#wishlist-count').textContent = totalWishlistItems;
}

function removeFromCart(id) {
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    updateCartDropdown();
    updateCartBadge();
  }
}

function removeFromWishlist(id) {
  const itemIndex = wishlist.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    wishlist.splice(itemIndex, 1);
    updateWishlistDropdown();
    updateWishlistBadge();
  }
}

function updateCartBadge() {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('#cart-count').textContent = totalQuantity;
}

function updateWishlistBadge() {
  const totalWishlistItems = wishlist.length;
  document.querySelector('#wishlist-count').textContent = totalWishlistItems;
}
