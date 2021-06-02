import * as crypto from 'crypto';

class Block {
  readonly hash: string; //Хэш этого блока

  constructor (
    readonly index: number, // Последовательный номер этого блока
    readonly previousHash: string, // Хэш предыдущего блока
    readonly timestamp: number, // Время создания блока
    readonly data: string, // Данные приложения
  ) {
    this.hash = this.calculateHash();
  }

  private calculateHash(): string {
    const data = this.index + this.previousHash + this.timestamp + this.data;

    return crypto
              .createHash('sha256') // Создает экземпляр объекта Hash для генерации SHA 256-хешей
              .update(data) // Вычисляет и обновляет хеш-значение внутри объекта Hash
              .digest('hex'); // Преобразует хеш-значения в 16-ричную строку
  }
}

class Blockchain {
  private readonly chain: Block[] = []; // блокчейн хранится здесь

  private get latestBlock(): Block { //Геттер для получения ссылки на последний добавленный блок
    return this.chain[this.chain.length - 1]
  }

  // Создает первичный блок и добавляет его в цепочку
  constructor() {
    this.chain.push(
      new Block(0, '0', Date.now(), 'Genesis block'));
  }

  // Создаем новый экземпляр Блока и заполняет его свойства
  addBlock(data: string): void {
    const block = new Block(
      this.latestBlock.index + 1,
      this.latestBlock.hash,
      Date.now(),
      data
    );

    this.chain.push(block);
  }

}

console.log('Creating the blockchain with genesis block...')
const blockchain = new Blockchain();

console.log('Mining block #1 ...');
blockchain.addBlock('First block...');

console.log('Mining block #2 ...');
blockchain.addBlock('Seconf block ...');

// Содержимое блокчейна
console.log(JSON.stringify(blockchain, null, 2));

