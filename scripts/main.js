window.onload = function () {
    Main.init();
};
var Main;
(function (Main) {
    var CURRENT_EVENT;
    function init() {
        var yearList = document.getElementById('YearList');
        var startYear = parseInt(yearList.getAttribute('data-start'), 10);
        var endYear = parseInt(yearList.getAttribute('data-end'), 10);
        var a;
        // add all the years to the list
        for (a = startYear; a < endYear + 1; a++) {
            var year = document.createElement('li');
            year.innerHTML = a;
            yearList.appendChild(year);
        }
        // figure out the width of each element
        var elementWidth = yearList.firstElementChild.clientWidth;
        var eventsContainer = document.getElementById('EventsContainer');
        // add all the history events
        for (a = 0; a < eventsContainer.children.length; a++) {
            var historyEvent = eventsContainer.children[a];
            var releaseYear = parseInt(historyEvent.getAttribute('data-year'), 10);
            var offset = releaseYear - startYear;
            var element = document.createElement('li');
            element.className = 'HistoryEvent';
            element.innerHTML = 'x';
            element.title = historyEvent.getAttribute('data-title');
            element.style.left = (offset * elementWidth) + 'px';
            element.addEventListener('click', (function (historyEvent) {
                return function () {
                    showHistoryEvent(historyEvent);
                };
            })(historyEvent));
            yearList.appendChild(element);
        }
    }
    Main.init = init;
    function showHistoryEvent(infoElement) {
        if (CURRENT_EVENT) {
            CURRENT_EVENT.classList.remove('ActiveDescription');
        }
        infoElement.classList.add('ActiveDescription');
        CURRENT_EVENT = infoElement;
    }
})(Main || (Main = {}));
