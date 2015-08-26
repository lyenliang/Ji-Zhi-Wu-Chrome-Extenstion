// 蔡正元筆劃太多了，一起把facebook的蔡正元換成祭止兀吧！

var taget = "蔡正元";
var replacedWith = "祭止兀";

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
					// Replace 蔡正元 with 祭止兀
					elements[i].childNodes[j].textContent = replaceOccurrences(elements[i].childNodes[j].textContent, taget, replacedWith);
					// Mark the text so that it won't get replaced again
					elements[i].setAttribute("jizhiwued", "true");
				} catch(err) { 
					console.error("Error: " + err.message);
				}
			}
		}
	}
}

function replaceOccurrences(str, target, replacedWith) {
	var indices = getIndicesOf(target, str);
	for(var i = 0; i < indices.length; i++) {
		str = remove(str, indices[i], target.length);
		str = insert(str, indices[i], replacedWith);
		// Correct next index length, in case that replacedWith.length != target.length
		if(i + 1 < indices.length)
			indices[i + 1] += (replacedWith.length - target.length) * (i + 1);
	}
	return str;
}

function getIndicesOf(target, str) {
    var startIndex = 0, searchStrLen = target.length;
    var index, indices = [];
	
    while ((index = str.indexOf(target, startIndex)) > -1) {

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

// Re-replace when the page updates
var observer = new MutationObserver(function(mutationRecords) {
	replaceTsaiJengYuan();
});

observer.observe(document.body,
{  // options:
	subtree: true,    // Set to true if mutations to not just target, but also target's descendants are to be observed.
	childList: true,  // Set to true if additions and removals of the target node's child elements (including text nodes) are to be observed.
	attribute: true,  // Set to true if mutations to target's attributes are to be observed.
});