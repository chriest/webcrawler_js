const { test, expect } = require("@jest/globals")
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test("empty string", ()=>{
    expect(normalizeURL("")).toBe()
});

test("no arg", ()=>{
    expect(normalizeURL()).toBe()
});

test("num", ()=>{
    expect(normalizeURL(4235345)).toBe()
});

test("string no address", ()=>{
    expect(normalizeURL("peter")).toBe()
});

test("nil arg", ()=>{
    expect(normalizeURL(null)).toBe()
});

test("callback arg", ()=>{
    expect(normalizeURL(()=>{return "pyotr"})).toBe()
});

test("normal", ()=>{
    expect(normalizeURL("https://you.know.an/actual/url")).toBe("you.know.an/actual/url")
});

test("http trailing /", ()=>{
    expect(normalizeURL("http://you.know.an/actual/url/")).toBe("you.know.an/actual/url")
});


test("url absolute", ()=>{
    expect(getURLsFromHTML(`https://boot.dev`, `<a href="/this">fnisdfnsdins</a>`)).toEqual(["https://boot.dev/this"])
});

test("document absolute", ()=>{
    expect(getURLsFromHTML("www.w3school.com", `<!DOCTYPE html>
    <html>
    <body>
    
    <h2>HTML Links</h2>
    <p>HTML links are defined with the a tag:</p>
    
    <a href="https://www.w3schools.com/arle">This is a link</a>
    <a href="https://www.w4schools.com/cren">This is a link</a>
    <a href="https://www.w5schools.com/der">This is a link</a>
    <a href="https://www.w6schools.com/eses">This is a link</a>
    <a href="https://www.w7schools.com/free">This is a link</a>
    
    </body>
    </html>
    
    `)).toEqual(["https://www.w3schools.com/arle","https://www.w4schools.com/cren","https://www.w5schools.com/der","https://www.w6schools.com/eses","https://www.w7schools.com/free"])
});