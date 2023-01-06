const NewPerson = ({ onSubmit, onChangeName, valueName,
    onChangeNumber, valueNumber }) => <PersonForm onSubmit={onSubmit}
        onChangeName={onChangeName} valueName={valueName}
        onChangeNumber={onChangeNumber} valueNumber={valueNumber}
    />

const PersonForm = ({ onSubmit, onChangeName, valueName,
    onChangeNumber, valueNumber }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input
                    onChange={onChangeName}
                    value={valueName}
                />
            </div>
            <div>
                number: <input
                    onChange={onChangeNumber}
                    value={valueNumber}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default NewPerson