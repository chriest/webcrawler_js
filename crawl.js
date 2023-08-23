const{JSDOM} = require('jsdom')

function normalizeURL(a){
    try {
        const url = new URL(a);
        let rest = url.hostname+url.pathname
        
        if (rest.charAt(rest.length-1)=='/'){
            rest = rest.substring(0,rest.length-1)
        }
        return rest
    } catch(TypeError){
        console.log("input valid URL")
    }
}

function getURLsFromHTML(baseURL, htmlBody){
    const extU = []
    const d = new JSDOM(htmlBody)
    const a = d.window.document.querySelectorAll("a")
    for (const el of a){
        if(el.href.slice(0,1)==="/"){
            try {
                let fere = new URL(el.href, baseURL).href

                extU.push(fere)
            } catch(TypeError) {
                console.log(TypeError.message)

            }
        } else {
        try {
        extU.push(new URL(el.href).href)
        } catch (err){
            console.log(err.message, el.href)
        }
    }
    }
    
    return extU
}

 async function crawlPage(base, currentURL, pages){
    const baseURL = new URL (base)
    const current = new URL (currentURL)
    if (current.hostname !== baseURL.hostname) {
        return pages
    }

    const normCurr = normalizeURL(currentURL)

    if (pages[normCurr]>0){
        pages[normCurr]++
        return pages
    } else {
         
        if (currentURL!==base){
            pages[normCurr] = 1
        } else {
            pages[normCurr] = 0
        }
    }
    let s = ''
    try {const r = await fetch(currentURL);
        console.log("Crawling ", currentURL);

    if (r.status>399){
        console.log("error detected in either your client or the server, returning");
        return pages
    }

    if (!(r.headers.get("content-type")).includes('text/html')){
        console.log("not the right type")
        return pages
    }

    s = await r.text()

        }
    catch(err) {
        console.log(err)
    }

    let listURL = getURLsFromHTML(currentURL, s)
     
    for (ir of listURL) {
        pages = await crawlPage(base, ir, pages)
    }
    return pages
 }

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}