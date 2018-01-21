// Default data
// const initialData = [{name:"Meizu", model:"M6 Note", year:2017, rating:5, comment:"Great device!"}];
const initialData = getArrayFromLocalStorage();

// Convert numeric rating to stars
function createStarRating(ratingValue) {
  let starRating = "";
  for(let i = 0; i < ratingValue; i++) {
    starRating += "★";
  }
  return starRating;
}

//Add info button to each table item
const addInfoButton = (() => `<a class="btn-floating btn waves-effect waves-light blue lighten-2" title="info about item"><i class="material-icons">info_outline</i></a>`);

//Add edit button to each table item
const addEditButton = (() => `<a class="btn-floating btn waves-effect waves-light blue accent-2" title="edit item"><i class="material-icons">edit</i></a>`);

//Add remove button to each table item
const addRemoveButton = (() => `<a onclick="removeItemFromTable()" class="btn-floating btn waves-effect waves-light red lighten-2" title="remove item"><i class="material-icons">remove</i></a>`);

// Make one table item with each device
function makeTableItem(arrayItem) {
  return `<tr onclick="removeItemFromTable()">
            <td>${arrayItem.name}</td>
            <td>${arrayItem.model}</td>
            <td>${arrayItem.year}</td>
            <td>${createStarRating(arrayItem.rating)}</td>
            <td>${arrayItem.comment}</td>
            <td>${addInfoButton()} ${addEditButton()} ${addRemoveButton()}</td>
          </tr>`;
}

// Build whole table from table items
function buildTable(initialArray) {
  let table = "";
  for(let i = 0; i < initialArray.length; i++) {
    table += makeTableItem(initialArray[i]);
  }
  return table;
}

// Fill table on page with builded table
function fillTableOnPage(initialData) {
  document.getElementById('main-table-body').innerHTML = buildTable(initialData);
}

// Get data from localStorage
// Fill table on page
fillTableOnPage(getArrayFromLocalStorage());

// Save data in localStorage
saveToLocalStorage(initialData);

//Make add button enabled only when all fields are filled
const enableAddButton = (() => document.getElementById('add-btn').classList.remove('disabled'));

//Make add button disabled
const disableAddButton = (() => document.getElementById('add-btn').classList.add('disabled'));

// Check value for the number
const isValidNumber = digit => typeof digit === 'number' && !isNaN(digit);

// Validate add form for filling all of the fields
function validateAddForm() {
  disableAddButton();
  if(!document.getElementById('product-name').value ||
     !document.getElementById('model').value ||
     !document.getElementById('year').value ||
     !document.getElementById('rating').value  ||
     !document.getElementById('comment').value ||
     !isValidNumber(parseInt(document.getElementById('year').value))) {
    return false;
  }
  enableAddButton();
}

//Get item from adding form and push it in initial array
function getItemFromAddForm() {
  let item = {};
  item.name = document.getElementById('product-name').value;
  item.model = document.getElementById('model').value;
  item.year = document.getElementById('year').value;
  item.rating = document.getElementById('rating').value;
  item.comment = document.getElementById('comment').value;

  initialData.push(item);
  saveToLocalStorage(initialData);
  fillTableOnPage(initialData);
  cleanAddForm();
}

// Clean form after item adding
function cleanAddForm() {
  document.getElementById('product-name').value = "";
  document.getElementById('model').value = "";
  document.getElementById('year').value = "";
  document.getElementById('rating').value = "";
  document.getElementById('comment').value = "";
}

//Save initial array to localStorage
function saveToLocalStorage(initialData) {
  for(let i = 0; i < initialData.length; i++) {
    localStorage.setItem(`Name#${i}`,	initialData[i].name);
    localStorage.setItem(`Model#${i}`,	initialData[i].model);
    localStorage.setItem(`Year#${i}`,	initialData[i].year);
    localStorage.setItem(`Rating#${i}`,	initialData[i].rating);
    localStorage.setItem(`Comment#${i}`,	initialData[i].comment);

    localStorage.setItem('NumberOfItems', i);
  }
}

// Get data from localStorage
function getArrayFromLocalStorage() {
  const receivedArray = [];
  let numberOfArrayItems = localStorage.getItem('NumberOfItems');
  for(let i = 0; i <= numberOfArrayItems; i++) {
    let item = {};
    item.name = localStorage.getItem(`Name#${i}`,);
    item.model = localStorage.getItem(`Model#${i}`);
    item.year = localStorage.getItem(`Year#${i}`);
    item.rating = localStorage.getItem(`Rating#${i}`);
    item.comment = localStorage.getItem(`Comment#${i}`);
    receivedArray.push(item);
  }
  return receivedArray;
}

// Remove item from initial array
function removeItemFromTable() {
  let table = document.getElementById("main-table-body").innerHTML;
  console.log(event.target);
  initialData.pop();
  localStorage.removeItem(`Name#0`);
  fillTableOnPage(initialData);
}
