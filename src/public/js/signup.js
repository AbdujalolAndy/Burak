$(function () {
  if (window.FileReader) {
    $("#input-file").on("change", function (e) {
      const file = $(this)[0].files[0];
      const blobUrl = URL.createObjectURL(file);
      console.log(blobUrl)
      const validateTypes = ["image/jpeg", "image/jpg", "image/png"],
        imageType = file.type;
      if (validateTypes.includes(imageType)) {
        $(".media-frame .upload-img-frame").attr("src", blobUrl);
        let fileName = file.name;

        $(this).siblings(".upload-name").attr("value", fileName);
      } else {
        alert("Please, insert jpeg, jpg, png formatted image!");
      }
    });
  }
});

function validateForm() {
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please, insert all inputs!");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password is not same as primary one!");
    return false;
  }
  if (!$("#input-file")[0].files[0]) {
    alert("Please, insert an image!");
    return false;
  }

  return true;
}
