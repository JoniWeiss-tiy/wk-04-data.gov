let data_processing_module = (function () {
  const table = document.querySelector('#table-data');

  function setData (data) {
    console.log("processing data...");
    data.map(displayData);
  }

  function displayData(entry) {
    console.log('entry: ', entry);
    const row = "<tr>\n\t<td class='name'>" + entry.name
            + "</td>\n\t<td class='town'>" + entry.home_town
            + "</td>\n\t<td class='state'>" + entry.state_or_country
            + "</td>\n\t<td>" + entry.comment
            + "</td>\n</tr>\n";
    console.log('row: ', row);
    document.querySelector('#table-data').innerHTML += row;
    }
    return {
      setData: setData
    }
  })();

let api_module = function() {
  let url = 'https://open.whitehouse.gov/resource/ybwj-5tg8.json'

    var jQueryPromise = $.ajax({
        dataType: "json",
        url: url,
        data: {
          "$limit" : 100
          }
        });

    var realPromise = Promise.resolve(jQueryPromise);   realPromise.then(function(response) {
          data_processing_module.setData(response);
          return response;
        }).catch (function(err){
       });
};

window.onload = function climateChange () {
  api_module();
}
