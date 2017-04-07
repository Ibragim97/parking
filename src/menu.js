import React from "react";
import ReactDOM from "react-dom";
import Backendless from 'backendless';

var initBackendless = function() {
    var appId = '8ECC9AB1-F78D-B692-FF0A-3EA83F3E7E00';
    var secretKey = 'C7BE0F1B-9F10-7F78-FF4D-F2A0A3008900';
    var appVer = 'v1';
    Backendless.initApp(appId, secretKey, appVer);
}
initBackendless();

function City(args) {
    args = args || {};
    this.title = args.title || "";
}

var query = new Backendless.DataQuery(); 
query.options = {pageSize :100 };

var dataCollection = Backendless.Persistence.of( City ).find(query);
var data = dataCollection.data;
console.log(data);

function openRef(city) {
	ReactDOM.unmountComponentAtNode(question);
	ReactDOM.render(<Page city={city}/>, question);
}

class Answers extends React.Component {
  
  render() {
  	function reference(j) {
    	openRef(args[j].data);
    }

    var opts = data.map(function(obj, j) {
      return ( 
          <div id = "block" key={'ans_' + j}>
            <h2> {obj.title} </h2>
            <div class="optImg">
              
            	<img onClick={() => reference(j)} src = {obj.img1} alt = {obj.city}/>
              
            </div>
          </div>
      );
    });

    return (
        <div>
          {opts}
        </div>
    );
  }
}

//	ReactDOM.render(<Menu />, question);
	ReactDOM.render(<Menu />, question);

