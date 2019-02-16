import { EntryModel, add } from "./storage.js";
import { getNextAnniversary } from "./api.js";
import { formatDate, getDateDiff } from "./date.js";

interface AddFormModel extends HTMLFormElement {
  nameInput: HTMLInputElement;
  yearInput: HTMLInputElement;
  monthInput: HTMLInputElement;
  dayInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
}

interface DocumentModel extends Document {
  addForm: AddFormModel;
}
export const initForm = () => {
  const { addForm } = document as DocumentModel;

  addForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = addForm.nameInput.value;
    const year = Number(addForm.yearInput.value);
    const month = Number(addForm.monthInput.value);
    const day = Number(addForm.dayInput.value);

    const newEntry = add({ name, lunarDate: { year, month, day } });

    renderItem(newEntry);

    addForm.reset();
  });
};

export const renderItem = async ({
  key,
  item: { name, lunarDate }
}: EntryModel) => {
  const content = document.querySelector("#content");

  if (!content) {
    return;
  }

  const tr = document.createElement("tr");

  const tagString = `
    <td>${name}</td>
    <td>${formatDate(
      new Date(lunarDate.year, lunarDate.month - 1, lunarDate.day)
    )}</td>
    <td>로딩중</td>
`;

  tr.insertAdjacentHTML("afterbegin", tagString);

  content.appendChild(tr);

  const date = await getNextAnniversary(lunarDate.month, lunarDate.day);

  const nextDate = tr.lastElementChild;

  if (!nextDate) {
    return;
  }

  nextDate.textContent = date
    ? `${formatDate(date)} (${getDateDiff(date)}일 남음)`
    : "오류";
};
