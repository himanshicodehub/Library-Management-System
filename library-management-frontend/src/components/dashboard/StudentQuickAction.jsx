import { Link } from "react-router-dom";

import {

FaBook,

FaUser,

FaKey,

FaBookmark

} from "react-icons/fa";

function StudentQuickAction(){

const actions=[

{
title:"Browse Books",
icon:<FaBook/>,
color:"primary",
link:"/books"
},

{
title:"My Profile",
icon:<FaUser/>,
color:"success",
link:"/profile"
},

{
title:"Change Password",
icon:<FaKey/>,
color:"warning",
link:"/change-password"
},

{
title:"Reservations",
icon:<FaBookmark/>,
color:"info",
link:"/reservations"
}

];

return(

<div className="row mt-4">

{

actions.map((item,index)=>(

<div
className="col-lg-3 col-md-6 mb-3"
key={index}
>

<Link
to={item.link}
className="btn btn-light shadow w-100 p-3"
>

<div className={`text-${item.color} mb-2`}>

{item.icon}

</div>

{item.title}

</Link>

</div>

))

}

</div>

);

}

export default StudentQuickAction;