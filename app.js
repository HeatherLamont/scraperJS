const axios = require('axios')
const cheerio = require('cheerio')
const fs = require("fs");



axios.get('https://cdn.adimo.co/clients/Adimo/test/index.html')
.then(response => {
    let products = []
    const $ = cheerio.load(response.data)
        //Create object per product and define title
        $('.item h1').each(function(i, element) {
            let title = $(this).text();
            if(products[i] == undefined){
            products[i] = {}
            }
            products[i].title = title
        })
        //Define img url
        $('.item img').each(function(i, element){
            let imgUrl = $(this).attr('src')
            products[i].imgUrl = imgUrl
        })
        //Define price per product and show discount
        $('.item').each(function(i, element) {
            let oldPrice 
            let price 
            $(element).find('span').each(function (i, element) {
                if($(element).hasClass('oldPrice')){
                    oldPrice = $(element).text()
                    return oldPrice
                }else{
                    price = $(element).text()
                    return price
                }
            })
            //Set oldPrice to 0 for calculation purposes
            if(oldPrice == undefined){
                oldPrice = '0'
            }
            //Convert price strings to integer
            let oldPriceInt = Number(oldPrice.replace(/[^0-9.-]+/g,""))
            let priceInt = Number(price.replace(/[^0-9.-]+/g,""))
            //Define discount amount
            let discount
            if(oldPriceInt - priceInt <= 0){
                discount = 'No discount'
            }else
                discount = ('£'+ (oldPriceInt - priceInt)+' discount')

            products[i].discount = discount
            products[i].price = ('£'+priceInt)
        })
        
        //Calculate average price of all items
        let totalNumProducts = products.length
        let sumPrice = 0
        products.forEach((value, key) => {
            let priceInt = Number(value.price.replace(/[^0-9.-]+/g,""))
            sumPrice += priceInt
        })
        let averagePrice =(Math.round((sumPrice/totalNumProducts) * 100) / 100).toFixed(2);
        
        //Append extra details as object to product list
        let productInfo = {
            totalNumberOfItems: totalNumProducts,
            averagePriceOfAllItems: ('£'+averagePrice)
        }

        products.push(productInfo)

        // TEST LOGS
        //console.log(products)
        // console.log('Total number of items: '+ totalNumProducts);
        // console.log('Avergage price of all items: £'+ averagePrice);

        // Write info to scraper.json file
    fs.writeFile("scraper.json", JSON.stringify(products, null, 2), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      });

    })
    .catch(function(error) {
        //Print error if any occured
        console.error('Error!: ', error.message)
    })

    



    