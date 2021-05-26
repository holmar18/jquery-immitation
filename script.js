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
