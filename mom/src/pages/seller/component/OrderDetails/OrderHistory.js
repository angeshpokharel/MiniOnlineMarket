import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../../hooks/use-http";
import { getOrderHistoryByDetailId } from "../../../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const OrderHistory = (props) => {
    const param = useParams();
    

    const { sendRequest, status, data: loadedOrder, error } = useHttp(getOrderHistoryByDetailId, true);
    
    useEffect(() => {
        sendRequest(param.orderDetailId);
    }, [sendRequest, param.orderDetailId]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className='centered focus'>{error}</p>
    }

    if (!loadedOrder) {
        return <h1>No orders</h1>
    }
    console.log(loadedOrder);
    debugger;
    

    return(
        <>
         <div className="Content">
                <h3 className="Heading">Order History #{props.id}</h3>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S/N</TableCell>
                                <TableCell>Last Modified Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loadedOrder.map(item => {
                                return (
                                    <TableRow>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.modifiedDate}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                    </TableRow>

                                );
                            })
                            }

                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default OrderHistory;