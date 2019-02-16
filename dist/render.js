import { add, remove } from "./storage.js";
import { getNextAnniversary } from "./api.js";
import { formatDate, getDateDiff } from "./date.js";
export const initForm = () => {
  const {
    addForm
  } = document;
  addForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = addForm.nameInput.value;
    const year = Number(addForm.yearInput.value);
    const month = Number(addForm.monthInput.value);
    const day = Number(addForm.dayInput.value);
    const newEntry = add({
      name,
      lunarDate: {
        year,
        month,
        day
      }
    });
    renderItem(newEntry);
    addForm.reset();
  });
};
export const renderItem = async ({
  key,
  item: {
    name,
    lunarDate
  }
}) => {
  const content = document.querySelector("#content");

  if (!content) {
    return;
  }

  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", event => {
    remove(key); // TODO. GC.

    tr.remove();
  });
  td.appendChild(deleteButton);
  tr.appendChild(td);
  const tagString = `
    <td>${name}</td>
    <td>${formatDate(new Date(lunarDate.year, lunarDate.month - 1, lunarDate.day))}</td>
    <td>로딩중</td>
`;
  tr.insertAdjacentHTML("beforeend", tagString);
  content.appendChild(tr);
  const date = await getNextAnniversary(lunarDate.month, lunarDate.day);
  const nextDate = tr.lastElementChild;

  if (!nextDate) {
    return;
  }

  nextDate.textContent = date ? `${formatDate(date)} (${getDateDiff(date)}일 남음)` : "오류";
};
//# sourceMappingURL=render.js.map