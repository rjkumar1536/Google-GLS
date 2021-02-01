var responseObject;
var __5szm2kaj;
var steps;
var element;
var content;
var placement;
var pos;
var currentStep;
var stepIndex = 0;
var tooltipWidth = 286;
var tooltipHeight = 57;
var height = 0;
var width = 0;
var t;
var l;
var script;
var link;
var gls;


// installing jquery
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


function placeToolTip(){
    content = currentStep.action.contents['#content'];
    placement = currentStep.action.placement;

    $(element).css('border', '1px black solid');

    if (stepIndex == 3) {
        placement = 'bottom';
    }

    pos = $(element).offset();
    height = $(element).height();
    width = $(element).width();

    let pt = parseInt($(element).css('padding-top'));
    let pb = parseInt($(element).css('padding-bottom'));
    let pl = parseInt($(element).css('padding-left'));
    let pr = parseInt($(element).css('padding-right'));

    t = pos.top + pt - pb;
    l = pos.left + pl + pr;

    if (placement === 'top') t = t - tooltipHeight;
    if (placement === 'right') l = l + width;
    if (placement === 'bottom') t = t + height;
    if (placement === 'left') l = l - tooltipWidth;

    if (stepIndex == 3) {
        l = window.innerWidth - tooltipWidth - 17;
    }

    element.parentNode.appendChild(createToolTip (content, l + 'px', t + 'px'));
    if (currentStep.followers.length > 0) stepIndex = currentStep.followers[0].next;
    else stepIndex = -1;
}

// on click of next button on the tooltip
function goNext() {
    element.parentNode.removeChild(document.getElementById('tooltip' + currentStep.id));
    $(element).css('border', '');
    if (parseInt(stepIndex) < 0) return;
    currentStep = steps.find(e => e.id == stepIndex);
    element = $(currentStep.action.selector)[$(currentStep.action.selector).length - 1];
    placeToolTip();
}


// jsonp initial function that will be called once response is recieved
__5szm2kaj = function (data) {
    let l = 0;
    let t = 0;
    responseObject = data;
    console.log(data)
    steps = responseObject.data.structure.steps;
    currentStep = steps[stepIndex];
    element = $(currentStep.action.selector)[0];
    placeToolTip();
}