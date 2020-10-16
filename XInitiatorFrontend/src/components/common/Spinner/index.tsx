import React from 'react'
import Loading from '../../../loading.svg'

type Props = {
    marginTop?: number
}
export default function Spinner(props: Props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: props.marginTop ? props.marginTop: 0}}>
            <img src={Loading} alt={"Spinner"}/>
        </div>
    )
}
