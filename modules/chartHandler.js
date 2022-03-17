anychart.onDocumentReady(function() {

    // create the data
    var data = {
      header: ["Country", "Number of cases"],
      rows: [
        ["Grass", grassArr.length],
        ["GrassEater", grassEaterArr.length],
        ["Predator", predatorArr.length],
        ["Bomber", BomberArr.length],
        ["Black", BlackArr.length],
    ]};
   
    var chart = anychart.column();
   
    chart.data(data);
   
    chart.title("Bar Chart");
   
    chart.container("container");
  
    chart.draw();
   
  });