const functions = require('firebase-functions');
const firebase = require('firebase-admin');

try {
  firebase.initializeApp();
} catch (e) {}

exports.onEntryCreated = functions.firestore
  .document('entries/{entryId}')
  .onCreate(async (snapshot, context) => {
    const functionTriggered = firebase.firestore.Timestamp.fromDate(new Date(context.timestamp));
    const functionExecuted = firebase.firestore.Timestamp.now();
    const firestoreUpdated = firebase.firestore.FieldValue.serverTimestamp();
    return snapshot.ref.update({
      functionTriggered,
      functionExecuted,
      firestoreUpdated,
    });
  });

exports.onCall = functions.https
  .onCall(async (data, context) => {
    const { docId } = data;
    if (!docId) {
      throw new functions.https.HttpsError('invalid-argument', 'docId is missing from data');
    }
    const functionExecuted = firebase.firestore.Timestamp.now();
    const firestoreCreated = firebase.firestore.FieldValue.serverTimestamp();
    await firebase.firestore()
      .collection('entriesCall')
      .doc(docId)
      .set({
        firestoreCreated,
        functionExecuted,
      });
    return { functionExecuted };
  });
