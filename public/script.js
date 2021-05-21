window.addEventListener("DOMContentLoaded", () => {

  const zero_data = new Array(7).fill(0)
  // console.log(zero_data);

  var humidity_config = get_config([
    {
      label: "humidity",
      data: zero_data,
      fill: false,
      borderColor: "#b71705",
      borderWidth: 2,
      tension: 0.1,
    },
  ])

  var temp_config = get_config([
    {
      label: "temp",
      data: zero_data,
      fill: false,
      borderColor: "#e72705",
      borderWidth: 2,
      tension: 0.1,
    },
  ])

  var air_config = get_config([
    {
      label: "Air Pressure",
      data: zero_data,
      fill: false,
      borderColor: "#e727e5",
      borderWidth: 2,
      tension: 0.1,
    },
  ])

  var humidity_chart = get_chart("humidity_canvas", humidity_config);
  var temp_chart = get_chart("temp_canvas", temp_config);
  var air_chart = get_chart("air_canvas", air_config);


  var database = firebase.database()

  chart_update_from_database(database, "/hansda/air", air_chart)
});

function get_chart(canvas_name, config) {
  var _chart = new Chart(document.getElementById(canvas_name).getContext("2d"),
    config);
  return _chart;
}

function chart_update_from_database(database, database_location, chart) {
  var database_ref = database.ref(database_location)

  database_ref.limitToLast(7).once('value', (snapshot) => {
    // console.log(snapshot.val);
    var data = []
    snapshot.forEach((childSnapshot) => {
      data.push(childSnapshot.val())
      // console.log("I loaded");
    });
    console.log(data);
    chart.data.datasets[0].data = data;
    chart.update();
  });

  database_ref.limitToLast(1).on("value", (snapshot) => {
    // const data = snapshot[0].val();

    snapshot.forEach((childSnapshot) => {
      var data = childSnapshot.val()
      chart.data.datasets[0].data.shift()
      chart.data.datasets[0].data.push(data)

      // console.log(chart.data.datasets[0].data);
      console.log(data);
      chart.update()
    })


  })

}



function get_config(datasets) {
  const labels = ["-6", "-5", "-4", "-3", "-2", "-1", "0"]

  return {
    type: "line",
    data: {
      labels: labels,

      datasets: datasets
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  };

}