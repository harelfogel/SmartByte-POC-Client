import React, { useEffect, useState } from "react";
import NameFact from '../components/name-fact/name-fact.component';
import SearchBar from "../components/search-bar/search-bar.component";
import History from '../components/history-section/history.component';
import HistoryContext, { HistoryCtxInterface } from "../context/history/history.context";
import axios from 'axios';

import './App.css';

const App = () => {
    const [theRule, setRule] = useState<string>('');
    const [theAge, setAge] = useState<string>('');
    const [theSamples, setSamples] = useState<number>();
    const [history, setHistory] = useState<Array<HistoryCtxInterface>>([]);
    const [theGender, setGender] = useState<string>();
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
            setAge("");
            setGender(undefined);
            setSamples(undefined);
        }
    }

    const setError = () => {
        setGender("Error! Cannot create rule");
        setAge("Not activated");
        setSamples(0);
    }

    useEffect(() => {
        // Declare the data fetching function
        const fetchData = async () => {
            try {
                if (theRule !== "") {
                    let serverLink = `${process.env.REACT_APP_SERVER_URL}`;
                    //let theGenderLink = `https://gender-api.com/get?name=${theRule}&key=McGNFcCwzMWx2EtflRhRRRH6Tzv2MnflsSEL`;

                    // const resp1 = await fetch(theAgeLink);
                    // const ageData = await resp1.json();
                    // setAge(ageData.age);
                    // console.log('AgeData', ageData, theAge);
                    const post = { data: theRule };
                    const resp2 = await axios.post(serverLink, post);
                    console.log(resp2);
                    if (resp2.status === 200) {
                        setGender("Rules is been created!");
                        setAge("Activated");
                        setSamples(0);
                    } else {
                        setError();
                    }


                    // console.log('GenderData', genderData, theGender);
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
                        age: theAge,
                        gender: theGender!,
                        sample: theSamples!
                    }
                    if (theAge != null && theGender != null) currentHistory.push(newHistory);
                    setHistory(currentHistory);

                    // console.log('New History', newHistory);
                    setLoading(false);
                    // console.log("Modified History", history);
                }
            });
        // eslint-disable-next-line
    }, [theRule, theAge, theGender]);

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
                    {<NameFact nama={theRule} umur={theAge} jk={theGender!} samples={theSamples!} isLoading={isLoading} />}
                </div>
            </div>
        </HistoryContext.Provider>
    );
}
export default App;