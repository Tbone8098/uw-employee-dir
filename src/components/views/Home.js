import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Home() {
    const [peopleState, setPeopleState] = useState('')
    const [peopleDupState, setPeopleDupState] = useState('')
    const [searchName, setSearchName] = useState('')
    const [genderState, setGenderState] = useState('')

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async() => {
        const people = await axios.get('https://randomuser.me/api/?results=100')
        setPeopleState(people.data.results)
        setPeopleDupState(people.data.results)
    }, [])

    useEffect(() => {
        if(searchName.length > 0){
            let newList = []
            peopleState.forEach(person => {
                if((person.name.first).toLowerCase().includes(searchName.toLowerCase())){
                    newList.push(person)
                }
            });
            setPeopleDupState(newList)
        } else {
            setPeopleDupState(peopleState)
        }
    },[peopleState, searchName])

    useEffect(() => {
        if(genderState !== ''){

            let newList = []
            peopleState.forEach(person => {
                if(person.gender === genderState){
                    newList.push(person)
                }
            });
            setPeopleDupState(newList)
        } else {
            setPeopleDupState(peopleState)
        }
    },[genderState])

    const updateInput = (e) => {
        let name = e.target.value
        setSearchName(name)
    }

    const updateGender = (e) => {
        let gender = e.target.value
        setGenderState(gender)
    }

    return (
        <div className="Home">
            <h1>Employee Page</h1>
            <form className="search-form">
                <h4>Filter</h4>
                <input type="text" name="name" id="name" placeholder="First Name" onChange={(e) => updateInput(e)} value={searchName}/>
                <h4>Sort</h4>
                <select name="gender" id="gender" onChange={(e) => updateGender(e)}>
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </form>
            <div className="peopleCards">
            {peopleDupState !== ''? 
                peopleDupState.map(people => {
                    return(
                        <div className="card">
                            <img src={people.picture.medium} alt=""/>
                            <p> Name: {people.name.title} {people.name.first} {people.name.last}</p>
                            <p> Email: {people.email}</p>
                            <p> Gender: {people.gender}</p>
                        </div>
                    )
                })
                :
                <div>
                loading...
            </div>    
    }
        </div>
    </div>
    )
}
