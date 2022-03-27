// import { useContext, useEffect, useState } from "react";
// import { PyodideContext } from "../../Context/pyodideContext";

// export default function Pyodide({
//   id,
//   pythonCode,
//   loadingMessage = "loading...",
//   evaluatingMessage = "evaluating...",
// }) {
//   const {
//     pyodide,
//     hasLoadPyodideBeenCalled,
//     isPyodideLoading,
//     setIsPyodideLoading,
//   } = useContext(PyodideContext);
//   const [pyodideOutput, setPyodideOutput] = useState(evaluatingMessage);

// //   const run = async () => {
// //     try {
// //       return await pyodide.runPython(pythonCode);
// //     } catch (error) {
// //       console.error(error);
// //       return "Error evaluating Python code. See console for details.";
// //     }
// //   };

//   // load pyodide wasm module and initialize it
//   useEffect(() => {
//     if (!hasLoadPyodideBeenCalled.current) {
//       // immediately set hasLoadPyodideBeenCalled ref, which is part of context, to true
//       // this prevents any additional Pyodide components from calling loadPyodide a second time
//       hasLoadPyodideBeenCalled.current = true;
//       (async function () {
//         pyodide.current = await window.globalThis.loadPyodide({
//           indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/",
//         });
//         // updating value of isPyodideLoading triggers second useEffect
//         setIsPyodideLoading(false);
//       })();
//     }
//     // pyodide and hasLoadPyodideBeenCalled are both refs and setIsPyodideLoading is a setState function (from context)
//     // as a result, these dependencies will be stable and never cause the component to re-render
//   }, [pyodide, hasLoadPyodideBeenCalled, setIsPyodideLoading]);

//   const run = async () => {
//     const scriptText = "5+7" // = await (await fetch("5 + 7")).text();
//     console.log("SCRIPTTEXT: ", scriptText)
//     return scriptText;
//     // const out = await runScript(scriptText);
//     // setOutput(out);
// }

//   // evaluate python code with pyodide and set output
//   useEffect(() => {
//     console.log("Current: ", pyodide.current);
//     if(pyodide.current){
//         console.log("Current: ", pyodide.current.runPythonAsync);
//         console.log("RES: ", pyodide.current.runPythonAsync(run()))
//     }
//     console.log("isPyodideLoading: ", isPyodideLoading);
//     if (isPyodideLoading) {
//       console.log("Entered cond: ");
//       const evaluatePython = async (pyodide, pythonCode) => {
//         try {
//           return await pyodide.runPythonAsync(pythonCode);
//         } catch (error) {
//           console.error(error);
//           return "Error evaluating Python code. See console for details.";
//         }
//       };
//       (async function () {
//         let res = await evaluatePython(pyodide.current, pythonCode);
//         console.log("RESULT: ", res);
//         setPyodideOutput(res);
//       })();
//     }
//     // component re-renders when isPyodideLoading changes, which is set with first useEffect and updated via context
//   }, [isPyodideLoading, pyodide, pythonCode]);

//   return (
//     <>
//       <div id={id}>
//         Pyodide Output: {isPyodideLoading ? loadingMessage : pyodideOutput}
//       </div>
//     </>
//   );
// }
