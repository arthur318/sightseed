document.addEventListener("DOMContentLoaded", () => {


    console.log("Front-end js")

    function ce(element){
        return document.createElement(element)
    }

    function qs(selector){
        return document.querySelector(selector)
    }
    const accountSelect = qs("select#selectAccountForContact.form-control")
    const accountSelectGrant = qs()
    const mainContent = qs('div#container-fluid')
    const contentTitle = qs('h1.mt-4')
    const grantForm = qs('form#grantForm')
    const accountForm = qs('form#accountForm')
    const contactForm = qs('form#contactForm')
    const list = qs("ul.list-group")
    const badge = qs("span.badge.badge-pill.badge-primary")
    // get contacts
    async function fetchContacts() {
        const response = await fetch("http://localhost:3000/api/v1/contactsstages")
        let contactsstages = await response.json();
        console.log(contactsstages);
        return contactsstages;
    }
    // get stages
    async function fetchStages() {
        const response = await fetch("http://localhost:3000/api/v1/stages")
        let stages = await response.json();
        console.log(stages);
        return stages;
    }
    // get grants
    async function fetchGrants() {
        const response = await fetch("http://localhost:3000/api/v1/grants")
        let grants = await response.json();
        console.log(grants);
        return grants;

    }
    // get accounts
    async function fetchAccounts() {
        const response = await fetch("http://localhost:3000/api/v1/accounts")
        let accounts = await response.json();
        console.log(accounts);
        return accounts;
    }
    // make arrary of accounts
    async function listAccounts() {
        let accounts = await fetchAccounts()
        let accountNames = accounts.map(a => {
            const container = {};
            container.name = a.name
            container.id = a.id
            return container;})
        // debugger
        return accountNames
    }
    // post account form
    accountForm.addEventListener("submit", () => {
        event.preventDefault()
        let data = {
            name: event.target[0].value,
            industry: event.target[1].value,
            account_type: event.target[2].value, 
            shortlist: event.target[3].checked
        }
        // debugger
        fetch("http://localhost:3000/api/v1/accounts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        // .then(res => console.log(res))
        .then(newAccount => {
            let success = qs("div#successAccount")
            success.innerText = `${newAccount.name} account created!`
            // option = ce('option')
            // option.innerText = newAccount.name
            // option.value = newAccount.id
            // accountSelect.append(option)
            fillContactForm(accountSelect)
        })
    })
    // fill contact form
    async function fillContactForm(node) {
        let accounts = await listAccounts()
        node.querySelectorAll('*').forEach(n => n.remove())
        accounts.forEach(a => {
            option = ce('option')
            option.innerText = a.name
            option.value = a.id
            node.append(option)
        })
    }
    fillContactForm(accountSelect)

    // post contact form
    contactForm.addEventListener("submit", () => {
        event.preventDefault()
        let data = {
            account_id: event.target[0].value,
            primary: event.target[1].checked,
            first_name: event.target[2].value,
            last_name: event.target[3].value,
            contact_type: event.target[4].value,
            title: event.target[5].value,
            email: event.target[6].value,
            phone: event.target[7].value,
            notes: event.target[8].value
        }
        // debugger
        fetch("http://localhost:3000/api/v1/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        // .then(res => console.log(res))
        .then(newContact => {
            let success = qs("div#successContact")
            success.innerText = `${newContact.first_name}'s contact created!`
            // option = ce('option')
            // option.innerText = newAccount.name
            // option.value = newAccount.id
            // accountSelect.append(option)
        })
    })




    // List all the grants
    async function listGrants() {
        let grants = await fetchGrants()
        badge.innerText = grants.length
        // while(list.firstChild){
        //     list.removeChild(list.firstChild)
        // }
        grants.forEach(grant => {
            let li = ce("li")
            li.className = "list-group-item"
            li.innerText = grant.name
            list.append(li) 
        })
        console.log("done")
        
    }

    listGrants()

    grantForm.addEventListener("submit", () => {
        event.preventDefault()
        let data = {
            name: event.target[0].value,
            deadline: event.target[1].value,
            ask_amount: event.target[2].value, 
            stage_id: 1,
            account_id: 1
            // account: {account_name: "Test"},
            // account: {account_name: "Test"},
            // source:{source_name:"Micah"},
            // tags:{tag_names:[]}
        }
        // debugger
        fetch("http://localhost:3000/api/v1/grants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(newGrant => {
            badge.innerText++
            let li = ce("li")
            li.className = "list-group-item"
            li.innerText = newGrant.name
            list.append(li) 
        })
    })

    // Generate table from 
    // function generateTableHead(table) {
    //     let thead = table.createTHead();
    //   }
      
    //   let table = document.querySelector("table");
    //   generateTableHead(table);


    // async function showGrants(){
    //     let result
    // }

    // fetch("http://localhost:3000/api/v1/grants")
    // .then(res => res.json())
    // .then(console.log)


})