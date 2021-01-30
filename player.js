var responseObject;
var __5szm2kaj;
var steps;
var element;
var height = 0;
var width = 0;
var t;
var l;
var script;
var link;
var gls;


// installing jquer
script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

gls = document.createElement("script");
gls.src = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867';
document.body.appendChild(gls);


// using css provided
link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://guidedlearning.oracle.com/player/latest/static/css/stTip.css';
document.head.appendChild(link);


// creating the tooltip
function createToolTip (content, left, top) {
    let sttipDiv = document.createElement('div');
    sttipDiv.id = 'tooltip' + currentStep.id;
    sttipDiv.classList.add("sttip");
    sttipDiv.style.position = "fixed";
    sttipDiv.style.top = top;
    sttipDiv.style.left = left;
    sttipDiv.style['z-index'] = 100000;

    let tooltipIn = document.createElement('div');
    tooltipIn.className = "tooltip in";

    let tooltipArrow = document.createElement('div');
    tooltipArrow.className = "tooltip-arrow";

    let tooltipSecondArrow = document.createElement('div');
    tooltipSecondArrow.className = "tooltip-arrow second-arrow";

    let popoverInner = document.createElement('div');
    popoverInner.className = "popover-inner";
    popoverInner.style = "color:white; padding: 12px;";

    popoverInner.innerHTML = content;


    let button = document.createElement('button');
    button.id = "btnNext";
    button.innerText = "Next";
    button.addEventListener('click', ()=>{
        goNext();
    });
    button.style = "color: black; cursor: pointer; width: 80px;   height: 30px;   float: right;text-align: center;    background-color: white;border-radius: 4px;"

    popoverInner.append(button);

    tooltipIn.append(tooltipArrow);
    tooltipIn.append(tooltipSecondArrow);
    tooltipIn.append(popoverInner);

    sttipDiv.append(tooltipIn);
    return sttipDiv;
}

// callback function
__5szm2kaj = function (data) {
    let l = 0;
    let t = 0;
    responseObject = data;
    steps = responseObject.data.structure.steps;
    console.log(data);
    currentStep = steps[stepIndex];
    element = $(currentStep.action.selector)[0];
}