import axios from 'axios';
import jsPDF from "jspdf";
import 'jspdf-autotable'

const CreatePdfReceipt = (cartItems) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const totalPrice = cartItems.map(item => item.product.price * item.quantity).reduce((a, b) => a + b, 0);
    const title = "Your Order Receipt" + "         Total:" + totalPrice;
    /* const response = axios.get(BASE_API + '/users/' + loginUserId)
        .then(res => {
           // console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        }); */

    
    const headers = [["PRODUCT", "QUANTITY"]];
    const dat = cartItems.map(item => [item.product.name, item.quantity]);

    let content = {
        startY: 50,
        head: headers,
        body: dat
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("report.pdf")
    }

    export default CreatePdfReceipt; 