/*  Load Plugins / Functions
-------------------------------------------------- */
import * as Barba from "barba.js";
import * as Velocity from "velocity-animate";
import * as Grid from "./grid";
/*  Constants
-------------------------------------------------- */
const $container = <any>document.getElementById("container");
const $header = <any>document.getElementById("header");
const $menuItems = <any>document.getElementsByClassName('menu-item');
const $infoFrames = <any>document.getElementsByClassName('info-frame');

/*  Home View
-------------------------------------------------- */
const HomeView = Barba.BaseView.extend({
    namespace: "home-page",
    onEnterCompleted: function(){
        Grid.init();
        
        Grid.punkPeaceHover();
        
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
    onEnter: function(){
        
        $header.className += " reverse";
        
        Array.prototype.slice.call($menuItems).forEach(function(e) {
            e.classList.add('punk');
        })
        
        Array.prototype.slice.call($infoFrames).forEach(function(e) {
            e.classList.add('punk');
        })
        
    },
    onEnterCompleted: function(){
			
				let article = document.getElementsByTagName('article');
			
				article[1].innerHTML = "<h1 class='content-title'>Punk<span class='lil-dash'>|</span></h1>";
			
        Grid.init();
        
        $container.addEventListener("scroll", Grid.scrolling);
    },
    onLeave: function(){
        $container.removeEventListener("scroll", Grid.scrolling);
        $header.classList.remove("reverse");
        
        Array.prototype.slice.call($menuItems).forEach(function(e) {
            e.classList.remove('punk');
        })
        
        Array.prototype.slice.call($infoFrames).forEach(function(e) {
            e.classList.remove('punk');
        })
     
    }
});
/*  Peace View
-------------------------------------------------- */
const PeaceView = Barba.BaseView.extend({
    namespace: "peace",
    onEnterCompleted: function(){
        Grid.init();
        
        let article = document.getElementsByTagName('article');
        article[1].innerHTML = "<h1 style='color: black' class='content-title'>Peace<span class='lil-dash'>|</span></h1>";
        
        $container.addEventListener("scroll", Grid.scrolling);
    },
    onLeave: function(){
        $container.removeEventListener("scroll", Grid.scrolling);
    }
});

/* Poster View
-------------------------------------------------- */


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

        const promise = this.newContainerLoading;

        promise.then(this.fadeOut.bind(this)).then(this.fadeIn.bind(this));
    },
    fadeOut: function(){
        
        return Velocity(this.oldContainer, "fadeOut", { delay: 0, duration: 300 });
    },
    fadeIn: function(){

        let _this = this;
        let $el = _this.newContainer;

        $el.style.visibility = 'visible';
        $el.style.opacity = 0.01;

        $container.scrollTop = 0;

        return Velocity(_this.newContainer, "fadeIn", { delay: 0, duration: 300, complete: function(){

            // ga('set', 'page', location.pathname);
            // ga('send', {
            //     hitType: 'pageview',
            //     page: location.pathname,
            //     title: document.title
            // });
        
            _this.done();
        }});
    }
});
/*  Barba Transition Init
-------------------------------------------------- */
Barba.Pjax.getTransition = function(){
    return HideShowTransition;
};