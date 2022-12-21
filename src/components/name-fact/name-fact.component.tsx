import React from "react";
import Spinner from "../spinner/spinner.component";

import './name-fact.styles.scss';

type NameFactProps = {
    nama: string,
    umur: string,
    isLoading: boolean
}

const NameFact = ({ nama, umur,isLoading }: NameFactProps) => {
    return (
        (nama === "") ?
        <div></div> :
        <div className="w-90 bg-white br3 pa3 pa4-ns mv2 ba b--black-10 shadow-5">
            {
                isLoading ?
                <Spinner /> :
                <div>
                    {/* <p className="f6 f-subheadline-l fw6 mv3 nama">{nama}</p> */}
                    {
                        (umur === null) ?
                        <p className="f6 fw4">Sorry, data not found.</p> :
                        <div>
                            <p className="f6 fw4"><b>Status:</b>{umur}</p>

                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default NameFact;