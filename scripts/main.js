window.onload = function () {
    Main.init();
};
var Main;
(function (Main) {
    var CURRENT_EVENT;
    var CURRENT_DESCRIPTION;
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
            element.addEventListener('click', (function (eventElement, descriptionElement) {
                return function () {
                    showHistoryEvent(eventElement, descriptionElement);
                };
            })(element, eventDescription));
            yearList.appendChild(element);
            // alternate the top position value of the history event (so that the text doesn't overlap with other elements)
            topDiff++;
            if (topDiff > 3) {
                topDiff = 1;
            }
        }
        // start with the last (most recent) event opened
        var last = yearList.lastElementChild;
        last.scrollIntoView();
        last.click();
    }
    Main.init = init;
    function showHistoryEvent(eventElement, descriptionElement) {
        if (CURRENT_EVENT) {
            CURRENT_EVENT.classList.remove('EventSelected');
            CURRENT_DESCRIPTION.classList.remove('ActiveDescription');
        }
        eventElement.classList.add('EventSelected');
        descriptionElement.classList.add('ActiveDescription');
        CURRENT_EVENT = eventElement;
        CURRENT_DESCRIPTION = descriptionElement;
    }
})(Main || (Main = {}));
