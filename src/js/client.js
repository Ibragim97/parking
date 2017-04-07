import React from "react";
import ReactDOM from "react-dom";
import Backendless from 'backendless';


const app = document.getElementById('app');

var initBackendless = function() {
    var appId = 'EA27E442-4B25-C0F2-FFF5-768AFFBD6500';
    var secretKey = '031DC9AB-0165-30D5-FF00-ADFBC3EEA800';
    var appVer = 'v1';
    Backendless.initApp(appId, secretKey, appVer);
}
initBackendless();

function Plate(args) {
    args = args || {};
    this.title = args.title || "";
    this.number = args.number || "Не распознано";
    this.created = args.created || "";
}

function BlackList(args) {
    args = args || {};
    this.title = args.title || "";
    this.number = args.number || "Не распознано";
    this.created = args.created || "";
}


var query = new Backendless.DataQuery(); 
query.options = {pageSize :100 };

var dataCollection = Backendless.Persistence.of( Plate ).find(query);
var data = dataCollection.data;
console.log(data);
var blacklistCollection = Backendless.Persistence.of( BlackList ).find(query);
var blacklist = blacklistCollection.data;
console.log(blacklist);

function getTime(epoch) {
  var d = new Date(epoch); 
  var h = d.getHours() + "";
  var m = d.getMinutes() + "";

  if(h.length == 1)
    h = "0" + h;
  if(m.length == 1)
    m = "0" + m;
  return h + ":" + m;
}

function getDate(epoch) {
  var date = new Date(epoch); 
    
  return date.getMonth() + "/" +
    date.getDate() + "/" +
    date.getFullYear();
}

function isOnBlacklist(number) {
  for(var i = 0; i < blacklist.length; i++)
    if(blacklist[i].number == number)
      return 1;
  return 0;
}

var rows = data.map(function(obj, j) {
  return ( 
    <tr key={'opt_' + j}>
      <td> {obj.number} </td>
      {isOnBlacklist(obj.number) ? <td class = "ban"> Запрещено </td> : <td class = "pass"> OK </td>}
      <td> {getTime(obj.created)} </td>
      <td> {getDate(obj.created)} </td>
      
    </tr>
  );
});

class Main extends React.Component {
  
  render() {


    return (

        <div>
          <h1> Въезд машин </h1>
	         <table>
            <tbody>
              <tr>
                <th>Номер машины</th>
                <th>Статус </th>
                <th>Время </th>
                <th>Дата</th>
              </tr>
            </tbody>
            <tbody>
              {rows}
            </tbody>
          </table>
	    			
        </div>
    );
  }
}

ReactDOM.render(<Main />, app);




