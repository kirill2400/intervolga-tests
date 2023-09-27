
import React, {FC, MouseEventHandler, ReactNode} from "react";
import {twMerge} from "../utils/twMerge.ts";

interface TextButtonProps {
    bgClasses?: string
    textClasses?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    type?: "button" | "submit" | "reset"
    children: ReactNode
}

export const TextButton: FC<TextButtonProps> = ({children, bgClasses, textClasses, onClick, type}) => {
    return (
        <button
            type={type}
            className={
            twMerge("px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-1 duration-150",
                bgClasses ?? "bg-gray-600 hover:bg-gray-700",
                textClasses ?? "text-white"
            )}
            // @ts-ignore
            style={{textWrap: "balance"}}
            onClick={onClick}>
            <span>{children}</span>
        </button>
    )
}
