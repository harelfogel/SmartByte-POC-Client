import React, { useEffect, useState } from "react";
import NameFact from '../components/name-fact/name-fact.component';
import SearchBar from "../components/search-bar/search-bar.component";
import History from '../components/history-section/history.component';
import HistoryContext, { HistoryCtxInterface } from "../context/history/history.context";

import './App.css';

const App = () => {
    const [ theName, setName ] = useState<string>('');
    const [ theAge, setAge ] = useState<number>();
    const [ theSamples, setSamples ] = useState<number>();
    const [ history, setHistory ] = useState<Array<HistoryCtxInterface>>([]);
    const [ theGender, setGender ] = useState<string>();
    const [ inputTxt, setInput ] = useState<string>('');
    const [ isLoading, setLoading ] = useState<boolean>(false);

    // For Search Bar
    const onlyAllowCharAndMakeProperCase = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(
            e.target.value.replace(/[^a-zA-Z]/ig, "").replace(/\w\S*/g, (txt: string) => {return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()})
        );
    }

    // To detect enter in Search Bar
    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.keyCode === 13 && event.key !== ""){
            setLoading(true);
            setName(inputTxt);
            setInput("");
            setAge(undefined);
            setGender(undefined);
            setSamples(undefined);      
        }
    }
    
    useEffect(() => {
        // Declare the data fetching function
        const fetchData = async () => {
            if (theName !== ""){
                // let theAgeLink = `https://api.agify.io?name=${theName}`;
                // let theGenderLink = `https://api.genderize.io?name=${theName}`;
                let theGenderLink = `https://gender-api.com/get?name=${theName}&key=McGNFcCwzMWx2EtflRhRRRH6Tzv2MnflsSEL`;
    
                // const resp1 = await fetch(theAgeLink);
                // const ageData = await resp1.json();
                // setAge(ageData.age);
                // console.log('AgeData', ageData, theAge);
    
                const resp2 = await fetch(theGenderLink);
                const genderData = await resp2.json();
                setGender(genderData.gender);
                setAge(genderData.accuracy);
                setSamples(genderData.samples);  
                // console.log('GenderData', genderData, theGender);
            }
        }
        // Call the function
        fetchData()
            .catch(err => console.log(err))
            .then(() => {
                if(theName !== ''){
                // Solve component not re-rendering using slice()
                const currentHistory = history.slice();
                const newHistory: HistoryCtxInterface = {
                    name: theName, 
                    age: theAge!, 
                    gender: theGender!,
                    sample:theSamples!
                }
                if (theAge != null && theGender != null) currentHistory.push(newHistory);
                setHistory(currentHistory);

                // console.log('New History', newHistory);
                setLoading(false);
                // console.log("Modified History", history);
            }
            });
    // eslint-disable-next-line
    }, [theName, theAge, theGender]);

    return (
        <HistoryContext.Provider value={history}>
            <div className="top-container">
                <header className="tc pv3 pv4-ns top-left">
                    <h1 className="header-title f-headline-l f1-ns">Gender Guesser</h1>
                    <h2 className="header-subtitle">Type a name!</h2>
                </header>
                <div className="top-right">
                    <SearchBar 
                        detectEnter={onKeyUp} 
                        value={inputTxt} 
                        onChange={onlyAllowCharAndMakeProperCase.bind(this)}
                    />
                    { <NameFact nama={theName} umur={theAge!} jk={theGender!} samples={theSamples!} isLoading={isLoading}/> }
                </div>
            </div>
        </HistoryContext.Provider>
    );
}
export default App;