StoreTodos.getAll(View.printTodos)
.then(()=>View.filter(StoreFilterStatus.getFilterStatus()))
.then(()=>handleDD());

emitter.subscribe(`event:onEnter`, function (name: string) {
StoreTodos.post(name, View.printTodo);
});

emitter.subscribe("event:Delete", function (id: string) {
  View.delete(id);
  StoreTodos.delete(id);
});
emitter.subscribe("event:Mark", function (id: string) {
  View.mark(id);
  StoreTodos.update(id);
});
emitter.subscribe("event:MarkAll", function (condition: boolean) {
  View.markAll(!condition);
  StoreTodos.updateAll(condition);
});
//?
function emitFilterHandler(status: string) {
  emitter.subscribe(status, function (filterCondition: string) {
    View.filter(filterCondition);
  });
}
emitFilterHandler("filter:all");
emitFilterHandler("filter:completed");
emitFilterHandler("filter:active");
