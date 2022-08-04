import { Icon } from "@hope-ui/solid";
import { Component } from "solid-js";

interface ICheckMarkIcon {
    colour?: string
}

export const CheckMarkIcon: Component<ICheckMarkIcon> = (props: ICheckMarkIcon) => {
    return (
        <Icon viewBox="0 0 24 24" color={props.colour ?? 'green'} marginRight="5px" marginBottom="2px">
            <path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"
                fill={props.colour ?? 'green'}
            />
        </Icon>
    );
}