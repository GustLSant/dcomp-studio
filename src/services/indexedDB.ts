const DB_VERSION = 5;
const DB_NAME = 'DcompStudioDB' as const;
const STORES = ['folders', 'files'] as const;

export type StoreType = typeof STORES[number];
export type StoreIndex = 'by_parentFolderId';


export class IndexedDB {
    private db: IDBDatabase | null = null;
    private initRequest: Promise<void>;
    private storeName: string;

    constructor(_storeName: StoreType) {
        this.initRequest = this.open();
        this.storeName = _storeName;
    }

    private open(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => { reject(request.error); }
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            }

            request.onupgradeneeded = () => {
                const db = request.result;
                let objectStore: IDBObjectStore;
                
                STORES.forEach((_store: StoreType) => {
                    if (!db.objectStoreNames.contains(_store)) {
                        objectStore = db.createObjectStore(_store, { keyPath: 'id', autoIncrement: true });
                    }
                    else {
                        objectStore = request.transaction!.objectStore(_store);
                    }

                    if (!objectStore.indexNames.contains('by_parentFolderId')) {
                        objectStore.createIndex("by_parentFolderId", "parentFolderId", { unique: false });
                    }
                })
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


    async getAllByIndex<T>(_indexName: StoreIndex, _indexValue: number): Promise<T[]> {
        await this.initRequest;

        return new Promise((resolve, reject) => {
            if (!this.db) return reject('DB not initialized');

            const tx = this.db.transaction(this.storeName, 'readonly');
            const store = tx.objectStore(this.storeName);

            if (!store.indexNames.contains(_indexName)) {
                return reject(`Index "${_indexName}" não existe na store "${this.storeName}"`);
            }

            const index = store.index(_indexName);
            const request = index.getAll(_indexValue);

            request.onsuccess = () => resolve(request.result as T[]);
            request.onerror = () => reject(request.error);
        });
    }


    async getById<T>(_id: number): Promise<T> {
        await this.initRequest;

        return new Promise((resolve, reject) => {
            if (!this.db) { return reject('DB not initialized'); }

            const tx: IDBTransaction       = this.db.transaction(this.storeName, 'readonly');
            const store: IDBObjectStore    = tx.objectStore(this.storeName);
            const request: IDBRequest<any> = store.get(_id);

            request.onsuccess = () => {
                if (request.result) { resolve(request.result as T); }
                else { reject('Not found'); }
            }
            request.onerror = () => { reject(request.error); }
        })
    }


    async update<T>(_value: T): Promise<void> {
        await this.initRequest;

        return new Promise((resolve, reject) => {
            if(!this.db) { return reject('DB not initialized'); }

            const tx: IDBTransaction               = this.db.transaction(this.storeName, 'readwrite');
            const store: IDBObjectStore            = tx.objectStore(this.storeName);
            const request: IDBRequest<IDBValidKey> = store.put(_value);

            request.onsuccess = () => resolve();
            request.onerror   = () => reject(request.error);
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
