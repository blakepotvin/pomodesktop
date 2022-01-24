
function clock(minutes, seconds) {
    var timeleft = (minutes * 60) + (seconds)
    var timer = setInterval(function () {
        timeleft -= 1;

        mins_remain = Math.floor(timeleft / 60)
        secs_remain = timeleft - (mins_remain * 60)

        if (mins_remain < 10) {
            mins_remain = "0" + mins_remain.toString()
        } else {
            mins_remain = mins_remain.toString()
        }

        if (secs_remain < 10) {
            secs_remain = "0" + secs_remain.toString()
        } else {
            secs_remain = secs_remain.toString()
        }

        $("#timer").html(mins_remain + ":" + secs_remain)



        if (timeleft <= 0) {
            clearInterval(timer)
        }

    }, 1000)
}

$("#start").on("click", function () {
    $("#test").html("Hello World")

    clock_string = $("#timer").html()
    minutes = clock_string.split(":")[0]
    seconds = clock_string.split(":")[1]

    clock(parseInt(minutes), parseInt(seconds))
    // clock(1, 2)
})

