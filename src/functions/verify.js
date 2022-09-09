import { NhostClient } from '@nhost/nhost-js';
import fetch, { Headers } from "node-fetch";
import bip39 from 'bip39';
import nacl from 'tweetnacl';
import hdkey from 'hdkey';
import { Buffer } from 'buffer';

const nhost = new NhostClient({
  subdomain: 'whbmgyhrwuwzmegzjeog',
  region: 'ap-southeast-1'
})

async function fetchGraphQL(operationsDoc, operationName, variables) {

  const result = await fetch(
    "http://localhost:9257/v1/graphql",
    {
      method: "POST",
      headers: new Headers({
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET
      }),
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  // const reslt = await result.json();

  // console.log('in fetch.');
  // console.log(reslt);

  // return await reslt;
  return await await result.json();
}

async function fetchClientreg(query) {
  return await new Promise(async function (res, rej) {
    // console.log(query);
    const { errors, data } = await fetchGraphQL(query, "clientreg", {});
    if (data) res(data);
    if (errors) {
      console.log('error happen');
      rej(errors);
    }
    
    if (data.errors) rej(data);
  });
}

async function encrypt(data) {
  console.log(data);
  // seed is 18 words mnemonic
  const valid = bip39.validateMnemonic(data.seed);

  const keypair = nacl.box.keyPair();
  const keys = _appendBuffer(keypair.publicKey, keypair.secretKey);
  const hexkeys = Buffer.from(keys).toString('hex');
  console.log(keypair);
  console.log(keys);
  console.log(hexkeys);
  console.log(bip39.entropyToMnemonic(keypair.secretKey));
  console.log(bip39.mnemonicToEntropy(bip39.entropyToMnemonic(keypair.secretKey)));
  console.log(nacl.secretbox(keypair.publicKey, nacl.randomBytes(24),keypair.secretKey));
  // if (valid) {
  //   const key = await bip39.mnemonicToSeed("ethics fantasy harsh").then(hdkey.fromMasterSeed).catch(console.log);
  //   console.log(key.toJSON());

  //   const sgnmsg = nacl.sign(Buffer.from("ini pesan antar"), key.privateKey);
  //   console.log(sgnmsg);
  // }
  return data;
}

// ini bisa disederhanakan jadi promise
async function validMethod(req, res, method, next) {
  if (req.method == method) {
    next(req, res);
  } else {
    res.status(405).end();
  }
}


export default function (req, res, next) {
  validMethod(req, res, "POST", async function(req, res) {
    console.log('next executed.');


    await fetchClientreg(`
    query clientreg {
      client_registration {
        url
        libhash
        seed
      }
    }`).then(
      async result => {
        // console.log(result);
        // const reval = await encrypt();

        res.status(200).json(result.client_registration[0]).end();
      },
      errors => {
        console.log(errors);
        res.status(500).send('Something wrong with query on server side.').end();
      }
    );

  });
  console.log('outside validMethod.');
}