export default function InputText(props) {
    const { classname, Type, Name, placeHolder, onChange } = props;

    return (
        <input
            type={Type}
            name={Name}
            className={classname || "inputText"}
            placeholder={placeHolder}
            onChange={onChange}
        />
    );
}