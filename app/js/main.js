function clicks() {
  let optios = document.querySelectorAll('.main__selection');
  for (let i = 0; i < optios.length; i++) {
    optios[i].onclick = select;
  }
}

clicks()

function select(e) {
  e.target.classList.toggle("main__selection--open")
  let element = e.target;
  let optios = e.target.nextElementSibling;
  optios.toggleAttribute('hidden')
  optios.onclick = (el) => {
    hidden.call(null, el, element)
  }
}


function hidden(e, element) {
  element.innerHTML = e.target.innerHTML
  e.target.parentElement.setAttribute('hidden', '');
}

const address = document.querySelectorAll('.main__address');

address[0].oninput = (e) => {
  oninput.call(null, e, 0)
};

address[1].oninput = (e) => {
  oninput.call(null, e, 1)
};

const time = document.querySelectorAll('.main__time');
const btn = document.querySelectorAll('.main__btn');

function oninput(e, i) {
  if (address[i].value.length !== 0) {
    e.target.parentElement.classList.add('active')
    e.target.parentElement.classList.remove('main__label-bottom--disabled')
    document.querySelectorAll('.main__btn')[i].classList.remove('disabled')
    document.querySelectorAll('.main__btn')[i].removeAttribute('disabled')
  }
}

for (let i = 0; i < 2; i++) {
  btn[i].onmouseover = () => {
    onmouseover(i)
  }

  time[i].onblur = () => {
    onblur(i)
  }

  time[i].onmouseout = () => {
    onmouseout(i)
  }

  document.querySelectorAll('.main__date')[i].onmouseover = () => {
    mouseOverDate(i)
  }

  time[i].onclick = () => {
    onclick(i)
  }
}

function onmouseover(i) {
  time[i].style.opacity = '1'
  time[i].style.zIndex = '2'
}

function onmouseout(i) {
  time[i].style.opacity = '0'
  time[i].style.zIndex = '1'
}

function onclick(i) {
  time[i].onmouseout = () => {
    time[i].style.opacity = '1'
  }
  btn[i].style.display = 'none';
  time[i].style.opacity = '1';

}

function mouseOverDate(i) {
  time[i].style.display = 'block';
  document.querySelectorAll('.main__date')[i].style.zIndex = '1';
  time[i].onmouseover = () => {

    time[i].style.opacity = '1';
  }
  time[i].onmouseout = () => {

    time[i].style.opacity = '0';
  }

}

function onblur(i) {
  if (time[i].value.split('-').length === 1) {
    document.querySelectorAll('.main__date')[i].innerHTML = 'Дата не выбрана';
    time[i].style.display = 'none';
    return
  }
  let date = time[i].value.split('-');
  let result = date[2] + '.' + date[1] + '.' + date[0]
  time[i].style.display = 'none';
  document.querySelectorAll('.main__date')[i].innerHTML = result;
}

const mediaQuery = window.matchMedia('(max-width:567px)')
function handleTabletChange(e) {
  if (e.matches) {
    document.querySelector('.main__warning').remove()
    document.querySelector('.main__type').remove()
    const inner = document.querySelectorAll('.main__inner')[1].remove();
    document.querySelector('.main__step--3').insertAdjacentHTML('afterend', `     <div class="main__inner">
              <div class="main__left">
                <span class="main__desc">Тип груза</span>
                <span class="main__selection">Не выбран</span>
                <ul class="main__options main__options--position" hidden>
                  <li class="main__choice">Вариант 1</li>
                  <li class="main__choice">Вариант 2</li>
                  <li class="main__choice">Вариант 3</li>
                </ul>
              </div>

              <div class="main__right">
                <span class="main__desc">Объявленная ценность, ₽</span>
                <span class="main__selection">Не выбрана</span>
                <ul class="main__options  main__options--position" hidden>
                  <li class="main__choice">Вариант 1</li>
                  <li class="main__choice">Вариант 2</li>
                  <li class="main__choice">Вариант 3</li>
                </ul>
              </div>
            </div>`)

    document.querySelector('.main__text').insertAdjacentHTML('afterend', ` <p class="main__warning">
    Для расчета стоимости необходимо ввести параметры груза, пункты отправки и прибытия.
  </p>`)

   
  }
  clicks()
}
mediaQuery.addListener(handleTabletChange)
handleTabletChange(mediaQuery)

console.log(document.querySelectorAll('.main__inner')[2])

document.querySelectorAll('.main__inner')[2].style.position = 'absolute';
document.querySelectorAll('.main__inner')[2].style.opacity = '0';

document.querySelector('.main__checkbox').onchange = () => {
  if (document.querySelector('.main__checkbox').checked) {
    document.querySelectorAll('.main__inner')[2].style.position = 'static';
    document.querySelectorAll('.main__inner')[2].style.opacity = '1';
  }

  else {
    document.querySelectorAll('.main__inner')[2].style.position = 'absolute';
    document.querySelectorAll('.main__inner')[2].style.opacity = '0';
  }
}
