import React from "react";

import './history-box.styles.scss';

type HistoryBoxProps = {
    namaNya: string,
    umurNya: number,
    jkNya: string,
    samples:number
}

const HistoryBox = ( { namaNya, umurNya,samples, jkNya }: HistoryBoxProps) => {
    return (
        <div className='mw5 bg-white br3 pa3 pa4-ns mv3 ba b--black-10 mh3 w-25'>
            <h3 className='f3 mb2 mv2 nama'>{namaNya}</h3>
            <div className='flex justify-between'>
                <p className='f5 fw4 gray mv3'>Age: </p>
                <p className='f5 fw4 black mv3'>{umurNya}</p>
            </div>
            <div className='flex justify-between'>
                <p className='f5 fw4 gray mv3'>Gender: </p>
                <p className='f5 fw4 black mv3'>{jkNya}</p>
            </div>  
            <div className='flex justify-between'>
                <p className='f5 fw4 gray mv3'>Samples: </p>
                <p className='f5 fw4 black mv3'>{samples}</p>
            </div>              
        </div>
    );
}
export default HistoryBox;