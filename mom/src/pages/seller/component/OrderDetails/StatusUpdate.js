import React, {useRef, useEffect}  from "react";
import useHttp from '../../../../hooks/use-http'
import {updateOrderStatus} from '../../../../lib/api'


const StatusUpdate = (props) => {

    const statusSelect = useRef(null);

    const {sendRequest, status, error} = useHttp(updateOrderStatus)

    const {onStatusUpdate} = props;
    const {id} = props;

    useEffect(() => {
        if (status === 'completed' && !error) {
            onStatusUpdate();
        }
      }, [status, error, onStatusUpdate]);

    

    const onChangeHandler = (event) => {
        event.preventDefault();
        const newStatus = statusSelect.current.value;
        console.log("Nice " + id);
        sendRequest({status : {text: newStatus}, orderId: id})
    }
    return (
        <div><select ref={statusSelect} className="form-control" required >
                <option defaultValue={props.status}>{props.status}</option>
                <option value="REJECTED">NEW</option>
                <option value="REJECTED">REJECTED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
            </select>
            <input type="button" value="UPDATE" onClick={onChangeHandler} />
        </div>
    );

    
};

export default StatusUpdate;