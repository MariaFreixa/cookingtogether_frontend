import { Complexity } from '../models/complexity.model';
import { Category } from './category.model';

export class Recipe {
    id: number;
    name: string;
    image: File;
    diners: number;
    video: String;
    id_user: number;
    category: Category;
    complexity: Complexity;
    userFavorite: boolean;
    rating: number;
    id_category: number;
    id_complexity: number;
}