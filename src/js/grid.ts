/*  Load Plugins / Functions
-------------------------------------------------- */
import * as Func from "./functions";
/*  Constants
-------------------------------------------------- */
const $container = document.getElementById("container");
/*  Init
-------------------------------------------------- */
export const init = function(){

	let offset = 3; // posters to load at a time
	let posters = document.getElementsByClassName("poster-frame");

	if(Func.getViewport().width <= 600){
		offset = 1;
	} else if(Func.getViewport().width > 600 && Func.getViewport().width <= 1100){
		offset = 2;
	}

	// Load first block
	posterLoad(0, offset);
}
/*  Scroll
	
	This is to run the home page load on scroll

-------------------------------------------------- */
export const scrolling = function(){

	let s = this.scrollTop;
	let offset = 3; // posters to load at a time
	let posters = document.getElementsByClassName("poster-frame");

	if(Func.getViewport().width <= 600){
		offset = 1;
	} else if(Func.getViewport().width > 600 && Func.getViewport().width <= 1100){
		offset = 2;
	}

	let blocks = Math.ceil(posters.length / offset); // number of lazy loading blocks on page

	for(let i = 1; i < blocks; i++){ // start i at 1, to avoid reloading first offset block

		let poster = posters[(offset * i) - 1] as any;
		let trigger = poster.offsetTop - Func.getViewport().height; // offset for when loading triggers

		if(s >= trigger){
			posterLoad(offset * i, offset);
		}
	}

}
/*  Poster Load
-------------------------------------------------- */
function posterLoad(start, count){

	let posters = document.getElementsByClassName("poster-frame");
	let nonposters = document.getElementsByClassName("non-frame");

	if(!Func.hasClass(posters[start], "loading")){
		for(let i = start; i < start + count; i++){
			if(posters[i]){
				posters[i].className += " loading";
				nonposters[i].className += " loading";

				let iframe = posters[i].querySelector("iframe");

				iframe.src = posters[i].getAttribute("data-url");
				iframe.onload = function(){
					// transition in iframe after load
					posters[i].className += " loaded";
					nonposters[i].className += " loaded";
				}
			} else {
				// exit loop if there are no more posters
				return;		
			}
		}
	}
}

//ADD MENU LINKS

let aboutLink = document.querySelector('li#menu-item-13');

aboutLink.innerHTML = 'ABOUT<span style="display: inline-block; transform: rotate(90deg)"	>?</span> '
