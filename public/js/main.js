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
});

// When user clicks add story button
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

// likes and dislikes counters
// TODO firebase or put these in the database
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

// socket

$(function () {
    var socket = io.connect();
    var $messageForm = $("#messageForm");
    var $message = $("#message");
    var $chat = $("#chat");
    var $messageArea = $("#messageArea");
    var $userFormArea = $("#userFormArea");
    var $userForm = $("#userForm");
    var $users = $("#users");
    var $username = $("#username");

    $messageForm.submit(function (event) {
        event.preventDefault();
        socket.emit("send message", $message.val());
        $message.val("");
    });

    socket.on("new message", function (data) {
        $chat.append('<div class="well"><strong>' + data.user + '</strong>: ' + data.msg + '</div>')
    });

    $userForm.submit(function (event) {
        event.preventDefault();
        socket.emit("new user", $username.val(), function (data) {
            if (data) {
                $userFormArea.hide();
                $messageArea.show();
            }
        });
        $username.val("");
    });

    socket.on("get users", function (data) {
        var html = "";
        for (i = 0; i < data.length; i++) {
            html += '<li class="list-group-item">' + data[i] +'</li>';
        }
        $users.html(html);
        console.log(users);
    });


})
