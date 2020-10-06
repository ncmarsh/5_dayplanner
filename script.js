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



// Save button on click saves hour and content from text area to localstorage
let plannerStorageArr = JSON.parse(localStorage.getItem("plans")) || [];
// let plannerStorageArr = [];
console.log(plannerStorageArr[0]);

// If there are objects in local storage
   // For each object in local storage, it will look to see if it has an hour block equal to a text area id
    // If it does, it will set the text content from the i.task
// if (plannerStorageArr) {
//     console.log("yes");

//     let savePlans = JSON.parse(localStorage.getItem("plans"));
//     console.log(savePlans);

//     savePlans.forEach(function(i) {
//         console.log(i);
//         let saveTextId = $("textarea").attr("id");
//         if (i.hourblock === saveTextId) {
//             console.log(saveTextId);
//             console.log(i.task);
            
//             let saveTextVal = $("textarea").val();
//             console.log("yes");
 
//         }
//     })
// }

if (plannerStorageArr) {
    console.log("yes");

    let savePlans = JSON.parse(localStorage.getItem("plans"));
    console.log(savePlans);

    $("textarea").each(function(i) {
        console.log(i);
        let saveTextId = $("textarea").attr("id");
        if (savePlans !== null && saveTextId === savePlans[i].hourblock) {
            console.log("winner");
            $(this).text(savePlans[i].task);
        } 
    })
}


// Save button element
let saveBtnEl = $(".fa-save");

// When the save button is clicked
saveBtnEl.on("click", function(i){
    // Takes the Id of that row's text area
    let planTimeEl = $(this).parent().siblings("textarea").attr("id");
    // Takes the input of that row's content
    let planInputEl = $(this).parent().siblings("textarea").val();

    console.log(planTimeEl);
    console.log(planInputEl);

    // Pushes the Id and Content into an object
    plannerStorageArr.push({hourblock: planTimeEl, task: planInputEl});
    
    // Turns the object into a string and sets to local storage
    localStorage.setItem("plans", JSON.stringify(plannerStorageArr));
    console.log(plannerStorageArr);
})



// When I hit the save button, it will pull it's specific ID and go to the parent sibling ID to save the content from that specific psID to local storage item
// If editing text, it needs to replace the hourblock if it exists
// When I refresh the page, the local storage info needs to PERSIST!


// Add reset day button
