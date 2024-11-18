$(function () {
  $(".member-status").on("change", async function () {
    const memberStatus = $(this).val();
    const _id = $(this).attr("key");
    const result = await axios.post("/admin/user/edit", {
      _id: _id,
      memberStatus,
    });
    console.log(result)
    if (result) {
      alert("Successfully updated!");
      $(this).blur();
    } else {
      alert("Update failed!");
    }
  });
});
