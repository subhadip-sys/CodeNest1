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
