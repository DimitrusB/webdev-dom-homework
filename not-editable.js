import { students } from "./data.js";

const listElement = document.getElementById("list");

// Рендер-функция
const renderStudents = () => {
  // Преобразование данных в HTML-разметку с помощью map и join
  const studentsHtml = students
    .map((student, index) => {
      return `
      <li class="student" data-color="${student.color}">
        <p class="student-name">
          ${student.name}
        </p>
        <p>Любимый цвет: ${student.color} <span style="
          display:inline-block;
          width: 15px;
          height: 15px;
          background-color: ${student.color};">
        </span></p>
      </li>`;
    })
    .join("");

  // Рендер HTML-строки в браузер
  listElement.innerHTML = studentsHtml;

  // Поиск динамически создаваемых элементов разметки
  const deleteButtons = document.querySelectorAll(".delete-button");


  // Добавление обработчиков клика на динамически созданные элементы
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      // Отключение всплытия у события через stopPropagation,
      // обработчики клика на родительских элементах не будут вызываться после отключения
      event.stopPropagation();

      // Получение значения из data-* атрибутов разметки 
      const index = deleteButton.dataset.index;

      // Удаляем студента из данных
      students.splice(index, 1);
      // Делаем ререндер, чтобы после обновления данных обновить разметку
      renderStudents();
    });
  }
};

renderStudents();