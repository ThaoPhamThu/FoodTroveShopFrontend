import React, { memo } from "react";

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
    return (
        <div className="w-full mb-4 flex flex-col">
            <label
                className="text-[14px]"
                htmlFor={nameKey}>{nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>
            <input
                type={type || 'text'} className="px-4 py-2  rounded-md border w-full my-2 text-sm"
                placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFields([])}>
            </input>

            {invalidFields?.some(el => el.name === nameKey) && <small className="text-main italic">{invalidFields.find(el => el.name == nameKey)?.mes}</small>}

        </div>
    )
}

export default memo(InputField)