import React, { useEffect } from 'react'
import Vara from 'vara';

const VaraText = ({text}) => {
    useEffect(() => {
        var vara = new Vara(
            "#vara-container",
            "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
            [
                {
                    text: text,
                    // fontSize: 40,
                    strokeWidth: 1,
                },
            ]
        );
    }, []);
  return (
    <div id="vara-container" className="z-[20]"></div>
  )
}

export default VaraText
