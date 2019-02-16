import { initForm, renderItem, sort } from "./render.js";
import { getSaved } from "./storage.js";
initForm();
const promises = getSaved().map(entry => renderItem(entry));
Promise.all(promises).then(() => sort());
//# sourceMappingURL=script.js.map