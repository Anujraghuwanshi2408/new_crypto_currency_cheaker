let data = [];

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(responseData => responseData.json())
.then(result => {
    data = result;
    console.log(data);
    renderTable(data);
})
.catch(error => console.error('Error:', error));

// display function

function renderTable(data){
    console.log(data , "display function called");
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    data.forEach(item => {
        const row = document.createElement("tr");
        const percentageChange = item.price_change_percentage_24h   ;
        const percentageChangeClass = percentageChange>=0?'positive-change':'negative-change';


        row.innerHTML = `
        <td id="data1"><img src="${item.image}" alt="${item.name}" width="20" /><td>
        <td>${item.name}</td>
        <td>${item.symbol}</td>
        <td>${item.id}</td>
        <td>${"$"+item.current_price}</td>
        <td class="${ percentageChangeClass}">${ item.price_change_percentage_24h}</td>
        <td>${"Mkt Cap : $"+item.total_volume}</td>

        `
        tableBody.appendChild(row);
    });
    
}
    // search function

    document.getElementById("search").addEventListener('keyup' , event=>{
        // let count = 0;
        // console.log(count++);
        const search = document.getElementById('search').value.trim().toLowerCase();
        if(search == ''){
            renderTable(data);
            return;
        }
        

        const filteredData = data.filter(item => {
            const itemName = item.name.toLowerCase();
            const itemSymbol = item.symbol.toLowerCase();
             return itemName.includes(search) || itemSymbol.includes(search);
        })
        renderTable(filteredData);
      

    })
     
    //sort function 1

    document.getElementById('sortMarketCapButton').addEventListener('click' , () =>{
             data.sort((a ,b)=>{
                return b.total_volume-a.total_volume;
             })
             renderTable(data);
    })  


    // sort function 2

    document.getElementById('sortPercentageChangeButton').addEventListener("click" , () =>{
         data.sort((a , b)=>{
            return b.price_change_percentage_24h - a.price_change_percentage_24h;
         })
         renderTable(data);
    })
