const {crawlPage} = require(`./crawl.js`)
const {printReportPages} = require(`./report.js`)

console.log("x")

async function main(){
    if (process.argv <3){
        console.log("no url")
    }
    if (process.argv >3){
        console.log("enter only one url")
    }

    const baseURL = process.argv[2]
    console.log(`crawler starting at ${baseURL}`)

    const ress = await crawlPage("https://wagslane.dev", "https://wagslane.dev", {})
    console.log(ress)
    printReportPages(ress)
}

main()