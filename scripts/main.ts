window.onload = function()
{
Main.init();
};


module Main {


var CURRENT_EVENT: HTMLElement;
var CURRENT_DESCRIPTION: HTMLElement;


export function init()
    {
    var yearList = document.getElementById( 'YearList' );
    var startYear = parseInt( yearList.getAttribute( 'data-start' ), 10 );
    var endYear = parseInt( yearList.getAttribute( 'data-end' ), 10 );
    var a;

        // add all the years to the list
    for (a = startYear ; a < endYear + 1 ; a++)
        {
        var year = document.createElement( 'li' );
        year.innerHTML = a;

        yearList.appendChild( year );
        }

        // figure out the width of each element
    var elementWidth = yearList.firstElementChild.clientWidth;
    var eventsContainer = document.getElementById( 'EventsContainer' );
    var alternate = true;

        // add all the history events
    for (a = 0 ; a < eventsContainer.children.length ; a++)
        {
        var eventDescription = eventsContainer.children[ a ];
        var releaseYear = parseInt( eventDescription.getAttribute( 'data-year' ), 10 );
        var releaseMonth = parseInt( eventDescription.getAttribute( 'data-month' ), 10 );
        var title = eventDescription.getAttribute( 'data-title' );
        var offset = releaseYear - startYear + releaseMonth / 12;
        var element = document.createElement( 'li' );

            // alternate the distance from the event title to the year list
            // so that there's no text overlap between close events
        if ( alternate )
            {
            element.innerHTML = title + '<br/>|<br/>|';
            }

        else
            {
            element.innerHTML = title + '<br/>|';
            }

        alternate = !alternate;

        element.className = 'HistoryEvent';
        element.title = title;
        element.style.left = (offset * elementWidth) + 'px';
        element.addEventListener( 'click', (function( eventElement, descriptionElement )
            {
            return function()
                {
                showHistoryEvent( eventElement, descriptionElement );
                }
            })(element, eventDescription));

        yearList.appendChild( element );
        }
    }


function showHistoryEvent( eventElement: HTMLElement, descriptionElement: HTMLElement )
    {
    if ( CURRENT_EVENT )
        {
        CURRENT_EVENT.classList.remove( 'EventSelected' );
        CURRENT_DESCRIPTION.classList.remove( 'ActiveDescription' );
        }

    eventElement.classList.add( 'EventSelected' );
    descriptionElement.classList.add( 'ActiveDescription' );

    CURRENT_EVENT = eventElement;
    CURRENT_DESCRIPTION = descriptionElement;
    }
}
