{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false }
        ];

        render();
    };
    const clearNewTaskInput = (newTaskInput) => {
        newTaskInput.focus();
        newTaskInput.value = "";
    };
    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };
    const toggleTaskDone = (taskIndex) => {
        const task = tasks[taskIndex];
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...task,
                done: !task.done
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };
    const markAllTasksDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };
    const toggleHideDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };
    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        const taskToHTML = task => `
        <li
    class="list__tasks${task.done && hideDoneTasks ? " list__item--hidden" : ""}"> 
    <button class="list__button list__button--done js-done">
      ${task.done ? "✓" : ""}
      </button>
     <span class="list__item${task.done ? " list__item--done" : ""}">
      ${task.content}
     </span>
     <button class="list__button list__button--remove js-remove">🗑</button>
</li>
`;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const sectionButtons = document.querySelector(".js-buttons");
        if (!tasks.length) {
            sectionButtons.innerHTML = "";
            return;
        }
        sectionButtons.innerHTML = `
        <button class="section__button section__button--header  js-allDoneHidden">
            ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button class="section__button section__button--header js-markAllDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Ukończ wszystkie
        </button>
    `;
    };
    const bindButtonsEvents = () => {
        const markAllDoneTasksButton = document.querySelector(".js-markAllDone");
        if (markAllDoneTasksButton) {
            markAllDoneTasksButton.addEventListener("click", markAllTasksDone);
        }
        const toggleHideDoneTasksButton = document.querySelector(".js-allDoneHidden");
        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDone);
        }
    };
    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();

        if (newTaskContent === "") {
            newTaskInput.focus();
            return;
        }
        addNewTask(newTaskContent);
        clearNewTaskInput(newTaskInput);
    };
    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();
}