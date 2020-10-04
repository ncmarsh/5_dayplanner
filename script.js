// Displays the current date and time at the top of the page
$("#currentDay").text(moment().format('LLLL'));

// Takes just the hour of the current time in the 24hr clock format
let currentHour = parseInt(moment().format('H'));
console.log(currentHour);

// Business hours array
let workHoursArr = ["8AM", "9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM"];

// For each work hour, a row with 3 columns is created, with the hour, text input and save icon
workHoursArr.forEach(function(i) {
    let rowEl = $("<div>").attr("class", "row");
    let hourColEl = $("<div>").attr("class", "col-md-2 hour");
    let textColEl = $("<textarea>").attr("class", "col-md-8");
    let saveBtnColEl = $("<div>").attr("class", "col-md-1 saveBtn");
    let saveIconEl = $("<i>").attr("class", "fas fa-save");

    hourColEl.text(i);
    $(".time-block").append(rowEl);
    rowEl.append(hourColEl).append(textColEl).append(saveBtnColEl);
    saveBtnColEl.append(saveIconEl);
})

// Take the number value of the hour class and assign to variable rowHour
let rowHour = parseInt($(".hour").text());

let textAreaEl = $("textarea");
let saveBtnEl = $(".fa-save");

// For each hour class 
$(document).ready(function(){
    $(".hour").each(function(){
        console.log(rowHour);
        console.log(currentHour);
        if (rowHour < currentHour) {
            textAreaEl.addClass("past");
        }
        if (rowHour === currentHour) {
            textAreaEl.addClass("present");
        }
        if (rowHour > currentHour) {
            textAreaEl.addClass("future");
        }
    })
})



// If hour is equal to current time, it will be colored red
// If plannerHour is less than currentHour, the planner is in the past
// if (plannerHour < currentHour) {
//     textAreaEl.addClass("past");
//     // console.log(currentHour);
//     // console.log(plannerHour);
// }

// If plannerHour is equal to the currentHour, the planner is in the present
// if (plannerHour === currentHour) {
//     textAreaEl.addClass("present");
// }

// If plannerHour is greater than currentHour, the planner is in the future
// if (plannerHour > currentHour) {
//     textAreaEl.addClass("future");
// }

// Save button on click saves hour and content from text area to localstorage
let plannerStorageArr = JSON.parse(localStorage.getItem("plans")) || [];
// let plannerStorageArr = [];

saveBtnEl.on("click", function(){
    let rowInputEl = $("#textArea").val();

    console.log(rowHour);
    console.log(rowInputEl);
    plannerStorageArr.push({hourblock: rowHour, plans: rowInputEl});
    localStorage.setItem("plans", JSON.stringify(plannerStorageArr));
})


// Need it to console log the time in the time block
// Need it to register what time is when - for loop
// Need it to set item hourblock in local storage from the time in the time block
// Need to figure out how to save the specific timeblocks in local storage