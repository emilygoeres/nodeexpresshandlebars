// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".update-hamburger").on("click", function(event) {
    var id = $(this).data("id");

    var data = {
     devour: true
    };

    // Send the PUT request.
    $.ajax("/api/hamburgers/" + id, {
      type: "PUT",
      data: data
    }).then(
      function() {
        console.log("changed devour to", data);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newHamburger = {
      name: $("#ca").val().trim(),
      devour: $("[name=devour]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/hamburgers", {
      type: "POST",
      data: newHamburger
    }).then(
      function() {
        console.log("created new hamburger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-hamburger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/hamburgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted hamburger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
