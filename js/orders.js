import * as main from './main.js';

// Function to load JSON file
function loadJSON(callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "pages/orders/database.json", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText);
      }
    };
    xhr.send(null);
}

function genOrderPage(order) {
    document.getElementById('right').innerHTML = order;
    document.getElementsByClassName('left-list')[0].innerHTML = `<ul class="left-list"><li data-page="orders" class="side-button side-button-red">Rendelések</li></ul>`;
    main.genPageLinks();
}


function setStyle(element,props) {
    const styles = ['color','backgroundColor','textAlign','fontWeight','borderRadius','width'];
    for (let i = 0; i < styles.length; i++) {
        if (props[i] !== null) {
            element.style[styles[i]] = props[i];    
        }
    }
}

// Function to generate table rows from JSON data
function generateTableRows(data) {
  var jsonData = JSON.parse(data);
  //var tbody = document.getElementById("tbody");
  var tbody = document.getElementsByClassName('orders-table-body')[0];
  // Generate table rows
  for (var i = 0; i < jsonData.length; i++) {
    var dataRow = document.createElement("tr");
    var data = new Array();
    for (var key in jsonData[i]) {
        data.push(jsonData[i][key]);
        var cell = document.createElement("td");
        cell.style.padding = '0.5em';
        switch (key) {
            case 'state':
                //1 = 'Megrendelés', 2 = 'Árajánlat', 3 = 'Mentés' 
                switch (jsonData[i][key]) {
                    case 1:
                        cell.innerHTML = `<p>Megrendelés</p>`;
                        setStyle(cell,[null,null,null,'bold',null,null]);
                        break;
                    case 2:
                        cell.innerHTML = `<p>Árajánlat</p>`;
                        setStyle(cell,['green',null,null,null,null,null]);
                        break;
                    case 3:
                        cell.innerHTML = `<p>Mentés</p>`;
                        setStyle(cell,['orange',null,null,null,null,null]);
                        break;
                }
                break;
                case 'warranty':
                    // 1 = 'Igényelt', 2 = 'Feldolgozás alatt', 3 = 'Lezárt'    
                    switch (jsonData[i][key]) {
                        case 1:
                            cell.innerHTML = `<p>Igényelt</p>`;
                            setStyle(cell,['white','red',null,null,null,null]);
                            break;
                        case 2:
                            cell.innerHTML = `<p>Feldolgozás alatt</p>`;
                            setStyle(cell,['black','yellow',null,null,null,null]);
                            break;
                        case 3:
                            cell.innerHTML = `<p>Lezárt</p>`;
                            setStyle(cell,['white','green',null,null,null,null]);
                            break;
                        case 4:
                            cell.innerHTML = `<p>Nem teljesült</p>`;
                            setStyle(cell,['white','purple',null,null,null,null]);
                            break;
                    }    
                break;
          default:
            cell.innerHTML = jsonData[i][key];
            break;
        }
        dataRow.appendChild(cell);
    }
    
    cell = document.createElement("td");
    let linkWrap = document.createElement("div");
    linkWrap.innerHTML = `<p class="order-link">Megtekint</p>`;
    linkWrap.addEventListener('click', () => {
        genOrderPage(data);
      });
    linkWrap.addEventListener('mouseover', () => {
        linkWrap.style.backgroundColor = 'red';
    });
    linkWrap.addEventListener('mouseout', () => {
        linkWrap.style.backgroundColor = 'rgb(61, 75, 96)';
    });
    linkWrap.style.padding = '0.4em';
    setStyle(linkWrap,['white','rgb(61, 75, 96)',null,null,'0.4em','fit-content']);
    cell.appendChild(linkWrap);
    dataRow.appendChild(cell);
    tbody.appendChild(dataRow);
  }
}

export {loadJSON,generateTableRows};

// Load JSON and generate table rows
//loadJSON(generateTableRows);