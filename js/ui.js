import {createDb} from '../db.js';

createDb()

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.mobile-demo');
  M.Sidenav.init(menus, {edge: 'left'});
  // add recipe form
  const forms = document.querySelectorAll('.side-nav');
  M.Sidenav.init(forms, {edge: 'left'});
});

// add input fields
const addInput = document.querySelector('#add-input');
const addInputBtn = document.querySelector('#add-input-btn');
const addInputList = document.querySelector('#add-input-list');

// add input event
addInputBtn && addInputBtn.addEventListener('click', function(e) {
  e.preventDefault();
  const div = document.createElement('div');
  div.className = 'row';
  div.appendChild(document.createTextNode(addInput.value));
  const input = document.createElement('input');
  input.className = 'validate col s9';
  input.type = 'text';
  input.id = 'participant';
  input.placeholder = 'Your friend\'s Name';
  const div2 = document.createElement('div');
  div2.className = 'btn red col s3 delete-input-btn';
  const span = document.createElement('span');
  span.appendChild(document.createTextNode('DELETE'));
  div2.appendChild(span);
  div.appendChild(input);
  div.appendChild(div2);
  addInputList.appendChild(div);
  addInput.value = '';
});

// delete input button
const deleteInputBtn = document.querySelector('.delete-input-btn');

// delete input event
addInputList && addInputList.addEventListener('click', function(e) {
  const listLength = document.querySelector('#add-input-list').children.length;
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete-input-btn') && listLength > 2) {
    e.target.parentElement.parentElement.remove();
  }
});
