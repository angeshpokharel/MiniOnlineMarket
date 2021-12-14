import React, {useRef, useEffect}  from "react";
import AddAlertMessage from "../../../../components/alert/Alert";
import useHttp from '../../../../hooks/use-http'
import {updateOrderStatus} from '../../../../lib/api'
import {useHistory} from 'react-router-dom';


const StatusUpdate = (props) => {

    const statusSelect = useRef(null);
    const history = useHistory();

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
        props.onStatusChange(statusSelect.current.value);
        sendRequest({status : {text: newStatus}, orderId: id});
        AddAlertMessage({ type: "success", message: "Status updated" });
        setTimeout(() => {
            history.goBack();
        }, 2000)
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