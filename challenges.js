const axios = require('axios')
const cheerio = require('cheerio')
import {calcAveragePrice, totalNumberOfItems} from "./functions"


function webScraper(Url, search) {
    
    axios.get(`https://${Url}/search?q=${search}`)
    .then(function(response) {
        // HTML is inside response.data
        let products = []
        let $ = cheerio.load(response.data)
        $('.product-grid__item.product-card__name').each(function(i, element) {
            let title = $(this).text();
            if(products[i] == undefined){
                products[i] = {}
            }
            products[i].title = title
        })
        $('.product-grid__item img').each(function(i, element) {
            let imgUrl = $(this).attr('src');
            products[i].imgUrl = imgUrl
        })
        $('.product-grid__item.product-card__price').each(function(i, element) {
            let price = $(this).text();
            products[i].price = price
        })
        console.log(products);
        let averagePrice = calcAveragePrice(products)
        let totalNumProducts = totalNumProducts(products)

        let productInfo = {
            totalNumberOfItems: totalNumProducts,
            averagePriceOfAllItems: ('£'+averagePrice)
        }

        products.push(productInfo)

    })
    
    .catch(function(error) {
        //Print error if any occured
        console.error('Error!: ', error.message)
    })
}
const baseURL = 'www.thewhiskyexchange.com'
const searchResults = 'beer'

webScraper(baseURL, searchResults)