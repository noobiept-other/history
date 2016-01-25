window.onload = function () {
    Main.init();
};
var Main;
(function (Main) {
    var ALL_EVENTS = [];
    var CURRENT_POSITION = -1; // current selected event (position in the array above)
    function init() {
        var yearList = document.getElementById('YearList');
        var startYear = parseInt(yearList.getAttribute('data-start'), 10);
        var endYear = parseInt(yearList.getAttribute('data-end'), 10);
        var a;
        // add all the years to the list
        for (a = startYear; a < endYear + 1; a++) {
            var year = document.createElement('li');
            year.className = 'Year';
            year.innerHTML = a;
            yearList.appendChild(year);
        }
        // figure out the width of each element
        var elementWidth = yearList.firstElementChild.clientWidth;
        var eventsContainer = document.getElementById('EventsContainer');
        var topDiff = 1;
        // add all the history events
        for (a = 0; a < eventsContainer.children.length; a++) {
            var eventDescription = eventsContainer.children[a];
            var releaseYear = parseInt(eventDescription.getAttribute('data-year'), 10);
            var releaseMonth = parseInt(eventDescription.getAttribute('data-month'), 10);
            var title = eventDescription.getAttribute('data-title');
            var offset = releaseYear - startYear + releaseMonth / 12;
            var element = document.createElement('li');
            element.className = 'HistoryEvent';
            element.innerHTML = title;
            element.title = title;
            element.style.left = (offset * elementWidth + 20) + 'px'; // '20' is the padding, so it aligns with the text
            element.style.top = (topDiff * 25) + 'px';
            element.addEventListener('click', (function (position) {
                return function () {
                    openEvent(position);
                };
            })(a));
            yearList.appendChild(element);
            ALL_EVENTS.push({
                eventElement: element,
                descriptionElement: eventDescription
            });
            // alternate the top position value of the history event (so that the text doesn't overlap with other elements)
            topDiff++;
            if (topDiff > 3) {
                topDiff = 1;
            }
        }
        // start with the last (most recent) event opened
        openEvent(ALL_EVENTS.length - 1);
        // setup the keyboard shortcuts
        document.addEventListener('keydown', function (event) {
            switch (event.keyCode) {
                case 37:
                    openPreviousEvent();
                    event.preventDefault();
                    break;
                case 39:
                    openNextEvent();
                    event.preventDefault();
                    break;
            }
        });
    }
    Main.init = init;
    /**
     * Open a specific history event.
     */
    function openEvent(position) {
        if (CURRENT_POSITION >= 0) {
            var previous = ALL_EVENTS[CURRENT_POSITION];
            previous.eventElement.classList.remove('EventSelected');
            previous.descriptionElement.classList.remove('ActiveDescription');
        }
        CURRENT_POSITION = position;
        var current = ALL_EVENTS[position];
        current.eventElement.scrollIntoView();
        current.eventElement.classList.add('EventSelected');
        current.descriptionElement.classList.add('ActiveDescription');
    }
    /**
     * Open the next event. If we're currently on the last one, then open the first.
     */
    function openNextEvent() {
        var position = CURRENT_POSITION + 1;
        if (position >= ALL_EVENTS.length) {
            position = 0;
        }
        openEvent(position);
    }
    /**
     * Open the previous event. If we're currently on the first one, then open the last one.
     */
    function openPreviousEvent() {
        var position = CURRENT_POSITION - 1;
        if (position < 0) {
            position = ALL_EVENTS.length - 1;
        }
        openEvent(position);
    }
})(Main || (Main = {}));
