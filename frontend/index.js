document.addEventListener("DOMContentLoaded", () => {
    // check
    console.log("Front-end js")
    // selectors and creators
    function ce(element){
        return document.createElement(element)
    }
    function qs(selector){
        return document.querySelector(selector)
    }
    function qe(id){
        return document.getElementById(id)
    }
    // Page elements
    const accountSelect = qs("select#selectAccountForContact.form-control")
    const accountSelectGrant = qs("select#selectAccountForGrant.form-control")
    const mainContent = qs('div#container-fluid')
    const contentTitle = qs('h1.mt-4')
    const grantForm = qs('form#grantForm')
    const accountForm = qs('form#accountForm')
    const contactForm = qs('form#contactForm')
    const list = qs("ul.list-group")
    const badge = qs("span.badge.badge-pill.badge-primary")
    const accountNav = qs("a#account-button.nav-link")
    const mainPage = qs("div#main-page.container-fluid")
    const mainTitle = qs("h1#page-title.mt-4")
    const mainTable = qs("table#main-table.table-hover.table-sm")
    // get contacts
    async function fetchContacts() {
        const response = await fetch("http://localhost:3000/api/v1/contacts")
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
    // get a specific grant
    async function fetchGrant(grant) {
        const response = await fetch(`http://localhost:3000/api/v1/grants/${grant.id}`)
        let grants = await response.json();
        console.log(grant);
        return grant;
    }
    // get last grant id
    async function fetchLastGrantId(grant) {
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
            fillContactForm(accountSelectGrant)
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
    fillContactForm(accountSelect);
    fillContactForm(accountSelectGrant);
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
    // Account button
    accountNav.addEventListener("click", () => {
        makeAccountPage()
    })
    // Make account page
    async function makeAccountPage() {
        list.querySelectorAll('*').forEach(n => n.remove())
        mainTitle.innerText = "Accounts"

        let accounts = await fetchAccounts()
        badge.innerText = accounts.length
        while(list.firstChild){
            list.removeChild(list.firstChild)
        }
        accounts.forEach(account => {
            let li = ce("li")
            li.className = "list-group-item"
            li.innerText = account.name
            // li.type = "button"
            list.append(li) 

            li.addEventListener('click', () => {
                let modalTitle = qs("h5#basicModalLabel.modal-title")
                modalTitle.innerText = account.name   
                let modalBody = qe("basicModalBody")
                modalBody.querySelectorAll('*').forEach(n => n.remove())
                let industry = ce("h5")
                industry.innerText = `Industry: ${account.industry}`
                let type = ce("h5")
                type.innerText = `Account type: ${account.account_type}`
                let contacts = ce("h5")
                contacts.innerText = "Contacts"
                modalBody.append(industry, type, contacts)
                $("#basicModal").modal('toggle');
            })
        })
        console.log("done")    
    }
    // Make Grant table
    // async function tableGrants() {
    //     let grants = await fetchGrants()
    //     mainTable.querySelectorAll('*').forEach(n => n.remove())
    //     function generateTableHead(table, data) {
    //         let thead = table.createTHead();
    //         thead.className = "thead-dark";
    //         let row = thead.insertRow();
    //         for (let key of data) {
    //             let th = document.createElement("th");
    //             let text = document.createTextNode(key);
    //             th.appendChild(text)
    //             row.appendChild(th)
    //         }
    //     }
    //     function generateTable(table, data) {
    //         for (let element of data) {
    //           let row = table.insertRow();
    //           for (key in element) {
    //             let cell = row.insertCell();
    //             let text = document.createTextNode(element[key]);
    //             cell.appendChild(text);
    //           }
    //         }
    //       }
    //     let table = mainTable
    //     let data = grants[0].keys
    //     generateTableHead(table, data)
    //     generateTable(table, grants)

    // }
    // tableGrants()


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
            li.addEventListener('click', () => {
                // let show = qe("showGrant")
                // show.innerText = grant.name
                let modalTitle = qs("h5#basicModalLabel.modal-title")
                modalTitle.innerText = grant.name                    
                $("#basicModal").modal('toggle');
            })
        })
        console.log("done")   
    }

    listGrants()
    // post grant form
    grantForm.addEventListener("submit", () => {
        event.preventDefault()
        let formEvent = event.target
        let env = formEvent[12].checked ? 1 : null 
        let youth = formEvent[13].checked ? 2 : null 
        let workforce = formEvent[14].checked ? 3 : null 
        let food = formEvent[15].checked ? 4 : null 
        let NYC = formEvent[16].checked ? 5 : null 
        let EDI = formEvent[17].checked ? 6 : null 
        let health = formEvent[18].checked ? 7 : null 
        let energy = formEvent[19].checked ? 8 : null 
        let community = formEvent[20].checked ? 9 : null 
        let tagArray = [env, youth, workforce, food, NYC, EDI, health, energy, community]
        editedArray = tagArray.filter(index => {return index != null})
        debugger

        // put above into an array
        // .filter out null values


        let data = {
            name: event.target[0].value,
            priority: event.target[1].checked,
            stage_id: event.target[2].value, 
            fiscal_year: event.target[3].value, 
            account_id: event.target[4].value,
            repeat: event.target[5].checked,
            ask_type: event.target[6].value,
            app_type: event.target[7].value,
            deadline: event.target[8].value,
            rolling: event.target[9].checked,
            ask_amount: event.target[10].value,
            fund_size: event.target[11].value,            
            link: event.target[24].value,
            notes: event.target[25].value,
            source_name: event.target[21].value,   
            source_type: event.target[22].value, 
            lead_type: event.target[23].value,
            tag_ids: editedArray,
            source: {name: event.target[21].value, source_type: event.target[22].value, lead_type: event.target[23].value}
            // source:{source_name:"Micah"},
            // tags:{tag_names:[]}
        }

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
            let success = qs("div#successGrant")
            success.innerText = `${newGrant.name} created!` 
        })
        


    })

    // Generate table
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