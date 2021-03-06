"use strict";
function handleDD() {
    try {
        let dragSrcEl;
        let todos = document.querySelectorAll(".task-list-task");
        function dragStart(e) {
            this.style.opacity = "0.4";
            dragSrcEl = this;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/html", this.innerHTML);
        }
        function dragEnter() {
            this.classList.add("over");
        }
        function dragLeave(e) {
            e.stopPropagation();
            this.classList.remove("over");
        }
        function dragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            return false;
        }
        function dragDrop(e) {
            if (dragSrcEl != this) {
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData("text/html");
            }
            return false;
        }
        function dragEnd() {
            [].forEach.call(todos, function (item) {
                item.classList.remove("over");
            });
            this.style.opacity = "1";
        }
        function addEventsDragAndDrop(el) {
            el.addEventListener("dragstart", dragStart, false);
            el.addEventListener("dragenter", dragEnter, false);
            el.addEventListener("dragover", dragOver, false);
            el.addEventListener("dragleave", dragLeave, false);
            el.addEventListener("drop", dragDrop, false);
            el.addEventListener("dragend", dragEnd, false);
        }
        [].forEach.call(todos, function (item) {
            addEventsDragAndDrop(item);
        });
    }
    catch (error) {
        console.log(`Drag and Drop error ==> ${error}`);
    }
}
