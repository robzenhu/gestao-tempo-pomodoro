const circleElement = document.querySelector('.circle');


function setCirclePercent(percent){
    const circlePerimeter = 597;
    const dashOffest = (circlePerimeter * (percent / 100));
    circleElement.style.setProperty('--dashoffset', dashOffest);


}