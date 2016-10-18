/* https://open.whitehouse.gov/ data from the
   Climate Change Adaptation Task Force
*/

var ourData = {};

window.onload = function climateChange () {

  let url = 'https://open.whitehouse.gov/resource/ybwj-5tg8.json'

    var jQueryPromise = $.ajax({
        dataType: "json",
        url: url,
        data: {
          "$limit" : 100
          }
        });

    var realPromise = Promise.resolve(jQueryPromise);   realPromise.then(function(response) {
          // for dev, demo, etc.
          // console.log('response',response);
          ourData = response;
          console.log('response: ', response);
          spitOutData(ourData);
          return ourData;
        }).catch (function(err){
          // for dev, demo, etc.
          // console.log('err', err);
       });
};
