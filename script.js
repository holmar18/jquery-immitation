(function (globalObj) {

    function MakeBelieveElement(nodes) {
        this.nodes = nodes;
    }

    // Dæmi með að fá lengd á hversu mörg element eru i listanum
    MakeBelieveElement.prototype.getLength = function() {
        return this.nodes.length;
    }

    // Number 2
    function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    }

    // Number 1
    globalObj.__ = query;

    // Number 3
    // MakeBelieveElement.prototype  að gera prototyper er keðjanlegt.

    // Number 4
    MakeBelieveElement.prototype.parent = function(selector) {
        var nodeList = [];
            for (var i=0; i < this.nodes.length; i++) {
                if (this.nodes[i].parentNode.matches(selector)) {
                    nodeList.push(this.nodes[i].parentNode);
                }
                if (selector == undefined) {
                    nodeList.push(this.nodes[i].parentNode);
                }
            }
            return nodeList;
        }

    // Number 5
    MakeBelieveElement.prototype.grandparent = function (selector) {
        var nodeList = [];
            for(var i=0; i < this.nodes.length; i++){
                if(this.nodes[i].parentNode.parentNode.matches(selector)){
                    nodeList.push(this.nodes[i].parentNode.parentNode);
                }
                if (selector == undefined) {
                    nodeList.push(this.nodes[i].parentNode.parentNode);
                }
            }
        return nodeList
    }

    // Number 6
    // This funcion should be used if we consider the ancestor is a grand-grandfather of the div 
    /*MakeBelieveElement.prototype.ancestor = function (selector) {
        var nodeList = [];
            for(var i=0; i < this.nodes.length; i++){
                if(this.nodes[i].parentNode.parentNode.parentNode.matches(selector)){
                    nodeList.push(this.nodes[i].parentNode.parentNode.parentNode);
                }
                if (selector == undefined) {
                    nodeList.push(this.nodes[i].parentNode.parentNode.parentNode);
                }
            }
        return nodeList
    }*/ 
    MakeBelieveElement.prototype.ancestor = function (selector) {
        //this should be used if we consider the ansestors to be every element between the elements picked.
        var top_selector = document.querySelector(selector)
        for (let item of this.nodes) {
            var parent = item.parentElement
            while (parent !== null) {
                if (parent === top_selector) {
                    var ancestors = parent
                }
                if (parent.parentElement === null) {
                    parent = null;
                }
                else {
                    parent = parent.parentElement
                }
            }
        }
        return ancestors
    }

    // Number 7
    MakeBelieveElement.prototype.onClick = function(event){
        for(var i=0; i < this.nodes.length; i++){
            this.nodes[i].addEventListener("click", event);
        }
    };


    // Number 8
    MakeBelieveElement.prototype.insertText = function(text){
        for(var i=0; i < this.nodes.length; i++){
            this.nodes[i].innerHTML = text
        }
    };

    // Number 9
    MakeBelieveElement.prototype.append = function(text_or_html){
        var newelem
        if (typeof text_or_html == "string"){
            var type = text_or_html.match(/<[^>]*>/)[0]
            var stripped = text_or_html.replace(/<[^>]*>/g,"")
            newelem = document.createElement(type[1])
            var t = document.createTextNode(stripped)
            newelem.appendChild(t)
            this.nodes[0].appendChild(newelem)
        }
        else{
            newelem = text_or_html.parentNode
        }
        this.nodes[0].appendChild(newelem)

    };


//Number 10
    MakeBelieveElement.prototype.prepend = function(text_or_html){
        var insertBfr = this.nodes[0].childNodes[0]
        var newelem
        if (typeof text_or_html == "string"){
            var type = text_or_html.match(/<[^>]*>/)[0]
            var stripped = text_or_html.replace(/<[^>]*>/g,"")
            newelem = document.createElement(type[1])
            var strippedEle = document.createTextNode(stripped)
            this.nodes[0].insertBefore(strippedEle, insertBfr)
        }
        else{
            newelem = text_or_html.parentNode
        }
        this.nodes[0].insertBefore(newelem, insertBfr)
    }

    // Number 11
    MakeBelieveElement.prototype.delete = function(selector) {
        var arrayOfRemovables = this.parent(selector)
        console.log(arrayOfRemovables)
        for (var i = 0; i < this.nodes.length; i++) {
            arrayOfRemovables[i].removeChild(this.nodes[i]);
        }
    }


    // Number 12
    __.ajax = function(data) {

        function beforeSender() { return "This text should appear before" }

        var request = new XMLHttpRequest();

        // Þetta spagetí fyrir neðan er bara til að eiga við að það geta verið gögn og kanski ekki.
        var defaulData = {
            url: data.url,
            method: (!data.method ? 'GET' : data.method),
            timeout: ((data.timeout >= 0) ? data.timeout*1000 : 0),
            data: data.data,
            headers: (Object.keys(data.headers).length > 0 ? data.headers : {})
        }

        request.onload = function() {
            // status code 200 er success ef rosponse tekst þá keyrist þessi
            if (request.status == 200) {  data.success(request.status); console.log("The response text: ", JSON.stringify(request.responseText))}
            // 404 er failed
            else if (request.status == 404 || request.status == 400 || request.status == 401 || request.status == 403) 
                { data.fail(request.status); console.log("The response text: ", JSON.stringify(request.responseText))}
        }
        // Herna er opnað fyrir requestið með "GET;POST ETC." og URL
        request.open(defaulData.method, defaulData.url);

        // Ef headerinn er ekki tómur
        if (defaulData.headers != undefined && Object.keys(defaulData.headers).length > 0) { 
            request.setRequestHeader(Object.keys(defaulData.headers[0]), defaulData.headers[Object.keys(defaulData.headers)[0][0]].Authorization)
        }

        data.beforesend(beforeSender())

        // Setja timeout
        request.timeout = defaulData.timeout;
        // herna er timout function sem virkar en hún er ekki set á requestið eins og þessi fyrir neðan sem er eins og hun se ekki að virak
        setTimeout(function(){ console.log(`The timout was: ${defaulData.timeout}`); }, defaulData.timeout);
        // ÞETTA á að keyra þegar timout er
        request.ontimeout = function (e) { console.log(`The timout was: ${defaulData.timeout}`); }

        request.send()
    }


    // Number 13
    MakeBelieveElement.prototype.css = function(value, attribute) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].setAttribute("style", `${value}: ${attribute}`)
        }
    }

    MakeBelieveElement.prototype.toggleClass = function(classAddRemove) {
        nodot = classAddRemove.split('.').join("");
        for(var i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].classList.contains(nodot)){
                this.nodes[i].classList.remove(nodot)
            }
            else{
                this.nodes[i].classList.add(nodot)
            }
        }
    }

    // Number 15
    MakeBelieveElement.prototype.onSubmit = function(event) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener("submit", event);
        }
    }


    // Number 16
    MakeBelieveElement.prototype.onInput = function(event) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener("input", event);
        }
    }


})(window);


// Console.log for all the functions


// Get Length
// console.log('Get length');
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




