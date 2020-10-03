// Displays the current date at the top of the page
$("#currentDay").text(moment().format('LLLL'));

// If hour is equal to current time, it will be colored red
let textAreaEl = $("textarea");
let plannerHour = $(".hour").val();
let currentHour = moment().calendar();

// If plannerHour is less than currentHour, the planner is in the past
if (plannerHour < currentHour) {
    textAreaEl.addClass("past");
    // console.log(currentHour);
    // console.log(plannerHour);
}

// If plannerHour is equal to the currentHour, the planner is in the present
if (plannerHour === currentHour) {
    textAreaEl.addClass("present");
}

// If plannerHour is greater than currentHour, the planner is in the future
if (plannerHour > currentHour) {
    textAreaEl.addClass("future");
}

// Save button on click saves content from text area to localstorage
// let plannerStorageArr = JSON.parse(localStorage.getItem("plans")) || [];
let plannerStorageArr = [];

let saveBtnEl = $(".fa-save");

saveBtnEl.on("click", function(){
    let plannerInputEl = $("#textArea").val();
    console.log(plannerInputEl);
    plannerStorageArr.push({hourblock: plannerHour, plans: plannerInputEl});
    localStorage.setItem("plans", JSON.stringify(plannerStorageArr));
})