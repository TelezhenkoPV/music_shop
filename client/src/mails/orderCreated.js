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
    products,
  } = order

  const orderTrack = isAuthenticated
    ? `<h4 style="font-family: Verdana; color: #112667; padding: 10px 20px">Order status you can track in Order tab of you <a href="${rootURL}/customer/profile/orders">Profile</a></h4>`
    : `<h4 style="font-family: Verdana; color: #112667; padding: 10px 20px">Order status you can track folowing by <a href="${rootURL}/order/${orderNo}">Link</a></h4>`

  const shippingStringsFromArray = (array) => {
    let result = ''
    array.forEach(
      ({ label, value }) =>
        (result = `${result}
        <tr>
            <td style="border: 1px solid #112667;">
                <div style="font-family: Verdana; color: #112667"><b>${label}:</b></div>
            </td>
            <td style="border: 1px solid #112667;">
                <div style="font-family: Verdana; color: #112667">${value}</div>
            </td>
        </tr>
        `)
    )
    return result
  }

  const productsStringsFromArray = (array) => {
    let result = ''
    array.forEach(
      ({ product: { imageUrls, name, color, currentPrice }, cartQuantity }) =>
        (result = `${result}
                <tr>
                    <td style="border: 1px solid #112667;">
                      ${
                        imageUrls.length > 0 &&
                        `<div style="width: 100px; height: 100px; margin: 5px auto; background-image: url(${rootURL}/${imageUrls[0]}); background-size: contain; background-repeat: no-repeat; background-position: center"></div>`
                      }
                    </td>
                    <td style="border: 1px solid #112667;">
                        <div style="font-family: Verdana; color: #112667"><b>Name:</b> ${name}</div>
                        <div style="font-family: Verdana; color: #112667"><b>Color:</b> ${
                          color || ''
                        }</div>
                        <div style="font-family: Verdana; color: #112667"><b>Price:</b> ₴${currentPrice}</div>
                        <div style="font-family: Verdana; color: #112667"><b>Qty:</b> ${cartQuantity}</div>
                        <div style="font-family: Verdana; color: #112667"><b>Summary:</b> ₴${
                          currentPrice * cartQuantity
                        }</div>
                    </td>
                </tr>
        `)
    )
    return result
  }

  const OrderTotal = (products) =>
    products.reduce(
      (total, current) =>
        total + current.cartQuantity * current.product.currentPrice,
      0
    )

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
                <table cellspacing="0" cellpadding="10px" style="border-top: 1px solid #112667" width="600">
                    <tr >
                        <h4 style="font-family: Verdana; color: #112667">Shipping details:</h4>
                    </tr>
                    <tr >
                        <td style="border: 1px solid #112667;">
                            <div style="font-family: Verdana; color: #112667"><b>Method:</b></div>
                        </td>
                        <td style="border: 1px solid #112667;">
                            <div style="font-family: Verdana; color: #112667">${
                              shippingType.label
                            }</div>
                        </td>
                    </tr>
                    ${shippingStringsFromArray(shippingData)}

                    <tr >
                        <h4 style="font-family: Verdana; color: #112667;"><b>Payment details:</b></h4>
                    </tr>
                    <tr >
                        <td style="border: 1px solid #112667;">
                            <div style="font-family: Verdana; color: #112667"><b>Method:</b></div>
                        </td>
                        <td style="border: 1px solid #112667;">
                            <div style="font-family: Verdana; color: #112667">${
                              paymentType.label
                            }</div>
                        </td>
                    </tr>

                <tr >
                    <h4 style="font-family: Verdana; color: #112667"><b>Customer:</b></h4>
                </tr>
                <tr >
                    <td style="border: 1px solid #112667;">
                        <div style="font-family: Verdana; color: #112667"><b>Name:</b></div>
                    </td>
                    <td style="border: 1px solid #112667;">
                        <div style="font-family: Verdana; color: #112667">${firstName}${
    middleName && ' ' + middleName
  }${lastName && ' ' + lastName}</div>
                    </td>
                </tr>
                <tr >
                    <td style="border: 1px solid #112667;">
                        <div style="font-family: Verdana; color: #112667"><b>Email:</b></div>
                    </td>
                    <td style="border: 1px solid #112667;">
                        <div style="font-family: Verdana; color: #112667">${email}</div>
                    </td>
                </tr>
                <tr >
                    <td style="border: 1px solid #112667;">
                        <div style="font-family: Verdana; color: #112667"><b>Telephone:</b></div>
                    </td>
                    <td style="border: 1px solid #112667;">
                        <div style="font-family: Verdana; color: #112667">${telephone}</div>
                    </td>
                </tr>

                <tr >
                    <h4 style="font-family: Verdana; color: #112667">Products:</h4>
                </tr>
                  <b>${productsStringsFromArray(products)}</b>
                <tr >
                    <td style="border: 1px solid #112667;">
                        <div style="font-family: Verdana; color: #112667"><b>Total:</b></div>
                    </td>
                    <td style="border: 1px solid #112667;">
                        <div style="font-family: Verdana; color: #112667"><b>₴${OrderTotal(
                          products
                        )}</b></div>
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
    products: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        product: PropTypes.shape({
          name: PropTypes.string.isRequired,
          currentPrice: PropTypes.number.isRequired,
          color: PropTypes.string,
          imageUrls: PropTypes.arrayOf(PropTypes.string),
        }).isRequired,
        cartQuantity: PropTypes.number.isRequired,
      })
    ),
  }),
}
