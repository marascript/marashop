// ==UserScript==
// @name             Item Parser
// @match            https://www.marapets.com/wishlist.php*
// @version          1.0
// @grant            GM.setClipboard
// ==/UserScript==

const insertCsv = [["id", "item_name", "shop_id"]]
const SHOP_ID = 41
      //document.URL.split("shop=")[1]
const items = document.querySelectorAll(".itemwidth")

for (let item of items) {
  if (!item.querySelector(".offline")) {
    
    const itemId = item.id.split("eachitemdiv")[1]
    const itemName = item.querySelector(".bigger").textContent

    insertCsv.push([
      itemId, itemName, SHOP_ID, 
    ])
  }
}

GM_setClipboard((insertCsv.map(e => e.join(",")).join("\n")))
