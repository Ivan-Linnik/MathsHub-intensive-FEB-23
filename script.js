const gameBlock = document.querySelector('.game-block');
const gameHeader = document.querySelector('.game__header');
const gameButton = document.querySelector('.game__button');
const gameExpression = document.querySelector('.game__expression');
const gameAnswerBlock = document.querySelector('.game__answer-block');
const gameUserInput = document.querySelector('.game__number-input');

function getRandomIntInRange(min, max) {
    let randomInteger = (Math.random() * ((max - min) + min)).toFixed(0);
    return randomInteger;
}

function makeTaskForUser() {
    let integer1 = getRandomIntInRange(0, 100);
    let integer2 = getRandomIntInRange(0, 100);

    let mathOperator = (Math.random() > 0.5) ? '+' : '-';

    let task = `${integer1} ${mathOperator} ${integer2}`;

    gameStateKeeper.rightAnswer = eval(task);

    return task;
}

const gameStateKeeper = {
    rightAnswer: null,
    isTaskInProcess: false,
}

function toggleGameState() {
    gameStateKeeper.isTaskInProcess = !gameStateKeeper.isTaskInProcess;
}

function showRightOrNot() {
    if (gameUserInput.value == gameStateKeeper.rightAnswer) {
        gameHeader.innerText = 'Правильно!';
        gameBlock.classList.add('right');
    } else {
        gameHeader.innerText = 'Неправильно!';
        gameBlock.classList.add('wrong');
    }
}

function defaultState() {
    gameHeader.innerText = 'Игра началась';
    gameBlock.className = 'game-block';
}

function clearState() {
    gameBlock.className = 'game-block';
    gameUserInput.value = null;
    gameUserInput.blur();
    gameButton.value = 'Начать игру';
    gameHeader.innerText = 'Игра';
    gameExpression.addAttribute('hidden');
    gameAnswerBlock.addAttribute('hidden');
}

function gameProcess() {
    if (!gameStateKeeper.isTaskInProcess) {
        defaultState();
        gameUserInput.value = null;
        gameExpression.removeAttribute('hidden');
        gameAnswerBlock.removeAttribute('hidden');
        gameExpression.innerText = makeTaskForUser();
        gameButton.setAttribute('value', 'Проверить');
        toggleGameState();

    } else {
        showRightOrNot();
        gameExpression.innerText = gameExpression.innerText + ' = ' + gameStateKeeper.rightAnswer;
        toggleGameState();
        gameButton.setAttribute('value', 'Начать заново');
    }
}

gameButton.addEventListener('mouseup', gameProcess);
gameAnswerBlock.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        gameProcess();
    } else if (e.key === 'Escape') {
        clearState();
    }
});
////////////////////////////////////////////////////////////////////////////////

// Обработчики событий

const blockWithElements = document.querySelectorAll('.chosen__item'); // получил коллекцию объектов
const counterNumber = document.querySelector('.counter__number'); // получил контейнер с числом для счётчика
const counterPrice = document.querySelector('.counter__price');

const elementState = { //в этом объекте я определил состояние счётчика - так выглядит инкапсуляция
    chosenElements: 0,
    chosenPrice: 0,
    setCountChosenElements(value) {
        this.chosenElements += value;
        counterNumber.innerText = this.chosenElements;
    },
    priceCount(price) {
        this.chosenPrice += parseInt(price, 10);
        counterPrice.innerText = this.chosenPrice;
    }
};


const listenFunc = (e) => {
    // e - это событие курсора, у него куча свойств, target - возвращает сам элемент, на который кликнул
    if (!e.target.classList.contains('chosen__item_selected')) {
        e.target.classList.add('chosen__item_selected');
        elementState.setCountChosenElements(1);
        elementState.priceCount(e.target.innerText);

    } else {
        e.target.classList.remove('chosen__item_selected');
        elementState.setCountChosenElements(-1);
        elementState.priceCount(-e.target.innerText);
    }
}

for (let i = 0; i < blockWithElements.length; i++) {
    blockWithElements[i].addEventListener('click', listenFunc);
}

/////////////////////////////////////Запросы на сервер, асинхронность ///////////////////////////////////////////

/// Асинхронность
// setTimeout(действие, через какое время) - задержка, время в ms
// setInterval(то же самое) - выполнение с определённым интервалом
// Асинхронность показательно
// console.log('1');
// setTimeout(() => {
//     console.log('2')
// }, 0);
// console.log('3');
///////////////////////////////////////////////////////////////////

const postBlog = document.querySelector('.blog__posts-container'); // получаю контейнер для контента (в html он пустой)
const postButton = document.querySelector('.show-posts');

function useFetchForFirstTime() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            for (let elem of data) {
                addPost(elem.title, elem.body)
            }
        })
        .catch(error => console.log(error.message))
}

function addPost(title, body) {
    const postTitle = document.createElement('h3');
    const postBody = document.createElement('span');
    const postItem = document.createElement('p');

    postTitle.classList.add('post__titte');
    postBody.classList.add('post__body');
    postItem.classList.add('post__item');

    postTitle.innerText = title;
    postBody.innerText = body;

    postItem.append(postTitle, postBody);
    postBlog.append(postItem);
}

// function createPost(title, body, userId) {
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         body: JSON.stringify({
//             title,
//             body,
//             userId,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         }
//     })
//         .then(res => {
//             console.log(res);
//             return res.json()
//         })
//         .catch(error => console.log(error.message))
// }

// createPost('title', 'body', 15);
postButton.addEventListener('click', useFetchForFirstTime);