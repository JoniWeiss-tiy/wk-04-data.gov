function spitOutData (data) {
  data.map(function(x) {
    dataObj = {
      name: x.name,
      home_town: x.home_town,
      state_or_country: x.state_or_country,
      comment: x.comment
    };
    console.log('dataObj: ', dataObj);
    return dataObj;
  });
}

// function climateData (myData) {
//   console.log("My Data: ",myData);
//   console.log('spitOutData: ', spitOutData);
// }

console.log('async?');
