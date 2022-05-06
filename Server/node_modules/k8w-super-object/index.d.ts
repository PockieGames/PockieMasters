interface ObjectConstructor {
    merge<T = unknown>(target: any, ...sources: any[]): T;
    values<T>(obj: T): T[keyof T][];
    entries<T>(o: { [s: string]: T }): [string, T][];
    forEach<T>(obj: T, handler: (v: T[keyof T], k: keyof T & string, obj: T) => void): void;
}