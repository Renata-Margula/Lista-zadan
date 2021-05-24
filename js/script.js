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
    const disableAllDoneButton = (button) => {
        const allTasksDone = tasks.every(({ done }) => done === true);
        if (allTasksDone) {
            button.disabled = true;
        }
    };
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const hideDoneTasksButton = document.querySelector(".js-allDoneHidden");
        hideDoneTasksButton.addEventListener("click", () => {
            hideDoneTasks = !hideDoneTasks;
            render();
        });

        const markAllDoneTasksButton = document.querySelector(".js-markAllDone");
        disableAllDoneButton(markAllDoneTasksButton)
        markAllDoneTasksButton.addEventListener("click", () => {
            markAllTasksDone();
        });

    }
    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
<li
    class="list__tasks${task.done & hideDoneTasks ? " list__item--hidden" : ""}"> 
    <button class="list__button list__button--done js-done">
      ${task.done ? "✓" : ""}
      </button>
     <span class="list__item${task.done ? " list__item--done" : ""}">
      ${task.content}
     </span>
     <button class="list__button list__button--remove js-remove">🗑</button>
</li>
`;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };
    const renderButtons = () => {
        let htmlButtonsString = "";
        htmlButtonsString +=
            `<button class="section__button section__button--header ${tasks.length === 0 ? "section__button--hidden" : ""} js-allDoneHidden">
            ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button class="section__button section__button--header  ${tasks.length === 0 ? "section__button--hidden" : ""} js-markAllDone">
            Ukończ wszystkie
        </button>
    `;
        document.querySelector(".js-buttons").innerHTML = htmlButtonsString;
    };
    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
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