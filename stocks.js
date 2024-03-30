var chart; 
function fetchStockData(ticker, days) {
    var apiKey = 'GwlHQ_Axj00p6V06DzB8EU0L1b8IpQb6';
    
    // Calculate the date range based on the selected number of days
    var endDate = new Date();
    var startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - days);
    
    // Format the start and end dates as strings
    var startDateString = startDate.toISOString().split('T')[0]; // Extract date part
    var endDateString = endDate.toISOString().split('T')[0]; // Extract date part
    
    // Construct the API URL with the date range
    var apiUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDateString}/${endDateString}?adjusted=true&apiKey=${apiKey}`;
    
    // Fetch the data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var dates = data.results.map(result => new Date(result.t).toLocaleDateString());
            var closingValues = data.results.map(result => result.c);
            
            if (chart) {
                chart.destroy();
            }
            
            var ctx = document.getElementById('chart').getContext('2d');
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: ticker,
                        data: closingValues,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }
            });
        });
}



document.getElementById('stockLookupForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var ticker = document.getElementById('stockTicker').value;
    var days = document.getElementById('days').value;
    fetchStockData(ticker, days);
});

fetchTopStocks();

if (annyang) {
    var commands = {
        'lookup :stock': function(stock) {
            document.getElementById('stockTicker').value = stock;
            fetchStockData(stock, 30);
        },
        'hello': function () {
            alert('Hello, World');
          },
          'change the color to :color': function (color) {
            document.body.style.backgroundColor = color;
          },
          'navigate to :page': function (page) {
            window.location.href = page.toLowerCase() + '.html';
          }
    };

    annyang.addCommands(commands);

    document.getElementById('audioOn').addEventListener('click', function() {
        annyang.start();
    });

    document.getElementById('audioOff').addEventListener('click', function() {
        annyang.abort();
    });
}
