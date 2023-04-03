class Categories {
  constructor() {
    this.apiUrl = 'https://fakestoreapi.com/';
  }

  getAllCategories() {
    $.ajax({
      type: 'GET',
      url: this.apiUrl + 'products/categories',
      success: function (data) {
        $(data).each(function (index, category) {
          $('.categories').append(
            '<a class="dropdown-item" href="/category.html?category=' +
              encodeURIComponent(category) +
              '">' +
              toTitleCase(category) +
              '</a>'
          );
        });
        $('.categories').append(
          '<a class="dropdown-item" href="/cart.html">Cart</a>'
        );
      },
    });
  }
}
