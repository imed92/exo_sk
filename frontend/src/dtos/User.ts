import { MovieDto } from "./Movie";
// DTO pour représenter un utilisateur
export interface UserDto {
  id: string;
  username: string;
  email: string;
  password: string;
  favoriteMovies: MovieDto[];
}
