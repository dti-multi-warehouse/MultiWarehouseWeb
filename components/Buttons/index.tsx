interface ButtonProps{
    children?: JSX.Element | React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Buttons: React.FC<ButtonProps> = ({ children, onClick, className}) => {
    return(
        <button className={` ${className}`} onClick={onClick}>{children}</button>
    )
}

export default Buttons;