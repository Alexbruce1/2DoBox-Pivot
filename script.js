$(document).ready(loadSavedCards)
$('.save-btn').on('click', emptyInputs);
$('#title-input').on('keyup', disableButton);
$('#body-input').on('keyup', disableButton);
$('.bottom-box').on('keyup', '.title-of-card', updateEditedTitle);
$('.bottom-box').on('keyup', '.body-of-card', updateEditedBody);
$('.bottom-box').on('click', '.delete-button', deleteCard);
$('.bottom-box').on('click', '.upvote', upvoteCard);
$('.bottom-box').on('click', '.downvote', downvoteCard);
$('.bottom-box').on('click', '.upvote', updateCardQuality);
$('.bottom-box').on('click', '.downvote', updateCardQuality);
$('.bottom-box').on('click', '.completed-button', completeTask);
$('.save-btn').on('click', emptyInputs);

function disableButton() {
    var saveButton = $('.save-btn');
    if ($('#title-input').val() !== "" && $('#body-input').val() !== "") {
        $('.save-btn').removeAttr('disabled');
    } else if ($('#title-input').val() === "" || $('#body-input').val() === "") {
        $('.save-btn').attr("disabled", true);
    }
}

function Card(title, body, quality) {
    this.title = title;
    this.body = body;
    this.quality = 'Normal';
    this.id = Date.now();  
}

function emptyInputs(e) {
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#body-input').val() === "") {
        alert('Please choose valid inputs');
    } else {
        prependCard();
    }  
};

function prependCard() {
    var newCard = new Card($('#title-input').val(), $('#body-input').val(), 'Normal')
    createCard(newCard.title, newCard.body, newCard.quality, newCard.id);
    localStorage.setItem(newCard.id, JSON.stringify(newCard)); 
    $('form')[0].reset();
}

function createCard(title , body , quality, id) {
    $('.bottom-box').prepend(`<div data-set="${id}" id="${id}"class="card-container">
                                <h2 class="title-of-card" contenteditable="true">${title}</h2>
                                <button class="delete-button"></button>
                                <p class="body-of-card" contenteditable="true">${body}</p>
                                <button class="upvote"></button>
                                <button class="downvote"></button> 
                                <p class="quality">quality:
                                    <span class="qualityVariable">${quality}</span>
                                </p>
                                <hr> 
                            </div>`
    );
};

function localStoreCard(title, body, quality, id) {
    var ideaTitle = $('#title-input').val();
    var ideaBody = $('#body-input').val();
    var newCard = new Card(ideaTitle, ideaBody);
    var cardString = JSON.stringify(newCard);
    localStorage.setItem(id, cardString); 
    var cardKey = id;
    return cardKey;
};

function updateCardQuality(e) {
    var qualityWrapper = $(event.target).siblings('.quality');
    var qualityVariable = qualityWrapper.children('.qualityVariable');
    var key = $(event.target).closest('.card-container')[0].dataset.set;
    var storedCard = JSON.parse(localStorage.getItem(key));
    storedCard.quality = qualityVariable.text();
    var stringifiedCard = JSON.stringify(storedCard);
    localStorage.setItem(key, stringifiedCard);
}

function loadSavedCards() {
    for (var i = 0; i < localStorage.length; i++) {
        var storedCard = localStorage.getItem(localStorage.key(i));
        var parsedCard = JSON.parse(storedCard);
        createCard(parsedCard.title, parsedCard.body, parsedCard.quality, parsedCard.id);
    }
    var localStorageArray = Object.keys(localStorage);
}

function deleteCard (e) {
    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].index;
    var key = $(event.target).closest('.card-container')[0].dataset.set;
    $(event.target).closest('.card-container').remove();
    localStorage.removeItem(key);
}

function upvoteCard(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;
    if (currentQuality === 'None') {
        qualityVariable = 'Low';
    } else if (currentQuality === 'Low') {
        qualityVariable = 'Normal';
    } else if (currentQuality === 'Normal') {
        qualityVariable = 'High';
    } else if (currentQuality === 'High') {
        qualityVariable = 'Critical';
    }
    $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
}

function downvoteCard(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;
    if (currentQuality === 'Critical') {
        qualityVariable = 'High';
    } else if (currentQuality === 'High') {
        qualityVariable = 'Normal';
    } else if (currentQuality === 'Normal') {
        qualityVariable = 'Low';
    } else if (currentQuality === 'Low') {
        qualityVariable = 'None';
    }
    $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
}