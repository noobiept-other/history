Data Description
================

Add a `data.json` file in the root directory with this format.

    {
        "startYear": number,
        "endYear": number,
        "events: [
            {
                "year": number,
                "month: number,     // january= 1, etc
                "title": string,
                "description": string
            },
            // etc
        ]
    }
