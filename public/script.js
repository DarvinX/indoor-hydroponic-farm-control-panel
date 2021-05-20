window.addEventListener("DOMContentLoaded", () => {
  console.log("I ran");

  var ctx = document.getElementById("humidity_canvas").getContext("2d");
  var temp = document.getElementById("temp_canvas").getContext("2d");
  var air = document.getElementById("air_canvas").getContext("2d");

const labels = ["-6", "-5", "-4", "-3", "-2", "-1", "0"]

  var humidity = {
    type: "line",
    data: {
      labels: labels,

      datasets: [
        {
          label: "humidity",
          data: [12, 19, 3, 5, 2, 3, 7],
          fill: false,
          borderColor: "#b71705",
          borderWidth: 2,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  var temp_config = {
    type: "line",
    data: {
      labels: labels,

      datasets: [
        {
          label: "temp",
          data: [20, 19, 23, 25, 31, 31, 27],
          fill: false,
          borderColor: "#e72705",
          borderWidth: 2,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };


  var air_config = {
    type: "line",
    data: {
      labels: labels,

      datasets: [
        {
          label: "Air Pressure",
          data: [44, 49, 43, 45, 41, 31, 37],
          fill: false,
          borderColor: "#e727e5",
          borderWidth: 2,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  var humidity_chart = new Chart(ctx, humidity);
  var temp_chart = new Chart(temp, temp_config);
  var air_chart = new Chart(air, air_config);





});
