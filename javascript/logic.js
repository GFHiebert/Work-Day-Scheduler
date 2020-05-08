var timeInterval = setInterval(function () {
    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
}, 1000);


function renderTimeBlocks() {
        var numberOfHours = 12;
        var startHour = 7;
    for (var i = startHour; i < numberOfHours + startHour; i++) {
        var hour = i;
        var meridiem = "am";
        if(hour > 12) {
            hour -= 12;
            var meridiem = "pm";
        }
        var rowEl = $("<div>").addClass("row").attr("id",hour + meridiem);
        var hourEl = $("<p>").addClass("hour col-1").text(hour + meridiem);
        var textBlockEl = $("<textarea>").addClass(determineColorByTime(hour, meridiem)).addClass("col-10").text(retrieveLocalText(hour + meridiem));
        var buttonEl = $("<button>").addClass("saveBtn col-1").text("Save");

        rowEl.append(hourEl, textBlockEl, buttonEl);
        $("#time-blocks").append(rowEl);
    }
}

function retrieveLocalText(timeOfDay) {
    var schedule = JSON.parse(window.localStorage.getItem("schedule")) || [];
    var localText = "";
    for(var i = 0; i < schedule.length; i++) {
        if(schedule[i].time == timeOfDay) {
            localText = schedule[i].text;
        }
    }
    return localText;
}

function determineColorByTime(hour, meridiem) {
    var realHour = moment().format('h');
    if(meridiem == "pm") {
        hour += 12;
    }
    if(moment().format('a') == "pm") {
        realHour = parseInt(realHour);
        realHour += 12;
    }

    if(hour < realHour) {
        console.log("hour is " + hour + " -<- realHour is " + realHour);
        return "past";
    } else if (hour == realHour) {
        console.log("hour is " + hour + " -=- realHour is " + realHour);
        return "present";
    } else if (hour > realHour) {
        console.log("hour is " + hour + " ->- realHour is " + realHour);
        return "future";
    }

}

$("body").on("click", ".saveBtn", function() {
    console.log("Hey save button works on button " + $(this).parent().attr("id"));
    console.log($(this).prev().val());

    var text = $(this).prev().val();
    var timeOfDay = $(this).parent().attr("id");
    var schedule = JSON.parse(window.localStorage.getItem("schedule")) || [];

    var newText = {
        time: timeOfDay,
        text: text
    };

    for(var i = 0; i < schedule.length; i++){
        if(schedule[i].time == timeOfDay) {
            console.log(schedule[i]);
            schedule.splice(i,1);
        }
    }
    
    schedule.push(newText);
    window.localStorage.setItem("schedule", JSON.stringify(schedule));
})



renderTimeBlocks();

