var title = $('#title-input').val();
var body = $('#body-input').val();
var qualityVariable = "swill";

$('.bottom-box').on('click', upvoteCard);
$('.save-btn').on('click', emptyInputs);



function emptyInputs(event) {
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#body-input').val() === "") {
        alert('Please choose valid inputs');
    } else {
        createCard($('#title-input').val(), $('#body-input').val(), qualityVariable, Date.now());
        // $('.bottom-box').prepend(newCard($('#title-input').val(), $('#body-input').val(), qualityVariable, Date.now())); 
        localStoreCard($('#title-input').val(), $('#body-input').val(), qualityVariable, Date.now()); 
        // cardObject();
    }  
};

function Card(title, body, id) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.quality = 'Swill';
}


function createCard( title , body , quality, id) {
    console.log('something is working');
    $('.bottom-box').prepend(`<div id="${id}"class="card-container" contenteditable="true">
                                <h2 class="title-of-card">${title}</h2>
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
    console.log(newCard)
    var cardString = JSON.stringify(newCard);
    localStorage.setItem(id, cardString);  
};

function cardObject() {
    return {
        title: title,
        body: body,
        quality: qualityVariable
    };
}

// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });


// var localStoreCard = function() {
// }

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#body-input').val() === "") {
       return false;
    };  

    // $( ".bottom-box" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#body-input').val(), qualityVariable)); 
    localStoreCard();
    $('form')[0].reset();
});

function upvoteCard(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityVariable;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId, newCardJSON);
    }
   
    else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
};
      









