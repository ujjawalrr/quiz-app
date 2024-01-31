
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const toasty = (message, type) => {

    const config = {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: "colored",
    }

    if (type === "success")
        toast.success(message, config);

    else if (type === "error")
        toast.error(message, config);

    else if (type === "info")
        toast.info(message, config);

    else if (type === "warn")
        toast.warn(message, config);

    else
        toast(message, config);

}


export default toasty;