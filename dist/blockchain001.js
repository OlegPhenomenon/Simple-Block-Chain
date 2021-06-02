"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Block {
    constructor(index, // Последовательный номер этого блока
    previousHash, // Хэш предыдущего блока
    timestamp, // Время создания блока
    data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        const data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto
            .createHash('sha256') // Создает экземпляр объекта Hash для генерации SHA 256-хешей
            .update(data) // Вычисляет и обновляет хеш-значение внутри объекта Hash
            .digest('hex'); // Преобразует хеш-значения в 16-ричную строку
    }
}
class Blockchain {
    // Создает первичный блок и добавляет его в цепочку
    constructor() {
        this.chain = []; // блокчейн хранится здесь
        this.chain.push(new Block(0, '0', Date.now(), 'Genesis block'));
    }
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    // Создаем новый экземпляр Блока и заполняет его свойства
    addBlock(data) {
        const block = new Block(this.latestBlock.index + 1, this.latestBlock.hash, Date.now(), data);
        this.chain.push(block);
    }
}
console.log('Creating the blockchain with genesis block...');
const blockchain = new Blockchain();
console.log('Mining block #1 ...');
blockchain.addBlock('First block...');
console.log('Mining block #2 ...');
blockchain.addBlock('Seconf block ...');
// Содержимое блокчейна
console.log(JSON.stringify(blockchain, null, 2));
