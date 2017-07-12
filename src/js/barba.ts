/*  Load Plugins / Functions
-------------------------------------------------- */
import * as Barba from "barba.js";
import * as Velocity from "velocity-animate";
/*  Constants
-------------------------------------------------- */
const $container = <any>document.getElementById("container");
/*  Import Home
-------------------------------------------------- */
import * as Home from "./home";
/*  Home View
-------------------------------------------------- */
const HomeView = Barba.BaseView.extend({
	namespace: "home-page",
	onEnterCompleted: function(){
		Home.init();

        $container.addEventListener("scroll", Home.scrolling);
	},
	onLeave: function(){
		$container.removeEventListener("scroll", Home.scrolling);
	}
});
/*  Barba Inits
-------------------------------------------------- */
HomeView.init();
/*  Barba Start
-------------------------------------------------- */
Barba.Pjax.start();
/*  Barba Transition Define
-------------------------------------------------- */
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
/*  Barba Transition Init
-------------------------------------------------- */
Barba.Pjax.getTransition = function(){
    return HideShowTransition;
};