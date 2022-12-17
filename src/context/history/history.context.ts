import React from "react";

export type HistoryCtxInterface = {
    name: string, 
    age: string, 
    gender: string,
    sample:number
}

const HistoryContext = React.createContext<Array<HistoryCtxInterface>>([]);

export default HistoryContext;