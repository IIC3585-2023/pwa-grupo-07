fetch('navbar.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('navbar').innerHTML = data;
  });

let selectedOption = '';
const options = ['Item 1', 'Item 2', 'Item 3']; // Replace with your array of options

function toggleDropdown() {
  var dropdown = document.getElementsByClassName('dropdown')[0];
  dropdown.classList.toggle('show');
}

window.addEventListener('click', function (event) {

  const dropdown = document.getElementsByClassName('dropdown')[0];
  if (!event.target.matches('.dropdown-toggle')) {
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
});

let selectedButton = 1;

function selectButton(buttonNumber) {
  const overviewSection = document.querySelector('#overview');
  const transactionSection = document.querySelector('#transactions');  
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

