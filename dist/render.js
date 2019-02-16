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
  tr.insertAdjacentHTML("beforeend", `
  <td>${name}</td>
  <td>${formatDate(new Date(lunarDate.year, lunarDate.month - 1, lunarDate.day))}</td>
`);
  content.appendChild(tr);
  const date = await getNextAnniversary(lunarDate.month, lunarDate.day);
  tr.insertAdjacentHTML("beforeend", date ? `
    <td>${formatDate(date)}</td>
    <td class="remaining">${getDateDiff(date)}일</td>
  ` : `<td>오류</td>`);
  return date;
};
export const sort = () => {
  const content = document.querySelector("#content");

  if (!content) {
    return;
  }

  const sorted = [...content.children].sort((aElement, bElement) => {
    try {
      const a = aElement.querySelector(".remaining").textContent.match(/\d+/)[0];
      const b = bElement.querySelector(".remaining").textContent.match(/\d+/)[0];
      return Number(a) - Number(b);
    } catch (error) {
      return 0;
    }
  });
  sorted.forEach(element => content.append(element));
};
//# sourceMappingURL=render.js.map