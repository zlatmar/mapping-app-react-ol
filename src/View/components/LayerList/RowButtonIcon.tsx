import * as React from "react";

export const RowButtonIcon = (props: {
    image: string | React.JSX.Element;
    title: string;
    clickHandler: (ev: any) => void;
}) => {
    const { image, title, clickHandler } = props;

    return (
        <div onClick={clickHandler} style={{ cursor: "pointer", display: "inline-block" }}>
            {typeof image === "string" ? (
                <div
                    title={title}
                    style={{
                        height: "2rem",
                        width: "2rem",
                        backgroundImage: `url(${image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                    }}
                />
            ) : (
                <div title={title} style={{ height: "2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {image}
                </div>
            )}
        </div>
    );
};
