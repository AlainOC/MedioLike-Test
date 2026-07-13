export interface Setting {
    id: string;
    key: string;
    value: string | null;
    valueType: 'string' | 'number' | 'boolean' | 'json';
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}
