import {MouseEvent} from "react";

type ButtonPropsType = {
    title: string,
    callBack: () => void,
    className?: string,
};
export const Button = (props: ButtonPropsType) => {
    const {title,  callBack, className} = props;

    const onClickButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        callBack()
    }

    return (
        <button className={className} onClick={onClickButtonHandler}>{title}</button>
    );
};