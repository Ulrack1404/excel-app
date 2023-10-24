export class Emitter {
    constructor() {
        this.listeners = {};
    }

    emit(event, ...args) {
        // уведомляем слушателей если они есть
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
    subscribe(event, fn) {
        // подписываемся на уведомление (добавляем нового слушателя)
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] = this.listeners[event].filter(
                (listener) => listener !== fn
            );
        };
    }
}

// ///////////////////////////////////////////////////
// //////////////  Example ///////////////////////////
// ///////////////////////////////////////////////////

// const emitter = new Emitter();
// const unsubscribe = emitter.subscribe("vladilen", (data) =>
//     console.log("subscribe:", data)
// ); // возвращает функцию отписки

// setTimeout(function () {
//     emitter.emit("vladilen", "After 2 second"); // subscribe: After 2 second
// }, 2000);

// setTimeout(function () {
//     unsubscribe();
// }, 3000);

// setTimeout(function () {
//     emitter.emit("vladilen", "After 4 second");
// }, 4000);
