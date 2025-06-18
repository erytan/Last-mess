import { useState } from "react";
import "./letter.css"
import { ButterflyPath } from "../../components";
import slig from "../../images/background/slig.gif"
import butterflys from "../../images/background/buttefly-s.gif"
const Latter = () => {

    return (
        <div className="contanier-letter">
            <div className="slig">
                <img src={slig} className="slig-img" />
            </div>
            {/* <div className="butterfly-s">
                <img src={butterflys} className="butterfly-s-img"/>
            </div> */}
            <ButterflyPath />

        </div>
    )
}
export default Latter;