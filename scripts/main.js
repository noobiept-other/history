window.onload = function () {
    Main.init();
};
var Main;
(function (Main) {
    function init() {
        getData('data.json', start);
    }
    Main.init = init;
    function start(info) {
        var yearList = document.getElementById('YearList');
        var a;
        // add all the years to the list
        for (a = info.startYear; a < info.endYear + 1; a++) {
            var year = document.createElement('li');
            year.innerHTML = a;
            yearList.appendChild(year);
        }
        // figure out the width of each element
        var elementWidth = yearList.firstElementChild.clientWidth;
        // add all the history events
        for (a = 0; a < info.events.length; a++) {
            var historyEvent = info.events[a];
            var offset = historyEvent.year - info.startYear;
            var element = document.createElement('li');
            element.className = 'HistoryEvent';
            element.innerHTML = 'x';
            element.title = historyEvent.title;
            element.style.left = (offset * elementWidth) + 'px';
            element.addEventListener('click', (function (historyEvent) {
                return function () {
                    showHistoryEvent(historyEvent);
                };
            })(historyEvent));
            yearList.appendChild(element);
        }
    }
    function showHistoryEvent(info) {
        var description = document.getElementById('Description');
        description.innerHTML = info.description;
    }
    function getData(url, callback) {
        var request = new XMLHttpRequest();
        request.open('get', url, true);
        request.addEventListener('load', function (event) {
            callback(JSON.parse(this.responseText));
        });
        request.send(null);
    }
})(Main || (Main = {}));
