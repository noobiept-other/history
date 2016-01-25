Run
===

Either open the `index.html` or start a local web server at the root directory.

For example with `python3`, you can run the command `python3 -m http.server` then open the `localhost:8000` url.


Dependencies
============

- typescript `1.7`

To compile run the `tsc` command in the root directory.


Data Description
================

To add a new history event, add an element to the `#EventsContainer` with the following format.

    <div class="EventDescription" data-year="2016" data-month="6" data-title="The title.">
        The description here.
    </div>


Keyboard Shortcuts
==================

- `left arrow`: Open the previous history event.
- `right arrow`: Open the next history event.
