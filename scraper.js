// https://www.amazon.com/s/ref=sr_pg_1?fst=as%3Aon&rh=n%3A165793011%2Cn%3A166092011%2Ck%3Alego&keywords=lego&ie=UTF8&qid=1476295776&spIA=B01CVGV9RS,B01CVGVB6W,B01CIGN8WA,B01CVGV66W,B01CVGV93C,B01CVGVEBO

var json = {
  "loading": false,
  "budget": 500,
  "budgetUsed": 0,
  "legos": {},
  "shopList": [],
  "cartList": []
};

document.querySelectorAll(".s-item-container").forEach(el => {
    var name = el.querySelector("h2[data-attribute]").innerText;
    var url = el.querySelector(".a-spacing-base img").src;
    var price = Number(el.querySelector("span.s-price").innerText.trim().substring(1));

    var lego = {
        id: String(parseInt(Math.random()*100000000)),
        name: name,
        price:price,
        thumbnail: url
    };
    json.legos[lego.id] = lego;
    json.shopList.push(lego.id);
});

console.log(JSON.stringify(json));
