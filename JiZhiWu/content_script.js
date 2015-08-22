replaceTsaiJengYuan();

function replaceTsaiJengYuan() {
	var elements = document.body.getElementsByTagName("*")
	for(var i = 0; i < elements.length; i++) {
		if(elements[i].hasAttribute("jizhiwued")) continue; // the texts have been replaced
		if(elements[i].tagName == "STYLE" || 
			elements[i].tagName == "SCRIPT") continue; //Skip CSS and scripts found in <body>
		for(var j = 0; j < elements[i].childNodes.length; j++) {
			if(elements[i].childNodes[j].nodeType == Node.TEXT_NODE) {
				try	{
					//Replace 蔡正元 with 祭止兀
					elements[i].childNodes[j].textContent = replaceOccurrences("蔡正元", "祭止兀", elements[i].childNodes[j].textContent);
					//Add the attribute to make sure it won't get replaced again
					elements[i].setAttribute("jizhiwued", "true");
				} catch(err) { 
					console.error("Error: " + err.message);
				}
			}
		}
	}
}

function replaceOccurrences(target, replace, str) {
	var indices = getIndicesOf(target, str);
	for(var i = 0; i < indices.length; i++) {	
		str = remove(str, indices[i], target.length);
		str = insert(str, indices[i], replace);
		if(i + 1 < indices.length)
			indices[i + 1] += (replace.length - target.length) * (i + 1);
	}
	return str;
}

function getIndicesOf(searchStr, str) {
    var startIndex = 0, searchStrLen = searchStr.length;
    var index, indices = [];
	
	searchStr = searchStr.toLowerCase();
	
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {

		indices.push(index);
		
        startIndex = index + searchStrLen;
    }
    return indices;
}

function remove(str, index, count) {
	return str.substring(0, index) + str.substring(index + count);
}

function insert(str, index, replacedWith) {
	if (index > 0)
		return str.substring(0, index) + replacedWith + str.substring(index);
	else
		return replacedWith + str;
}

/*	RE-REPLACE WHEN PAGE UPDATES */
var observer = new MutationObserver(function(mutationRecords) {
	replaceTsaiJengYuan();
});

observer.observe(document.body,
{  // options:
	subtree: true,  // observe the subtree rooted at myNode
	childList: true,  // include information childNode insertion/removals
	attribute: true,  // include information about changes to attributes within the subtree
});