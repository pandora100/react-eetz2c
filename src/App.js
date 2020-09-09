import React from "react";
import "./style.css";

//hook
function useTimeout(callback, delay) {
  const timeoutRef = React.useRef();
  const callbackRef = React.useRef(callback);


  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  /// Set up the timeout:

  React.useEffect(() => {
    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);

      /// Clear timeout if the components is unmounted or the delay changes:
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);

  // In case you want to manually clear the timeout from the consuming component...:
  return timeoutRef;
};


export default function App() {
 const [isLoading, setLoading] = React.useState(true);
  const [showLoader, setShowLoader] = React.useState(false);
  
  // Simulate loading some data:
  const fakeNetworkRequest = React.useCallback(() => {
    setLoading(true);
    setShowLoader(false);
    
    // 50% of the time it will display the loader, and 50% of the time it won't:
    window.setTimeout(() => setLoading(false), Math.random() * 3000);
  }, []);
  
  // Initial data load:
  React.useEffect(fakeNetworkRequest, []);
        
  /// After 2 second, we want to show a loader:
  // useTimeout(() => setShowLoader(true), isLoading ? 20000 : null); //1 
    useTimeout(() => setShowLoader(true), isLoading ? 5 : null); //2

  return (<React.Fragment>
    <div  className="container">
    <button onClick={ fakeNetworkRequest } disabled={ isLoading }>
      { isLoading ? 'LOADING... 📀' : 'LOAD MORE 🚀' }
    </button>
    
    { isLoading && showLoader ? <div className="loader"><span className="loaderIcon">📀</span></div> : null }
    { isLoading ? null : <p>Loaded! ✨</p> }
    </div>
  </React.Fragment>);
}