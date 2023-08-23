function printReportPages(pages){
    console.log("Report starting")
    pages = insSort(pages)
    console.log(pages)
    for ( let page of Object.keys(pages)){
        console.log(`Found ${pages[page]} internal links to ${page}`)
    } 

}

function insSort(pages){
   const whatever = Object.entries(pages).sort((x, y) => x[1] - y[1])
   pages = Object.fromEntries(whatever.reverse())

    return pages
}

module.exports = {
    printReportPages
}