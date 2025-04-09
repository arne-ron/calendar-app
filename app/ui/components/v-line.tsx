import {DetailedHTMLProps, HTMLAttributes} from "react";
import clsx from "clsx";

export function VLine({className, ...props}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return <div className={clsx('w-full bg-gray-500/20', className)} style={{height: '1px'}} {...props}/>
}