import { useParams } from 'react-router-dom'

const OderDetails = () => {
    const params = useParams();
    console.log(params.orderId)
    return (
        <section>
            <h1>Product Details</h1>
            <p>{params.orderId}</p>
        </section>
    );
};

export default OderDetails;