import { initForm, renderItem } from "./render.js";
import { getSaved } from "./storage.js";
initForm();
getSaved().map(entry => renderItem(entry));
//# sourceMappingURL=script.js.map