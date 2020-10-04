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
    $(".time-block").append(rowEl);
    rowEl.append(hourColEl).append(textColEl).append(saveBtnColEl);
    saveBtnColEl.append(saveIconEl);
    // need to add id's to save button, to trigger looking at previous sibling = text area
})

// For each text area tag 
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

let saveBtnEl = $(".fa-save");

saveBtnEl.on("click", function(event){
    // let rowHourSpot = parseInt(event.target.siblings(id));
    let rowHourSpot = $(this).parent().siblings().find(".hour");
    console.log(rowHourSpot);
    let rowInputEl = $("textArea").val();

    // console.log(rowHour);
    console.log(rowInputEl);
    // plannerStorageArr.push({hourblock: rowHour, plans: rowInputEl});
    // localStorage.setItem("plans", JSON.stringify(plannerStorageArr));
})



// Need it to set item hourblock in local storage from the time in the time block
// Need to figure out how to save the specific timeblocks in local storage