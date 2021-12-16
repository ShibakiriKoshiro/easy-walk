import * as functions from 'firebase-functions';
// import Stripe from 'stripe';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// const stripe = new Stripe(functions.config().someservice.key, {
//   apiVersion: '2020-08-27',
// });

export const onPaymentSuccess = functions
  .region('asia-northeast2')
  .firestore.document('customers/{uid}/payments/{paymentId}/items')
  .onCreate(async (doc, context) => {
    // TODO: price id, quwltly
    // itemのみfirestore/paymentに遅れて反映される。
    const priceId = await doc.data().items[0].price.id;
    const productId = await doc.data().items[0].price.product;
    functions.logger.log(productId, 'productId');
    // productドキュメントからチケット枚数を取得
    const snap = await db.doc(`products/${productId}`).get();
    const productContent = await snap.data();
    functions.logger.log(productContent, 'productConten');
    const uid = await context?.params.uid;
    return db
      .collection(`users/${uid}/tickets`)
      .doc('priceId')
      .set({
        tickets: {
          priceId: priceId,
          productId: productId,
          numberOfTickets: FieldValue.increment(
            productContent?.numberOfTickets
          ),
        },
      });
  });

// export const buyTicket = functions
//   .region('asia-northeast2')
//   .https.onRequest(async (request, response) => {
//     const endpointSecret = 'whsec_coM7NjqQnxJlkWrtm3IY5he7naTgraTL';
//     const sig = request.headers['stripe-signature'];
//     let event;
//     functions.logger.info('buyTicket');
//     try {
//       event = stripe.webhooks.constructEvent(
//         // firebaseFunctionsはbodyかrawBody
//         request.rawBody,
//         sig as string,
//         endpointSecret
//       );
//     } catch (err) {
//       functions.logger.info(request.body);
//       functions.logger.error(err);
//       response.status(400).send('webhook error');
//       return;
//     }
//     const charge: any = await event.data.object;
//     functions.logger.info('チャージ', charge);

//     // Handle the eventy
//     switch (event.type) {
//       case 'charge.succeeded':
//         // Then define and call a function to handle the event charge.succeeded
//         break;
//       // ... handle other event types
//       default:
//     }

//     const customerSnap = await db
//       .collection('customers')
//       .where('stripeId', '==', charge.customer)
//       .get();
//     const customerDoc = customerSnap.docs[0];
//     const customerData = customerDoc.data();

//     if (!customerData) {
//       response.status(400).send('user not found');
//       return;
//     }

//     db.collection(`users/${customerDoc.id}/tickets`)
//       // 商品のID(本来は動的にprice)
//       .doc('1')
//       .set(
//         {
//           // 商品のID(本来は動的に)
//           ticketId: '1',
//           // チケット追加
//           numberOfTickets: FieldValue.increment(3),
//         },
//         { merge: true }
//       )
//       .then(() => {
//         functions.logger.info('Document successfully written!');
//         response.status(200).send('success');
//       })
//       .catch((error) => {
//         console.error('Error writing document: ', error);
//         response.status(500).send('document write error');
//       });
//   });
