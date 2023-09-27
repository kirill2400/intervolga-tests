import React, {FC, useEffect, useLayoutEffect} from "react";
import useInput from "../../hooks/useInput.ts";
import InputMask from 'react-input-mask';
import {TextButton} from "../TextButton.tsx";

interface FormProps {
    visible: boolean
    setVisible:  React.Dispatch<React.SetStateAction<boolean>>
}

const Form: FC<FormProps> = ({visible, setVisible}) => {
    const gosnumber = useInput("А000АА 000")
    const transportName = useInput("")
    const arriveDate = useInput("")
    const name = useInput("")
    const passport = useInput("")
    const passportIssuedBy = useInput("")
    const passportIssuedByDate = useInput("")

    useEffect(() => {
        const form = {
            gosnumber: gosnumber.value,
            transportName: transportName.value,
            arriveDate: arriveDate.value,
            name: name.value,
            passport: passport.value,
            passportIssuedBy: passportIssuedBy.value,
            passportIssuedByDate: passportIssuedByDate.value,
        }

        localStorage.setItem("form", JSON.stringify(form))
    });

    useLayoutEffect(() => {
        const formJson = localStorage.getItem("form")
        if (formJson) {
            const form = JSON.parse(formJson)
            gosnumber.setValue(form.gosnumber)
            transportName.setValue(form.transportName)
            arriveDate.setValue(form.arriveDate)
            name.setValue(form.name)
            passport.setValue(form.passport)
            passportIssuedBy.setValue(form.passportIssuedBy)
            passportIssuedByDate.setValue(form.passportIssuedByDate)
        }
    }, []);

    if (!visible) {
        return null
    }

    return (
        <div className="fixed left-0 top-0 right-0 bottom-0 bg-gray-600/50 flex justify-center items-center">
            <form className="md:min-w-[500px] min-w-full max-h-full overflow-scroll p-10 bg-white md:border-2 md:border-black flex flex-col justify-[start] gap-5">
                <h1 className="text-xl font-bold">Транспортные средства и водители</h1>
                <label>
                    <p className="pb-2 font-semibold">Гос-номер</p>
                    <InputMask required className="w-full p-3 border-2 border-black" mask={"a999aa 999"} alwaysShowMask formatChars={{"9": "[0-9]", "a": "[А-я]"}} maskChar={'_'} {...gosnumber.bind}></InputMask>
                </label>
                <label>
                    <p className="pb-2 font-semibold">Транспортное средство</p>
                    <input className="w-full p-3 border-2 border-black" required placeholder="Транспортное средство" {...transportName.bind} />
                </label>
                <label>
                    <p className="pb-2 font-semibold">Ориентировочная дата прибытия к покупателю</p>
                    <InputMask required className="w-full p-3 border-2 border-black" mask={"99.99.9999"} alwaysShowMask maskChar={'0'} {...arriveDate.bind}></InputMask>
                </label>
                <h1 className="pt-5 text-xl font-bold">Данные о водителе</h1>
                <label>
                    <p className="pb-2 font-semibold">ФИО</p>
                    <input className="w-full p-3 border-2 border-black" required placeholder="Укажите ФИО водителя" {...name.bind} />
                </label>
                <label>
                    <p className="pb-2 font-semibold">Паспортные данные</p>
                    <InputMask required className="w-full p-3 border-2 border-black" mask={"9999 999999"} alwaysShowMask maskChar={'0'} {...passport.bind}></InputMask>
                </label>
                <label>
                    <p className="pb-2 font-semibold">Кем выдан</p>
                    <input className="w-full p-3 border-2 border-black" required placeholder="Кем выдан" {...passportIssuedBy.bind} />
                </label>
                <label>
                    <p className="pb-2 font-semibold">Когда выдан</p>
                    <InputMask required className="w-full p-3 border-2 border-black" mask={"99.99.9999"} alwaysShowMask maskChar={'0'} {...passportIssuedByDate.bind}></InputMask>
                </label>
                <div className="flex justify-center gap-5">
                    <TextButton bgClasses="bg-green-600" type="submit"
                                onClick={() => {
                                    gosnumber.setValue("")
                                    transportName.setValue("")
                                    name.setValue("")
                                    passport.setValue("")
                                    passportIssuedBy.setValue("")
                                    passportIssuedByDate.setValue("")
                                    setVisible(false)
                                }}
                    >
                        Отправить
                    </TextButton>
                    <TextButton onClick={() => setVisible(false)}>Отменить</TextButton>
                </div>
            </form>
        </div>
    );
};

export default Form;