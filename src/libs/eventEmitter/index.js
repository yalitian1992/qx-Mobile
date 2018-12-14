
/* eslint-disable */
/**
 * 事件发射器
 * EventEmitter
 */
function EventEmitter() {
  this.listener = {};
}
EventEmitter.prototype.listener = {};
/**
 * 注册事件
 * on
 * @param {String} type 事件类型
 * @param {function} fn 事件函数
 */
EventEmitter.prototype.on = function(type, fn) {
  if (typeof fn !== "function") {
    throw new Error("第二个参数请传递一个函数作为参数");
  }
  if (!this.listener[type]) {
    this.listener[type] = [];
  }
  this.listener[type] = this.listener[type].concat(fn);
};
/**
 * 触发时间
 * emit
 * @param {String} type 事件类型
 * @argument
 */
EventEmitter.prototype.emit = function(type) {
  if (!this.listener[type]) {
    return;
  }
  const self = this;
  const args = Array.prototype.slice
    .apply(arguments)
    .filter(function(item, index) {
      return index > 0;
    });
  this.listener[type].forEach(function(fn) {
    fn.apply(self, args);
  });
};
/**
 * 删除事件
 * removeEvent
 * @param {String} type 事件类型
 * @param {function} fn 事件函数
 */
EventEmitter.prototype.removeEvent = function(type) {
  if (!this.listener[type]) {
    return;
  }
  delete this.listener[type];
};

export default EventEmitter;
