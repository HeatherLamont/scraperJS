

export function totalNumberOfItems(productList){
    let totalNumProducts = productList.length
    return totalNumProducts
}

export function calcAveragePrice(productList) {
    //Calculate average price of all items
    let totalNumberOfItems = totalNumberOfItems(productList)
    let sumPrice = 0
    productList.forEach((value, key) => {
        let priceInt = Number(value.price.replace(/[^0-9.-]+/g,""))
        sumPrice += priceInt
    })
    let averagePrice =(Math.round((sumPrice/totalNumProducts) * 100) / 100).toFixed(2)
    return averagePrice
}

