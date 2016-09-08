var chart = c3.generate({
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ],
          onclick: function (d, element) { console.log("onclick", d, element); },
          onmouseover: function (d) { console.log("onmouseover", d); },
          onmouseout: function (d) { console.log("onmouseout", d); },
        }
      });
	  
var chart1 = c3.generate({
        bindto: '#chart1',
        data: {
          columns: [
            ['data1', 300, 350, 300, 0, 0, 0],
            ['data2', 130, 100, 140, 200, 150, 50]
          ],
          type: 'area-spline'
        }
      });
function generateData(n) {
        var column = ['sample'];
        for (var i = 0; i < n; i++) {
          column.push(Math.random() * 500);
        }
        return column;
      }
 var chart1 = c3.generate({
        bindto: '#chart2',
        data: {
          columns: [
            generateData(100)
          ],
        },
        axis: {
          x: {
            default: [30, 60]
          }
        },
        zoom: {
          enabled: true,
          onzoomstart: function (event) {
            console.log("onzoomstart", event);
          },
          onzoomend: function (domain) {
            console.log("onzoomend", domain);
          },
        },
        subchart: { show: true }
      });