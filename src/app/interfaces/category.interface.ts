export interface ICategory {
    id:    number;
    category:   string;
}

export interface BodyCategory {
    category: string;
}

export interface BodyUpdateCategories extends BodyCategory {
    id: number;
}