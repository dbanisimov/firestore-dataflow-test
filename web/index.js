'use strict'

import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.mjs';
import { DataflowDiagram, CallDataflowDiagram } from './diagrams.js';

const verbose = false;

const log = verbose
  ? console.log
  : () => {};

const TimestampCell = ({ timestamp }) => html`
  <td>
    ${timestamp ? timestamp.toDate().toLocaleTimeString('en-US') : '-'}
  </td>
`

const DeltaCell = ({ delta }) => html`
  <td class="cell-number">
    ${delta ? `${delta}ms` : ''}
  </td>
`;

const FirestoreTableHead = () => html`
  <thead>
    <tr>
      <th class="cell-timestamp">
        Started    
      </th>
      <th class="cell-number">
        TC
      </th>
      <th class="cell-number">
        TDb
      </th>
      <th class="cell-number">
        TU
      </th>
      <th class="cell-number">
        TTr
      </th>
    </tr>
  </thead>
`;

const FirestoreResultRow = ({ result: {
    clientCreated,
    clientReadCacheDelta,
    clientReadFirestoreDelta,
    clientReadFirestoreUpdatedDelta,
    firestoreUpdatedTriggeredDelta,
  } = {} }) => html`
    <tr>
      <${TimestampCell} timestamp=${clientCreated} />
      <${DeltaCell} delta=${clientReadCacheDelta} />
      <${DeltaCell} delta=${clientReadFirestoreDelta} />
      <${DeltaCell} delta=${clientReadFirestoreUpdatedDelta} />
      <${DeltaCell} delta=${firestoreUpdatedTriggeredDelta} />
    </tr>
  `;

const FirestoreResults = ({ results = [] }) => html`
  <tbody>
    ${results.map(result => html`
      <${FirestoreResultRow} result=${result} />
    `)}
  </tbody>
`;

const CallTableHead = () => html`
  <thead>
    <tr>
      <th class="cell-timestamp">
        Started    
      </th>
      <th class="cell-number">
        TCall
      </th>
      <th class="cell-number">
        TDb
      </th>
    </tr>
  </thead>
`;

const CallResultRow = ({ result: {
    clientCalled,
    clientReceivedResponseDelta,
    clientReadFirestoreDelta,
  } = {} }) => html`
    <tr>
      <${TimestampCell} timestamp=${clientCalled} />
      <${DeltaCell} delta=${clientReceivedResponseDelta} />
      <${DeltaCell} delta=${clientReadFirestoreDelta} />
    </tr>
  `;

const CallResults = ({ results = [] }) => html`
  <tbody>
    ${results.map(result => html`
      <${CallResultRow} result=${result} />
    `)}
  </tbody>
`;

class TestDataFlow extends Component {
  updateCurrentResult(update) {
    this.setState(prevState => ({
      currentResult: Object.assign({}, prevState.currentResult, update),
    }));
  }

  getDelta(lower, greater) {
    return greater.toMillis() - lower.toMillis();
  }

  savePreviousResult() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    const { currentResult, prevResults } = this.state;
    if (currentResult) {
      this.setState({
        prevResults: prevResults
          ? prevResults.concat(currentResult)
          : [currentResult]
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render({}, { prevResults = [], currentResult = {} }) {
    return html`
      <div>
        <div class="results">
          <table class="results">
            <${this.TableHeadComponent} />
            <${this.ResultsComponent} results=${prevResults} />
            <tbody>                
              <${this.ResultRowComponent} result=${currentResult} />
            </tbody>
          </table>
        </div>
        <button class="button-run" onClick=${() => this.runTest()}>Run</button>
      </div>
    `;
  }
}

class TestFirestoreDataFlow extends TestDataFlow {
  constructor() {
    super();
    this.TableHeadComponent = FirestoreTableHead;
    this.ResultRowComponent = FirestoreResultRow;
    this.ResultsComponent = FirestoreResults;
  }
 
  handleSnapshot(clientCreated, snapshot) {
    const {
      firestoreCreated,
      functionTriggered,
      functionExecuted,
      firestoreUpdated,
    } = snapshot.data() || {};
    if (!firestoreCreated) {
      const clientReadCache = firebase.firestore.Timestamp.now();
      const clientReadCacheDelta = this.getDelta(clientCreated, clientReadCache);
      this.updateCurrentResult({ clientReadCache, clientReadCacheDelta })
      log('clientReadCache:', clientReadCache.toDate());
    }
    if (firestoreCreated && !firestoreUpdated) {
      const clientReadFirestore = firebase.firestore.Timestamp.now();
      const clientReadFirestoreDelta = this.getDelta(clientCreated, clientReadFirestore);
      this.updateCurrentResult({
        firestoreCreated, clientReadFirestore, clientReadFirestoreDelta,
      });
      log('firestoreCreated:', firestoreCreated.toDate());
      log('clientReadFirestore:', clientReadFirestore.toDate());
    }
    if (firestoreUpdated) {
      const clientReadFirestoreUpdated = firebase.firestore.Timestamp.now();
      const clientReadFirestoreUpdatedDelta = this.getDelta(clientCreated, clientReadFirestoreUpdated);
      const firestoreUpdatedTriggeredDelta = this.getDelta(firestoreCreated, firestoreUpdated);
      this.updateCurrentResult({
        functionTriggered, functionExecuted, firestoreUpdated, clientReadFirestoreUpdated,
        firestoreUpdatedTriggeredDelta, clientReadFirestoreUpdatedDelta,
      });
      log('functionTriggered:', functionTriggered.toDate());
      log('functionExecuted:', functionExecuted.toDate());
      log('firestoreUpdated:', firestoreUpdated.toDate());      
      log('clientReadFirestoreUpdated:', clientReadFirestoreUpdated.toDate());
    }
  }

  runTest() {
    this.savePreviousResult();
    const firestore = firebase.firestore();
    const doc = firestore.collection('entries').doc();
    const clientCreated = firebase.firestore.Timestamp.now();
    this.unsubscribe = doc.onSnapshot(
      snapshot => this.handleSnapshot(clientCreated, snapshot),
      error => console.error('Failed to get snapshot:', error),
    );
    this.setState({ currentResult: { clientCreated } });
    doc.set({ 
      clientCreated,
      firestoreCreated: firebase.firestore.FieldValue.serverTimestamp(),
    }).catch(error => console.error('Failed to set document:', error));
    log('clientCreated:', clientCreated.toDate());
  }
}

class TestCallDataFlow extends TestDataFlow {
  constructor() {
    super();
    this.TableHeadComponent = CallTableHead;
    this.ResultRowComponent = CallResultRow;
    this.ResultsComponent = CallResults;
  }

  handleSnapshot(clientCalled, snapshot) {
    const { firestoreCreated } = snapshot.data() || {};
    if (firestoreCreated) {
      const clientReadFirestore = firebase.firestore.Timestamp.now();
      const clientReadFirestoreDelta = this.getDelta(clientCalled, clientReadFirestore);
      this.updateCurrentResult({ firestoreCreated, clientReadFirestore, clientReadFirestoreDelta });
      log('firestoreCreated', firestoreCreated.toDate());
      log('clientReadFirestore', clientReadFirestore.toDate());
    }
  }

  handleResponse(clientCalled, result) {
    const { functionExecuted } = result.data;
    const clientReceivedResponse = firebase.firestore.Timestamp.now();
    const clientReceivedResponseDelta = this.getDelta(clientCalled, clientReceivedResponse);
    this.updateCurrentResult({ functionExecuted, clientReceivedResponse, clientReceivedResponseDelta });
    log('clientReceivedResponse', clientReceivedResponse.toDate());
  }

  runTest() {
    this.savePreviousResult();
    const functions = firebase.functions();
    const firestore = firebase.firestore();
    const doc = firestore.collection('entriesCall').doc();
    const docId = doc.id;
    const clientCalled = firebase.firestore.Timestamp.now();
    this.setState({ currentResult: { clientCalled } });

    this.unsubscribe = doc.onSnapshot(
      snapshot => this.handleSnapshot(clientCalled, snapshot),
      error => console.error('Failed to get snapshot:', error),
    );

    functions.httpsCallable('onCall')({ docId })
      .then(result => this.handleResponse(clientCalled, result))
      .catch(error => console.error('Failed to call function:', error));
    log('clientCalled', clientCalled.toDate());
  }
}

const App = () => html`
  <div class="app">
    <div class="app-container">
      <header><h1>Firestore Dataflow Tests</h1></header>
      <section>
        <h1>With local cache</h1>
        <div class="diagram">
          <${DataflowDiagram} />
        </div>
        <${TestFirestoreDataFlow} />
      </section>
      <section>
        <h1>With callable function</h1>
        <div class="diagram">
          <${CallDataflowDiagram} />
        </div>
        <${TestCallDataFlow} />
      </section>
      <footer>
        <p>2019 <a href="https://twitter.com/dbanisimov">Denis Anisimov</a></p>
      </footer>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
  try {
    const app = firebase.app();
    const features = ['auth', 'firestore', 'functions'].filter(feature => typeof app[feature] === 'function');
    log(`Firebase SDK loaded with ${features.join(', ')}`);
    render(html`<${App} />`, document.body);
  } catch (e) {
    console.error(e);
    document.getElementById('load').innerHTML = 'Error loading the app, check the console.';
  }
});
