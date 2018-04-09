/**
 * 
 * @param {object} o 
 * @param {string || number} key 
 * @param {function} cb 
 */
function observe(o, key, cb){
	let val = o[key];
	Object.defineProperty(o, key,{
		set(newValue){
			val = newValue;
			cb(val);
		},
		get(){
			return val;
		}
	})	
}


/**
 * @param {string} html 
 * @returns {string}
 */
function strip(html){
	const doc = new DOMParser().parseFromString(html, 'text/html');
	return doc.body.textContent || "";
 }




export {
    observe,
    strip
}