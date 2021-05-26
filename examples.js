
// Get Length
var paragraphs = __('p');
console.log(paragraphs.getLength());


// 3 - Chainable

// 4 - Parent
console.log('Parent Function');
var parent = __('#password').parent();
console.log(parent); // returns: form.father-toggler
var form_parent = __('#password').parent('form');
console.log(form_parent); // returns: form.father-toggler
var root_parent = __(".root").parent("#unknown");
console.log(root_parent); // returns: []

// 5 - Grandparent
console.log('Grandparent Function');
var grandparent =  __('#password').grandparent();
console.log(grandparent); // returns: #grandparent
var idGrandParent = __('#password').grandparent("#grandfather");
console.log(idGrandParent); // returns: #grandparent
var emptyGrandparent = __('#password').grandparent("#unknownid");
console.log(emptyGrandparent); // returns: []

// 6 - Ancestor
console.log('Ancestor Function');
var ancestor = __('#password').ancestor('#some-div');
console.log(ancestor); 
var rootElem = __('#password').ancestor('.root');
console.log(rootElem); 
var ancestorSib = __('#password').ancestor("#unknownid");
console.log(ancestorSib); 

// 7 - Onclick
console.log('On Click');
__('#password').onClick(function(evt){
    console.log(evt.target.value);
});
__('#password').onClick();

// 8 - Insert Text or Overwrite
console.log('Insert Text');
__(".the-appender").insertText('To be');  // To be appears on the screen

// // 9 - Append
console.log('Append');
__('.the-appender').append("<p>Cloud<p>"); // Cloud appears on the screen
__('.the-appender').append(document.createElement('p').appendChild(document.createTextNode("CloudOne"))); // CloudOne appears on the screen
__('.the-appender').append('<p>We are awesome</p>'); // We are awesome appears on the screen
__('.the-appender').append(
    document.createElement('p')
        .appendChild(
           document.createTextNode("i amd dff") // I amd dff appears on the screen
        )
    );

// // 10 - Prepend
console.log('Prepend');
__('.the-prepender').prepend("<p>Horse<p>"); // Horse appears on the screen
__('.the-prepender').prepend(document.createElement('p').appendChild(document.createTextNode("HorseOne"))); // HorseOne appears on the screen
__('.the-prepender').prepend('<p>Chilly Con Carne </p>'); // Chilly con Carne  appears on the screen
__('.the-prepender').prepend(
    document.createElement('p')
        .appendChild(
            document.createTextNode("Kaka er góð") // Kaka er góð appears on the screen
        )
    );


// // 11 - Delete
console.log('Delete');
console.log(__(".the-appender h2").delete()); // returns: undefined, cause it's gone

///////////////////////////////////////////////////////////////
// 12 - Ajax
//Test með  status GET og status code 200 án Headers
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

// Test með GET og failed status code 404 án headers
__.ajax({
    url: 'https://serene-island-81305.herokuapp.com/api/404',
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

// Test með  status GET og status code 200 með Headers ATH endar blocked by CORS Policy
__.ajax({
    url: 'https://serene-island-81305.herokuapp.com/api/200',
    method: 'GET',
    timeout: 2,
    data: {},
    headers: [
        {'Authorization': 'my-secret-key'}
    ],
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

// Test með GET og failed status code 403 án headers
__.ajax({
    url: 'https://serene-island-81305.herokuapp.com/api/403',
    method: 'GET',
    timeout: 0,
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

////////////////////////////////////////////////////////////////////

// // 13 - Css
console.log('CSS');
__('h2').css('color', 'blue'); // H2 turns blue


// 14 - Toggle Class
console.log('Toggle Class');
__('#some-div').toggleClass('.lala');
__('#some-div').toggleClass('.lala');


// 15 - Submit
console.log('OnSubmit');
__('.fatherToggler').onSubmit(function (evt) {
    var nodes = evt.currentTarget.childNodes
    for (var i =0 ; i < nodes.length; i++) {
        if (nodes[i].nodeType == 1)
            if (nodes[i].value != 'Submit')
            console.log(nodes[i].value)
    }
});

// 16 - On-input
console.log('On Input');
__('.fatherToggler').onInput(function (evt) { // Whenever you write something in the input field it appears in console.log
    console.log(evt.target.value);
});