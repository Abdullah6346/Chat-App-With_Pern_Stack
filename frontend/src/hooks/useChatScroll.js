"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useChatScroll(dep) {
    const ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.scrollTop = ref.current.scrollHeight;
            }
        }, 100);
    }, [dep]);
    return ref;
}
exports.default = useChatScroll;
