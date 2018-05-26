$submitButton = $('.save-btn');
$title = $('#title-input').val();
$body = $('#body-input').val();
// $numCards = 0;
$qualityVariable = 'swill';
$bottomBox = $('.bottom-box');

$submitButton.on('click', emptyInputs, makeCard);
// $('button').on('click', yes);
// $('button').on('click', yes);

function yes() {
    console.log('yes');
}

function emptyInputs(event) {
    event.preventDefault();
    if ($title.makeCardval() === "" || $body.val() === "") {
        alert('Please choose valid inputs');
    } else {
            makeCard();
        // numCards++;
        // $bottomBox.prepend(newCard($('#title-input').val(), $('#body-input').val(), qualityVariable)); 
        // console.log(numCards.val());
        
    }  
    // localStoreCard();
    // $('form')[0].reset();
};





// function card(title, body, id) {
//     this.title = title;
//     this.body = body;
//     this.qualVal = 0;
//     this.quality = 'Swill';
//     this.id = Date.now();
// }

function makeCard(event) {
    event.preventDefault();
    $bottomBox.prepend(`
        <div class="card-container">
            <h2 class="title-of-card" contenteditable="true"></h2>
            <button class="delete-button"></button>
            <p class="body-of-card" contenteditable="true"></p>
            <button class="upvote"></button> 
            <button class="downvote"></button> 
            <p class="quality"><span class="qualityVariable"></span></p>
            <hr> 
        </div>`)
    // var card = new card($title.val(), $body.val());

}


// function cardObject() {
//     return {
//         title: $('#title-input').val(),
//         body: $('#body-input').val(),
//         quality: qualityVariable
//     };
// }

// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

// function localStoreCard() {
//     var cardString = JSON.stringify(cardObject());
//     localStorage.setItem('card' + numCards  , cardString);
// }

// function upVote(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;
//     console.log('this works')

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// };
      










