//by clicking on add new button, codeForm div will create//
document.getElementById("add").addEventListener("click", function ()
{
     // Create the main div
     //formDiv here is used to create the element in which we will add the code form
  const formDiv = document.createElement("div");
  //adding this will create and recongnize the css class codeForm
  formDiv.className = "codeForm";
  // Insert HTML inside it
  formDiv.innerHTML = 
  `<input type="text" class="questionTitle" 
  placeholder="DSA Question Title">
    <textarea rows="25" class="yourCode" placeholder="Paste your solution"></textarea>
    <div class="codebutton">
      <button class="saveCode">Save Code</button>
      <button class="deleteCode">Delete Code</button>
    </div>`;//  [{(`)}]   This sign plz remember

    // Add the form div to the container

    //The appendChild() method of the Node interface adds a node to the end
    // of the list of children of a specified parent node.
    document.getElementById("codeContainer").appendChild(formDiv);
    //.getElementById the first element within node's descendants whose ID is elementId.

 // 🔹 Add delete functionality for this specific div
 //querySelector returns the first element that is a descendant of node that matches selectors.
  formDiv.querySelector(".deleteCode").addEventListener("click", () => {
     saveAllToLocalStorage();
     formDiv.remove();  
  });
    // 🔹 Add save functionality for this specific div 
    formDiv.querySelector(".saveCode").addEventListener("click", () => {
     saveAllToLocalStorage();
     alert("Code saved!");
});
})



// ✅ Function to save all forms to localStorage
function saveAllToLocalStorage()
{
// funtion name saveAllToLocalStorage is created
  const allForms = document.querySelectorAll(".codeForm");
  const allData = [];

  allForms.forEach((form) => {
    const title = form.querySelector(".questionTitle").value;
    const code = form.querySelector(".yourCode").value;
    if (title.trim() !== "" || code.trim() !== "") {
      allData.push({ title, code });
    }
  });
//stringify converts a JavaScript value to a JavaScript Object Notation (JSON) string.
  localStorage.setItem("dsaCodes", JSON.stringify(allData));
}


//✅ Function to load data from localStorage
function loadFromLocalStorage() {
/*JSON.parse() method parses a JSON string,
 constructing the JavaScript value or object described by the string.*/

 /*If the value associated with the key is null, it returns null.
 If the key does not exist, it also returns null.*/

 /* If there is no data in localStorage, it initializes savedData as an empty array.*/

 /* So, savedData will either contain the parsed array of objects from localStorage
 or an empty array if no data is found.*/

 /* This ensures that the subsequent code can safely iterate over savedData
 without encountering errors due to null or undefined values.*/

 /*If there is more than one it will directly convert and save it as array of objects*/
const savedData = JSON.parse(localStorage.getItem("dsaCodes")) || [];
savedData.forEach((item) => {
     const formDiv = document.createElement("div");
     formDiv.className = "codeForm";
    formDiv.innerHTML = 
`<input type="text" class="questionTitle" placeholder="DSA Question Title" value="${item.title}">
<textarea rows="25" class="yourCode" placeholder="Paste your solution">${item.code}</textarea>
<div class="codebutton">
  <button class="saveCode">Save Code</button>
  <button class="deleteCode">Delete Code</button>
</div>`;


    document.getElementById("codeContainer").appendChild(formDiv);

     formDiv.querySelector(".deleteCode").addEventListener("click", () => {
      formDiv.remove();
      saveAllToLocalStorage();
    });

    formDiv.querySelector(".saveCode").addEventListener("click", () => {
      saveAllToLocalStorage();
      alert("Code saved!");
    });

});
}
// 🔹 Load saved forms when the page loads
/*The addEventListener() method of the EventTarget interface sets up
 a function that will be called whenever the specified event is delivered to the target.*/
window.addEventListener("load", loadFromLocalStorage);

//searchbar functionality
const searchInput = document.getElementById("searchInput");
//keydoiwn event listener controls the keys pressed in the keyboard
searchInput.addEventListener("keydown", function (event) {
  //Select all elements in the document that have the class .codeForm.
    const allForms = document.querySelectorAll(".codeForm");
    if(event.key === "Enter"){
      /*event.preventDefault() method tells the user agent that if the event does not get explicitly handled,
       its default action should not be taken as it normally would be.*/
      event.preventDefault();
      /*searchInput.value.trim().toLowerCase() is used to get the current value of the search input field,
       remove any leading or trailing whitespace with trim(),
       and convert the string to lowercase with toLowerCase() for case-insensitive comparison.*/
      const searchQuery = searchInput.value.trim().toLowerCase();
      let found = false;
      /* title.includes(searchQuery) checks if the title string contains the searchQuery substring.
       This allows for partial matches, meaning that if the search query is a part of the title,
       it will still be considered a match.*/
    allForms.forEach((form) => {
      const title = form.querySelector(".questionTitle").value.trim().toLowerCase();
      if(title === searchQuery || title.includes(searchQuery)){
        form.style.display = "flex";
        found = true;
      }else{
        form.style.display="none";
      }

    })
     if(!found){
     alert("Result Not Found");
     allForms.forEach((form) => (form.style.display = "flex"));
    }
}});

//importing database created in dsadb.js and show it as a list with checkboxes,if you click on "dsa problems" button it will open\\
import {problemsDB} from "./dsadb.js";
const scrollDiv=document.getElementById("dsaScroll");
let problems="";
Object.keys(problemsDB).forEach(level => {
  problems+=`<div class="problem-section">
            <h3>${level.charAt(0).toUpperCase() + level.slice(1)} Problems</h3>
            <ul>`;
               problemsDB[level].forEach(name =>{
                const id = name.toLowerCase().replace(/ /g, "");  //creates a unique id for each problem name like [Second Largest Element to secondlargestelement]//
                problems+=`<li><label><input type="checkbox" value="${id}">${name}</label></li>`;
               });
               problems+='</ul></div>';
})
scrollDiv.innerHTML=problems;

//saving the checked questions//
function savedCheckedProblems(){
  const checkBoxes = document.querySelectorAll("#dsaScroll input[type='checkbox']");
   const checked = [];
   checkBoxes.forEach(cb=>{
    if(cb.checked) checked.push(cb.value); //basically if you checked it,it will add to "checked" array//
   })
   localStorage.setItem("checkedProblems", JSON.stringify(checked));
}
//Load checked Problems//
function loadCheckedProblems(){
  const saved = JSON.parse(localStorage.getItem("checkedProblems")) || [];
  const checkBoxes = document.querySelectorAll("#dsaScroll input[type='checkbox']");
  checkBoxes.forEach(cb=>{
    if(saved.includes(cb.value)){
    cb.checked=true;
  }
  })
}
//This line is attaching an event listener to every checkbox, //
// so that whenever any checkbox is clicked (checked/unchecked), your saveCheckedProblems() function runs.//
document.querySelectorAll("#dsaScroll input[type='checkbox']")
  .forEach(cb => cb.addEventListener("change",savedCheckedProblems));

loadCheckedProblems();

const dsaPanel = document.getElementById("dsaPanel");
const viewBtn = document.getElementById("view");
const closePanel = document.getElementById("closePanel");

//when a event happens,it basically go from document to button and then button to document
//document to button is called capturing phase
//then event happens(target phase)
//then it goes button to document which is called bubble phase(as it goes upward like bubbles)
//e.stoppropagation does not let the event do the bubble phase


viewBtn.addEventListener("click",(e)=>{
  e.stopPropagation();
  dsaPanel.classList.toggle("open");
})
closePanel.addEventListener("click",(e)=>{
  e.stopPropagation();
  dsaPanel.classList.remove("open");
})

//clicking outside the dsa panel will close the div
// //so we have to use e.stopPropagation function//
document.addEventListener("click",()=>{
    dsaPanel.classList.remove("open");
})





