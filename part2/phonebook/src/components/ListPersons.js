const ListPersons = ({ persons, filter }) =>
    <Persons persons={persons} filter={filter} />

const Persons = ({ persons, filter }) => {
    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filter))
    return (
        <div>
            <ul>
                {personsToShow.map(person =>
                    <Person key={person.name} person={person} />
                )}
            </ul>
        </div>
    )
}

const Person = ({ person }) => {
    return (
        <li>{person.name} {person.number}</li>
    )
}

export default ListPersons