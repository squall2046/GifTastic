// Isaac Wu GifTastic

var animalList = ["cats", "dogs", "birds", "fishes", "monkeys", "chicks", "pandas", "cranes", "tigers", "mantis", "snakes", "turtles", "mooses", "lizards", "alpacas", "beavers", "owls", "bears", "wolfs", "horses", "deers"]

function generatebutton() {
    for (var i = 0; i < animalList.length; i++) {
        $(".gif-buttons-default").append("<button type='submit' class='newbutton-js'>" + animalList[i] + "</button> ");
    }
}
generatebutton();

////////////////////////////////////////////////////
//click submit button of input to create new button:
////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//click animal button from list, then generate more-gif-button, 10 gifs, rating, and favorite button into the EMPTY BOX:
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).on("click", ".newbutton-js", function () {
    // why if buttonText = $(".newbutton-js").text(); it will load all buttons texts???????????
    $(".gif-show").empty();

    var buttonText = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=MrCk33YTz6WfMMgxax4KaDxkCzsj5oVU&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].rating !== "r" && response.data[i].rating !== "pg-13") {
                // 1. create <div>, and every <div> will hold every pair of gif, rating, and star button:
                var gifHolder = $("<div>").addClass("rate-and-gif");

                // 2. append <img> of GIF when click button
                var gifstill = response.data[i].images.fixed_height_still.url;
                var gifstart = response.data[i].images.fixed_height.url;
                gifHolder.append("<img src='" + gifstill + "' data-still='" + gifstill + "' data-animate='" + gifstart + "' data-state='still' class='newgif-js'>");

                // 3. append <p> of RATING when click button
                gifHolder.append("<p class='newrating-js'>" + buttonText + " / Rating: " + response.data[i].rating.toUpperCase() + "</p>");

                // 4. append <i> of STAR BUTTON (favorite)
                var favoriteButton = '<i class="fas fa-star favme"></i>'
                gifHolder.append(favoriteButton)

                // 5. show gif, rating, and star button in empty box
                $(".gif-show").prepend(gifHolder)
            }
        }
        //6. generate a More Button at the top of box (put it out of loop, javascript will read brackets from outside to inside)
        var moreGifButton = '<button class="more-gif-button"><i class="fas fa-caret-square-down"></i></button>'
        $(".gif-show").prepend(moreGifButton);
    })
})


/////////////////////////////////////////////////////////
//click more-gif-button, and prepend 10 more gifs at top:
/////////////////////////////////////////////////////////
$(document).on("click", ".more-gif-button", function () {



})



//////////////////////////////////////////////
//click favorite button, inside the EMPTY BOX:
//////////////////////////////////////////////
$(document).on("click", ".favme", function () {
    $(this).toggleClass('active');
});

//////////////////////////////////////////////////////
//click gif to still or animate, inside the EMPTY BOX:
//////////////////////////////////////////////////////
$(document).on("click", ".newgif-js", function () {
    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});






