import * as orders from './orders.js';

const containers = ['left','right'];

function loadScript(url, defer, callback) {
  var script = document.createElement('script');
  script.setAttribute('type', 'module');
  script.src = url;
  script.defer = defer;
  script.onload = function() {
    if (typeof callback === 'function') {
      callback();
    }
  };
  document.head.appendChild(script);
}

function resizeSceneDOM(parentElement,scneneDOM) {
  scneneDOM.width = parentElement.clientWidth;
  scneneDOM.height = parentElement.clientHeight;
}


const genPageScripts = {
  'admin': function() {},
  'landing': function() {
    //const scneneDOM = document.getElementById('scene');
    //const parentElement = document.getElementById('right');
    //resizeSceneDOM(scneneDOM,parentElement);
    //window.addEventListener('resize', resizeSceneDOM);
  },
  'planning': function() {},
  /*function() {
    loadScript('js/planning.js',true, function() {
      // Code to execute after the script has been loaded
    });
  },*/
  //'orders-history': () => genOrderHistory(),
  'orders': () => {orders.loadJSON(orders.generateTableRows)},
  'order': function() {}
};

function genPageLinks() {
  const leftList = document.querySelector('.left-list');
  const listItems = leftList.querySelectorAll('li');
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      loadPage(page);
    });
  });
}

function genToolLinks() {
  const tools = document.getElementsByClassName('tool');
  Object.keys(tools).forEach(key => {
    tools[key].addEventListener('click', () => {
      const page = tools[key].dataset.page;
      loadPage(page);
    });
  });
}

function loadPage(page) {
    containers.forEach(e => {
        fetch(`pages/${page}/${e}.html`)
        .then(response => response.text())
        .then(html => {
          document.getElementById(`${e}`).innerHTML = html;
          switch (e) {
            case 'left':
              genPageLinks();
              break;
            case 'right':
              genPageScripts[page]();
              break;
            default:
              break;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
};

loadPage('landing');
genToolLinks();

export {genPageLinks}


