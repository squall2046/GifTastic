// Isaac Wu GifTastic

var animalList = ["cats", "dogs", "birds", "fishes", "monkeys", "chicks", "pandas", "cranes", "tigers", "mantis", "snakes", "turtles", "mooses", "lizards", "alpacas", "beavers", "owls", "bears", "wolfs", "horses", "deers"]

function generatebutton() {
    for (var i = 0; i < animalList.length; i++) {
        $(".gif-buttons-default").append("<button type='submit' class='newbutton-js'>" + animalList[i] + "</button> ");
    }
}
generatebutton();

////////////////////////////////////////////////
//click or enter search-bar to create new button:
$("#gif-submit").on("click", function () {
    event.preventDefault();

    var newAnimal = $(".gif-input").val().trim();
    if (newAnimal.length !== 0) {
        animalList.push(newAnimal);
    }
    // clear the input content
    $(".gif-input").val("");

    // clear list before reloop
    $(".gif-buttons-default").empty();
    generatebutton();
})

/////////////////////////////////////////////////////
//click button in animal list to show rating and gif:
$(document).on("click", ".newbutton-js", function () {
    $(".gif-show").empty();

    var buttonText = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=MrCk33YTz6WfMMgxax4KaDxkCzsj5oVU&limit=10";
    // if buttonText = $(".newbutton-js").text(); it will load all buttons texts
    // why??????????

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            // it's better to create <div>, and every <div> will hold a pair of gif and rating (use to float left in css):
            var gifHolder = $("<div>").addClass("rate-and-gif");
            var gifstill = response.data[i].images.fixed_height_still.url;
            var gifstart = response.data[i].images.fixed_height.url;

            gifHolder.append("<img src='" + gifstill + "' data-still='" + gifstill + "' data-animate='" + gifstart + "' data-state='still' class='newgif-js'>");
            gifHolder.append("<p class='newrating-js'> Rating: " + response.data[i].rating.toUpperCase() + "</p>");
            $(".gif-show").append(gifHolder)
        }

        $(document).on("click", ".newgif-js", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
    });
})



