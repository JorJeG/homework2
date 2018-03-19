/**
 * @class App
 * @param {Element} el
 */
// function App(el) {
//     var appEl = el,
//         doors = [
//             new Door0(0, onUnlock),
//             new Door1(1, onUnlock),
//             new Door2(2, onUnlock),
//             new Box(3, onUnlock)
//         ];
// 
//     this.doors = doors;
// 
//     /**
//      * Callback вызывается в коде двери
//      * Тут даем возможность открыть следующие двери
//      */
//     function onUnlock() {
//         var previousUnlocked;
// 
//         // Даем открыть следующую дверь
//         for (var i = 0; i < doors.length; i++) {
//             if (!doors[i].isLocked) {
//                 previousUnlocked = true;
//             } else {
//                 if (previousUnlocked && doors[i].isLocked) {
//                     doors[i].enable();
//                     break;
//                 }
//             }
//         }
//     };
// }

class App {
  constructor(el) {
    this.doors = [];
  }

  addDoor(door) {
    door.bindUnLock(this.onUnlock.bind(this));
    this.doors.push(door);
  }

  onUnlock() {
      let previousUnlocked;

      // Даем открыть следующую дверь
      for (let i = 0; i < this.doors.length; i += 1) {
          if (!this.doors[i].isLocked) {
              previousUnlocked = true;
          } else {
              if (previousUnlocked && this.doors[i].isLocked) {
                  this.doors[i].enable();
                  break;
              }
          }
      }
  };
}

// Start the app
const app = new App(document.querySelector('.app'));

app.addDoor(new Door0(document.querySelector('.level_0'), document.querySelector('.door_level_0'), document.querySelector('.popup_level_0')));
app.addDoor(new Door1(document.querySelector('.level_1'), document.querySelector('.door_level_1'), document.querySelector('.popup_level_1')));
app.addDoor(new Door2(document.querySelector('.level_2'), document.querySelector('.door_level_2'), document.querySelector('.popup_level_2')))
