$(document).ready(loadSavedCards)
$('.save-btn').on('click', emptyInputs);
$('#title-input').on('keyup', disableButton);
$('#body-input').on('keyup', disableButton);
$('.bottom-box').on('keyup', '.title-of-card', updateEditedTitle);
$('.bottom-box').on('keyup', '.body-of-card', updateEditedBody);
$('.bottom-box').on('click', '.delete-button', deleteCard);
$('.bottom-box').on('click', '.upvote', upvoteCard);
$('.bottom-box').on('click', '.downvote', downvoteCard);
$('.bottom-box').on('click', '.completed-button', completeTask);

var qualityVariable = "Normal";

function disableButton() {
    var saveButton = $('.save-btn');
    if ($('#title-input').val() !== "" && $('#body-input').val() !== "") {
        $('.save-btn').removeAttr('disabled');
    } else if ($('#title-input').val() === "" || $('#body-input').val() === "") {
        $('.save-btn').attr("disabled", true);
    }
}
// $('.delete-button').on('click', )
$('.save-btn').on('click', emptyInputs);
$(document).ready(loadSavedCards)



function Card(title, body, quality) {
    this.title = title;
    this.body = body;
    this.quality = 'Normal';
    this.id = Date.now();
    
}


function emptyInputs(event) {
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#body-input').val() === "") {
        alert('Please choose valid inputs');
    } else {
        var newCard = new Card($('#title-input').val(), $('#body-input').val(), qualityVariable)
        createCard(newCard.title, newCard.body, newCard.quality, newCard.id);
        console.log(newCard.id)
        localStorage.setItem(newCard.id, JSON.stringify(newCard)); 
        $('form')[0].reset();
    }  
};


function createCard(title , body , quality, id) {
    $('.bottom-box').prepend(`<div data-set="${id}" id="${id}"class="card-container">
                                <h2 class="title-of-card" contenteditable="true">${title}</h2>
                                <button class="delete-button"></button>
                                <p class="body-of-card" contenteditable="true">${body}</p>
                                <button class="upvote"></button>
                                <button class="downvote"></button> 
                                <p class="quality">quality:
                                    <span class="qualityVariable">${quality}</span>
                                    <button class="completed-button">Completed Task</button>
                                </p>
                                <hr> 
                            </div>`
    );
};

function updateEditedTitle() {
    var ideaTitle = $('.title-of-card').text;
    console.log(ideaTitle);
}

function updateEditedBody() {
    var ideaBody = $('#body-input').val();
    console.log('body');
}

function localStoreCard(title, body, quality, id) {
    var ideaTitle = $('#title-input').val();
    var ideaBody = $('#body-input').val();
    var newCard = new Card(ideaTitle, ideaBody);
    var cardString = JSON.stringify(newCard);
    localStorage.setItem(id, cardString); 
    var cardKey = id;
    return cardKey;
};

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
    console.log(key);
    $(event.target).closest('.card-container').remove();
    localStorage.removeItem(key);
}

function completeTask() {
    console.log('yes')
}


// function cardObject() {
//     return {
//         title: title,
//         body: body,
//         quality: qualityVariable
//     };
// }

// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });




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
    saveVote(qualityVariable);
}

function saveVote(qualityVariable) {
    // var cardHTML = $(event.target).closest('.card-container');
    // var cardHTMLId = cardHTML[0].id;
    // var parsedQuality = JSON.parse(qualityVariable)

    // // var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    // // var cardObjectInJS = JSON.stringify(cardObjectInJSON);
    // // var newCardJSON = JSON.parse(cardObjectInJS);


    // localStorage.setItem(cardHTMLId, qualityVariable);
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
    saveVote();
}







