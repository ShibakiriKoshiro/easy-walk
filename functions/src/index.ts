/* eslint-disable max-len */
import * as functions from "firebase-functions";
import Stripe from "stripe";

import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

const stripe = new Stripe(
    // eslint-disable-next-line max-len
    "sk_test_51K4PfOHTrQUbry08UWjQywTWIQ3SPutJRDosrsPcJfZD2SvbPBlM2yx5Ix83jbRxJdStRLAoevWjyfJWT7oKsK7n00phzrTIht",
    {
      apiVersion: "2020-08-27",
    }
);

// eslint-disable-next-line max-len
export const buyTicket = functions.region("asia-northeast2").https.onRequest(async (request, response) => {
  // const endpointSecret = "whsec_coM7NjqQnxJlkWrtm3IY5he7naTgraTL";
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig as any, "whsec_coM7NjqQnxJlkWrtm3IY5he7naTgraTL");
  } catch (err) {
    response.status(400).send("webhook error");
    return;
  }
  const charge:any = await event.data.object;

  // Handle the event
  switch (event.type) {
    case "charge.succeeded":
      console.log(charge);
      // Then define and call a function to handle the event charge.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  const customerDoc:any = db.collection("customers").where("stripeId", "==", charge.customer)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  db.collection(`users/${customerDoc.id}/tickets`).doc(charge.id).set({
    // 商品のID(本来は動的に)
    ticketId: "prod_KkXPXwsdG7Afrx",
    numberOfTickets: 3,
    buyDate: Date.now(),
  })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
