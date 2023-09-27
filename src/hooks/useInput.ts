import React, {useState} from "react";

const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    return {
        bind : {value, onChange: handleChange},
        value,
        setValue
    };
};

export default useInput