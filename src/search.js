import { observe, strip} from './util';

/**
 * 
 * @param {string} text 
 * @param {number} offset 
 */
function createShortResult(text, offset){
	let arbitraryLength = 60;
	const start = (offset - arbitraryLength) >= 0 ?
				  (offset - arbitraryLength) :
				  0;
	const end = (offset + arbitraryLength) <= text.length ?
				(offset + arbitraryLength) :
				text.length;

	let result = text.substring(start, end);

	return strip(result);
}

function removeSearch(){
	let highlights = document.querySelectorAll("mark.bib-sr-mark");
	for (let i = 0; i < highlights.length; i++) {
	  highlights[i].outerHTML = highlights[i].innerHTML;
    }
    let anchors = document.querySelectorAll('a.bib-sr-anchor');
	for (let i = 0; i < anchors.length; i++) {
        anchors[i].parentElement.removeChild(anchors[i]);
    }    
}



export default{
    init(bib){
        observe(bib,'searchTerm',(searchTerm)=>{
            removeSearch();
            bib.searchResults.splice(0, bib.searchResults.length);
            if(searchTerm.length < 4) {return;}
        
            const searchRegExp = new RegExp(searchTerm, "ig");
            let srIndex = 0;
            
            let text = document.body.innerHTML;

            document.body.innerHTML = document.body.innerHTML.replace(
                searchRegExp,
                function  (result) {
                    if(result.indexOf('>') !== -1 || 
                       result.indexOf('<') !== -1
                    ){
                        return result;
                    }
                    const offset = arguments[arguments.length - 2];
                    bib.searchResults.push({
                        id:'sr-' + srIndex,
                        shortResult: createShortResult(text, offset)
                    });
                    return `<a id="bib-sr-${srIndex++}" class="bib-sr-anchor"></a><mark class="bib-sr-mark">${result}</mark>`
                }
            );
        })
    }
}