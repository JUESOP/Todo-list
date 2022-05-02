'use strict';

let itemList = [];
let inputButton = document.querySelector('.input_button');
inputButton.addEventListener('click', addItem);

let checkList = document.querySelector(".item_list");
checkList.addEventListener('click', e => {
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
    }
}); 


function addItem() {
    let item = document.querySelector('.item').value;
    if(item != "") {  //값이 있을 때
        itemList.push(item);
        document.querySelector('.item').value = '';
        document.querySelector('.item').focus();
    }
    showList();
}

function showList() {
    let list = '<ul>'
    for (let i in itemList) {
        list += "<li>" + itemList[i] + "<span class='close' id=" + i + ">" + "\u00D7" + "</span></li>";
    }
    list += '</ul>';
    checkList.innerHTML = list;

    let deleteButtons = document.querySelectorAll('.close');
    for(let i in deleteButtons) {
        deleteButtons[i].addEventListener('click', deleteItem);
    }
}

function deleteItem() {
    let id = this.getAttribute("id");
    itemList.splice(id, 1); //배열에서 객체 제거, id 인덱스부터 1개 제거
    showList();
}