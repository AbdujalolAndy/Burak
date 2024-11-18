$(() => {
  $("#process-btn").on("click", function () {
    $(".dish-container").slideToggle(500);
    $(this).hide();
  });

  $("#cancel-btn").on("click", function () {
    $(".dish-container").slideToggle(500);
    $("#process-btn").show();
    return false;
  });

  $(".product-collection").on("change", function () {
    const productCollection = $(this).val();
    if (productCollection === "DRINK") {
      $("#product-volume").show();
      $("#product-collection").hide();
    } else {
      $("#product-collection").show();
      $("#product-volume").hide();
    }
  });

  $(".new-product-status").on("change", async function () {
    const productStatus = $(this).val(),
      productId = $(this).attr("key"),
      endPoint = `/admin/product/${productId}`;

    const result = await axios.post(endPoint, { productStatus });
    if (result.data.data) {
      alert("Successfully modified!");
      $(this).blur()
    } else {
      alert("Something went wrong. Please, check again!");
    }
  });
});

const formValidation = () => {
  const productName = $(".product-name").val(),
    productPrice = $(".product-price").val(),
    productLeftCount = $(".product-left-count").val(),
    productCollection = $(".product-collection").val(),
    productDesc = $(".product-desc").val(),
    file = $(".image-one").get(0).files[0];

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === ""
  ) {
    alert("Please, insert all details!");
    return false;
  } else {
    if (!file) {
      alert("Please, insert image!");
      return false;
    }
  }
};

function previewHandler(value, key) {
  const file = $(value).get(0).files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      $(`.${key}`).attr("src", reader.result);
    };
    reader.readAsDataURL(file);
  }
}
