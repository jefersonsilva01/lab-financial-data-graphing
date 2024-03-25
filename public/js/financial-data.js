let inputFromDate = document.getElementById('inputFromDate');
let inputToDate = document.getElementById('inputToDate');
let selectCurrency = document.getElementById('currency');
let minValue = document.getElementById('minValue');
let maxValue = document.getElementById('maxValue');

let from, to, currency, min = 0, max = 0, chart

getDatas = () => {
  from = document.getElementById('inputFromDate').value;
  to = document.getElementById('inputToDate').value;
  currency = document.getElementById('currency').value;

  getData();
}

inputFromDate.onchange = () => {
  getDatas();
}

inputToDate.onchange = () => {
  getDatas();
}

selectCurrency.onchange = () => {
  getDatas();
}

renderChart = (data) => {
  let labels = Object.keys(data);
  let values = Object.values(data);

  if (chart !== undefined) chart.destroy();

  let canvas = document.getElementById('chart').getContext('2d');

  chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: currency,
          data: values,
          fill: "rgb(255, 50, 52)",
          borderColor: "rgb(222, 10, 122)",
        }
      ]
    }
  });
}

updateMinMax = data => {
  min = data[0]
  max = data[0];
  data.forEach(element => {
    if (element > max) max = element;
    if (element < min) min = element;
  });

  minValue.innerText = min;
  maxValue.innerText = max;
}

getData = () => {
  if (from && to) {
    axios
      .get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`)
      .then(response => {
        renderChart(response.data.bpi);
        updateMinMax(Object.values(response.data.bpi));
      })
      .catch(err => {
        console.log(err);
      });
  }
}
