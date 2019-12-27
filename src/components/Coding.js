import React, { Component } from 'react';
import '../css/EventsDescription.css';
import '../css/EventsDescriptionComponent.css';
import adope from '../img/coding/adope.png';
import codeforfun from '../img/coding/codeforfun.png';
import codefiesta from '../img/coding/codefiesta.png';
import dynamics from '../js/vendor/dynamics.min.js';
import define from "../js/vendor/dynamics.min.js";

class Coding extends Component{
    
    componentDidMount(){  

        var bodyEl = document.querySelector('.eventsdescription'),
        docElem = window.document.documentElement,
        docWidth = Math.max(bodyEl.scrollWidth, bodyEl.offsetWidth, docElem.clientWidth, docElem.scrollWidth, docElem.offsetWidth),
        docHeight = Math.max(bodyEl.scrollHeight, bodyEl.offsetHeight, docElem.clientHeight, docElem.scrollHeight, docElem.offsetHeight);
    
        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }
    
        function extend( a, b ) {
            for( var key in b ) { 
                if( b.hasOwnProperty( key ) ) {
                    a[key] = b[key];
                }
            }
            return a;
        }
    
        /**
         * Circle Slideshow
         */
        function CircleSlideshow(el, options) {
            this.el = el;
            this.options = extend( {}, this.options );
            extend( this.options, options );
    
            // items
            this.items = [].slice.call(this.el.querySelectorAll('.slide-eventsdescription'));
            // total items
            this.itemsTotal = this.items.length;
            if( this.itemsTotal < 2 ) return;
    
            // content close control
            this.closeCtrl = this.el.querySelector('.action--close-eventsdescription');
            // index of current slide
            this.current = 0;
            // all items are closed initially
            this.isClosed = true;
    
            this._init();
        }
    
        CircleSlideshow.prototype.options = {};
    
        CircleSlideshow.prototype._init = function() {
            // add navigation ctrls and left & right circles to the DOM
            this.navLeftCtrl = document.createElement('button-eventsdescription');
            this.navLeftCtrl.className = 'navbutton-eventsdescription navbutton--next-eventsdescription';
            this.navLeftCtrl.setAttribute('aria-label', 'Next item');
            this.navLeftCtrl.innerHTML = '<svg width="100px" height="30px" viewBox="0 0 100 30"><polyline class="navbutton__line-eventsdescription" fill="none" stroke="#fcf67e" stroke-width="5" points="69.821,3.795 92.232,26.205 0,26.205"/></svg>';
    
            this.navRightCtrl = document.createElement('button-eventsdescription');
            this.navRightCtrl.className = 'navbutton-eventsdescription navbutton--prev-eventsdescription';
            this.navRightCtrl.setAttribute('aria-label', 'Previous item');
            this.navRightCtrl.innerHTML = '<svg width="100px" height="30px" viewBox="0 0 100 30"><polyline class="navbutton__line-eventsdescription" fill="none" stroke="#fcf67e" stroke-width="5" points="30.179,26.205 7.768,3.795 100,3.795"/></svg>';
    
            this.el.insertBefore(this.navLeftCtrl, this.el.firstChild);
            this.el.insertBefore(this.navRightCtrl, this.el.firstChild);
    
            var leftCircle = document.createElement('div'), rightCircle = document.createElement('div');
            leftCircle.className = 'deco-eventsdescription deco--circle-eventsdescription deco--circle-left-eventsdescription';
            rightCircle.className = 'deco-eventsdescription deco--circle-eventsdescription deco--circle-right-eventsdescription';
            
            this.el.insertBefore(leftCircle, this.el.firstChild);
            this.el.insertBefore(rightCircle, this.el.firstChild);
    
            this.circles = {left: leftCircle, right: rightCircle};
            dynamics.css(this.circles.left, {scale: 0.8});
            dynamics.css(this.circles.right, {scale: 0.8});
    
            // add the expander element per slide (.deco--expander)
            this.items.forEach(function(item) {
                var expanderEl = document.createElement('div');
                expanderEl.className = 'deco-eventsdescription deco--circle-eventsdescription deco--expander-eventsdescription';
    
                var slideEl = item.querySelector('.slide__item-eventsdescription');
                slideEl.insertBefore(expanderEl, slideEl.firstChild);
            });
    
            // position current item:
            classie.add(this.items[this.current], 'slide--current-eventsdescription');
            // event binding
            this._initEvents();
        };

        CircleSlideshow.prototype._closeContent = function() {
            this.isClosed = true;
    
            var self = this,
                item = this.expandedItem,
                expanderEl = item.querySelector('.deco--expander-eventsdescription'),
                smallImgEl = item.querySelector('.slide__img--small-eventsdescription'),
                contentEl = item.querySelector('.slide__content-eventsdescription'),
                largeImgEl = contentEl.querySelector('.slide__img--large-eventsdescription'),
                titleEl = contentEl.querySelector('.slide__title--main-eventsdescription'),
                descriptionEl = contentEl.querySelector('.slide__description-eventsdescription'),
                priceEl = contentEl.querySelector('.slide__price-eventsdescription'),
                buyEl = contentEl.querySelector('.button--buy-eventsdescription');
    
            // add slide--close class to the item
            classie.add(item, 'slide--close-eventsdescription');
    
            // remove .noscroll from body and .scrollable from .slide__content
            classie.remove(bodyEl, 'noscroll-eventsdescription');
            classie.remove(contentEl, 'scrollable-eventsdescription');
    
            // animate the buy element out
            dynamics.stop(buyEl);
            dynamics.animate(buyEl, 
                {
                    translateY : 400, opacity : 0
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000
                }
            );
    
            // animate the price element out
            dynamics.stop(priceEl);
            dynamics.animate(priceEl, 
                {
                    translateY : 400, opacity : 0
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000
                }
            );
    
            // animate the description element out
            dynamics.stop(descriptionEl);
            dynamics.animate(descriptionEl, 
                {
                    translateY : 400, opacity : 0
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 100
                }
            );
    
            // animate the title element out
            dynamics.stop(titleEl);
            dynamics.animate(titleEl, 
                {
                    translateY : 600, opacity : 0
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 200
                }
            );
    
            // animate the large image out
            dynamics.animate(largeImgEl, 
                {
                    translateY : 800, opacity : 0
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 500, delay: 300,
                    complete: function() {
                        // remove slide--open class to the item
                        classie.remove(item, 'slide--open-eventsdescription');
                        // remove slide--close class to the item
                        classie.remove(item, 'slide--close-eventsdescription');
                        // allow scrolling
                        classie.remove(bodyEl, 'lockscroll-eventsdescription');
                        self.isExpanded = false;
                    }
                }
            );
    
            // animate the small image in
            dynamics.animate(smallImgEl, 
                {
                    translateY : 0, opacity : 1
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 700, delay: 500
                }
            );
    
            // animate (scale down) the expander element
            dynamics.animate(expanderEl, 
                {
                    scaleX : 1, scaleY : 1
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.5,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.5,"y":1}]}], duration: 700, delay: 250
                }
            );
        };
    
        CircleSlideshow.prototype._initEvents = function() {
            var self = this;
    
            // slideshow navigation
            this.navRightCtrl.addEventListener('click', function() { self._navigate('left'); });
            this.navLeftCtrl.addEventListener('click', function() { self._navigate('right'); });
    
            // opening items
            this.items.forEach(function(item) {
                item.querySelector('.action--open-eventsdescription').addEventListener('click', function(ev) {
                    self._openContent(item);
                    ev.target.blur();
                });
            });
    
            // closing items
            this.closeCtrl.addEventListener('click', function() { self._closeContent(); });
    
            // keyboard navigation events
            document.addEventListener('keydown', function(ev) {
                var keyCode = ev.keyCode || ev.which;
                switch (keyCode) {
                    case 37:
                        self._navigate('left');
                        break;
                    case 39:
                        self._navigate('right');
                        break;
                    case 13: // enter
                        if( self.isExpanded ) return;
                        self._openContent(self.items[self.current]);
                        break;
                    case 27: // esc
                        if( self.isClosed ) return;
                        self._closeContent();
                        break;
                }
            });
    
            // swipe navigation
            // from http://stackoverflow.com/a/23230280
            this.el.addEventListener('touchstart', handleTouchStart, false);        
            this.el.addEventListener('touchmove', handleTouchMove, false);
            var xDown = null;
            var yDown = null;
            function handleTouchStart(evt) {
                xDown = evt.touches[0].clientX;
                yDown = evt.touches[0].clientY;
            };
            function handleTouchMove(evt) {
                if ( ! xDown || ! yDown ) {
                    return;
                }
    
                var xUp = evt.touches[0].clientX;
                var yUp = evt.touches[0].clientY;
    
                var xDiff = xDown - xUp;
                var yDiff = yDown - yUp;
    
                if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                    if ( xDiff > 0 ) {
                        /* left swipe */
                        if( !self.isExpanded ) {
                            self._navigate('right');	
                        }
                    } else {
                        /* right swipe */
                        if( !self.isExpanded ) {
                            self._navigate('left');	
                        }
                    }
                } 
                /* reset values */
                xDown = null;
                yDown = null;
            };
        };
    
        CircleSlideshow.prototype._navigate = function(dir) {
            if( this.isExpanded ) {
                return false;
            }
    
            this._moveCircles(dir);
    
            var self = this,
                itemCurrent = this.items[this.current],
                currentEl = itemCurrent.querySelector('.slide__item-eventsdescription'),
                currentTitleEl = itemCurrent.querySelector('.slide__title-eventsdescription');
    
            // update new current value
            if( dir === 'right' ) {
                this.current = this.current < this.itemsTotal-1 ? this.current + 1 : 0;
            }
            else {
                this.current = this.current > 0 ? this.current - 1 : this.itemsTotal-1;
            }
    
            var itemNext = this.items[this.current],
                nextEl = itemNext.querySelector('.slide__item-eventsdescription'),
                nextTitleEl = itemNext.querySelector('.slide__title-eventsdescription');
            
            // animate the current element out
            dynamics.animate(currentEl, 
                {
                    translateX: dir === 'right' ? -1*currentEl.offsetWidth : currentEl.offsetWidth, scale: 0.7
                }, 
                {
                    type: dynamics.spring, duration: 2000, friction: 600,
                    complete: function() {
                        dynamics.css(itemCurrent, { visibility: 'hidden' });
                    }
                }
            );
    
            // animate the current title out
            dynamics.animate(currentTitleEl, 
                {
                    translateX: dir === 'right' ? -250 : 250, opacity: 0
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 450
                }
            );
    
            // set the right properties for the next element to come in
            dynamics.css(itemNext, {visibility: 'visible'});
            dynamics.css(nextEl, {translateX: dir === 'right' ? nextEl.offsetWidth : -1*nextEl.offsetWidth, scale: 0.7});
    
            // animate the next element in
            dynamics.animate(nextEl, 
                {
                    translateX: 0
                }, 
                {
                    type: dynamics.spring, duration: 3000, friction: 700, frequency: 500,
                    complete: function() {
                        self.items.forEach(function(item) { classie.remove(item, 'slide--current-eventsdescription'); });
                        classie.add(itemNext, 'slide--current-eventsdescription');
                    }
                }
            );
    
            // set the right properties for the next title to come in
            dynamics.css(nextTitleEl, { translateX: dir === 'right' ? 250 : -250, opacity: 0 });
            // animate the next title in
            dynamics.animate(nextTitleEl, 
                {
                    translateX: 0, opacity: 1
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000
                }
            );
        };
    
        CircleSlideshow.prototype._moveCircles = function(dir) {
            var animProps = {
                type: dynamics.easeIn, 
                duration: 100,
                complete: function(el) {
                    dynamics.animate(el, 
                        {
                            translateX: 0, scale: 0.8
                        }, 
                        { 
                            type: dynamics.spring, duration: 1000, friction: 300
                        }
                    );
                }
            };
    
            dynamics.animate(this.circles.right, 
                {
                    translateX: dir === 'right' ? -this.circles.right.offsetWidth/3 : this.circles.right.offsetWidth/3, scale: 0.9
                }, 
                animProps
            );
            dynamics.animate(this.circles.left, 
                {
                    translateX: dir === 'right' ? -this.circles.left.offsetWidth/3 : this.circles.left.offsetWidth/3, scale: 0.9
                }, 
                animProps
            );
        };
    
        CircleSlideshow.prototype._openContent = function(item) {
            this.isExpanded = true;
            this.isClosed = false;
            this.expandedItem = item;
    
            var self = this,
                expanderEl = item.querySelector('.deco--expander-eventsdescription'),
                scaleVal = Math.ceil(Math.sqrt(Math.pow(docWidth, 2) + Math.pow(docHeight, 2)) / expanderEl.offsetWidth),
                smallImgEl = item.querySelector('.slide__img--small-eventsdescription'),
                contentEl = item.querySelector('.slide__content-eventsdescription'),
                largeImgEl = contentEl.querySelector('.slide__img--large-eventsdescription'),
                titleEl = contentEl.querySelector('.slide__title--main-eventsdescription'),
                descriptionEl = contentEl.querySelector('.slide__description-eventsdescription'),
                priceEl = contentEl.querySelector('.slide__price-eventsdescription'),
                buyEl = contentEl.querySelector('.button--buy-eventsdescription');
    
            // add slide--open class to the item
            classie.add(item, 'slide--open-eventsdescription');
            // prevent scrolling
            bodyEl.style.top = -scrollY() + 'px';
            classie.add(bodyEl, 'lockscroll-eventsdescription');
            
            // position the content elements:
            // - image (large image)
            dynamics.css(largeImgEl, {translateY : 800, opacity: 0});
            // - title
            dynamics.css(titleEl, {translateY : 600, opacity: 0});
            // - description
            dynamics.css(descriptionEl, {translateY : 400, opacity: 0});
            // - price
            dynamics.css(priceEl, {translateY : 400, opacity: 0});
            // - buy button
            dynamics.css(buyEl, {translateY : 400, opacity: 0});
    
            // animate (scale up) the expander element
            dynamics.animate(expanderEl, 
                {
                    scaleX : scaleVal, scaleY : scaleVal
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.5,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.5,"y":1}]}], duration: 1700
                }
            );
            
            // animate the small image out
            dynamics.animate(smallImgEl, 
                {
                    translateY : -600, opacity : 0
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 300, delay: 75
                }
            );
    
            // animate the large image in
            dynamics.animate(largeImgEl, 
                {
                    translateY : 0, opacity : 1
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 300
                }
            );
    
            // animate the title element in
            dynamics.animate(titleEl, 
                {
                    translateY : 0, opacity : 1
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 400
                }
            );
    
            // animate the description element in
            dynamics.animate(descriptionEl, 
                {
                    translateY : 0, opacity : 1
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 500
                }
            );
    
            // animate the price element in
            dynamics.animate(priceEl, 
                {
                    translateY : 0, opacity : 1
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 600
                }
            );
    
            // animate the buy element in
            dynamics.animate(buyEl, 
                {
                    translateY : 0, opacity : 1
                }, 
                {
                    type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 700,
                    complete: function() {
                        // add .noscroll to body and .scrollable to .slide__content
                        classie.add(bodyEl, 'noscroll-eventsdescription');
                        classie.add(contentEl, 'scrollable-eventsdescription');
                        
                        // force redraw (chrome)
                        contentEl.style.display = 'none';
                        //contentEl.offsetHeight;
                        contentEl.style.display = 'block';
                        
                        // allow scrolling
                        classie.remove(bodyEl, 'lockscroll-eventsdescription');
                    }
                }
            );
        };
        
        // class helper functions from bonzo https://github.com/ded/bonzo
        
        function classReg( className ) {
          return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
        }
        
        // classList support for class management
        // altho to be fair, the api sucks because it won't accept multiple classes at once
        var hasClass, addClass, removeClass;
        
        if ( 'classList' in document.documentElement ) {
          hasClass = function( elem, c ) {
            return elem.classList.contains( c );
          };
          addClass = function( elem, c ) {
            elem.classList.add( c );
          };
          removeClass = function( elem, c ) {
            elem.classList.remove( c );
          };
        }
        else {
          hasClass = function( elem, c ) {
            return classReg( c ).test( elem.className );
          };
          addClass = function( elem, c ) {
            if ( !hasClass( elem, c ) ) {
              elem.className = elem.className + ' ' + c;
            }
          };
          removeClass = function( elem, c ) {
            elem.className = elem.className.replace( classReg( c ), ' ' );
          };
        }
        
        function toggleClass( elem, c ) {
          var fn = hasClass( elem, c ) ? removeClass : addClass;
          fn( elem, c );
        }
        
        var classie = {
          // full names
          hasClass: hasClass,
          addClass: addClass,
          removeClass: removeClass,
          toggleClass: toggleClass,
          // short names
          has: hasClass,
          add: addClass,
          remove: removeClass,
          toggle: toggleClass
        };
        
        // transport
        if ( typeof define === 'function' && define.amd ) {
          // AMD
          define( classie );
        } else if ( typeof exports === 'object' ) {
          // CommonJS
          module.exports = classie;
        } else {
          // browser global
          window.classie = classie;
        }

        window.CircleSlideshow = CircleSlideshow;
        document.documentElement.className = 'js';
        var slideshow = new CircleSlideshow(document.getElementById('slideshow'));
}
    componentDidUpdate(){
        this.props.resetMenu();
    }

    render(){
        return(
            <div class="eventsdescription">
            <div class="container-eventsdescription">
                <div class="deco-eventsdescription deco--title-eventsdescription"></div>
                <div id="slideshow" class="slideshow-eventsdescription">
                    <div class="slide-eventsdescription">
                        <h2 class="slide__title-eventsdescription slide__title--preview-eventsdescription">Code&nbsp;for&nbsp;FUN</h2>
                        <div class="slide__item-eventsdescription">
                            <div class="slide__inner-eventsdescription">
                                <img class="slide__img-eventsdescription slide__img--small-eventsdescription" src={codeforfun} alt="Code for Fun" />
                                <button class="action-eventsdescription action--open-eventsdescription" aria-label="View details"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <div class="slide__content-eventsdescription">
                            <div class="slide__content-scroller-eventsdescription">
                                <div class="slide__img-eventsdescription slide__img--large-eventsdescription">
                                <p>
                                Team of two<br/><br/>
                                <p>
                                    <p class="rounds">Round 1:&nbsp;&nbsp;Pen and paper</p>
                                    <p>Basic coding, debugging  and aptitude is tested. This round is a mixture of few events. Strictly five teams will be taken for the next round.</p>
                                    <p class="rounds">Round 2:&nbsp;&nbsp;Connections on technical topics</p>
                                    <p>Team which answers first will get the point. Strictly three teams will be taken for the next round.</p>
                                    <p class="rounds">Round 3:&nbsp;&nbsp;Technical MCQ</p>
                                    <p>Team members are expected to answer the questions orally. Team which answers first will get the point.</p>
                                </p>
                                </p>
                                </div>
                                <div class="slide__details-eventsdescription">
                                <h2 class="slide__title-eventsdescription slide__title--main-eventsdescription"></h2>
                                    <p class="slide__description-eventsdescription"></p>
                                    <div>
                                        <span class="slide__price-eventsdescription slide__price--large-eventsdescription"></span>
                                        <div class="button-eventsdescription button--buy-eventsdescription"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slide-eventsdescription">
                        <h2 class="slide__title-eventsdescription slide__title--preview-eventsdescription">Code&nbsp;Fiesta</h2>
                        <div class="slide__item-eventsdescription">
                            <div class="slide__inner-eventsdescription">
                                <img class="slide__img-eventsdescription slide__img--small-eventsdescription" src={codefiesta} alt="Code Fiesta" />
                                <button class="action-eventsdescription action--open-eventsdescription" aria-label="View details"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <div class="slide__content-eventsdescription">
                            <div class="slide__content-scroller-eventsdescription">
                                <div class="slide__img-eventsdescription slide__img--large-eventsdescription">
                                <p>
                                <p class="rounds">Round 1:&nbsp;&nbsp;Pen and Paper</p>
                                <p>Skills on oops, DBMS, OS and networking is tested.</p>
                                <p class="rounds">Round 2:&nbsp;&nbsp;3 coding questions are given</p>
                                <p>
                                Question 1: Invert the screen and code<br/> 
                                Question 2: Blind Coding<br/>
                                Question 3: Normal coding<br/>
                                </p>
                                </p>
                                </div>
                                <div class="slide__details-eventsdescription">
                                <h2 class="slide__title-eventsdescription slide__title--main-eventsdescription"></h2>
                                    <p class="slide__description-eventsdescription"></p>
                                    <div>
                                        <span class="slide__price-eventsdescription slide__price--large-eventsdescription"></span>
                                        <div class="button-eventsdescription button--buy-eventsdescription"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slide-eventsdescription">
                        <h2 class="slide__title-eventsdescription slide__title--preview-eventsdescription">A(DOPE)</h2>
                        <div class="slide__item-eventsdescription">
                            <div class="slide__inner-eventsdescription">
                                <img class="slide__img-eventsdescription slide__img--small-eventsdescription" src={adope} alt="A(DOPE)" />
                                <button class="action-eventsdescription action--open-eventsdescription" aria-label="View details"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <div class="slide__content-eventsdescription">
                            <div class="slide__content-scroller-eventsdescription">
                                <div class="slide__img-eventsdescription slide__img--large-eventsdescription">
                                <p>
                                <p>This event is exclusively for the people who passionately work in software like Adobe Photoshop and Illustrator. You can bring out all your creativity in the given topic on the spot.<br/><br/>
                                <p class="bold">Rules and Regulations:</p>
                                <p class="bold">For the people who chooses Photoshop as mainstream:</p>
                                <p>
                                1. 32 Stock Images will be provided to the contestants.<br/>
                                2. This is the only source should be used. No internet connection will be provided or should be used.
                                </p>
                                <p class="bold">For the people who chooses Illustrator as mainstream:</p>
                                <p>
                                1. No stock images will be provided.<br/>
                                2. Internet accessibility is permitted for half an hour in a single stretch on any time within the round.
                                </p>
                                <p class="bold">POINTS TO BE NOTED:</p>
                                <p>
                                1. The contestants must bring their own laptops with required software preinstalled.<br/>
                                2. Usage of drawing pen/tablet is permitted.<br/>
                                3. The theme of the artwork needed to be done is given on the spot.<br/>
                                4. Camera Raw and Adobe Lightroom can also be used for color correction.
                                </p>
                                <p class="bold">Event structure:</p>
                                <p>
                                1. The entire event consists of only one round. The contestants must be present in the starting of the given round. No extension will be provided.<br/>
                                2. The contestant can design a poster, artwork, logo or whatever they want based on the given concept.<br/>
                                3. A team of maximum 3 is allowed. Lone rangers is also appreciated.<br/>
                                4. Resources provided: 32 stock images (Photoshop), 2 A4 sheets per team. 2 Pen per team.<br/>
                                5. The contestants must submit both the rendered image and also the source file.<br/>
                                </p>
                                </p>
                                </p>
                                </div>
                                <div class="slide__details-eventsdescription">
                                <h2 class="slide__title-eventsdescription slide__title--main-eventsdescription"></h2>
                                    <p class="slide__description-eventsdescription"></p>
                                    <div>
                                        <span class="slide__price-eventsdescription slide__price--large-eventsdescription"></span>
                                        <div class="button-eventsdescription button--buy-eventsdescription"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="action-eventsdescription action--close-eventsdescription" aria-label="Close"><i class="fa fa-times"></i></button>
            </div>
            <section class="content-eventsdescription content--related-eventsdescription">
            </section>
        </div>
        </div>
        )
    }
}

export default Coding;