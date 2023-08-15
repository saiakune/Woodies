const popupLinks = document.querySelectorAll('.sign_up_link'); //получаем все обьекты с классом sign_up_links
const body = document.querySelector('body'); // заблокировать скрол
const lockPadding = document.querySelectorAll('.lock_padding'); //получаем все обьекты с классом lock_padding

let unlock = true; // чтобы не бьло двойных нажатий

const timeout = 800; //то же что указано в transition и влияет на скрол
//вешаем событие на sign_up_links
if (popupLinks.length > 0) {  //проверка на существование ссылки
    for (let index = 0; index < popupLinks.length; index++) { //включаем цикл и бегаем по ссылкам
        const popupLink = popupLinks[index]; //получаем каждую ссылку в переменную popupLink
        popupLink.addEventListener("click", function (e) { //вешаем на переменную событие и при клике
            const popupName = popupLink.getAttribute('href').replace('#', ''); //берем значение атрибута href и убираем из него # и получаем чистое имя
            const curentPopup = document.getElementById(popupName); //получаем сам обьект попапа, получаем  в переменную curentPopup елемент id которого равен popupName 
            popupOpen(curentPopup); //полученный выше обьект отправляем в функцию popupOpen
            e.preventDefault(); //запрещаем ссылке перезагружать страницу
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close-popup'); //обьект который будет закрывать попап с классом .close-popup
if(popupCloseIcon.length > 0) { //проверяем есть ли такие обьекты вообще
    for (let index = 0; index < popupCloseIcon.length; index++) { //цикл
        const el = popupCloseIcon[index]; //получаем конкретный обьект
        el.addEventListener('click', function (e) { //вешаем на него событие клик
            popupClose(el.closest('.sign_up')); //при событии клик отправляем отправляем в функцию попап клос обьект который который является ближайшим родителем нажатой ссылки с классом попап
            e.preventDefault(); //запрещаем дальнейшую работу ссылки
        });
    }
}

function popupOpen(curentPopup) { //передаем готовый обьект по идентификатору
    if (curentPopup && unlock) { //проверяем есть ли такой обьект и открыта ли переменная unlock
        const popupActive = document.querySelector('.sign_up.open'); // получить открытый попап
        if (popupActive) { // и если он существует
            popupClose(popupActive, false); //то закрыть его
        } else { //если такого нет то блокируем скрол
            bodyLock(); 
        }
        curentPopup.classList.add('open'); //добавляем попапу класс опен и он открывается
        curentPopup.addEventListener("click", function (e) { //вешаем событие при клике
            if (!e.target.closest('.sign_up_content')) { // отсекаем все кроме темной области
                popupClose(e.target.closest('.sign_up'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock){
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if(lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }   
    body.style.paddingRight = lockPaddingValue; //убираем сдвиг при закрытии
    body.classList.add('lock');

    unlock = false; //навремя брокируем переменную анлок
    setTimeout(function (){
        unlock = true;
    }, timeout); //и через промежуток времени разблокируем
}

function bodyUnLock() {
    setTimeout(function (){
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout (function (){
        unlock = true;
    }, timeout);
}
