export interface AdapterInterface<T> {
    adapt(data:any): T;
}