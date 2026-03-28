// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  const acceptBtn = document.querySelector(".accept");
  const rejectBtn = document.querySelector(".reject");

  acceptBtn.addEventListener("click", function () {
    alert("Match Accepted!");
  });

  rejectBtn.addEventListener("click", function () {
    alert("Match Rejected!");
  });

});