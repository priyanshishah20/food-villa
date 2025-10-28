import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    // console.log(error);
    //destructuring the error object
    const {status, statusText, data} = error;
    return (
        <>
        {/* <div>Error: {error.status} {error.statusText}</div> */}
        <div>Error: {status} {statusText}</div>
        <p>{data}</p>
        </>
    )
}
export default Error;