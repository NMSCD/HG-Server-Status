import { Icon } from "@hope-ui/solid";
import { Component } from "solid-js";

interface ICheckMarkIcon {
    colour?: string
}

export const CheckMarkIcon: Component<ICheckMarkIcon> = (props: ICheckMarkIcon) => {
    return (
        <Icon viewBox="0 0 512 512" color={props.colour ?? 'green'} marginRight="5px" marginBottom="2px">
            <path
                d="M245.2,490.4c135.2,0,245.2-110,245.2-245.2S380.4,0,245.2,0S0,110,0,245.2S110,490.4,245.2,490.4z M245.2,24.5
			c121.7,0,220.7,99,220.7,220.7s-99,220.7-220.7,220.7s-220.7-99-220.7-220.7S123.5,24.5,245.2,24.5z"
                fill={props.colour ?? 'green'}
            />
            <path
                d="M206.5,349.6c2.3,2.3,5.4,3.6,8.7,3.6l0,0c3.2,0,6.3-1.3,8.6-3.6l147.5-146.7c2.3-2.3,3.6-5.4,3.6-8.7
			c0-3.2-1.3-6.4-3.6-8.7l-44.6-44.8c-4.8-4.8-12.5-4.8-17.3-0.1l-94,93.5l-34.2-34.4c-2.3-2.3-5.4-3.6-8.7-3.6l0,0
			c-3.2,0-6.3,1.3-8.6,3.6l-44.8,44.6c-2.3,2.3-3.6,5.4-3.6,8.7c0,3.2,1.3,6.4,3.6,8.7L206.5,349.6z M172.5,225.7l34.3,34.5
			c4.8,4.8,12.5,4.8,17.3,0.1l94-93.5l27.3,27.4L215.3,323.6L145.1,253L172.5,225.7z"
                fill={props.colour ?? 'green'}
            />
        </Icon>
    );
}