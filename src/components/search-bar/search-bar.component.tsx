import React from "react";

type SearchBarProps = {
    detectEnter: (arg0: React.KeyboardEvent<HTMLInputElement>) => void,
    value: string,
    onChange: (arg0: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ( { detectEnter, value, onChange }: SearchBarProps) => {
    return (
        <div className="pv3">
            <big id="name-desc" className="f2 white-80 db mb2 pv3">Please enter a new rule</big>
            <input 
                id="thenumber" 
                type="text" 
                placeholder="Type a rule" 
                onKeyUp={detectEnter}
                value={value}
                onChange={onChange}
                className="ba b--white-20 pa3 mb2 w-90 f3"
                min="0" max="1000"
                autoComplete="off"
            />
            <small id="name-desc" className="f4 white-80 db mb2 pv3">Press enter to submit.</small>
        </div>
    );
}
export default SearchBar;