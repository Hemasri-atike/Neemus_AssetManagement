import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PAGES = [
"Home",
"Dashboard",
"Commander Management",
"Soldier Management",
"User Management",
"Units",
"Zones",
// "Assignments",
// "Registration Requests",
// "Soldier Overview",
// "Reports",
// "Locked Accounts",
// "Deactivated Users",
// "Role Management",
// "Create Roles",
// "Device User Management",
// "Ammo",
// "Manage loadouts",
// "Audit Logs",
// "Troop Requests",
// "Assign Device"
]

// INSERT INTO pages (page_name) VALUES
// ('Home'),
// ('Dashboard'),
// ('Commander Management'),
// ('Soldier Management'),
// ('User Management'),
// ('Units'),
// ('Zones'),
// ('Assignments'),
// ('Registration Requests'),
// ('Soldier Overview'),
// ('Reports'),
// ('Locked Accounts'),
// ('Deactivated Users'),
// ('Role Management'),
// ('Create Roles'),
// ('Device User Management'),
// ('Ammo'),
// ('Manage loadouts'),
// ('Audit Logs'),
// ('Troop Requests'),
// ('Assign Device');

const CreateRole = () => {

const [roleName,setRoleName] = useState("")
const [roleDesc,setRoleDesc] = useState("")
const [selectedPages,setSelectedPages] = useState([])
const [search,setSearch] = useState("")

const navigate = useNavigate();

/* Filter Pages */
const filteredPages = PAGES.filter(page =>
page.toLowerCase().includes(search.toLowerCase())
)

/* Toggle Permission */
const togglePage = (page) => {

let updatedPages = []

if(selectedPages.includes(page)){

updatedPages = selectedPages.filter(p => p !== page)

}else{

updatedPages = [...selectedPages,page]

}

setSelectedPages(updatedPages)

/* Update Description automatically */
setRoleDesc(updatedPages.join(", "))

}

/* Select All Pages */
const selectAll = () => {

if(selectedPages.length === PAGES.length){

setSelectedPages([])
setRoleDesc("")

}else{

setSelectedPages(PAGES)
setRoleDesc(PAGES.join(", "))

}

}

/* Clear Form */
const clearForm = () => {

setRoleName("")
setRoleDesc("")
setSelectedPages([])
setSearch("")

}

const createRole = async () => {
  try {

    const pageIds = selectedPages.map(
      (page) => PAGES.indexOf(page) + 1
    );

    const data = {
      role_name: roleName,
      role_description: roleDesc,
      pages: pageIds
    };

    await axios.post("http://localhost:5000/api/roles", data);

    alert("Role Created Successfully");

    clearForm();

    // ✅ REDIRECT HERE
    navigate("/roles/view");

  } catch (err) {
    console.error(err);
    alert("Error creating role");
  }
};

return(

<div className="flex flex-col bg-gray-100 h-screen">

  {/* Header */}
  <div className="p-3 font-bold text-blue-600 text-2xl">
    Create Role
  </div>

{/* Scrollable Content */}
{/* <div className="flex-1 p-3 overflow-y-auto"> */}


{/* Role Name */}

<div className="mb-1 ">

<label className="block mb-1 font-medium">
Role Name
</label>

<input
type="text"
className="w-full border p-2 rounded"
value={roleName}
onChange={(e)=>setRoleName(e.target.value)}
/>

</div>

{/* Role Description */}

<div className="mb-4">

<label className="block mb-1 font-medium">
Role Description
</label>

<input
type="text"
className="w-full border p-2 rounded"
value={roleDesc}
readOnly
/>

</div>

{/* Search */}

<div className="mb-4">

<input
type="text"
placeholder="Search pages..."
className="border p-2 w-full rounded"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

{/* Select All */}

<div className="flex justify-end mb-2">

<button
onClick={selectAll}
className="bg-blue-600 text-white px-4 py-1 rounded"
>
Select All
</button>

</div>

{/* Pages Table */}

<table className="w-full border">

<thead className="bg-gray-200">

<tr>

<th >S.No</th>
<th>Page Name</th>
<th>Permission</th>

</tr>

</thead>

<tbody>

{filteredPages.map((page,index)=>(

<tr key={page} className="border-t">

<td className="p-1">{PAGES.indexOf(page)+1}</td>

<td>{page}</td>

<td>

<input
type="checkbox"
checked={selectedPages.includes(page)}
onChange={()=>togglePage(page)}
/>

</td>

</tr>

))}

</tbody>

</table>

{/* Selected Pages Dropdown */}

<div className="mt-8">

<label className="block mb-2 font-medium">
Selected Permissions
</label>

<select
multiple
className="w-full border p-2 rounded "
value={selectedPages}
readOnly
>

{selectedPages.map(page=>(
<option key={page}>{page}</option>
))}

</select>

</div>

{/* Buttons */}

<div className="flex gap-3 mt-1 justify-end">

<button
onClick={clearForm}
className="bg-gray-500 text-white px-4 py-2 rounded"
>
Clear
</button>

<button
onClick={createRole}
className="bg-green-600 text-white px-4 py-2 rounded"
>
Create
</button>

</div>

</div>

// </div>

)

}

export default CreateRole