// this functions is for the materialize navbar, scrolling backgrounds in about section and the form
$(document).ready(function () {
    $(".modal").modal();
    $(".modal1").modal();
    $(".modal2").modal();
    $(".modal3").modal();
    $(".modal4").modal();
    $(".modal5").modal();
    $(".modal6").modal();
    $(".parallax").parallax();
    $(".sidenav").sidenav();
    $("select").formSelect();
});

// When user clicks add-btn- this works fully! :D
$("#new-account").on("click", function (event) {
    // event.preventDefault();

    // Make a newStoryline object
    var newUser = {
        firstname: $("#first_name").val(),
        lastname: $("#last_name")
            .val()
            .trim(),
        username: $("#username")
            .val()
            .trim(),
        password: $("#password")
            .val()
            .trim(),
        email: $("#email")
            .val()
            .trim()
    };

    // $("#first_name").val(""),
    //     $("#last_name").val(""),
    //     $("#username").val(""),
    //     $("#password").val(""),
    //     $("#email").val("");

    // Send an AJAX POST-request with jQuery
    $.post("/signup", newUser)
        // On success, run the following code
        .then(function (data) {
            // Log the data we found
            location.href = "/dashboard"
            console.log(data);
            //   location.reload();
        });
});

// When user clicks add-btn- this works fully! :D
$("#create").on("click", function (event) {
    event.preventDefault();

    // Make a newStoryline object
    var newStoryline = {
        genre: $(".genre").val(),
        characterList: $(".character")
            .val()
            .trim(),
        //role: $(".role").val().trim(),
        imageurl: $(".imgurl")
            .val()
            .trim(),
        story: $(".storyline")
            .val()
            .trim()
    };
    // Send an AJAX POST-request with jQuery
    $.post("/api/story", newStoryline)
        // On success, run the following code
        .then(function (data) {
            // Log the data we found
            console.log(data);
            location.reload();
        });
});

var like = 0;
var dislike = 0;

$("#thumbs_up").on("click", function () {
    like++;
    $(".like").text(like);
});

$("#thumbs_down").on("click", function () {
    dislike--;
    $(".dislike").text(dislike);
});


