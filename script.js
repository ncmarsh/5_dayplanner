$(document).ready(function() {
    // Displays the current date and time at the top of the page
    $("#currentDay").text(moment().format('LLLL'));

    // Takes just the hour of the current time in the 24hr clock format
    const currentHour = parseInt(moment().format('H'));
    // console.log(currentHour);

    // Business hours array, 24 hour clock
    let workHoursArr = [8, 9, 10, 11, 12, 13, 14, 15, 16];

    // For each work hour, a row with 3 columns is created, to hold the hour, text input and save icon
    workHoursArr.forEach(function(i) {
        let rowEl = $("<div>").attr("class", "row");
        let hourColEl = $("<div>").attr("class", "col-md-2 hour");
        let textColEl = $("<textarea>").attr("class", "col-md-8");
        let saveBtnColEl = $("<div>").attr("class", "col-md-1 saveBtn");
        let saveIconEl = $("<i>").attr("class", "fas fa-save");

        // Take the time 24 hour clock and converts to 12 hr clock and adds either AM or PM
        if (i < 12) {
            hourColEl.text(i + ":00 AM");
        } else if (i === 12) {
            hourColEl.text(i + ":00 PM");
        } else {
            hourColEl.text(i - 12 + ":00 PM");
        }

        // Sets an id to each text area tag
        textColEl.attr("id", i);

        $(".time-block").append(rowEl);
        rowEl.append(hourColEl).append(textColEl).append(saveBtnColEl);
        saveBtnColEl.append(saveIconEl);
    })

    // To set the background color for each text area tag 
    $("textarea").each(function(i) {
        let rowHourId = parseInt($(this).attr("id"));
        // If the text area Id is less than the currentHour, the row is in the past
        if (rowHourId < currentHour) {
            $(this).addClass("past");
        }
        // If the text area Id is the currentHour, the row is in the present
        if (rowHourId === currentHour) {
            $(this).addClass("present");
        }
        // If the text area Id is greater than the currentHour, the row is in the future
        if (rowHourId > currentHour) {
            $(this).addClass("future");
        }
    })

    // Function to set the textarea to what is stored in local storage
    function setPlans () {
        $("#8").val(localStorage.getItem("8"));
        $("#9").val(localStorage.getItem("9"));
        $("#10").val(localStorage.getItem("10"));
        $("#11").val(localStorage.getItem("11"));
        $("#12").val(localStorage.getItem("12"));
        $("#13").val(localStorage.getItem("13"));
        $("#14").val(localStorage.getItem("14"));
        $("#15").val(localStorage.getItem("15"));
        $("#16").val(localStorage.getItem("16"));
    }

    // When the save button is clicked
    $(".fa-save").on("click", function(){
        // Takes the Id of that row's text area
        let hourBlockEl = $(this).parent().siblings("textarea").attr("id");
        // Takes the input of that row's content
        let planInputEl = $(this).parent().siblings("textarea").val();

        console.log(hourBlockEl);
        console.log(planInputEl);

        localStorage.setItem(hourBlockEl, planInputEl);
    })

    // Sets the textarea to what is stored in local storage
    setPlans();

    // When clear day button is clicked, planner and local storage will clear
    $("#clear-day").on("click", function() {
        localStorage.clear();

        setPlans();
    })
});