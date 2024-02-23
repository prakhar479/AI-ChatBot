import { Link } from "react-router-dom"
import React from 'react'

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => Promise<void>;
}

const NavigationLinks = (props: Props) => {
    return (
        <Link
            to={props.to}
            style={{ background: props.bg, color: props.textColor }}
            className="navigation-links"
            onMouseOver={(e) => {
                e.currentTarget.style.background = "grey";
                e.currentTarget.style.color = props.bg;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = props.bg;
                e.currentTarget.style.color = props.textColor;
            }}
        >
            {props.text}
        </Link>
    )
}

export default NavigationLinks;
