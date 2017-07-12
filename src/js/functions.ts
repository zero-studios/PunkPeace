/* 	Store any predefined global functions in here, 
	useful for rewriting your favorite jquery function
	into a vanilla JS function.
-------------------------------------------------- */
/* 	Has Class
	
	Returns true/false if element has classname.
	
-------------------------------------------------- */
export const hasClass = function(element, cls){
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
/* 	Vanilla .eq()
	
	Returns element by index.

	Usage: eq.call(arrayOfElements, index);
	
-------------------------------------------------- */
export const eq = function(index){
   if(index >= 0 && index < this.length)
    return this[index];
   else
    return -1;
}
/* 	Get Viewport

	returns the native height and width of the
	browser viewport.
	
-------------------------------------------------- */
export const getViewport = function(){
  let e = <any>window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}
/* 	Lock page scroll

	For when you really don't want users to be able to
	scroll down the main content of the page, like
	when an overlay is up, or a menu is open. Stored
	in the css class .locked on the body tag.
	
-------------------------------------------------- */
export const lockPageScroll = function(boolean = true){
	switch(boolean){
		case false:
			// unlock
			document.body.classList.remove("locked");

			break;

		default:
			// lock
			document.body.className += " locked";

			break;
	}
}
/* 	Image Preload
	
	Assumes you're loading a background image unless
	you set isImgTag to true. Store preloaded image
	in a data attribute according to size.

	(e.g. data-img-large or data-img-mobile)

-------------------------------------------------- */
export const preloadImage = function(element, size, isImgTag = false){

	let imgURL = element.getAttribute("data-img-" + size);

	switch(isImgTag){
		case true:
			// img tag
			element.src = imgURL;
			break;

		default:
			// background-image
			element.style.backgroundImage = 'url(' + imgURL + ')';

			break;
	}
}