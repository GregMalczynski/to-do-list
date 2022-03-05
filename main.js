const input = document.querySelector('.input');
const time = document.querySelector('.time')
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');

const remain = document.querySelector('.remain');
const message = document.querySelector('.message');

const showActualTime = document.querySelector('.showActualTime');

setInterval( showClockFnc, 1000 );

function runFunc() {
    showActualTime.innerHTML = actualTimeArr;
}

const showLiArr = [];

const actualTimeArr = [];
const actualTimeRemainArr = [];

function actualTime(parm1, parm2) {
    let resultHours = '';
    let resultMinutes = '';
    let resultSeconds = '';
    
    const timeNow = parm1;
    
    let convertHours = timeNow.getHours();
    let convertMinutes = timeNow.getMinutes();
    let convertSeconds = timeNow.getSeconds();
    resultHours += convertHours < 10 ? '0' + convertHours : convertHours;
    resultMinutes += convertMinutes < 10 ? '0' + convertMinutes : convertMinutes;
    resultSeconds += convertSeconds < 10 ? '0' + convertSeconds : convertSeconds;
    parm2.push(`${resultHours}:${resultMinutes}:${resultSeconds}`);
}

setInterval( showClockFnc, 1000 );
function showClockFnc() {
    actualTime(new Date(), actualTimeArr );
    showActualTime.innerHTML = actualTimeArr.slice(-1);
}

let i = 0;

btn.addEventListener('click', addFunction );

function addFunction() {

   
    let inputValue = input.value;

    let inputTime = time.value;

    if ( !inputValue ) {
        message.innerHTML = 'Task cannot be empty';
        return;
    }
    else if ( !inputTime ) {
        message.innerHTML = 'Time cannot be empty';
        return;
    } else {
        message.innerHTML = '';
    }

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-button';
    removeBtn.innerText = '-';

    const showTime = document.createElement('div');
    showTime.className = 'showTime';
    showTime.innerHTML = `${inputTime}:00`;

    const brakeLine = document.createElement('hr');
    brakeLine.className = 'brakeLine';

    const showLi = document.createElement('li');
    showLi.setAttribute('item', i);
    showLi.className = 'task';
    showLi.innerHTML = '<span class="inputText">'+ inputValue +'<hr class="brakeLine"></span>';
    showLi.appendChild(showTime);
    showLi.appendChild(removeBtn);

    showLiArr.push(showLi);
    list.appendChild(showLi);

    remain.innerHTML = 'Tasks to remain : <span class="remainNumber">' + ( i + 1 ) + '</span>';

    list.children[i].children[2].addEventListener('click', newFunction );

    function newFunction() {
        list.removeChild(showLi);
        i-- ;
        remain.innerHTML = 'Tasks to remain : <span class="remainNumber">' + ( i ) + '</span>';
    }

    input.value = '';
    time.value = '';

    setInterval( checkTimeFnc , 1000 );

    function checkTimeFnc() {
        for ( let k = 0; k < list.children.length; k++ ) {

            actualTime(new Date(), actualTimeArr);
            actualTime(new Date(Date.now() + 10000), actualTimeRemainArr);

            let timeSum = actualTimeArr.slice(-1).toString();
            let timeRemain = actualTimeRemainArr.slice(-1).toString();

            if ( list.children[k].children[1].innerHTML === timeRemain ) {
    
                if ( list.children[k].children[0].getAttribute ) {
                    list.children[k].children[0].classList.add('added');
                }
            
                const audio = new Audio('./sounds/alarm-clock-01.mp3');
                audio.play();

            } else if ( list.children[k].children[1].innerHTML === timeSum ) {
                showLi.classList.remove('added');
                list.removeChild(list.firstChild);
                i-- ;
                remain.innerHTML = 'Tasks to remain : <span class="remainNumber">' + ( i ) + '</span>';
            }
        }
    }
    i++ ;
}