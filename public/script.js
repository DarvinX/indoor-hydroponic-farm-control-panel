const zero_data = new Array(7).fill(0)
var database;
window.addEventListener("DOMContentLoaded", () => {
  var humidity_config = get_config([
    get_default_dataset("Humidity(Seni)", "#b71705"),
    get_default_dataset("Humidity(Bag)", "#000000"),
  ])

  var temp_config = get_config([
    get_default_dataset("Temp(Seni)", "#e72705"),
    get_default_dataset("Temp(Hansda)", "#6a2c70"),
    get_default_dataset("Temp(Bag)", "#000000"),
  ])

  var air_config = get_config([
    get_default_dataset("Air Pressure", "#e727e5")
  ])

  var humidity_chart = get_chart("humidity_canvas", humidity_config);
  var temp_chart = get_chart("temp_canvas", temp_config);
  var air_chart = get_chart("air_canvas", air_config);


  database = firebase.database()

  chart_update_from_database(database, "/hansda/air", air_chart)
  chart_update_from_database(database, "/SUPRIYO/Humidity", humidity_chart)
  chart_update_from_database(database, "/Voda/Humidity", humidity_chart, 1)
  chart_update_from_database(database, "/SUPRIYO/Temperature", temp_chart)
  chart_update_from_database(database, "/hansda/temp", temp_chart, 1)
  chart_update_from_database(database, "/Voda/Temperature", temp_chart, 2)

  updateSliders()
});

// Handle control signals
function sliderChange(element) {
  console.log(element.id, element.value);
  database.ref("/controls/" + element.id).set(Number(element.value))
}

function updateSliders(id = undefined, value = undefined) {
  if (id && value) {
    document.getElementById(id).value = Number(value);
  } else {
    database.ref("/controls").once('value', snapshot => {
      // console.log(snapshot);
      snapshot.forEach(childSnapshot => {
        updateSliders(childSnapshot.key, childSnapshot.val())
      })
    })
  }
}


function get_default_dataset(label, color) {
  return {
    label: label,
    data: zero_data,
    fill: false,
    borderColor: color,
    borderWidth: 2,
    tension: 0.1
  }
}

function get_chart(canvas_name, config) {
  var _chart = new Chart(document.getElementById(canvas_name).getContext("2d"),
    config);
  return _chart;
}

function chart_update_from_database(database, database_location, chart, dataset_index = 0) {
  var database_ref = database.ref(database_location)
  var first = true;

  database_ref.limitToLast(7).once('value', (snapshot) => {
    // console.log(snapshot.val);
    var data = []
    snapshot.forEach((childSnapshot) => {
      data.push(childSnapshot.val())
      // console.log("I loaded");
    });
    // console.log(data);
    chart.data.datasets[dataset_index].data = data;
    chart.update();
  });

  database_ref.limitToLast(1).on("value", (snapshot) => {
    if (first) {
      first = false
    } else {
      snapshot.forEach((childSnapshot) => {
        var data = childSnapshot.val()
        chart.data.datasets[dataset_index].data.shift()
        chart.data.datasets[dataset_index].data.push(data)

        // console.log(data);
        chart.update()
      })
    }
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

