export default function InputText(props) {
    const { classname = "", Type, Name, placeHolder, onChange } = props;

    const baseClass =
        "bg-white text-stone-700 border border-gray-300 rounded-md pl-3 h-10";

    return (
        <input
            type={Type}
            name={Name}
            className={`${baseClass} ${classname}`}
            placeholder={placeHolder}
            onChange={onChange}
        />
    );
}
