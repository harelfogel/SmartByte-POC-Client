import React from "react";
import Spinner from "../spinner/spinner.component";

import './name-fact.styles.scss';

type NameFactProps = {
    nama: string,
    umur: number,
    jk: string,
    samples: number,
    isLoading: boolean
}

const NameFact = ({ nama, umur, jk,samples, isLoading }: NameFactProps) => {
    return (
        (nama === "") ?
        <div></div> :
        <div className="w-80 bg-white br3 pa3 pa4-ns mv2 ba b--black-10 shadow-5">
            {
                isLoading ?
                <Spinner /> :
                <div>
                    <h1 className="f2 f-subheadline-l fw6 mv3 nama">{nama}</h1>
                    {
                        (jk === null || umur === null || samples===null) ?
                        <p className="f6 fw4">Sorry, data not found.</p> :
                        <div>
                            <p className="f6 fw4">You are probalbly a {jk}.</p>
                            <p className="f6 fw4">Accuracy:{umur}</p>
                            <p className="f6 fw4">Samples:{samples}</p>

                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default NameFact;