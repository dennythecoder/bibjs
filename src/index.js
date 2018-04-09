import { observe, strip } from './util';
import search from './search';
import CreateHighlightManager from './highlight';
import unique from 'unique-selector';


const bib = {
	bookmarks:[],
	searchResults:[],
	searchTerm:'',
	scrollY:0,
	createBookmark,
	hightlights:[],
	lastLocation:{}
}


const hm = CreateHighlightManager(bib);




search.init(bib);
window.destroyHighlight = function(guid) {

  
	Dialog.create({
	  title: "Delete highlight?",
	  ok: {
		push:true,
		label:"Yes",
	  },
	  cancel: true
	})
	.then(()=>{
	  store.commit("destroyHighlight", { guid: guid });
	  new HighlightManager(store).markHighlights()
	});
  
  
  };


function saveCurrentScroll(){
	bib.scrollY = window.scrollY;
}


window.onhashchange = function(){
	let hash = window.location.hash;
	if(hash.indexOf('bib-bm') === 1){
		onBookmark(hash);
	}
};


function getChapterOfElement(el){
	document.querySelectorAll('h2').forEach(a=>a.className = 'chapter')
	const chapters = document.getElementsByClassName('chapter');
	if(chapters.length === 0) return document.createElement("div");
	for(let i = 0; chapters.length - 1; i++){
	
		if(chapters[i].offsetTop > el.offsetTop && i > 0){
			return chapters[i-1];
		}
	}
	return chapters[chapters.length-1];
}

/**
 * @returns {HTMLElement}
 */
function getVisibleElement(){
	const center = document.body.clientWidth / 2;
	for(let top = 0; top < 400; top+=10){
	
		let el = document.elementFromPoint(center, top);
		if(el && !(el instanceof HTMLHtmlElement) && el !== document.body){
			return el;
		}
	}
	return document.body;
}


function createBookmark(){
	const mm = (new Date()).getTime(),
		hash = '#bib-bm' + mm,
		scrollY = window.scrollY,
		percentage = scrollY / document.body.offsetHeight;

	const el = getVisibleElement();
	const chapter = getChapterOfElement(el);
	bib.bookmarks.push({
		hash,
		scrollY,
		percentage,
		chapter: chapter.textContent.trim(),
		selector: unique(el)
	})
}


function onBookmark(hash){
	for(let i = 0; i < bib.bookmarks.length; i++){
		if(bib.bookmarks[i].hash === hash){
			window.scrollTo(0, bib.bookmarks[i].scrollY);
			return;
		}
	}
}




if(window){
	window.bib = bib;

}


export default bib;