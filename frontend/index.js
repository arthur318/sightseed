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
    const contentTitle = qs('span#page-title')
    const grantForm = qs('form#grantForm')
    const accountForm = qs('form#accountForm')
    const updateAccountForm = qs('form#updateAccountForm')
    const contactForm = qs('form#contactForm')
    const list = qs("ul.list-group")
    const badge = qs("span#main-badge.badge.badge-pill.badge-primary")
    // Nav bar
    const accountNav = qs("a#account-button.nav-link")
    const priorityButton = qe("sort-by-priority")
    const homeButton = qs("a#home-button.nav-link")
    const mainPage = qs("div#main-page.container-fluid")
    const mainTitle = qs('span#page-title')
    const mainTable2 = qs("div#tablediv")
    const mainTable = qe("main-table")
    const modalTitle = qs("h5#basicModalLabel.modal-title")
    const modalBody = qe("basicModalBody")
    const modalFooter = qe("basicModalFooter")
    //  stage buttons
    const prospects = qe("prospects")
    const applying = qe("applying")
    const submitted = qe("submitted")
    const awarded = qe("awarded")
    const declined = qe("declined")
    const chosenot = qe("chosenot")

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
    // filter by grant stage
    async function filterGrantStage(stage) {
        const response = await fetch("http://localhost:3000/api/v1/grants")
        let grants = await response.json();
        filtered = grants.filter(g => g.stage === stage)
        console.log(filtered);
        return filtered;   
    }
    //Comparer Function    
    function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return -1;    
            } else if (a[prop] < b[prop]) {    
                return 1;    
            }    
            return 0;    
        }    
    }  
        // sort by priority score
        async function sortByPriority() {
            const response = await fetch("http://localhost:3000/api/v1/grants")
            let grants = await response.json();
            filtered = grants.sort(GetSortOrder("rank_score"));
            console.log(filtered);
            return filtered;   
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
    // home button
    homeButton.addEventListener("click", () => {
        list.querySelectorAll('*').forEach(n => n.remove())
        mainTitle.innerText = "All Opportunities"
        // listGrants();
        createAllPage()
        mainTable2.style.visibility = "Visible"
    })
    // Account button
    accountNav.addEventListener("click", () => {
        makeAccountPage()
    })
    // Make account page
    async function makeAccountPage() {
        mainTable2.style.visibility = "hidden";
        list.querySelectorAll('*').forEach(n => n.remove())
        let accounts = await fetchAccounts()
        badge.innerText = accounts.length
        mainTitle.innerText = "Accounts"
        while(list.firstChild){
            list.removeChild(list.firstChild)
        }
        accounts.forEach(account => {
            let li = ce("li")
            li.className = "list-group-item"
            li.innerText = account.name
            // debugger
            // li.type = "button"
            list.append(li) 

            li.addEventListener('click', () => {
                
                modalTitle.innerText = account.name   
                
                modalBody.querySelectorAll('*').forEach(n => n.remove())
                
                modalFooter.querySelectorAll('*').forEach(n => n.remove())
                let industry = ce("h5")
                industry.innerText = `Industry: ${account.industry}`
                let type = ce("h5")
                type.innerText = `Account type: ${account.account_type}`
                let contacts = ce("h5")
                contacts.innerText = "Contacts:"
                let contactList = ce("ul")
                account.contacts.forEach(contact => {
                    let contactInfo = ce('li')
                    contactInfo.innerText = `${contact.first_name} ${contact.last_name}`
                    contactList.append(contactInfo)
                })
                // Footer stuff
                let deleteButton = ce("button")
                deleteButton.innerText = "Delete"
                deleteButton.className = "btn btn-danger"
                // deleteAccount(account, deleteButton)
                let updateButton = ce("button")
                updateButton.innerText = "Update"
                updateButton.className = "btn btn-primary"
                updateAccount(account, updateButton)
                modalFooter.append(updateButton)
                modalBody.append(industry, type, contacts, contactList)
                $("#basicModal").modal('toggle');
            })
        })
        console.log("done")    
    }
    // update function
    function updateAccount(account, button){
        button.addEventListener("click", () => {
            let title = qe("updateAccountModalTitle")
            title.innerText = `Update ${account.name} Account`
            let name = qe("updateAccountNameInput")
            name.value = account.name
            let industry = qe("updateAccountIndustryInput")
            industry.value = account.industry
            let accountType = qe("updateType")
            accountType.value = account.account_type
            let accountShortlist = qe("updateShortlistCheck")
            accountShortlist.checked = account.shortlist

            $("#updateAccountModal").modal('toggle');
            updateAccountForm.addEventListener("submit", () => {
                event.preventDefault()
                let data = {
                    name: event.target[0].value,
                    industry: event.target[1].value,
                    account_type: event.target[2].value, 
                    shortlist: event.target[3].checked
                }
                // debugger
                fetch(`http://localhost:3000/api/v1/accounts/${account.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                // .then(res => console.log(res))
                .then(newAccount => {
                    let success = qe("updateSuccessAccount")
                    success.innerText = `${newAccount.name} account updated!`
                    // option = ce('option')
                    // option.innerText = newAccount.name
                    // option.value = newAccount.id
                    // accountSelect.append(option)
                    fillContactForm(accountSelect)
                    fillContactForm(accountSelectGrant)
                    makeAccountPage()
                })
            })
        })
    }
    // update request


    // delete function
    // function deleteAccount(account, button){
    //     button.addEventListener("click", () => {
    //         fetch(`http://localhost:3000/api/v1/accounts/${account.id}`, {
    //               method: 'delete'
    //             })
    //             .then(response => response.json());
    //           }
    //     })
    // }

    // Make Grant table ADD ARGUMENT LATER
    // async function tableGrants(grants) {
    //     // let grants = await fetchGrants()
    //     mainTable.querySelectorAll('*').forEach(n => n.remove())
    //     mainTable.className = "table table-hover table-sm"
    //     mainTable.id = "main-table"
    //     data = ["Grant Name", "Account", "Deadline", "Ask Amount", "Priority Score"]
    //     function generateTableHead(table, data) {
    //         let thead = table.createTHead();
    //         thead.className = "thead-dark";
    //         let row = thead.insertRow();
    //         data.forEach(heading => {
    //             let th = ce("th");
    //             let text = document.createTextNode(heading);
    //             th.appendChild(text)
    //             row.appendChild(th)
    //         })
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
    //     let data = Object.keys(grants[0])
    //     generateTableHead(table, data)
    //     generateTable(table, grants)

    // }

    // TABLE 
    function detailFormatter(index, row) {
        var html = []
        $.each(row, function (key, value) {
          html.push('<p><b>' + key + ':</b> ' + value + '</p>')
        })
        return html.join('')
      }

    function createGrantPage(grants) {
        // let grants = await fetchGrants()
        // mainTable2.style.visibility = "visible"
        badge.innerText = grants.length
        $('#table').bootstrapTable({
            pagination: true,
            search: true,
            columns: [{
              field: 'name',
              title: 'Grant'
            }, {
              field: 'stage',
              title: 'Stage'
            },{
              field: 'account',
              title: 'Account'
            },{
                field: 'rank_score',
                title: 'Priority'
            }, {
                field: 'fiscal_year',
                title: 'FY'
              },{
              field: 'ask_type',
              title: 'Ask'
            },{
                field: 'ask_amount',
                title: 'Ask $'
              },{
                field: 'deadline',
                title: 'Deadline'
              },{
                field: 'rolling_yes',
                title: 'Rolling?'
              },{
                field: 'app_type',
                title: 'Method'
              },{
                field: 'fund_size',
                title: 'Fund'
              },{
                field: 'tags',
                title: 'Tags'
              },{
                field: 'source_name',
                title: 'Source'
              },{
                field: 'source_type',
                title: 'Source Type'
              },{
                field: 'lead_type',
                title: 'Lead Type'
              },{
                field: 'link',
                title: 'Link'
              },{
                field: 'notes',
                title: 'Notes'
              }],
            
            data: grants
          })
    }
    
    async function createAllPage(){
        let grants = await fetchGrants()
        contentTitle.innerText = "All Opportunities"
        mainTable2.style.visibility = "visible"
        list.querySelectorAll('*').forEach(n => n.remove())
        createGrantPage(grants)
    }
   createAllPage()
//    Prospects
    async function createProspectsPage(){
        // list.querySelectorAll('*').forEach(n => n.remove())
        let grants = await filterGrantStage("Prospects")
        mainTable2.style.visibility = "hidden"
        contentTitle.innerText = "Prospects"
        
        listGrants(grants)
    }
    prospects.addEventListener("click", () => createProspectsPage())
    // Applying
    async function createApplyingPage(){
        let grants = await filterGrantStage("Applying")
        contentTitle.innerText = "Applying"
        mainTable2.style.visibility = "hidden"
        listGrants(grants)
    }
    applying.addEventListener("click", () => createApplyingPage())
    // Submitted
    async function createSubmittedPage(){
        let grants = await filterGrantStage("Submitted")
        contentTitle.innerText = "Submitted"
        mainTable2.style.visibility = "hidden"
        listGrants(grants)
    }
    submitted.addEventListener("click", () => createSubmittedPage())
    // Submitted
    async function createAwardedPage(){
        let grants = await filterGrantStage("Awarded")
        createGrantPage(grants)
        contentTitle.innerText = "Awarded"
        mainTable2.style.visibility = "hidden"
        listGrants(grants)
    }
    awarded.addEventListener("click", () => createAwardedPage())
    // Declined
    async function createDeclinedPage(){
        let grants = await filterGrantStage("Declined")
        createGrantPage(grants)
        contentTitle.innerText = "Declined"
        mainTable2.style.visibility = "hidden"
        listGrants(grants)
    }
    declined.addEventListener("click", () => createDeclinedPage())
    // Chose Not To Apply
    async function createChoseNotPage(){
        let grants = await filterGrantStage("Chose Not To Apply")
        createGrantPage(grants)
        contentTitle.innerText = "Chose Not To Apply"
        mainTable2.style.visibility = "hidden"
        listGrants(grants)
    }
    // Sorted
    async function createSortedPage(){
        let grants = await sortByPriority()
        contentTitle.innerText = "Sorted by Priority Score"
        mainTable2.style.visibility = "hidden"
        listGrants(grants)
    }
    priorityButton.addEventListener("click", () => createSortedPage())



    chosenot.addEventListener("click", () => createChoseNotPage())
    

 
    

    // List all the grants
    async function listGrants(grants) {
        // let grants = await fetchGrants()
        list.querySelectorAll('*').forEach(n => n.remove())
        badge.innerText = grants.length
        // while(list.firstChild){
        //     list.removeChild(list.firstChild)
        // }
        grants.forEach(grant => {
            let li = ce("li")
            li.className = "list-group-item"
            li.innerText = grant.name
            let spanspace = ce("span")
            spanspace = "  "
            let span1 = ce("span")
            span1.className = "badge badge-dark badge-pill"
            span1.innerText = `  ${grant.stage}`
            let span2 = ce("span")
            span2.className = "badge badge-light badge-pill"
            span2.innerText = `  ${grant.rank_score}`
            li.append(spanspace, span1, spanspace, span2)
            list.append(li) 
            li.addEventListener('click', () => {
                // let show = qe("showGrant")
                // show.innerText = grant.name
                
                modalTitle.innerText = grant.name 
                modalBody.querySelectorAll('*').forEach(n => n.remove())
                let ul = ce("ul")
                ul.className = "list-group"
                let account = ce("li")
                account.className = "list-group-item"
                account.innerText = `Account: ${grant.account}`
                let stage= ce("li")
                stage.innerText = `Stage: ${grant.stage}`
                stage.className = "list-group-item"
                let priority= ce("li")
                priority.innerText = `Priority Level: ${grant.rank_score}`
                priority.className = "list-group-item"
                let deadline= ce("li")
                deadline.innerText = `Deadline: ${grant.deadline}`
                deadline.className = "list-group-item"
                let ask= ce("li")
                ask.innerText = `Ask: ${grant.ask_amount}`
                ask.className = "list-group-item"


                ul.append(account, stage, priority, deadline, ask)
                let form = ce("form")
                let formgroup = ce("div")
                formgroup.className = "form-group"
                let label = ce("label")
                label.innerText = "Choose grant stage"
                let select = ce("select")
                select.className = "form-control"
                
                let option1 = ce("option")
                option1.value = 1
                option1.innerText = "Prospects"
                let option2 = ce("option")
                option2.value = 2
                option2.innerText = "Applying"
                let option3 = ce("option")
                option3.value = 3
                option3.innerText = "Submitted"
                let option4 = ce("option")
                option4.value = 4
                option4.innerText = "Awarded"
                let option5 = ce("option")
                option5.value = 5
                option5.innerText = "Declined"
                let option6 = ce("option")
                option6.value = 6
                option6.innerText = "Chose Not To Apply"

                let submit = ce("button")
                submit.innerText = "Update"
                submit.type = "submit"
                submit.className = "btn btn-primary"
                select.append(option1, option2, option3, option4, option5, option6)
                formgroup.append(label, select)
                form.append(formgroup, submit)
                

                
                form.addEventListener("submit", () => {
                    let data = {stage_id: event.target[0].value}
                    fetch(`http://localhost:3000/api/v1/grants/${grant.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(updated => {
                        
                        // createAllPage()
                        let success = ce("div")
                        success.innerText = `${updated.name} updated!` 
                        modalFooter.append(success)
                        createAllPage()
                      
                    })
                })
                modalBody.append(ul, form)
                $("#basicModal").modal('toggle');
            })
        })
        console.log("done")   
    }

    // listGrants()
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
        // debugger

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
            let $table = $('#table')
            badge.innerText++
            // createAllPage()
            let success = qe("successGrant")
            success.innerText = `${newGrant.name} created!` 
            createAllPage()
            
            $table.bootstrapTable('append', newGrant)
            $table.bootstrapTable('scrollTo', 'bottom')
            
        })
        // .then(newGrant => {
        //     badge.innerText++
        //     let li = ce("li")
        //     li.className = "list-group-item"
        //     li.innerText = newGrant.name
        //     list.append(li) 
        //     let success = qs("div#successGrant")
        //     success.innerText = `${newGrant.name} created!` 
        // })
        


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

function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
      html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
  }

//   var ctx = document.getElementById('myChart').getContext('2d');
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [{
//             label: 'My First dataset',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [0, 10, 5, 2, 20, 30, 45]
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });