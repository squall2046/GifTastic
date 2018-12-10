// Isaac Wu GifTastic

var animalList = ["cats", "dogs", "birds", "fishes", "monkeys", "chicks", "pandas", "cranes", "tigers", "mantis", "snakes", "turtles", "mooses", "lizards", "alpacas", "beavers", "owls", "bears", "wolfs", "horses", "deers"]

////////////////////////////////////////////////
//click or enter search-bar to create new button:
function generatebutton() {
    for (var i = 0; i < animalList.length; i++) {
        $(".gif-buttons-default").append("<button type='submit' class='newbutton-js'>" + animalList[i] + "</button> ");
    }
}
generatebutton();

$("#gif-submit").on("click", function () {
    var newAnimal = $(".gif-input").val().trim();
    animalList.push(newAnimal);
    $(".gif-buttons-default").empty();
    generatebutton();
})

/////////////////////////////////////////////////////
//click button in animal list to show rating and gif:

// document on click, use for the danymic buttons or elements which are created in js
$(document).on("click", ".newbutton-js", function () {
    $(".gif-show").empty();

    var buttonText = $(this).text();
    // if change to:
    // var buttonText = $(".newbutton-js").text();
    // it will load all buttons texts
    // only use $(this) work, why??????????

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=MrCk33YTz6WfMMgxax4KaDxkCzsj5oVU&limit=10";
    console.log(this)
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //https://api.giphy.com/v1/gifs/search?q=deers&api_key=MrCk33YTz6WfMMgxax4KaDxkCzsj5oVU&limit=10
        //check the above link to see that data is an array
        //loop for i, to get rating and gif from each value[i]
        for (var i = 0; i < response.data.length; i++) {
            $(".gif-show").append("<span class='newrating-js'> Rating: " + response.data[i].rating + "</span>");
            $(".gif-show").append("<img src='" + response.data[i].images.fixed_height_still.url + "' class='newgif-js'>");

        }
    });
})

