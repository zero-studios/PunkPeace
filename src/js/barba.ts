import * as Barba from "barba.js";
import * as Func from "./functions";
import * as Velocity from "velocity-animate";

const $body = document.body;
const $container = <any>document.getElementById("container");
const $barba = document.getElementById("barba-wrapper");
const gww = Func.getViewport().width;
const gwh = Func.getViewport().height;

// on load
window.onload = function(){

}


const HomeView = Barba.BaseView.extend({
	namespace: "home",
	onEnterCompleted: function(){
		
	},
	onLeave: function(){
		
	}
});



// set inits
HomeView.init();
// start barba
Barba.Pjax.start();
// barba page transition
var HideShowTransition = Barba.BaseTransition.extend({
    start: function(){
        this.newContainerLoading.then(this.fadeOut.bind(this)).then(this.fadeIn.bind(this));
    },
    fadeOut: function(){
    	
    	Velocity(this.oldContainer, "fadeOut", { delay: 0, duration: 400 });
    },
    fadeIn: function(){

    	$container.scrollTop = 0;

    	Velocity(this.newContainer, "fadeIn", { delay: 0, duration: 400 });

    	this.done();
    }
});
// barba set transition
Barba.Pjax.getTransition = function(){
    return HideShowTransition;
};