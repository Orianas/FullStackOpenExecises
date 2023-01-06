const Person = ({ person, removePerson }) => {
    console.log("test")
    return (
        <li>
            {person.name} {person.number}
            <button onClick={removePerson}>
                delete
            </button>
        </li >
    )
}

export default Person