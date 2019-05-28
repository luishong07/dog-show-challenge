document.addEventListener('DOMContentLoaded', () => {

    const dogURL = "http://localhost:3000/dogs"
    const tableBody = document.querySelector('#table-body')
    const dogForm = document.querySelector('#dog-form')

    function fetchDogs(){
        fetch(dogURL)
        .then(res => res.json())
        .then(data => {

            data.forEach(dog => {
                renderDogs(dog)
            })
        })
    }


    function renderDogs(dog){

        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let btn = document.createElement('button')

        btn.innerText = 'Edit'

        td1.innerText = dog.name
        td2.innerText = dog.breed
        td3.innerText = dog.sex

        td4.append(btn)
     
        tr.append(td1, td2, td3, td4)

        tableBody.append(tr)


        btn.addEventListener('click', (e) => {
            e.preventDefault()
            editDogInfo(dog)
        })
    }

    function editDogInfo(dog){
        dogForm[0].value = dog.name
        dogForm[1].value = dog.breed
        dogForm[2].value = dog.sex

        dogForm.addEventListener('submit', (e) => {
            e.preventDefault()

            fetch(`http://localhost:3000/dogs/${dog.id}`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": dogForm[0].value,
                    "breed": dogForm[1].value,
                    "sex": dogForm[2].value
                })
            })
            .then(() => {
                tableBody.innerHTML = ''
                dogForm.reset()
                fetchDogs()
            })
        })

    }



    fetchDogs()


})