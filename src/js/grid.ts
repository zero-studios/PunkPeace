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
	let article = document.getElementsByTagName('article');

	if(Func.getViewport().width <= 600){
		offset = 1;
	} else if(Func.getViewport().width > 600 && Func.getViewport().width <= 1100){
		offset = 2;
	}
    
	// Load first block
	posterLoad(0, offset);
    
	// Fade header content on poster hover
	fadeHeaderContent(article[0], article[2]);
	
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


//FADE OUT CENTER INTRO TEXT ON HOVER OF POSTERS 1 & 2
function fadeHeaderContent(...elems) {
    
    let article = document.getElementsByTagName('article');
	
    elems.forEach(function(e){
        
        e.addEventListener('mouseover', function() {
            article[1].style.opacity = '0';
        })
        
        e.addEventListener('mouseleave', function() {
            article[1].style.opacity = '1';
        })
        
    })
	
}

//HOVER STATES FOR PUNK & PEACE LINK IN CENTER INTRO TEXT
export const punkPeaceHover = () => {
    
		let gridWrapper = document.getElementsByClassName('grid-wrapper')[0];
    let punkLink = document.getElementById('punk-link');
    let peaceLink = document.getElementById('peace-link');
    let midContent = document.querySelector('.grid-wrapper .non-frame .content p');
    
	  //HOVER on PUNK  
    punkLink.addEventListener('mouseenter', () => {
        gridWrapper.classList.add('alt');
        midContent.classList.add('punkHover');
        peaceLink.classList.add('punkHover');
				midContent.classList.remove('peaceHover');
				punkLink.classList.remove('peaceHover');
    })
	
		midContent.addEventListener('mouseleave', () => {
        gridWrapper.classList.remove('alt');
        midContent.classList.remove('punkHover');
        peaceLink.classList.remove('punkHover');
		})

	
    //HOVER on PEACE
    peaceLink.addEventListener('mouseenter', () => {
        midContent.classList.add('peaceHover');
				punkLink.classList.add('peaceHover');
				gridWrapper.classList.remove('alt');
        midContent.classList.remove('punkHover');
        peaceLink.classList.remove('punkHover');
    })
	
		midContent.addEventListener('mouseleave', () => {
        midContent.classList.remove('peaceHover');
				punkLink.classList.remove('peaceHover');
    })
	
	
    
}
