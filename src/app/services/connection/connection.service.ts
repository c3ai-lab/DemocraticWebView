import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PullRequest } from '../../models/pullrequest.interface';
import { FormatterService } from '../formatter/formatter.service';
import EnvironmentVariables from '../../environment.variables'
import Web3 from 'web3';


declare let require: any;
declare let window: any;
declare var process: {
  env: {
      CONTRACT_ADDRESS: string,
      PRIVATE_KEY: string,
      PROVIDER: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  // web3js envs...
  public account: any;
  private web3: any;
  private abi: any;
  private contract: any;

  constructor(private http: HttpClient, private formatterService: FormatterService) {
    this.init();
  }

  private async init() {
    // set environment variables 
    this.web3 = new Web3(new Web3.providers.HttpProvider(EnvironmentVariables.PROVIDER));
    this.abi = require('./connection.json');
    this.contract = new this.web3.eth.Contract(this.abi, EnvironmentVariables.CONTRACT_ADDRESS);
    this.account = this.web3.eth.accounts.privateKeyToAccount(EnvironmentVariables.PRIVATE_KEY);
  }


  /* -----------------------------------------------------------------------------------------------------------------------------------------------------------
                                    (POST-) Write functions (functions that do write/update anything on the chain)
  ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

  public async createFakeVote(key: number, approve: boolean, address: string) {
    let contractData = this.contract.methods.voteFake(key, approve, address);
    const gasLimit = await contractData.estimateGas({ from: this.account['address'] });
    await this.genericBlockchainCall(contractData.encodeABI(), gasLimit);
  }

  /* -----------------------------------------------------------------------------------------------------------------------------------------------------------
                                                            Generic PUT-function
----------------------------------------------------------------------------------------------------------------------------------------------------------- */

  private async genericBlockchainCall(contractData: any, gasLimit: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const Transaction = require('ethereumjs-tx').Transaction;

        const txCount = await this.web3.eth.getTransactionCount(this.account['address']);

        const txObject = {
          nonce: this.web3.utils.toHex(txCount),
          to: EnvironmentVariables.CONTRACT_ADDRESS,
          gasLimit: this.web3.utils.toHex(gasLimit),
          gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('11', 'gwei')),
          data: contractData
        }

        // Sign the transaction
        const tx = new Transaction(txObject, { chain: 'kovan', hardfork: 'istanbul' })
        const pk = Buffer.from(EnvironmentVariables.PRIVATE_KEY, 'hex')
        tx.sign(pk)

        const serializedTx = tx.serialize()
        const raw = '0x' + serializedTx.toString('hex')

        // Broadcast the transaction
        const receipt = await this.web3.eth.sendSignedTransaction(raw);

        resolve(receipt);
      } catch (err) {
        reject(err);
      }
    });
  }


  /* -----------------------------------------------------------------------------------------------------------------------------------------------------------
                                                              (GET-)Call functions (functions that do not write anything on the chain)
  ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

  public getPolls(startIndex: number, endIndex: number): Promise<PullRequest[]> {
    return new Promise(async (resolve, reject) => {
      let result: PullRequest[] = [];

      for (let i = startIndex; i <= endIndex; i++) {
        const poll = await this.contract.methods.polls(i).call();
        result.push(new PullRequest(i, poll.pullRequestId, poll.title, poll.hostingplatform, poll.pullRequestLink, poll.description,
          poll.isTransferd, this.formatterService.getDateTime(parseInt(poll.voteEnd)), poll.votersApproveCount, poll.votersDenyCount));
      }

      resolve(result);
    })
  }

  public getPollLength(): Promise<number> {
    return this.contract.methods.getPollLength().call();
  }

  public getVotersApprove(index: number): Promise<string[]> {
    return new Promise(async (resolve, rejects) => {
      const result = await this.contract.methods.getVotersApprove(index).call();
      resolve(result);
    })
  }

  public getVotersDeny(index: number): Promise<string[]> {
    return new Promise(async (resolve, rejects) => {
      const result = await this.contract.methods.getVotersDeny(index).call();
      resolve(result);
    })
  }

  public getVotingResult(index: number): Promise<boolean> {
    return new Promise(async (resolve, rejects) => {
      const result = await this.contract.methods.getVotingResult(index).call();
      resolve(result);
    })
  }

  public getPoll(index: number): Promise<PullRequest> {
    return new Promise(async (resolve, reject) => {
      const poll = await this.contract.methods.polls(index).call();
      resolve(new PullRequest(index, poll.pullRequestId, poll.title, poll.hostingplatform, poll.pullRequestLink, poll.description,
        poll.isTransferd, this.formatterService.getDateTime(parseInt(poll.voteEnd)), poll.votersApproveCount, poll.votersDenyCount))
    })
  }

  public openProviderLink(link: string): void {
    window.open(link, "_blank");
  }

}
