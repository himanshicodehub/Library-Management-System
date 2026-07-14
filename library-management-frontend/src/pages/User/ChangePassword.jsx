import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import { changePassword } from "../../services/userService";

import {
    FaEye,
    FaEyeSlash,
    FaLock
} from "react-icons/fa";

function ChangePassword() {

    const navigate = useNavigate();

    const [showOld, setShowOld] = useState(false);

    const [showNew, setShowNew] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const {

        register,

        handleSubmit,

        watch,

        reset,

        formState: {
            errors,
            isSubmitting
        }

    } = useForm();

    const newPassword = watch("new_password");

    const onSubmit = async(data)=>{

        try{

            const currentUser = JSON.parse(
                localStorage.getItem("user")
            );

            await changePassword(
                currentUser.user_id,
                data
            );

            Swal.fire({

                icon:"success",

                title:"Success",

                text:"Password Changed Successfully",

                timer:1800,

                showConfirmButton:false

            });

            reset();

            navigate("/profile");

        }

        catch(error){

            Swal.fire({

                icon:"error",

                title:"Error",

                text:
                error.response?.data?.detail ||
                "Unable to change password"

            });

        }

    };

    return(

        <MainLayout>

        <div className="container mt-4">

        <div className="card shadow">

        <div className="card-header bg-dark text-white">

        <h3>

        <FaLock/>

        &nbsp;

        Change Password

        </h3>

        </div>

        <div className="card-body">

        <form
        onSubmit={handleSubmit(onSubmit)}
        ><div className="mb-3">

<label>

Current Password

</label>

<div className="input-group">

<input

type={
showOld
?
"text"
:
"password"
}

className="form-control"

{...register(
"old_password",
{
required:"Current Password is required"
}
)}

 />

<button

type="button"

className="btn btn-outline-secondary"

onClick={()=>setShowOld(!showOld)}

>

{

showOld

?

<FaEyeSlash/>

:

<FaEye/>

}

</button>

</div>

<small className="text-danger">

{

errors.old_password?.message

}

</small>

</div>

<div className="mb-3">

<label>

New Password

</label>

<div className="input-group">

<input

type={
showNew
?
"text"
:
"password"
}

className="form-control"

{...register(
"new_password",
{
required:"New Password is required",
minLength:{
value:6,
message:"Minimum 6 characters"
}
}
)}

 />

<button

type="button"

className="btn btn-outline-secondary"

onClick={()=>setShowNew(!showNew)}

>

{

showNew

?

<FaEyeSlash/>

:

<FaEye/>

}

</button>

</div>

<small className="text-danger">

{

errors.new_password?.message

}

</small>

</div>

<div className="mb-4">

<label>

Confirm Password

</label>

<div className="input-group">

<input

type={
showConfirm
?
"text"
:
"password"
}

className="form-control"

{...register(
"confirmPassword",
{
required:"Confirm Password is required",

validate:value=>

value===newPassword ||

"Passwords do not match"

}
)}

 />

<button

type="button"

className="btn btn-outline-secondary"

onClick={()=>setShowConfirm(!showConfirm)}

>

{

showConfirm

?

<FaEyeSlash/>

:

<FaEye/>

}

</button>

</div>

<small className="text-danger">

{

errors.confirmPassword?.message

}

</small>

</div>

<div className="d-flex justify-content-end gap-3">

<button

type="button"

className="btn btn-secondary"

onClick={()=>navigate("/profile")}

>

Cancel

</button>

<button

type="submit"

className="btn btn-warning"

disabled={isSubmitting}

>

{

isSubmitting

?

"Updating..."

:

"Change Password"

}

</button>

</div>

</form>

</div>

</div>

</div>

</MainLayout>

);

}

export default ChangePassword;