const dbName: string = 'DcompStudioDB';

export class IndexedDB {
    private storeName: string;
    private db: IDBDatabase | null = null;
    private initRequest: Promise<void>;


    constructor(storeName: string) {
        this.storeName = storeName;
        this.initRequest = this.open();
    }

    private open(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, 1);

            request.onerror = () => { reject(request.error); }
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            }

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true })
                }
            }
        })
    }

    
    async add<T>(data: T): Promise<number> {
        await this.initRequest;

        return new Promise((resolve, reject) => {
            if (!this.db) return reject('DB not initialized');

            const tx: IDBTransaction               = this.db.transaction(this.storeName, 'readwrite');
            const store: IDBObjectStore            = tx.objectStore(this.storeName);
            const request: IDBRequest<IDBValidKey> = store.add(data);

            request.onsuccess = () => { resolve(request.result as number); }
            request.onerror   = () => { reject(request.error); }
        })
    }


    async getAll<T>(): Promise<T[]> {
        await this.initRequest;

        return new Promise((resolve, reject) => {
            if (!this.db) { return reject('DB not initialized'); }

            const tx: IDBTransaction         = this.db.transaction(this.storeName, 'readonly');
            const store: IDBObjectStore      = tx.objectStore(this.storeName);
            const request: IDBRequest<any[]> = store.getAll();

            request.onsuccess = () => { resolve(request.result as T[]); }
            request.onerror   = () => { reject(request.error); }
        })
    }


    async getById<T>(_id: number): Promise<T | undefined> {
        await this.initRequest;

        return new Promise((resolve, reject) => {
            if (!this.db) { return reject('DB not initialized'); }

            const tx: IDBTransaction       = this.db.transaction(this.storeName, 'readonly');
            const store: IDBObjectStore    = tx.objectStore(this.storeName);
            const request: IDBRequest<any> = store.get(_id);

            request.onsuccess = () => { resolve(request.result as T | undefined); }
            request.onerror   = () => { reject(request.error); }
        })
    }


    async delete(id: number): Promise<void> {
        await this.initRequest;

        return new Promise((resolve, reject) => {
            if (!this.db) { return reject('DB not initialized'); }

            const tx: IDBTransaction             = this.db.transaction(this.storeName, 'readwrite');
            const store: IDBObjectStore          = tx.objectStore(this.storeName);
            const request: IDBRequest<undefined> = store.delete(id);

            request.onsuccess = () => { resolve(); }
            request.onerror   = () => { reject(request.error); }
        })
    }
}
