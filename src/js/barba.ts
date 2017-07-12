/*  Load Plugins / Functions
-------------------------------------------------- */
import * as Barba from "barba.js";
import * as Velocity from "velocity-animate";
import * as Grid from "./grid";
/*  Constants
-------------------------------------------------- */
const $container = <any>document.getElementById("container");
/*  Home View
-------------------------------------------------- */
const HomeView = Barba.BaseView.extend({
	namespace: "home-page",
	onEnterCompleted: function(){
		Grid.init();

        $container.addEventListener("scroll", Grid.scrolling);
	},
	onLeave: function(){
		$container.removeEventListener("scroll", Grid.scrolling);
	}
});
/*  Punk View
-------------------------------------------------- */
const PunkView = Barba.BaseView.extend({
    namespace: "punk",
    onEnterCompleted: function(){
        Grid.init();

        $container.addEventListener("scroll", Grid.scrolling);
    },
    onLeave: function(){
        $container.removeEventListener("scroll", Grid.scrolling);
    }
});
/*  Peace View
-------------------------------------------------- */
const PeaceView = Barba.BaseView.extend({
    namespace: "peace",
    onEnterCompleted: function(){
        Grid.init();

        $container.addEventListener("scroll", Grid.scrolling);
    },
    onLeave: function(){
        $container.removeEventListener("scroll", Grid.scrolling);
    }
});
/*  Barba Inits
-------------------------------------------------- */
HomeView.init();
PunkView.init();
PeaceView.init();
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