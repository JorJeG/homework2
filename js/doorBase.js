/**
 * Базовый класс всех дверей
 * @class DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
// function DoorBase(number, onUnlock) {
//     this.number = number;
//     this.onUnclockCallback = onUnlock;
// 
//     this.level = document.querySelector('.level_' + number);
//     this.door = document.querySelector('.door_level_' + number);
//     this.popup = document.querySelector('.popup_level_' + number);
//     this.close = this.popup.querySelector('.popup__close');
// 
//     this.isLocked = true;
//     this.isDisabled = this.door.classList.contains('door_disabled');
// 
//     this.door.addEventListener('click', onDoorClick.bind(this));
//     this.close.addEventListener('click', onCloseClick.bind(this));
// 
//     function onDoorClick() {
//         if (!this.isDisabled) {
//             this.openPopup();
//         }
//     }
// 
//     function onCloseClick() {
//         this.closePopup();
//     }
// }

class DoorBase {
  constructor(level, door, popup) {
    this.isLocked = true;
    this.level = level;
    this.door = door;
    this.popup = popup;
    this.onUnclockCallback = () => {};
    this.close = this.popup.querySelector('.popup__close');
    this.isDisabled = this.door.classList.contains('door_disabled');
    this.door.addEventListener('click', this.onDoorClick.bind(this));
    this.close.addEventListener('click', this.onCloseClick.bind(this));
  }
  
  bindUnLock(onUnlock) {
    this.onUnclockCallback = onUnlock;
  }

  openPopup() {
      this.popup.classList.remove('popup_hidden');
  }
  closePopup() {
      this.popup.classList.add('popup_hidden');
  }
  enable() {
      this.door.classList.remove('door_disabled');
      this.isDisabled = false;
  }
  onDoorClick() {
      if (!this.isDisabled) {
          this.openPopup();
      }
  }

  onCloseClick() {
      this.closePopup();
  }
  /**
   * Вызывается, если после последовательности действий
   * дверь считается открытой
   */
  unlock() {
      this.door.classList.remove('door_locked');
      this.isLocked = false;
      this.closePopup();
      this.onUnclockCallback();
      this.showCongratulations();
  }
  showCongratulations() {
      alert('Дверь ' + this.number + ' открыта!')
  }

  checkCondition() {
    return true;
  }
}

// DoorBase.prototype = {
//     openPopup: function() {
//         this.popup.classList.remove('popup_hidden');
//     },
//     closePopup: function() {
//         this.popup.classList.add('popup_hidden');
//     },
//     enable: function() {
//         this.door.classList.remove('door_disabled');
//         this.isDisabled = false;
//     },
//     /**
//      * Вызывается, если после последовательности действий
//      * дверь считается открытой
//      */
//     unlock: function() {
//         this.door.classList.remove('door_locked');
//         this.isLocked = false;
//         this.closePopup();
//         this.onUnclockCallback();
//         this.showCongratulations();
//     },
//     showCongratulations: function() {
//         alert('Дверь ' + this.number + ' открыта!')
//     }
// };
