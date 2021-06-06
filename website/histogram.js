
Plotly.d3.csv("data/export.csv", function (csv_data) {
    
  
    // map data from csv to variables
    var time = csv_data.map(d => '2020-01-08 ' + d.time);
    var sentiment = csv_data.map(d => d.sentiment);
    // tweeted whie playing golf
    var golf_play = csv_data.map(d => d.while_playing);
    // tweeted on a day golf was played
    var golf_day = csv_data.map(d => d.played_golf_date);
    // visited golf course but didn't play
    var golf_visit = csv_data.map(d => d.visit_golf);
    // any golf interaction either played or visited
    var golf_all = csv_data.map(d => d.any_golf);

    no_golf = {
        name: "no golf",
        x: time,
        type: 'histogram',
        histnorm: 'percent',
        nbinsx: 24,
        transforms: [{
            type: 'filter',
            target: golf_day,
            operation: '=',
            value: 'false'
        },{
            type: 'filter',
            target: sentiment,
            operation: '<',
            value: '0'
        },{
            type: 'filter',
            target: time,
            operation: '>',
            value: "2020-01-08 0:00"
        }],
        marker: {
            color: "rgba(255, 180, 64, 0.6)",
            line: {
                color:  "rgba(255, 180, 64, 1)", 
                width: 1
            } 
         },
        opacity: 0.75 
    };

    golf = {
        name: "golf",
        x: time,
        type: 'histogram',
        histnorm: 'percent',
        nbinsx: 24,
        transforms: [{
            type: 'filter',
            target: golf_day,
            operation: '=',
            value: 'true'
        },{
            type: 'filter',
            target: sentiment,
            operation: '<',
            value: '0'
        }, {
            type: 'filter',
            target: time,
            operation: '>',
            value: "2020-01-08 0:00"
        }],
        marker: {
            color: "rgba(10, 110, 84, 0.6)", 
             line: {
              color:  "rgba(10, 110, 84, 1)", 
              width: 1
            }
          },
        opacity: 0.5  
    };

    

    var data = [no_golf, golf]


    var layout = {
        title: {
            text:'How Trump tweets while golfing',
            font: {
                family: 'Baskerville-Bold',
                size: 18
            },
 
          },
        font: {
            family: 'Baskerville',
            size: 13
          },
        xaxis: {
            tickformat: '%HH',
            title: "Time"
        },
        yaxis: {
            title: "% of<br>daily<br>tweets",
            xref: 'paper',
            x: 0.5,
            range: [0,16]
        },
        barmode: 'overlay',
        updatemenus: [{
            type: 'buttons',
            x: 1.05,
            xanchor: 'left',
            y: 0.7,
            yanchor: 'top',
            buttons: [{  
                label: 'negative',
                method: 'restyle',
                args: ['transforms[1]', [{
                    type: 'filter',
                    target: sentiment,
                    operation: '<',
                    value: '0'
                }], [0,1]]
            },{  
                label: 'positive',
                method: 'restyle',
                args: ['transforms[1]', [{
                    type: 'filter',
                    target: sentiment,
                    operation: '>',
                    value: '0'
                }], [0,1]]
              }
        ]
        }]
    }

    Plotly.newPlot('histogram', {
        data: data,
        layout: layout
      });
  
  });
  
