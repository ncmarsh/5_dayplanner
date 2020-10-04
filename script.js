// Displays the current date and time at the top of the page
$("#currentDay").text(moment().format('LLLL'));

// Takes just the hour of the current time in the 24hr clock format
const currentHour = parseInt(moment().format('H'));
// console.log(currentHour);

// Business hours array
let workHoursArr = [8, 9, 10, 11, 12, 13, 14, 15, 16];

// For each work hour, a row with 3 columns is created, with the hour, text input and save icon
workHoursArr.forEach(function(i) {
    let rowEl = $("<div>").attr("class", "row");
    let hourColEl = $("<div>").attr("class", "col-md-2 hour");
    let textColEl = $("<textarea>").attr("class", "col-md-8");
    let saveBtnColEl = $("<div>").attr("class", "col-md-1 saveBtn");
    let saveIconEl = $("<i>").attr("class", "fas fa-save");

    // console.log(i);

    if (i < 12) {
        hourColEl.text(i + ":00 AM");
    } else if (i === 12) {
        hourColEl.text(i + ":00 PM");
    } else {
        hourColEl.text(i - 12 + ":00 PM");
    }

    textColEl.attr("id", i);
    // saveIconEl.attr("id", "save" + i); I don't think I need this

    $(".time-block").append(rowEl);
    rowEl.append(hourColEl).append(textColEl).append(saveBtnColEl);
    saveBtnColEl.append(saveIconEl);
})

// To set the background color for each text area tag 
$("textarea").each(function(i){
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



// Save button on click saves hour and content from text area to localstorage
let plannerStorageArr = JSON.parse(localStorage.getItem("plans")) || [];
// let plannerStorageArr = [];




// Save button element
saveBtnEl = $(".fa-save");

// When the save button is clicked
saveBtnEl.on("click", function(event){
    // let saveBtnId = $(this).attr("id");

    // Takes the Id of that row's text area
    let planTimeEl = $(this).parent().siblings("textarea").attr("id");
    // Takes the input of that row's content
    let planInputEl = $(this).parent().siblings("textarea").val();
    
    console.log(planTimeEl);
    console.log(planInputEl);

    // Pushes the Id and Content into an object
    plannerStorageArr.push({hourblock: planTimeEl, plans: planInputEl});
    console.log(plannerStorageArr);
    // Turns the object into a string and sets to local storage
    localStorage.setItem("plans", JSON.stringify(plannerStorageArr));

})

// When I hit the save button, it will pull it's specific ID and go to the parent sibling ID to save the content from that specific psID to local storage item

// Need it to set item hourblock in local storage from the time in the time block
// Need to figure out how to save the specific timeblocks in local storage