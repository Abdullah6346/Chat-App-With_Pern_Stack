"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContextProvider = exports.useAuthContext = void 0;
const react_1 = require("react");
const AuthContext = (0, react_1.createContext)({
    authUser: null,
    setAuthUser: () => { },
    isLoading: true,
});
//eslint-disable-next-line
const useAuthContext = () => {
    return (0, react_1.useContext)(AuthContext);
};
exports.useAuthContext = useAuthContext;
const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            setAuthUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);
    (0, react_1.useEffect)(() => {
        if (authUser) {
            localStorage.setItem('authUser', JSON.stringify(authUser));
        }
        else {
            localStorage.removeItem('authUser');
        }
    }, [authUser]);
    return (<AuthContext.Provider value={{ authUser, isLoading, setAuthUser }}>
      {children}
    </AuthContext.Provider>);
};
exports.AuthContextProvider = AuthContextProvider;
