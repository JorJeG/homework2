// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;

        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        //Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

// ===================== Реализация второй двери =======================
/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);
    var isGestureStarted = false;
    var startPositionX = 0;
    var startPositionY = 0;
    var currentPositionX = 0;
    var currentPositionY = 0;
    var width = this.popup.getBoundingClientRect().width;
    var height = this.popup.getBoundingClientRect().height;

    var button = this.popup.querySelector('.door-riddle__button_3');

    button.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    button.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    button.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    button.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    button.addEventListener('pointermove', _onButtonPointerMove.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        isGestureStarted = true;
        startPositionX = e.clientX;
        startPositionY = e.clientY;
        e.target.setPointerCapture(e.pointerId);
    }
    
    /**
     * При отпускании проверяем условие, если не сработало
     * то возвращаем кнопки в исходное положение
     */
    function _onButtonPointerUp(e) {
        checkCondition.apply(this);
        e.target.classList.remove('door-riddle__button_pressed');
        isGestureStarted = false;
        e.target.releasePointerCapture(e.pointerId);
        this.popup.querySelector("." + e.target.classList[1]).style.transform = 'none';
    }

    function _onButtonPointerMove(e) {
        if (!isGestureStarted) {
            return;
        }

        currentPositionX = e.clientX - startPositionX;
        currentPositionY = e.clientY - startPositionY;
        this.popup.querySelector("." + e.target.classList[1]).style.transform = 'translate(' + currentPositionX + 'px, ' + currentPositionY + 'px)';
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition(e) {
        // Если кнопка достигла края экрана, то откроем эту дверь
        if (((width/2) - Math.abs(currentPositionX) < 10 || (height/2) - Math.abs(currentPositionY) < 10) && isGestureStarted) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;
// END ===================== Реализаци второй двери =======================

// ===================== Реализация третьей двери =======================
/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);
    var isGestureStarted = false;
    var startPositionX = 0;
    var startPositionY = 0;
    var currentPositionX = 0;
    var currentPositionY = 0;
    var isPrimary = false;
    var width = this.popup.getBoundingClientRect().width;
    var height = this.popup.getBoundingClientRect().height;

    // ==== Напишите свой код для открытия третей двери здесь ====
    var buttons = [
        this.popup.querySelector('.door-riddle__button_4'),
        this.popup.querySelector('.door-riddle__button_5')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
        b.addEventListener('pointermove', _onButtonPointerMove.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        if (e.isPrimary) {
            isPrimary = true;
        } else {
            isGestureStarted = true;
            e.target.setPointerCapture(e.pointerId);
            startPositionX = e.clientX;
            startPositionY = e.clientY;
        }
    }

    function _onButtonPointerUp(e) {
        checkCondition.apply(this);
        if (e.isPrimary) {
            isPrimary = false;
        }

        e.target.classList.remove('door-riddle__button_pressed');
        isGestureStarted = false;
        e.target.releasePointerCapture(e.pointerId);
        this.popup.querySelector("." + e.target.classList[1]).style.transform = 'none';
    }

    function _onButtonPointerMove(e) {
        if (!isGestureStarted) {
            return;
        }
        // Перемещаем только вторую кнопку
        if (!e.isPrimary) {
            currentPositionX = e.clientX - startPositionX;
            currentPositionY = e.clientY - startPositionY;
            this.popup.querySelector("." + e.target.classList[1]).style.transform = 'translate(' + currentPositionX + 'px, ' + currentPositionY + 'px)';
        }
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        // Когда зажали одну из кнопок другую нужно вывести за экран, то откроем эту дверь
        if (isPrimary) {
          if (((width/2) - Math.abs(currentPositionX) < 10 || (height/2) - Math.abs(currentPositionY) < 10) && isGestureStarted) {
              this.unlock();
          }
        }
    }
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;
// END ===================== Реализаци третьей двери =======================

// ===================== Реализация открытия сундука =======================
/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);
    var startTime = null;
    var isGestureStarted = false;
    var timerId = null;
    var size = 64;

    // ==== Напишите свой код для открытия сундука здесь ====
    var button = this.popup.querySelector('.door-riddle__button_6');

    button.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    button.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    button.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    button.addEventListener('pointerleave', _onButtonPointerUp.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        isGestureStarted = true;
        startTime = Date.now();
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
        isGestureStarted = false;
        e.target.releasePointerCapture(e.pointerId);
        button.style.cssText = 'width: 64px; height: 64px;';
        size = 64;
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        // Если зажать кнопку на 5 секунд, то откроем эту дверь
        var self = this;
        timerId = setInterval(function() {
            if (isGestureStarted && Date.now() - startTime > 5000) {
                self.unlock();
                clearInterval(timerId);
            }
            tick();
        }, 500);
    }
    /**
     * Функция для изменения вида кнопки в зависимости от времени
     */
    function tick() {
        if (isGestureStarted) {
            button.style.cssText = 'width: ' + size + 'px; height: ' + size + 'px; background-color: rgba(255, 255, 255, 0.4);';
            size += 5;
        } else {
            clearInterval(timerId);
        }
    }
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
// END ===================== Реализаци открытия сундука =======================
