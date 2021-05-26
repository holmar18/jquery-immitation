# JQuery immitation

```Javascript
// JQuery uses $ but this uses double underscore __
// (1) It can be changed, by changing the line below.
globalObj.__ = query;

// (2) Query selector, get every element with class/id/tag
var paragraphs = __('p');
console.log(paragraphs.getLength());


// (3) Methods are chainable
 var parent = __('#password').parent();
 console.log(parent); // returns: form.father-toggler


// (4) Get parent of an element 
__(‘someSelector’).parent(‘someOtherSelector’ : optional)
var parent = __('#password').parent();
var parent = __('#password').parent('form);


// (5) Get grandparent of an element  
__(‘someSelector’).grandParent(‘someOtherSelector’ : optional)
var grandparent =  __('#password').grandparent();
console.log(grandparent); // returns: #grandparent

var idGrandParent = __('#password').grandparent("#grandfather");
console.log(idGrandParent); // returns: #grandparent

var emptyGrandparent = __('#password').grandparent("#unknownid");
console.log(emptyGrandparent); // returns: []


// (6)  __(‘someSelector’).ancestor(‘someOtherSelector’). This get
// the first element which matches the query above this element which is // considered an ancestor
var ancestor = __('#password').ancestor('#some-div');
var rootElem = __('#password').ancestor('.root');
var ancestorSib = __('#password').ancestor("#unknownid");

// (7) Click handler
__('#password').onClick(function(evt){ console.log(evt.target.value); });
__('#password').onClick();


// (8) Insert text element
__(".the-appender").insertText('To be');


// (9) append new HTML to an element
__('.the-appender').append(document.createElement('p').appendChild(document.createTextNode("CloudOne"))); // CloudOne appears on the screen

__('.the-appender').append('<p>We are awesome</p>'); // We are awesome appears on the screen

__('.the-appender').append(document.createElement('p').appendChild(document.createTextNode("i amd dff"))); // I amd dff appears on the screen


// (10) prepend new HTML to an element
__('.the-prepender').prepend("<p>Horse<p>"); // Horse appears on the screen

__('.the-prepender').prepend(document.createElement('p').appendChil(document.createTextNode("HorseOne"))); // HorseOne appears on the screen

__('.the-prepender').prepend('<p>Chilly Con Carne </p>'); // Chilly con Carne  appears on the screen

__('.the-prepender').prepend(document.createElement('p').appendChild(document.createTextNode("Kaka er góð") // Kaka er góð appears on the screen));


// (11)  delete an element
__('.some-div').delete();

// (12)  e jQuery ajax method HTTP request
__.ajax({
    url: 'https://serene-island-81305.herokuapp.com/api/200',
    method: 'GET',
    timeout: 2,
    data: {},
    headers: {},
    success: function (resp) {
        console.log(`Success with status code ${resp}`)
    },
    fail: function(error) {
        console.log(`Fail with status code ${error}`)
    },
    beforesend: function(xhr) {
        console.log(`This text triggers before "${xhr}"`)
    }
});


// (13) method css() changes the direct css styles on the element.
__('h2').css('color', 'blue');


// (14) toggles a css class for an element
__('#some-div').toggleClass('.lala');


// (15) submit handler for forms, triggers on form submit
__('.fatherToggler').onSubmit(function (evt) {
    var nodes = evt.currentTarget.childNodes
    for (var i =0 ; i < nodes.length; i++) {
        if (nodes[i].nodeType == 1)
            if (nodes[i].value != 'Submit')
            console.log(nodes[i].value)
    }
});


// (16) input handler for input tags, triggered whenever the user modifies the content of the input.
__('.fatherToggler').onInput(function (evt) { // Whenever you write something in the input field it appears in console.log
    console.log(evt.target.value);
});
```