function KxMailAPI(url, type, json, GETcontent=null) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4) {
            GETcontent = xhr.responseText
            if (xhr.status === 200 || GETcontent.includes("requires")) {
                GETcontent = JSON.parse(GETcontent)
            }
        }
    }
    xhr.open(type, url, false)
    xhr.setRequestHeader("Content-Type", "application/json")
    for (let i = 0; i < Object.keys(json).length; i++) {
        xhr.setRequestHeader(Object.keys(json)[i], JSON.stringify(Object.values(json)[i]))
    }
    xhr.send()
    return GETcontent
}
KxMailAPI.check = function (email) {
    return KxMailAPI("https://kxmailapi.tk/aliases/check", "POST", {dest: email})
}
KxMailAPI.create = function (data, alias, email) {
    return KxMailAPI("https://kxmailapi.tk/aliases", "POST", {data: data, alias: alias, dest: email})
}
KxMailAPI.delete = function (data, alias) {
    return KxMailAPI("https://kxmailapi.tk/aliases", "DELETE", {data: data, alias: alias})
}
KxMailAPI.append = function (data1, data2) {
    return KxMailAPI("https://kxmailapi.tk/aliases/append", "PATCH", {data1: data1, data2: data2})
}
KxMailAPI.ping = function () {
    return KxMailAPI("https://kxmailapi.tk/ping", "GET", "")
}
KxMailAPI.domains = function () {
    return KxMailAPI("https://kxmailapi.tk/domains", "GET", "")
}
