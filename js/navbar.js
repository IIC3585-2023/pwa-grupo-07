fetch('navbar.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('navbar').innerHTML = data;
  });

let overviewSection;
let transactionSection;

let selectedOption = '';
const options = ['Item 1', 'Item 2', 'Item 3']; // Replace with your array of options

function toggleDropdown() {
  var dropdown = document.getElementsByClassName('dropdown')[0];
  dropdown.classList.toggle('show');
}

window.addEventListener('click', function (event) {
  overviewSection = document.querySelector('#overview');
  transactionSection = document.querySelector('#transactions');  

  const dropdown = document.getElementsByClassName('dropdown')[0];
  if (!event.target.matches('.dropdown-toggle')) {
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
});

function createButtons() {
  const dropdownMenu = document.getElementById('dropdownMenu');

  for (let i = 0; i < options.length; i++) {
    const button = document.createElement('button');
    button.textContent = options[i];
    button.addEventListener('click', function () {
      selectOption(options[i]);
    });
    dropdownMenu.appendChild(button);
  }
}

function selectOption(option) {
  selectedOption = option;
  document.getElementsByClassName('dropdown-toggle').textContent = option;
  console.log('Selected option:', selectedOption);
}

let selectedButton = 1;

function selectButton(buttonNumber) {
  if (buttonNumber !== selectedButton) {
    // Remove 'selected' class from previously selected button
    document
      .getElementById(`button${selectedButton}`)
      .classList.remove('selected');

    // Add 'selected' class to the newly selected button
    document.getElementById(`button${buttonNumber}`).classList.add('selected');

    selectedButton = buttonNumber;
    console.log('Selected button:', selectedButton);
  }
  if(selectedButton == 1){
    overviewSection.style.display = 'block';
    transactionSection.style.display = 'none';
  }
  if(selectedButton == 2){
    transactionSection.style.display = 'block';
    overviewSection.style.display = 'none';

  }
}

createButtons();
selectOption(options[0]);
