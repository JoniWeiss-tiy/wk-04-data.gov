'use strict';
console.log("Page loaded: ", document.title);

let data_processing_module = (function () {
  const table = document.querySelector('#table-data');
  let data = {};

  function resetTable(header) {
    const thBegin = "<tr>\n\t";
    const thName = "<th class='name'>Name</th>\n\t";
    const thTown = "<th class='town'>Home Town</th>\n\t";
    const thState = "<th class='state'>State</th>\n\t";
    const thComment = "<th class='comments'>Comments</th>\n\t";
    const thEnd =  "</tr>\n\t";
    const row = thBegin + thName + thTown + thState + thComment + thEnd;
    document.querySelector('#table-header').innerHTML = row;
    document.querySelector('#table-data').innerHTML = '';
  };

  function genTableRows(entry) {
    const row = "<tr>\n\t<td class='name'>" + entry.name
    + "</td>\n\t<td class='town'>" + entry.home_town
    + "</td>\n\t<td class='state'>" + entry.state_or_country
    + "</td>\n\t<td class='comments'>" + entry.comment
    + "</td>\n</tr>\n";
    // console.log('row: ', row);
    document.querySelector('#table-data').innerHTML += row;
  };

  function filterByID(obj) {
    if (obj.id !== undefined && typeof(obj.id) === 'number' && !isNaN(obj.id)) {
      return true;
    } else {
      invalidEntries++;
      return false;
    }
  };

  function matchInput(str) {
    let stObj = {};
    if (str.length === 2) { // Is a 2-letter abbreviation
      str = str.toUpperCase();
    } else {
      str = str.toLowerCase();
    }
    stObj = stateLookup.find(function(st) {
      if (st.abbr === str ||
          st.state.toLowerCase() === str ||
          st.state.toLowerCase().includes(str)) {
            return { state: st.state, stAbbr: st.abbr };
      }
    });
    console.log('stObj: ', stObj);
    return stObj;
  };

  function getInput() {
    resetTable();
    let userInput = document.querySelector('#userInput')
    .value
    .toLowerCase();
    if (!userInput) { // Input was empty -- send all data.
      data.map(genTableRows);
      return false;
    } else { // match input with state info
      let { state , abbr } = matchInput(userInput);

      data.filter(function(row) {
        if (row.state_or_country === state ||
            row.state_or_country === abbr ) {
          return row;
        };
      }).map(genTableRows);
    }
  };

  function setData (jsonData) {
    data = jsonData;
    resetTable();
    data.map(genTableRows);
  };

  return {
    setData: setData,
    getInput: getInput
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
          // console.log("err: ", err);
       });
};


window.onload = function climateChange () {
  api_module();
}

document.querySelector('button').onclick = data_processing_module.getInput;
