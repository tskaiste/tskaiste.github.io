// Slider.js
function Slider(options) {
	options = options || {};
    var containerElem = options.container;

    var slidesContainer = document.querySelector('#' + containerElem);
    var slides = slidesContainer.children;
    var slidesWrapper = insertWrapper();
    var slidesNav = insertNavigation();

    appendSlideID();

    function insertNavigation() {
        var nav = document.createElement("div");
        nav.className += "sk-slider-nav";
        var navInner = '<div id="myDiv"></div>';
        nav.innerHTML = navInner;

        slidesContainer.append(nav);

        return nav;
    }

    function insertWrapper() {
        var slidesWrapper = document.createElement("div");
        slidesWrapper.className += "sk-slider-wrapper"
    
        while (slides.length > 0) {
            slidesWrapper.append(slides[0]);
        }

        slidesContainer.innerHTML = '';
        slidesContainer.appendChild(slidesWrapper);

        slides = slidesWrapper.children;

        return slidesWrapper;
    }

    function appendSlideContainerClass() {
        if (slidesContainer.className.length == 0) {
            slidesContainer.className += 'sk-slider-container';
        } else {
            slidesContainer.className += ' sk-slider-container';
        }
    }

    function appendSlideID() {
        for (let index = 0; index < slides.length; index++) {
            const element = slides[index];
            var id = 'sk_slide_' + index;
            element.className += ' sk-slide';
            element.setAttribute('id', id);
        }
    }

	return  {
        containerElem: containerElem,
        slidesContainer: slidesContainer,
        slidesWrapper: slidesWrapper,
        slides: slides
    };
}

var sliderMMSolution = new Slider({
    container: '#mm_slider_container',
    slidesContainer: '#mm_slider',
    slidesID: 'tlt_mm_solution'
});

// Slider.js
function Slider(options) {
    options = options || {};
    var container = options.container;
    var slidesContainer = document.querySelector(options.slidesContainer);
    var slideIDName = options.slidesID;
    var slides = slidesContainer.children;
    var slidesCount = slides.length;
    var slideIndex = 1;

    insertNavigation();

    function insertNavigation() {
        var nav = document.createElement("div");
        nav.className += "tlt-slider-nav";
        var navInner = '<div class="tlt-slider-nav-left"></div><div class="tlt-slider-nav-right"></div>';
        nav.innerHTML = navInner;
        document.querySelector(container).append(nav);
        addEventListeners();
        return nav;
    }

    function addEventListeners() {
        document.querySelector(container).getElementsByClassName('tlt-slider-nav-left')[0].addEventListener('click', function (e) {
            if (e.target) {
                if (slideIndex == 1) slideIndex = slidesCount;
                else slideIndex--;
                animate('#' + slideIDName + slideIndex);
            }
        });
        document.querySelector(container).getElementsByClassName('tlt-slider-nav-right')[0].addEventListener('click', function (e) {
            if (e.target) {
                if (slideIndex == slidesCount) slideIndex = 1;
                else slideIndex++;
                animate('#' + slideIDName + slideIndex);
            }
        });
    }

    function changeSlide(direction) {
        if (direction == 'left') {
            if (slideIndex == 1) slideIndex = slidesCount;
                else slideIndex--;
        } else {
            if (slideIndex == slidesCount) slideIndex = 1;
                else slideIndex++;
        }
        animate('#' + slideIDName + slideIndex);
    }
    
    function animate(info) {
        document.querySelector(container).querySelector('.active-slide').classList.add('fade-out-slide');
        document.querySelector(container).querySelector(info).classList.add('fade-in-slide');
        setTimeout(function () {
            document.querySelector(container).querySelector('.active-slide').classList.remove('fade-out-slide');
            document.querySelector(container).querySelector('.active-slide').classList.remove('active-slide');
            document.querySelector(container).querySelector(info).classList.remove('fade-in-slide');
            document.querySelector(container).querySelector(info).classList.add('active-slide');
        }, 480)
    }

    // Touches
    window.addEventListener("load", enableTouches);
    window.addEventListener("resize", enableTouches);

    function enableTouches() {
        if (window.innerWidth < 980) {
            document.addEventListener('touchstart', handleTouchStart, false);
            document.addEventListener('touchmove', handleTouchMove, false);
            document.addEventListener('touchend', callTouchFunction, false);
        } else {
            document.removeEventListener('touchstart', handleTouchStart, false);
            document.removeEventListener('touchmove', handleTouchMove, false);
            document.removeEventListener('touchend', callTouchFunction, false);
        }
    }

    var xDown = null;
    var yDown = null;
    var swipeDirection = 'none';

    function getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                swipeDirection = 'left';
            } else {
                swipeDirection = 'right';
            }
        }
    };

    function callTouchFunction(evt) {
        if (swipeDirection != 'none') {
            if (closest(evt.target, options.container)) {
                changeSlide(swipeDirection);
            }
        }
        swipeDirection = 'none';
    }

    return {
        containerElem: container,
        slidesContainer: slidesContainer,
        slides: slides
    };
}
