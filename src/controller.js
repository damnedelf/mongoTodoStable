"use strict";
StoreTodos.getAll()
    .then((result) => View.printTodos(result))
    .then(() => handleDD());
emitter.subscribe(`event:onEnter`, function (name) {
    StoreTodos.post(name, View.printTodo);
});
emitter.subscribe("event:Delete", function (id) {
    View.delete(id);
    StoreTodos.delete(id);
});
emitter.subscribe("event:Mark", function (id) {
    View.mark(id);
    StoreTodos.update(id);
});
emitter.subscribe("event:MarkAll", function (condition) {
    View.markAll(!condition);
    StoreTodos.updateAll(condition);
});
function emitFilterHandler(status) {
    emitter.subscribe(status, function (filterCondition) {
        View.filter(filterCondition);
    });
}
emitFilterHandler("filter:all");
emitFilterHandler("filter:completed");
emitFilterHandler("filter:active");
