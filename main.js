
document.body.style.overflow = "hidden"

const infoItems = document.querySelectorAll(".info-block ul li");  // массив с инфой
const menuElements = document.querySelectorAll('.menu-element');   // массив элементов меню
const arrDots = document.querySelectorAll('.handles__dots__dot');  // массив точек
const imageContainers = document.querySelectorAll('.j-arr-img');  // массив контейнеров для картинок

const leftArrow = document.querySelector('.handles__left-arrow');
const rightArrow = document.querySelector('.handles__right-arrow');

let currentPosition = 0         // текущая позиция (по индекесу массива)
let newPosition = 0             // новая позиция, пока не выбрана, совпадает с текущей


//заполнение сайта инфой
for(let i = 0; i < 3; i++ ) {
    menuElements[i].textContent = infoItems[i].querySelector('.menu__item').textContent;
    
    // создаем новые элементы
    const pCity = document.createElement('p');    
    const pArea = document.createElement('p');
    const pTime = document.createElement('p');
    const pCost = document.createElement('p');
    const iImage = infoItems[i].querySelector('img').cloneNode()

    // задаем свойства
    pCity.classList.add('j-hide', 'j-info-txt-style');
    pArea.classList.add('j-hide', 'j-info-txt-style');
    pTime.classList.add('j-hide', 'j-info-txt-style');
    pCost.classList.add('j-hide', 'j-info-txt-style');

    // задаем текстовые значения
    pCity.innerHTML = infoItems[i].querySelector('.city').innerHTML;
    pArea.innerHTML = infoItems[i].querySelector('.area').innerHTML;
    pTime.innerHTML = infoItems[i].querySelector('.repair-time').innerHTML;
    pCost.innerHTML = infoItems[i].querySelector('.repair-cost').innerHTML;

    // добавляем в соответствующие узлы
    document.querySelector('.info1__city__info').appendChild(pCity);
    document.querySelector('.info1__area__info').appendChild(pArea);
    document.querySelector('.info2__time__info').appendChild(pTime);
    document.querySelector('.info2__cost__info').appendChild(pCost);
    imageContainers[i].appendChild(iImage);
}

// массивы строчных елементов
const arrCityInfo = document.querySelectorAll('.info1__city__info p');
const arrAreaInfo = document.querySelectorAll('.info1__area__info p');
const arrTimeInfo = document.querySelectorAll('.info2__time__info p');
const arrCostInfo = document.querySelectorAll('.info2__cost__info p');


imageContainers[0].classList.add('j-hide');   // вначале прячем видимую картинку

// включаем плавность на тексты, точки, картинки
for(let i = 0; i < 3; i++ ) {
    arrCityInfo[i].classList.add('j-smooth-transition');
    arrAreaInfo[i].classList.add('j-smooth-transition');
    arrTimeInfo[i].classList.add('j-smooth-transition');
    arrCostInfo[i].classList.add('j-smooth-transition');
    imageContainers[i].classList.add('j-smooth-transition');
    arrDots[i].classList.add('j-smooth-transition');

}

// задаем начальные значения для первого элемента
setTimeout(() => {
    imageContainers[0].classList.remove('j-hide');
    menuElements[0].classList.add('j-menu-item-selected');
    arrDots[0].classList.add('j-dot-selected');
    arrCityInfo[0].classList.remove('j-hide');
    arrAreaInfo[0].classList.remove('j-hide');
    arrTimeInfo[0].classList.remove('j-hide');
    arrCostInfo[0].classList.remove('j-hide');
}, 300);


const arrPositions = [0, 670, -670]     // массив позиций картинок

function moveImgLeft() {
    for (let i = 0; i < 3; i++) {
        arrPositions[i] -= 670;
        if (arrPositions[i] < -670) {
            imageContainers[i].classList.remove('j-smooth-transition');
            imageContainers[i].classList.add('j-hide');
            arrPositions[i] = 670;
            setTimeout(() => {
                imageContainers[i].classList.add('j-smooth-transition');
                imageContainers[i].classList.remove('j-hide');
             }, 500);
        }
        imageContainers[i].style = 'left: ' + `${arrPositions[i]}` + 'px;';
    }    
}

function moveImgRight() {
        for (let i = 0; i < 3; i++) {
        arrPositions[i] += 670;

        if (arrPositions[i] > 670) {
            imageContainers[i].classList.remove('j-smooth-transition');
            imageContainers[i].classList.add('j-hide');
            arrPositions[i] = -670;
            setTimeout(() => {
                imageContainers[i].classList.add('j-smooth-transition');
                imageContainers[i].classList.remove('j-hide');
             }, 500);
        }
        imageContainers[i].style = 'left: ' + `${arrPositions[i]}` + 'px;';
    }
}

function changeMenuItemSelected(newPosition) {
    menuElements[currentPosition].classList.remove('j-menu-item-selected');
    menuElements[newPosition].classList.add('j-menu-item-selected');
}

function changeDotSelected(newPosition) {
    arrDots[currentPosition].classList.remove('j-dot-selected');
    arrDots[newPosition].classList.add('j-dot-selected');
}

function changeText(newPosition) {
    arrCityInfo[currentPosition].classList.toggle('j-hide');
    arrCityInfo[newPosition].classList.toggle('j-hide');
    arrAreaInfo[currentPosition].classList.toggle('j-hide');
    arrAreaInfo[newPosition].classList.toggle('j-hide');
    arrTimeInfo[currentPosition].classList.toggle('j-hide');
    arrTimeInfo[newPosition].classList.toggle('j-hide');
    arrCostInfo[currentPosition].classList.toggle('j-hide');
    arrCostInfo[newPosition].classList.toggle('j-hide');
}

function selectItem(newPosition) {
    if (newPosition === currentPosition) {
        return;
    }
    changeMenuItemSelected(newPosition);
    changeDotSelected(newPosition);
    changeText(newPosition);
    if (newPosition > currentPosition) {
        moveImgLeft();
        currentPosition++;
        if (newPosition > currentPosition) {
            setTimeout(() => {moveImgLeft();}, 300);
            currentPosition++;
        }
    } else {
        moveImgRight();
        currentPosition--;
        if (newPosition < currentPosition) {
            setTimeout(() => {moveImgRight();}, 300);
            currentPosition--;
        }
    }
}


// навешиваем функциональность на элементы управления

document.querySelector('.handles__left-arrow').addEventListener('click', () => {
    newPosition = currentPosition - 1;
    if (newPosition < 0) {
        newPosition = 2;
    }

    leftArrow.classList.add('j-left-arrow-clicked');
    setTimeout(() => {leftArrow.classList.remove('j-left-arrow-clicked')}, 300);

    moveImgRight();
    changeMenuItemSelected(newPosition);
    changeText(newPosition);
    changeDotSelected(newPosition);
    currentPosition = newPosition;
})

document.querySelector('.handles__right-arrow').addEventListener('click', () => {
    newPosition = currentPosition + 1;
    if (newPosition > 2) {
        newPosition = 0;
    }
    rightArrow.classList.add('j-right-arrow-clicked');
    setTimeout(() => {rightArrow.classList.remove('j-right-arrow-clicked')}, 300);

    moveImgLeft();
    changeMenuItemSelected(newPosition);
    changeText(newPosition);
    changeDotSelected(newPosition);
    currentPosition = newPosition;
})

for (let i = 0; i < 3; i++) {
    menuElements[i].addEventListener('click', () => { selectItem(i)});
    arrDots[i].addEventListener('click', () => { selectItem(i)});
}


//ресайзинг боковых шторок

const leftCurtain = document.querySelector('.left-curtain');
const rightCurtain = document.querySelector('.right-curtain');


function resizeCurtains() {
    const containerWidth = 1170;
    let curtainWidth = (window.innerWidth - containerWidth) / 2;
    if (curtainWidth < 0) { curtainWidth = 0; }
    leftCurtain.style = 'width: ' + `${curtainWidth}` + 'px';
    rightCurtain.style = 'width: ' + `${curtainWidth}` + 'px';
}

resizeCurtains()

window.onresize = resizeCurtains;


