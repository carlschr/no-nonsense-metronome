const Button = ({handleClick, content, className}) => {
    return (
        <button className={className} onClick={handleClick}>{content}</button>
    )
};

export default Button;