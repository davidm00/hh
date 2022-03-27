// import { createContext, useRef, useState } from "react";

// import test from "../Python/main.py";

// export const PyodideContext = createContext({
//   run: () => {},
// });

// export default function PyodideProvider({ children }) {
//   const pyodide = useRef(null);
//   const hasLoadPyodideBeenCalled = useRef(false);
//   const [isPyodideLoading, setIsPyodideLoading] = useState(true);

//   return (
//     <PyodideContext.Provider
//       value={{
//         pyodide,
//         hasLoadPyodideBeenCalled,
//         isPyodideLoading,
//         setIsPyodideLoading,
//       }}
//     >
//       {children}
//     </PyodideContext.Provider>
//   );
// }
