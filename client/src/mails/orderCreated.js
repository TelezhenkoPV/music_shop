import PropTypes from 'prop-types'
import { rootURL } from '../config.js'

export const MailSubject = ({ orderNo }) => {
  return `You order №${orderNo} accepted`
}

MailSubject.propTypes = {
  orderNo: PropTypes.string.isRequired,
}

export const MailBody = (order) => {
  const {
    isAuthenticated,
    orderNo,
    customer: {
      firstName = '',
      lastName = '',
      middleName = '',
      email = '',
      telephone = '',
    },
    shipping: { type: shippingType, data: shippingData },
    payment: { type: paymentType },
  } = order

  const orderTrack = isAuthenticated
    ? `<h5 style="font-family: Verdana; color: #112667; padding: 10px 20px">Order status you can track in Order tab of you <a href="${rootURL}/customer/profile">Profile</a></h5>`
    : `<h5 style="font-family: Verdana; color: #112667; padding: 10px 20px">Order status you can track folowing by <a href="${rootURL}/order/${orderNo}">Link</a></h5>`

  const formStringsFromArray = (array) => {
    let result = ''
    array.forEach(
      ({ label, value }) =>
        (result = `${result}
        <tr>
            <td>
                <h4 style="font-family: Verdana; color: #112667">${label}:</h4>
            </td>
            <td>
                <h4 style="font-family: Verdana; color: #112667">${value}</h4>
            </td>
        </tr>
        `)
    )
    return result
  }

  return `
<table cellspacing="0" cellpadding="0" border="1px solid #112667" width="600">
    <tr>
        <td>
            <center>
                <table cellspacing="0" cellpadding="10px" border="0" width="600" height="80px" bgcolor="#112667">
                    <tr>
                        <td style="padding: 0px 28px" margin="0">
                            <img src="https://res.cloudinary.com/soundtower/image/upload/v1606226412/logo/logo-footer_buwqog.png" alt="logo" border="0" style="display: block; padding: 50px ">
                        </td>
                        <td align="center" width="300px">
                            <h1 style="font-family: Verdana; color: white; ">Sound Tower</h1>
                        </td>
                        <td align="center">
                            <h4 style="font-family: Verdana; color: lightgray;">Music Internet Hypermarket</h4>
                        </td>
                    </tr>
                </table>
                <table cellspacing="0" cellpadding="20px" border="0" width="600" height="80px">
                    <tr>
                        <h2 style="font-family: Verdana; color: #112667; text-align: center">${firstName} ${lastName}, thank you for your order!</h2>
                        <h4 style="font-family: Verdana; color: #112667; padding: 10px 20px">
                        Your order has been accepted. We will contact you shortly to confirm the order №${orderNo} or send an information message in Viber or SMS.
                        </h4>
                        ${orderTrack}
                    </tr>
                </table>
            </center>
                <table cellspacing="0" style="border-top: 1px solid #112667" width="600">
                    <tr>
                        <h2 style="font-family: Verdana; color: #112667">Shipping details:</h2>
                    </tr>
                    <tr>
                        <td>
                            <h4 style="font-family: Verdana; color: #112667">Method:</h4>
                        </td>
                        <td>
                            <h4 style="font-family: Verdana; color: #112667">${
                              shippingType.label
                            }</h4>
                        </td>
                    </tr>
                    ${formStringsFromArray(shippingData)}
                    
                </table>
                <table  style="cellspacing="0" width="600">
                    <tr>
                        <h2 style="font-family: Verdana; color: #112667;">Payment details:</h2>
                    </tr>
                    <tr>
                        <td>
                            <h4 style="font-family: Verdana; color: #112667">Method:</h4>
                        </td>
                        <td>
                            <h4 style="font-family: Verdana; color: #112667">${
                              paymentType.label
                            }</h4>
                        </td>
                    </tr>
                </table>

            <table  style="border-bottom: 1px solid #112667" cellspacing="0" width="600">
                <tr>
                    <h2 style="font-family: Verdana; color: #112667">Customer:</h2>
                </tr>
                <tr>
                    <td>
                        <h4 style="font-family: Verdana; color: #112667">Name:</h4>
                    </td>
                    <td>
                        <h4 style="font-family: Verdana; color: #112667">${firstName}${
    middleName && ' ' + middleName
  }${lastName && ' ' + lastName}</h4>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4 style="font-family: Verdana; color: #112667">Email:</h4>
                    </td>
                    <td>
                        <h4 style="font-family: Verdana; color: #112667">${email}</h4>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4 style="font-family: Verdana; color: #112667">Telephone:</h4>
                    </td>
                    <td>
                        <h4 style="font-family: Verdana; color: #112667">${telephone}</h4>
                    </td>
                </tr>
            </table>

            <table cellspacing="0" width="600">
                <tr>
                    <h2 style="font-family: Verdana; color: #112667">Products:</h2>
                </tr>
                <tr>
                    <td>
                        <img src="#" alt="ProdImg" />
                    </td>
                    <td>
                        <h4 style="font-family: Verdana; color: #112667">Name: ProductName</h4>
                        <h4 style="font-family: Verdana; color: #112667">Color: red</h4>
                        <h4 style="font-family: Verdana; color: #112667">Price: ₴1234</h4>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4 style="font-family: Verdana; color: #112667">Products price:</h4>
                        <h4 style="font-family: Verdana; color: #112667">Total:</h4>
                    </td>
                    <td>
                        <h4 style="font-family: Verdana; color: #112667">₴123456</h4>
                        <h4 style="font-family: Verdana; color: #112667">₴123466</h4>
                    </td>
                </tr>

            </table>
            <table cellspacing="0" border="0" width="600">
                <tr>
                    <h3 align="center" style="font-family: Verdana; color: #112667">
                        <a href="${rootURL}">SoundTower</a>
                    </h3>

                </tr>
            </table>
        </td>
    </tr>
</table>
    `
}

MailBody.propTypes = {
  order: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    orderNo: PropTypes.string.isRequired,
    customer: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string,
      middleName: PropTypes.string,
      email: PropTypes.string,
      telephone: PropTypes.string.isRequired,
    }),
    shipping: PropTypes.shape({
      type: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
      data: PropTypes.array,
    }).isRequired,
    payment: PropTypes.shape({
      type: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }),
}
