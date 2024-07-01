document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const products = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 100, imageUrl: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 200, imageUrl: 'https://via.placeholder.com/150' }
    ];
  
    // Signup
    if (document.getElementById('signupForm')) {
      document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (users.find(user => user.email === email)) {
          alert('User already exists');
        } else {
          users.push({ name, email, password });
          localStorage.setItem('users', JSON.stringify(users));
          alert('Signup successful');
          window.location.href = 'login.html';
        }
      });
    }
  
    // Login
    if (document.getElementById('loginForm')) {
      document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          window.location.href = 'home.html';
        } else {
          alert('Invalid credentials');
        }
      });
    }
  
    // Home
    if (document.getElementById('productList')) {
      const productList = document.getElementById('productList');
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <button onclick="viewProduct(${product.id})">View</button>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
      });
    }
  
    // Product Detail
    if (document.getElementById('productDetail')) {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      const product = products.find(p => p.id == productId);
      const productDetail = document.getElementById('productDetail');
      if (product) {
        productDetail.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
      } else {
        productDetail.innerHTML = `<p>Product not found</p>`;
      }
    }
  
    // Cart
    if (document.getElementById('cartItems')) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const cartItemsDiv = document.getElementById('cartItems');
      cartItems.forEach(item => {
        const product = products.find(p => p.id == item.productId);
        if (product) {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'cart-item';
          itemDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${item.quantity}</p>
          `;
          cartItemsDiv.appendChild(itemDiv);
        }
      });
      document.getElementById('checkoutButton').addEventListener('click', function() {
        alert('Checkout successful');
        localStorage.removeItem('cartItems');
        window.location.href = 'home.html';
      });
    }
  
    // Profile
    if (document.getElementById('profileInfo')) {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUser) {
        document.getElementById('profileInfo').innerHTML = `
          <h2>${loggedInUser.name}</h2>
          <p>${loggedInUser.email}</p>
        `;
        document.getElementById('logoutButton').addEventListener('click', function() {
          localStorage.removeItem('loggedInUser');
          window.location.href = 'login.html';
        });
      } else {
        window.location.href = 'login.html';
      }
    }
  });
  
  // Add to Cart function
  function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ productId, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Product added to cart');
  }
  
  // View Product function
  function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
  }
  