import React, { useEffect, useState } from "react";
import NameFact from '../components/name-fact/name-fact.component';
import SearchBar from "../components/search-bar/search-bar.component";
import History from '../components/history-section/history.component';
import HistoryContext, { HistoryCtxInterface } from "../context/history/history.context";
import axios from 'axios';

import './App.css';

const App = () => {
    const [theRule, setRule] = useState<string>('');
    const [theStatus, setStatus] = useState<string>('');
    const [history, setHistory] = useState<Array<HistoryCtxInterface>>([]);
    const [inputTxt, setInput] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);

    // For Search Bar
    const onlyAllowCharAndMakeProperCase = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(
            e.target.value
        );
    }

    // To detect enter in Search Bar
    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13 && event.key !== "") {
            setLoading(true);
            setRule(inputTxt);
            setInput("");
            setStatus("");
        }
    }

    const setError = () => {
        setStatus("Not activated");
    }

    useEffect(() => {
        // Declare the data fetching function
        const fetchData = async () => {
            try {
                if (theRule !== "") {
                    let serverLink = `${process.env.REACT_APP_SERVER_URL}`;
                    const post = { data: theRule };
                    const resp2 = await axios.post(serverLink, post);
                    if (resp2.status === 200) {
                        setStatus("Activated");
                    } else {
                        setError();
                    }


                }
            } catch (err) {
                console.log(err);
                setError();
            }

        }
        // Call the function
        fetchData()
            .catch(err => console.log(err))
            .then(() => {
                if (theRule !== '') {
                    // Solve component not re-rendering using slice()
                    const currentHistory = history.slice();
                    const newHistory: HistoryCtxInterface = {
                        name: theRule,
                        status: theStatus,
                    }
                    if (theStatus != null) currentHistory.push(newHistory);
                    setHistory(currentHistory);

                    // console.log('New History', newHistory);
                    setLoading(false);
                    // console.log("Modified History", history);
                }
            });
        // eslint-disable-next-line
    }, [theRule]);

    return (
        <HistoryContext.Provider value={history}>
            <div className="top-container">
                <header className="tc pv3 pv4-ns top-left">
                    <h1 className="header-title f-headline-l f1-ns">SmartByte</h1>
                    <h2 className="header-subtitle">Rules</h2>
                </header>
                <div className="top-right">
                    <SearchBar
                        detectEnter={onKeyUp}
                        value={inputTxt}
                        onChange={onlyAllowCharAndMakeProperCase.bind(this)}
                    />
                    {<NameFact nama={theRule} umur={theStatus} isLoading={isLoading} />}
                </div>
            </div>
        </HistoryContext.Provider>
    );
}
export default App;