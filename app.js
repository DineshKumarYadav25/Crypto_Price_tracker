const URL = "https://api.coinlore.net/api/tickers/?start=0&limit=100";
const amount = document.querySelector(".price");
const coinImg = document.querySelector(".coinImage");
const img = document.querySelector(".img");
const selects = document.querySelectorAll(".dropdown select");
const coinheading = document.querySelector(".content .coin .coinheading");
const refresh = document.querySelector(".refresh");
const change24h = document.querySelector(".change #per");
const mcap = document.querySelector("#mcap");
const csupply = document.querySelector("#csupply");
const tsupply = document.querySelector("#tsupply");
const per1h = document.querySelector("#per1h");
const per7d = document.querySelector("#per7d");
const moon = document.querySelector(".navi i");
const tracker = document.querySelector(".tracker");
const data = document.querySelector(".data");
const dropdown = document.querySelector(".dropdown");
const slt = document.querySelector("#down");
const body = document.querySelector("body");



for(let select of selects){
    select.addEventListener("change",(coin)=>{
        console.log(coin.target.value);
        updateAmount(coin.target.value);
        updateCoinHeading(coin.target.value) ;
        updateChange(coin.target.value);
        updateSupply(coin.target.value);
        updateImage(coin.target.value);
    }) 
}

function updateSupply(selectedCoinId){
    const coin = coinsData.find(c=> c.id ==selectedCoinId);
    if(!coin) return;
    mcap.textContent = `${coin.market_cap_usd}`;
    csupply.textContent = `${coin.csupply}`;
    tsupply.textContent = `${coin.tsupply}`;
}


function updateImage(selectedCoinId){
    const coin = coinsData.find(c=>c.id == selectedCoinId);
    if(!coin) return;
    let temp = `https://cryptologos.cc/logos/${coin.nameid}-${coin.symbol.toLowerCase()}-logo.png`;
    coinImg.src = temp;
    img.src = temp;
}


function updateChange(selectedCoinId){
    
    const coin = coinsData.find(c=> c.id==selectedCoinId);
    if(!coin) return;
    change24h.textContent = `${coin.percent_change_24h}%`;
    per1h.textContent = `${coin.percent_change_1h} %`;
    per7d.textContent = `${coin.percent_change_7d} %`;
    const change = Number(coin.percent_change_24h);
    const change1h = Number(coin.percent_change_1h);
    const change7d = Number(coin.percent_change_7d);
    
    if(change<0){
        change24h.style.color="red";
    }
    else change24h.style.color="green";

    if(change1h<0){
        per1h.style.color="red";
    }
    else per1h.style.color="green";

    if(change7d<0){
        per7d.style.color="red";
    }
    else per7d.style.color="green";


}

function updateCoinHeading(selectedCoinId){
    const coin = coinsData.find(c=> c.id ==selectedCoinId);
    if(!coin) return;
    coinheading.textContent = `${coin.name}`;
}

function updateLastUpdated() {
  const el = document.querySelector(".lastUpdated");
  const now = new Date();

  el.textContent = `Last updated: ${now.toLocaleTimeString()}`;
}


function populateDropdown(){
    for(let select of selects){
        select.innerHTML = "";
        coinsData.forEach(coin=>{
            const newoption = document.createElement("option");
            newoption.value = coin.id;
            newoption.textContent = `${coin.name}`;
            select.append(newoption);
        });
    }
    
}

let prevPrice={};
function updateAmount(selectedCoinId){
    const coin = coinsData.find(c=>c.id==selectedCoinId);
    if(!coin) return;
    const newPrice = Number(coin.price_usd);
    if(prevPrice[selectedCoinId] !==undefined){
        if(newPrice>prevPrice[selectedCoinId]){
            amount.style.color="green";
        }
        else if(newPrice<prevPrice[selectedCoinId]){
            amount.style.color="red";
        }
        else amount.style.color="white";
    }
    prevPrice[selectedCoinId] = newPrice;
    amount.textContent = newPrice;
}


let coinsData=[];

async function getCoins(selectedCoinId){
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    coinsData= data.data;
    if(selects[0].options.length === 0){
        populateDropdown();
    }
    start(selectedCoinId);
    updateLastUpdated();
}
getCoins();


setInterval(() => {
    const selectedCoinId = selects[0].value;
    getCoins(selectedCoinId);
}, 10000);

function start(selectedCoinId){
    
    //populateDropdown();
    const CoinId = selectedCoinId || coinsData[0].id;
    for(let select of selects){
        select.value = CoinId;
    }
    updateAmount(CoinId);
    updateCoinHeading(CoinId);
    updateChange(CoinId);
    updateSupply(CoinId);
    updateImage(CoinId);
}


let iswhite=false;
moon.addEventListener("click",()=>{
    if(iswhite){
        tracker.style.backgroundColor ="rgb(32, 31, 31)";
        iswhite=false;
        tracker.style.color = "white";
        data.style.backgroundColor="rgba(51, 51, 51, 0.895)"
        slt.style.backgroundColor = "rgb(32, 31, 31)";
        slt.style.color="white";
        dropdown.style.backgroundColor = "rgb(32, 31, 31)";
        body.style.backgroundColor = "rgb(75, 75, 75)";
    }
    else{
        tracker.style.backgroundColor = "#FFEBCC";
        iswhite=true;
        tracker.style.color = "black";
        data.style.backgroundColor="#BFDDF0"
        slt.style.backgroundColor = "#BFDDF0";
        slt.style.color="black";
        dropdown.style.backgroundColor = "#BFDDF0";
        body.style.backgroundColor = "#fefae0";

    }
});






