import React from "react";

export type HistoryCtxInterface = {
    name: string, 
    status: string
}

const HistoryContext = React.createContext<Array<HistoryCtxInterface>>([]);

export default HistoryContext;