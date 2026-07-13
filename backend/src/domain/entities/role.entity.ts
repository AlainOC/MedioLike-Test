export interface Role {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Permission {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}
