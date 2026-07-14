import { Link } from "react-router-dom";

import {
    FaBook,
    FaExchangeAlt,
    FaUndo,
    FaSearch
} from "react-icons/fa";

function LibrarianQuickAction(){

const actions=[

{
title:"Add Book",
icon:<FaBook/>,
color:"primary",
link:"/books/add"
},

{
title:"Issue Book",
icon:<FaExchangeAlt/>,
color:"warning",
link:"/issue-books/add"
},

{
title:"Return Book",
icon:<FaUndo/>,
color:"success",
link:"/return-books"
},

{
title:"Search Student",
icon:<FaSearch/>,
color:"info",
link:"/students"
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

export default LibrarianQuickAction;