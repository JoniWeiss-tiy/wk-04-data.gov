console.log("Page loaded: ", document.title);

let data_processing_module = (function () {
  const table = document.querySelector('#table-data');

  function genTableHeader(header) {
    const thBegin = "<tr>\n\t";
    const thName = "<th class='name'>Name</th>\n\t";
    const thTown = "<th class='town'>Home Town</th>\n\t";
    const thState = "<th class='state'>State</th>\n\t";
    const thComment = "<th class='comments'>Comments</th>\n\t";
    const thEnd =  "</tr>\n\t";
    const row = thBegin + thName + thTown + thState + thComment + thEnd;
    document.querySelector('#table-header').innerHTML = row;
  }

  function setData (data) {
    console.log("processing data...");
    genTableHeader();
    data.map(displayData);
  }


  function displayData(entry) {
    console.log('entry: ', entry);
    const row = "<tr>\n\t<td class='name'>" + entry.name
            + "</td>\n\t<td class='town'>" + entry.home_town
            + "</td>\n\t<td class='state'>" + entry.state_or_country
            + "</td>\n\t<td class='comments'>" + entry.comment
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
          "$limit" : 50
          }
        });
    var realPromise = Promise.resolve(jQueryPromise);

    realPromise.then(
        //Success:
        function(response) {
          data_processing_module.setData(response);
          return response;
        })
        // Fail:
        .catch (function(err){
          console.log("err: ", err);
       });
};


window.onload = function climateChange () {
  api_module();
}
