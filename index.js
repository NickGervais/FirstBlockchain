var SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.caculateHash();
    }

    caculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "1/1/2018", "This is the Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.caculateHash();
        this.chain.push(newBlock);
    }

    validChain(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];
            if(currentBlock.hash !== currentBlock.caculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let gervaisCoin = new Blockchain();
gervaisCoin.addBlock(new Block(1, "1/12/2018", {amount: 2}));
gervaisCoin.addBlock(new Block(2, "1/12/2018", {amount: 3}));

// console.log(JSON.stringify(gervaisCoin, null, 2));

console.log("Is the blockchain valid? " + gervaisCoin.validChain());

gervaisCoin.chain[1].data = {amount: 4};

console.log("Is the blockchain valid? " + gervaisCoin.validChain());
