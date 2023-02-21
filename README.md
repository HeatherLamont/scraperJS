# scraperJS
Adimo take-home test

Basic webscraper in Javascript using Cheerio and node.js

It downloads the html for an imaginary cheese store products page. ( https://cdn.adimo.co/clients/Adimo/test/index.html )

Processes the html and saves out a JSON file with:

1. Each product as it's own object containing.
    - title
    - image url
    - price and any discount.
2. The total number of items
3. The average price of all items.

Extra Challenges included in 'challenges.js' + 'functions.js'
