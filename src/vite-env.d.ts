/// <reference types="vite/client" />


declare module '*.svg' {

    const content: string;

    export default content;

}

declare module "*.svg?react" {
    import { FC, SVGProps } from "react";
    const ReactComponent: FC<SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}


declare module '*.png' {

    const value: string;

    export default value;

}
