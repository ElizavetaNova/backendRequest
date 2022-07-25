import { RegisterOptions } from "react-hook-form";
import { CreateMovieDto } from "./createMovieDto";

export interface FormInput {
    label: string;
    name: keyof CreateMovieDto;
    type?: string;
    validation?: RegisterOptions;
}
